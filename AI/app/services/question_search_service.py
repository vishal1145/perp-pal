import pandas as pd
from utils.config import METADATA_FILE
from data.training.train import generate_embeddings_and_index
from utils.initialize_ChromaDb import ChromaDBInitializer
import os

collection = None
_model = ChromaDBInitializer.get_model()

def _initialize_index_and_metadata():
    global collection

    collection = ChromaDBInitializer.get_or_create_collection("questions")
    print("ChromaDB collection initialized.")

    if not os.path.exists(METADATA_FILE):
        print("Metadata file not found. Generating embeddings and creating index...")
        generate_embeddings_and_index()

    print("Loading metadata...")
    _df = pd.read_pickle(METADATA_FILE)
    return _df

_df = _initialize_index_and_metadata()

def query_embedding(prompt):
    return _model.encode(prompt)

def search_questions(prompt_embedding, top_k):
    if collection is None:
        raise ValueError("ChromaDB collection not initialized.")

    results = collection.query(
        query_embeddings=[prompt_embedding],
        n_results=top_k
    )
    
    result_metadata = results['metadatas'][0]
    results_df = pd.DataFrame(result_metadata)
    return results_df
