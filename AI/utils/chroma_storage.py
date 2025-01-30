import os
import chromadb
from chromadb.config import Settings
import sqlite3

class ChromaStorage:
    def __init__(self, persist_directory="data/chroma"):
        self.db_path = f"{persist_directory}/chromadb.db"
        
        if not os.path.exists(self.db_path):
            print(f"Database not found at {self.db_path}. Initializing a new one.")
        
        try:
            self.client = chromadb.Client(Settings(persist_directory=persist_directory))
            self.collection = self.client.get_or_create_collection(name="notes")
        except sqlite3.OperationalError as e:
            if "no such table: collections" in str(e):
                print("Collections table missing. Recreating the database...")
                os.remove(self.db_path)
                self.client = chromadb.Client(Settings(persist_directory=persist_directory))
                self.collection = self.client.get_or_create_collection(name="notes")
            else:
                raise e

    def add_entry(self, request_id, status, file_path, document=""):
        
        print(request_id,status,file_path)
        try:
            result=self.collection.add(
                ids=[request_id],
                metadatas=[{"status": status, "file_path": file_path}],
                documents=[document],
            )
            print("entry",result)
        except Exception as e:
            print(f"Error adding entry for {request_id}: {e}")
            raise

    def update_entry(self, request_id, status, notes_path=None):
        try:
            metadata = {"status": status}
            if notes_path:
                metadata["notes_path"] = notes_path

            self.collection.update(
                ids=[request_id],
                metadatas=[metadata],
            )
        except Exception as e:
            print(f"Error updating entry for {request_id}: {e}")
            raise

    def get_entry(self, request_id):
        try:
            results = self.collection.get(ids=[request_id])
            return results if results else None
        except Exception as e:
            print(f"Error retrieving entry for {request_id}: {e}")
            return None

    def delete_entry(self, request_id):
        try:
            self.collection.delete(ids=[request_id])
        except Exception as e:
            print(f"Error deleting entry for {request_id}: {e}")
            raise
