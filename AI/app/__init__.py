from flask import Flask
from data.training.train import Automatic_train_Model
from watchdog.observers import Observer
from utils.config import DATA_FILE
import os

def initialize_app():
    app = Flask(__name__)

    from app.routes.questions import api
    app.register_blueprint(api, url_prefix="/")
    
    path_to_watch = os.path.dirname(DATA_FILE)
    event_handler = Automatic_train_Model()
    observer = Observer()
    observer.schedule(event_handler, path=path_to_watch, recursive=False)
    observer.start()
    
    return app
