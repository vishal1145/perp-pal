import pandas as pd
from utils.initialize_ChromaDb import ChromaDBInitializer
from utils.collection_Status import Collection_Status
from utils.common_Service import Common_Service
import os

_model = ChromaDBInitializer.get_model()
collection=ChromaDBInitializer.get_or_create_collection()
collectionstatus=Collection_Status.collection_status()

if collectionstatus:
        Common_Service.iterate_for_questions()

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
