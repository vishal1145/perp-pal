import os
from utils.config import UNPROCESSED_FILES_DIR
from data.training.train import generate_embeddings_and_index
import pandas as pd
class Common_Service:
    
    @classmethod
    def iterate_for_questions(cls):
        for file_name in os.listdir(UNPROCESSED_FILES_DIR):
                if file_name.endswith(".json"):
                    file_path = os.path.join(UNPROCESSED_FILES_DIR, file_name)
                    generate_embeddings_and_index(file_path)
                    

    @staticmethod
    def load_abbreviation_mappings(folder_path):
        mappings = {}
        for file_name in os.listdir(folder_path):
            if file_name.endswith(".json"):
                file_path = os.path.join(folder_path, file_name)
                df = pd.read_json(file_path)
                mappings.update(df.to_dict(orient="index"))
        return mappings

    