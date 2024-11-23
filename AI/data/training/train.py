import os
import time
import pandas as pd
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import numpy as np
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from utils.config import DATA_FILE, METADATA_FILE, MAX_BATCH_SIZE
from utils.initialize_ChromaDb import ChromaDBInitializer

collection = None
_model = ChromaDBInitializer.get_model()

def initialize_chromadb_collection():
    global collection
    collection = ChromaDBInitializer.get_or_create_collection("questions")
    print("ChromaDB collection initialized.")

class Automatic_train_Model(FileSystemEventHandler):
    def on_modified(self, event):
        global last_modified_time
        if event.src_path.endswith("questions.json"):
            current_time = time.time()
            if current_time - last_modified_time > 5:
                print("Detected changes in questions.json. Regenerating embeddings and index...")
                generate_embeddings_and_index()
                last_modified_time = current_time
            else:
                print("Modification detected but ignored due to debounce.")

def generate_embeddings_and_index():
    global collection
    if collection is None:
        raise ValueError("ChromaDB collection is not initialized.")

    if os.path.exists(METADATA_FILE):
        os.remove(METADATA_FILE)
        print(f"Deleted existing metadata file: {METADATA_FILE}")

    print("Generating new embeddings and creating index...")

    try:
        df = pd.read_json(DATA_FILE)
        if df.empty:
            print("Data file is empty. Aborting embedding generation.")
            return

        df.fillna("", inplace=True)
        df['combined'] = (
            df['subject'] + " " +
            df['topic'] + " " +
            df['difficulty'] + " " +
            df['questionType'] + " " +
            df['chapter']
        )
        batch_size = int(np.ceil(len(df) / MAX_BATCH_SIZE))
        all_embeddings = []
        all_metadatas = []
        for start_idx in range(0, len(df), batch_size):
            end_idx = min(start_idx + batch_size, len(df))
            batch = df.iloc[start_idx:end_idx]
            batch_embeddings = _model.encode(batch['combined'].tolist(), show_progress_bar=True)
            
            all_embeddings.extend(batch_embeddings)
            all_metadatas.extend(batch.to_dict(orient="records"))

        collection.add(
            embeddings=all_embeddings,
            metadatas=all_metadatas,
            ids=[str(i) for i in range(len(df))]
        )

        df.to_pickle(METADATA_FILE)
        print("New embeddings indexed and metadata saved.")

    except Exception as e:
        print(f"An error occurred during embedding generation: {e}")

if __name__ == "__main__":
    initialize_chromadb_collection()
    generate_embeddings_and_index()
