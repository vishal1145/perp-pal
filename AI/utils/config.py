import os
from dotenv import load_dotenv
import numpy as np

load_dotenv()

GROQ_API_KEY =os.getenv("GROQ_API_KEY")
DATA_FILE = "data/questions.json"
DATA_FILES="data/questions/"
CHROMA_DB_DIR = "data/chroma_db"
METADATA_FILE = "data/questions_with_metadata.pkl"
MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
MAX_BATCH_SIZE = 1000
