import os
from utils.config import UNPROCESSED_FILES_DIR
from data.training.train import generate_embeddings_and_index

class Common_Service:
    
    @classmethod
    def iterate_for_questions(cls):
        for file_name in os.listdir(UNPROCESSED_FILES_DIR):
                if file_name.endswith(".json"):
                    file_path = os.path.join(UNPROCESSED_FILES_DIR, file_name)
                    generate_embeddings_and_index(file_path)
                    

    
    