import pandas as pd
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
import sys
import os
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

from utils.config import INDEX_FILE, METADATA_FILE, MODEL_NAME,DATA_FILE


last_modified_time = 0
class Automatic_train_Model(FileSystemEventHandler):
    def on_modified(self, event):
        global last_modified_time
        if event.src_path.endswith("questions.json"):
            current_time = time.time()
            if current_time - last_modified_time > 5:
                print("Detected changes in questions.json. Regenerating index and metadata...")
                generate_embeddings_and_index()
                last_modified_time = current_time
            else:
                print("Modification detected but ignored due to debounce.")

def generate_embeddings_and_index():
    model = SentenceTransformer(MODEL_NAME)

    if os.path.exists(INDEX_FILE):
        os.remove(INDEX_FILE)
        print(f"Deleted existing index file: {INDEX_FILE}")
    
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

        question_embeddings = model.encode(df['combined'].tolist(), show_progress_bar=True)

        index = faiss.IndexFlatL2(question_embeddings.shape[1])
        index.add(np.array(question_embeddings))
        faiss.write_index(index, INDEX_FILE)

        df.to_pickle(METADATA_FILE)
        print("New index and metadata saved.")

    except Exception as e:
        print(f"An error occurred during embedding generation: {e}")


if __name__ == "__main__":
    generate_embeddings_and_index()
