import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY =os.getenv("GROQ_API_KEY")
PROCESSED_FILES_DIR="data/processed_questions/"
UNPROCESSED_FILES_DIR="data/unprocessed_questions"
CHROMA_DB_DIR = "data/chroma_db"
NOTES_CHROMA_DIR="data/chroma"
SPACY_CUSTOM_TRAINED_DIR="data/spacy_custom_trained"
SPACY_CUSTOM_MODEL_NAME="custom_spacy_model"
ABBREVIATION_DATA_DIR="data/abbreviation_data"
MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
MAX_BATCH_SIZE = 100
class Config:
    UPLOAD_FOLDER = os.path.join("data", "uploads")
    NOTES_FOLDER = os.path.join("data", "notes")
    CHROMA_FOLDER = os.path.join("data", "chroma")
