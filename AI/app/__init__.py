from flask import Flask
from data.training.train import Automatic_train_Model
from watchdog.observers import Observer
from utils.config import UNPROCESSED_FILES_DIR
from data.training.customize_spacy_train import Custom_Train_Spacy_Model
import os
import atexit
from data.training.customize_spacy_train import Custom_Train_Spacy_Model
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()
spacy_trainer = Custom_Train_Spacy_Model()
event_handler = Automatic_train_Model()

def initialize_app():
    app = Flask(__name__)
    allowed_origins = os.getenv("ALLOWED_ORIGINS", "https://preppal.club").split(",")
    CORS(app, resources={r"/*": {"origins": allowed_origins}})

    from app.routes.questions import api
    app.register_blueprint(api, url_prefix="/")

    spacy_trainer.train()
    path_to_watch = os.path.dirname(UNPROCESSED_FILES_DIR)
    
    observer = Observer()
    observer.schedule(event_handler, path=path_to_watch, recursive=False)
    observer.start()
    
    print(f"Monitoring directory: {UNPROCESSED_FILES_DIR} for new or modified JSON files...")

    atexit.register(observer.stop)
    atexit.register(observer.join)
    
    return app
