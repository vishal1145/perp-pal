import warnings
warnings.filterwarnings("ignore")
import os
import pytest
import pandas as pd
from app.services.refactor_json_service import Refactor_JSON
from utils.config import UNPROCESSED_FILES_DIR


def test_missing_required_columns_for_multiple_files():
    for file_name in os.listdir(UNPROCESSED_FILES_DIR):
        if file_name.endswith(".json"):
            file_path = os.path.join(UNPROCESSED_FILES_DIR, file_name)
            
            try:
                df = pd.read_json(file_path)

                required_columns = ["subject", "topic", "chapter"]
                missing_columns = [col for col in required_columns if col not in df.columns]
                
                if missing_columns:
                    raise ValueError(f"Missing required columns {', '.join(missing_columns)} in file {file_name}")
                
                result = Refactor_JSON.check_and_refactor(file_path)
                assert result is not None
            except ValueError as e:
                print(f"Error in file {file_name}: {e}")
            except Exception as e:
                assert "Missing required columns" in str(e) or "Invalid JSON" in str(e) 
