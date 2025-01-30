from transformers import pipeline

class Summarizer:
    def __init__(self):
        self.summarizer = pipeline("summarization", model="t5-small")

    def summarize(self, text, max_length=150):
        return self.summarizer(text, max_length=max_length, truncation=True)[0]["summary_text"]
