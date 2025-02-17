import re
from app.services.summarization_service import Summarizer

class TextProcessor:
    def __init__(self):
        self.summarizer = Summarizer()
    
    def clean_text(self, text):
        if not text:
            return ""
        text = re.sub(r'\n+', ' ', text)
        text = re.sub(r'\s+', ' ', text).strip()
        return text

    def segment_text(self, text):
        if not text:
            return []

        sentences = text.split(". ")
        segments = []
        temp_segment = ""

        for sentence in sentences:
            temp_segment += sentence + ". "
            if len(temp_segment) > 300:
                segments.append(temp_segment.strip())
                temp_segment = ""

        if temp_segment:
            segments.append(temp_segment.strip())

        return segments

    def summarize_text(self, text):
        if not text:
            return ""

        segments = self.segment_text(text)
        summarized_segments = [self.summarizer.summarize(segment) for segment in segments]
        return " ".join(summarized_segments)
