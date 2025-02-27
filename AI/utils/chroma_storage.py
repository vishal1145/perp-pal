import os
from utils.config import NOTES_CHROMA_DIR
from chromadb.config import Settings
from utils.initialize_ChromaDb import ChromaDBInitializer
class ChromaStorage:
    def __init__(self, persist_directory=NOTES_CHROMA_DIR):
        self.db_path = f"{persist_directory}"
        self.collection = ChromaDBInitializer.get_or_create_collection("notes",persist_directory=persist_directory)
        
        if not os.path.exists(self.db_path):
            print(f"Database not found at {self.db_path}. Initializing a new one.")
        
    def add_entry(self, request_id, status, file_path, reference_context, document=""):
        try:
            self.collection.add(
                ids=[request_id],
                metadatas=[{"status": status, "file_path": file_path, "reference_context": reference_context}],
                documents=[document],
            )
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
            entry = self.collection.get(ids=[request_id])

            if not entry or request_id not in entry['ids']:
                raise ValueError(f"No entry found with request_id {request_id}. Cannot delete.")
            
            metadatas = entry.get('metadatas', [])
            metadata = metadatas[0] if metadatas else {}

            notes_path = metadata.get('notes_path')
            pdf_path = metadata.get('file_path')

            for file_path in filter(None, [notes_path, pdf_path]):
                if os.path.exists(file_path):
                    try:
                        os.remove(file_path)
                        print(f"Deleted file at {file_path}")
                    except Exception as e:
                        print(f"Error deleting file at {file_path}: {e}")
                else:
                    print(f"File at {file_path} does not exist.")

            self.collection.delete(ids=[request_id])

        except Exception as e:
            print(f"Error deleting entry for {request_id}: {e}")
            raise