from spacy.language import Language
from spacy.tokens import Doc
from spacy import cli
from pathlib import Path
import sys,spacy,os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from utils.config import SPACY_CUSTOM_TRAINED_DIR,SPACY_CUSTOM_MODEL_NAME,ABBREVIATION_DATA_DIR
from utils.common_Service import Common_Service

common_service=Common_Service()

@Language.component("abbreviation_handler")
def abbreviation_handler(doc):
    abbreviations_data=common_service.load_abbreviation_mappings(ABBREVIATION_DATA_DIR)

    new_tokens = []
    for token in doc:
        new_tokens.append(abbreviations_data.get(token.text.lower(), token.text))
    
    new_doc = Doc(doc.vocab, words=new_tokens)
    return new_doc


class Custom_Train_Spacy_Model:
    def __init__(self, model="en_core_web_sm", new_model_name=SPACY_CUSTOM_MODEL_NAME, output_dir=SPACY_CUSTOM_TRAINED_DIR):
        self.model = model
        self.new_model_name = new_model_name
        self.output_dir = Path(output_dir)
        
        try:
            self.nlp = spacy.load(self.model)
        except OSError:
            cli.download(self.model)
            self.nlp = spacy.load(self.model)
        
        self.nlp.add_pipe("abbreviation_handler", before="ner")
    
    def train(self, n_iter=10):
        optimizer = self.nlp.create_optimizer()
        for i in range(n_iter):
            print(f"Iteration {i + 1} completed.")

        self.save_model()

    def save_model(self):
        self.output_dir.mkdir(exist_ok=True, parents=True)
        self.nlp.to_disk(self.output_dir)
        print(f"Model saved to {self.output_dir}")

    def predict(self, text):
        doc = self.nlp(text)
        refined_text = " ".join([token.text for token in doc])
        return refined_text

