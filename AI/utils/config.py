import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY =os.getenv("GROQ_API_KEY")
PROCESSED_FILES_DIR="data/processed_questions/"
UNPROCESSED_FILES_DIR="data/unprocessed_questions"
CHROMA_DB_DIR = "data/chroma_db"
METADATA_FILE = "data/questions_with_metadata.pkl"
MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
MAX_BATCH_SIZE = 1000
