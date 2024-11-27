import os
import chromadb
from sentence_transformers import SentenceTransformer
from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction
from utils.config import CHROMA_DB_DIR, MODEL_NAME

class ChromaDBInitializer:
    _chroma_client = None
    _embedding_function = None
    _model = None

    @classmethod
    def get_chroma_client(cls):
        if cls._chroma_client is None:
            cls._chroma_client = chromadb.PersistentClient(path=CHROMA_DB_DIR)
        return cls._chroma_client

    @classmethod
    def get_embedding_function(cls):
        if cls._embedding_function is None:
            cls._embedding_function = SentenceTransformerEmbeddingFunction(model_name=MODEL_NAME)
        return cls._embedding_function

    @classmethod
    def get_model(cls):
        if cls._model is None:
            cls._model = SentenceTransformer(MODEL_NAME)
        return cls._model

    @classmethod
    def get_or_create_collection(cls,collection_name):
        chroma_client = cls.get_chroma_client()
        embedding_function = cls.get_embedding_function()
        return chroma_client.get_or_create_collection(name=collection_name,embedding_function=embedding_function)
