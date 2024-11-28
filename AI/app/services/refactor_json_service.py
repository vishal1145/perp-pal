import os
import pandas as pd
from utils.config import UNPROCESSED_FILES_DIR, PROCESSED_FILES_DIR

class Refactor_JSON:
    def __init__(self, input_file):
        self.input_file = input_file
        self.output_file = self._get_output_file_name()

    def _get_output_file_name(self):
        file_name = os.path.basename(self.input_file)
        return os.path.join(PROCESSED_FILES_DIR, file_name.replace('.json', '_processed.json'))

    def file_already_processed(self):
        return os.path.exists(self.output_file)

    @staticmethod
    def check_and_refactor(file_path=None):
        if file_path:
            refactorer = Refactor_JSON(file_path)
            if not refactorer.file_already_processed():
                print(f"Processing file: {file_path}")
                return refactorer.refactor()
            else:
                print(f"File already processed: {file_path}")
                return refactorer.output_file
        else:
            for file_name in os.listdir(UNPROCESSED_FILES_DIR):
                if file_name.endswith(".json"):
                    file_path = os.path.join(UNPROCESSED_FILES_DIR, file_name)
                    processed_file_path = os.path.join(PROCESSED_FILES_DIR, file_name.replace(".json", "_processed.json"))
                    
                    if not os.path.exists(processed_file_path):
                        print(f"Processing unprocessed file: {file_name}")
                        refactorer = Refactor_JSON(file_path)
                        refactorer.refactor()
                    else:
                        print(f"Skipping file as it has already been processed: {file_name}")

    def refactor(self):
        if self.file_already_processed():
            print(f"Processed file already exists: {self.output_file}")
            return self.output_file

        print(f"Processing file: {self.input_file} to create processed JSON.")
        try:
            df = pd.read_json(self.input_file)
            
            df = df[df['subject'].notna() & df['topic'].notna() & df['chapter'].notna()]
            
            parameters_to_keep = ["_id",  "questionType", "difficulty", "subject", "chapter", "topic"]

            df = df.apply(lambda col: col if col.name in parameters_to_keep else "null", axis=0)

            filtered_df = df[parameters_to_keep]
            filtered_df.to_json(self.output_file, orient="records", indent=2)
            print(f"Processed JSON created at: {self.output_file}")
            return self.output_file
        except Exception as e:
            print(f"Error processing file {self.input_file}: {e}")
            return None
 