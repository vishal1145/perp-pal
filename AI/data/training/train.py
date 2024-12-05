import os
import pandas as pd
from watchdog.events import FileSystemEventHandler
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from utils.config import UNPROCESSED_FILES_DIR,PROCESSED_FILES_DIR,MAX_BATCH_SIZE
from utils.initialize_ChromaDb import ChromaDBInitializer
from utils.collection_Status import Collection_Status
from app.services.refactor_json_service import Refactor_JSON

collection=ChromaDBInitializer.get_or_create_collection("questions")
_model = ChromaDBInitializer.get_model()

class Automatic_train_Model(FileSystemEventHandler):
    def on_created(self, event):
        if event.src_path.endswith(".json"):
            print(f"New file detected: {event.src_path}")
            self.process_and_train(event.src_path)

    def on_modified(self, event):
        if event.src_path.endswith(".json"):
            print(f"File modified: {event.src_path}")
            self.process_and_train(event.src_path)

    @staticmethod
    def process_and_train(file_path):
        processed_file = Refactor_JSON.check_and_refactor(file_path)
        if processed_file:
            generate_embeddings_and_index(processed_file)

def generate_embeddings_and_index(file_path, force_retrain=False):
    if collection is None:
        raise ValueError("ChromaDB collection is not initialized.")

    print(f"Processing file: {file_path}")
    
    processed_file_path = os.path.join(PROCESSED_FILES_DIR, os.path.basename(file_path).replace('.json', '_processed.json'))
    if not force_retrain and os.path.exists(processed_file_path):
        print(f"Skipping embedding generation for {file_path} as the processed file already exists.")
        return
    
    try:
        df = pd.read_json(file_path)
        
        if df.empty:
            print(f"File {file_path} is empty. Skipping...")
            return

        df.fillna("", inplace=True)
        
        required_parameters = ['subject', 'topic', 'difficulty', 'questionType', 'chapter']
        for col in required_parameters:
            if col not in df.columns:
                print(f"Column '{col}' is missing in {file_path}. Filling with empty strings.")
                df[col] = ""
                
        if not ((df['subject'] != "").any() or (df['topic'] != "").any() or (df['chapter'] != "").any()):
            print(f"File {file_path} does not contain any valid 'subject', 'topic', or 'chapter'. Skipping...")
            return
            
        df['combined'] = (
            df['_id'].astype(str) + " " +
            df['subject'].astype(str) + " " +
            df['topic'].astype(str) + " " +
            df['difficulty'].astype(str) + " " +
            df['questionType'].astype(str) + " " +
            df['chapter'].astype(str)
        )
        
        for start_idx in range(0, len(df), MAX_BATCH_SIZE):
            end_idx = min(start_idx + MAX_BATCH_SIZE, len(df))
            batch = df.iloc[start_idx:end_idx]

            batch_embeddings = _model.encode(batch['combined'].tolist(), show_progress_bar=True)
        
            collection.add(
                embeddings=batch_embeddings.tolist(),
                metadatas=batch.to_dict(orient="records"),
                ids=batch['_id'].tolist()
            )
            print(f"Successfully processed and indexed file: {file_path}")
            return True
        
    except Exception as e:
        print(f"An error occurred while processing {file_path}: {e}")
        return False
    
if __name__ == "__main__":
    collection_status = Collection_Status.collection_status()
    if collection_status:
        for file_name in os.listdir(UNPROCESSED_FILES_DIR):
            if file_name.endswith(".json"):
                file_path = os.path.join(UNPROCESSED_FILES_DIR, file_name)
                processed_file = Refactor_JSON.check_and_refactor(file_path)
                if processed_file:
                    generate_embeddings_and_index(processed_file)

    print("All files have been processed.")
