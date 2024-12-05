import os
import spacy
from spellchecker import SpellChecker
from dotenv import load_dotenv

class Refine_Prompt:
    def __init__(self):
        load_dotenv()

        model_name = os.getenv("SPACY_MODEL", "en")
        try:
            self.nlp = spacy.load(model_name)
            print(f"Model '{model_name}' loaded successfully.")
        except OSError:
            print(f"Model '{model_name}' not found. Downloading...")
            spacy.cli.download(model_name)
            self.nlp = spacy.load(model_name)
            print(f"Model '{model_name}' downloaded and loaded successfully.")
        self.spell = SpellChecker()
    
    def correct_prompt(self, prompt: str) -> str:
        doc = self.nlp(prompt)
        
        corrected_words = []
        
        for token in doc:
            if not token.is_stop and not token.is_punct:
                corrected_word = self.spell.correction(token.text)
                corrected_words.append(corrected_word)
            else:
                corrected_words.append(token.text)
    
        refined_prompt = " ".join(corrected_words)
        
        return refined_prompt

