from flask import Flask, request
from flask_cors import CORS
from dotenv import load_dotenv
from app.routes.notes import Routes
from app.routes.questions import api
from utils.config import Config
import os
import atexit

from data.training.train import Automatic_train_Model
from watchdog.observers import Observer
from utils.config import UNPROCESSED_FILES_DIR
from data.training.customize_spacy_train import Custom_Train_Spacy_Model

load_dotenv()
spacy_trainer = Custom_Train_Spacy_Model()
event_handler = Automatic_train_Model()

def initialize_app():
    app = Flask(__name__)
    
    allowed_origins = os.getenv("ALLOWED_ORIGINS", "https://preppal.club").split(",")
    CORS(app, resources={r"/*": {"origins": allowed_origins}})

    @app.before_request
    def handle_preflight():
        if request.method == 'OPTIONS':
            return '', 200 

    app.register_blueprint(Routes.blueprint)
    app.register_blueprint(api, url_prefix="/")

    _initialize_folders()

    spacy_trainer.train()

    path_to_watch = os.path.dirname(UNPROCESSED_FILES_DIR)
    observer = Observer()
    observer.schedule(event_handler, path=path_to_watch, recursive=False)
    observer.start()

    print(f"Monitoring directory: {UNPROCESSED_FILES_DIR} for new or modified JSON files...")

    atexit.register(observer.stop)
    atexit.register(observer.join)

    return app

def _initialize_folders():
    folders = [Config.UPLOAD_FOLDER, Config.NOTES_FOLDER, Config.CHROMA_FOLDER]
    for folder in folders:
        os.makedirs(folder, exist_ok=True)
