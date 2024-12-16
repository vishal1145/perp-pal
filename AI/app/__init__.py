from flask import Flask
from data.training.train import Automatic_train_Model
from watchdog.observers import Observer
from utils.config import UNPROCESSED_FILES_DIR,PDF_PATH
from data.training.customize_spacy_train import Custom_Train_Spacy_Model
import os
import atexit
from data.training.customize_spacy_train import Custom_Train_Spacy_Model
# from app.routes.questions import question_api
# from app.routes.new_suggestion import suggestion_api
from app.pdf_processor.data_preparation import prepare_training_data
from app.pdf_processor.pdf_processor import extract_text_from_pdf,clean_text
from app.pdf_processor.model_training import accuracy_score,train_model,train_test_split
from app.pdf_processor.topic_extractor import segment_text_into_topics
spacy_trainer = Custom_Train_Spacy_Model()
event_handler = Automatic_train_Model()

def initialize_app():
    app = Flask(__name__)

    from app.routes.questions import api
    app.register_blueprint(api, url_prefix="/")

    spacy_trainer.train()
    
    pdf_path =PDF_PATH
    
    if not os.path.exists(pdf_path):
        print(f"PDF file not found at {pdf_path}")
        return
    
    text = extract_text_from_pdf(pdf_path)
    
    topic_dict = segment_text_into_topics(text)
    
    training_data = prepare_training_data(topic_dict)
    
    model, vectorizer = train_model(training_data)
    
    sample = "Nomenclature of Haloalkanes and Haloarenes"
    sample_vectorized = vectorizer.transform([sample])
    next_topic = model.predict(sample_vectorized)
    print(f"Given Current Topic: {sample}")
    print(f"Predicted Next Topic: {next_topic[0]}")

    print("\nTraining Data Sample:")
    print(training_data[:5])
    
    path_to_watch = os.path.dirname(UNPROCESSED_FILES_DIR)
    
    observer = Observer()
    observer.schedule(event_handler, path=path_to_watch, recursive=False)
    observer.start()
    
    print(f"Monitoring directory: {UNPROCESSED_FILES_DIR} for new or modified JSON files...")

    atexit.register(observer.stop)
    atexit.register(observer.join)
    
    return app
