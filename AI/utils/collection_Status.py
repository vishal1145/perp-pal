import os
from utils.initialize_ChromaDb import ChromaDBInitializer

class Collection_Status:
    @classmethod
    def collection_status(cls):
        collection =ChromaDBInitializer.get_or_create_collection()
        print("ChromaDB collection initialized.")

        if collection.count() == 0:
            print("No data found in ChromaDB. Generating embeddings and creating index...")
            return False
        else:
            print("Trained data already exists in ChromaDB. Skipping initialization.")
            return True
        
    