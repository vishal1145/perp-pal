from PyPDF2 import PdfReader
import re

def extract_text_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return clean_text(text)

def clean_text(text):
    text = re.sub(r'\d+\s+', '', text)
    text = re.sub(r'[^a-zA-Z0-9\s.,]', '', text)
    return text
