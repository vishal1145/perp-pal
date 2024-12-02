import warnings
warnings.filterwarnings("ignore")
import pandas as pd
from app.services.refactor_json_service import Refactor_JSON
from utils.config import UNPROCESSED_FILES_DIR, PROCESSED_FILES_DIR
import os
from data.training.train import generate_embeddings_and_index

def test_generate_embeddings_with_required_parameters():
    sample_data = [
        {
        "subject": "Math",
        "topic": "Algebra",
        "difficulty": "Easy",
        "questionType": "Multiple Choice",
        "chapter": "Algebra and Statatics",
        "_id":1
    }
    ]
    temp_file_path = os.path.join(UNPROCESSED_FILES_DIR, "test_sample.json")
    df = pd.DataFrame(sample_data)
    df.to_json(temp_file_path, orient='records')
    
    processed_file = Refactor_JSON.check_and_refactor(temp_file_path)
    
    assert os.path.exists(processed_file), f"Processed file {processed_file} should exist"
    
    generate_embeddings_and_index(processed_file)
    
    embeddings_file = os.path.join(PROCESSED_FILES_DIR, "test_sample_processed.json")
    assert os.path.exists(embeddings_file), f"Embeddings file {embeddings_file} should exist"
    
    os.remove(temp_file_path)
    os.remove(processed_file)

def test_generate_embeddings_without_required_parameters():
    sample_data = [
        {
        "subject": "null",
        "topic": "null",
        "chapter": "null",
        "difficulty": "Easy",
        "questionType": "Multiple Choice",
        "_id": 1
    }
    ]

    temp_file_path = os.path.join(UNPROCESSED_FILES_DIR, "test_no_params.json")
    df = pd.DataFrame(sample_data)
    df.to_json(temp_file_path, orient='records')
    

    processed_file = Refactor_JSON.check_and_refactor(temp_file_path)
    assert os.path.exists(processed_file), f"Processed file {processed_file} should exist"
    
    try:
        embeddings_skipped = generate_embeddings_and_index(processed_file)
        if embeddings_skipped is False:
            assert True, "Embeddings were skipped due to missing required parameters"
        else:
            assert False, "Embeddings should have been skipped"
        
    except Exception as e:
        assert "Skipping embedding generation for" in str(e), f"Unexpected error message: {str(e)}"

    os.remove(temp_file_path)
    os.remove(processed_file)