import re
import fitz
from transformers import pipeline
from app.services.summarization_service import Summarizer

class TextProcessor:
    def __init__(self):
        self.summarizer = Summarizer()
    
    def clean_text(self, text):
        text = re.sub(r'\n+', ' ', text) 
        text = re.sub(r'\s+', ' ', text).strip()
        return text

    def segment_text(self, text):
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
        segments = self.segment_text(text)
        summarized_segments = [self.summarizer.summarize(segment) for segment in segments]
        return " ".join(summarized_segments)

class PDFProcessor:
    def __init__(self):
        self.text_processor = TextProcessor()

    def extract_text(self, pdf_path, page_start, page_end):
        text = ""
        with fitz.open(pdf_path) as pdf:
            for page_num in range(page_start - 1, page_end):
                text += pdf[page_num].get_text()
        return self.text_processor.clean_text(text)

    def generate_notes(self, pdf_path, offset_start, table_of_contents):
        chapters = []

        for chapter in table_of_contents["table_of_contents"]:
            chapter_name = chapter["title"]
            chapter_start = chapter["page_start"] + offset_start
            chapter_end = chapter["page_end"] + offset_start

            chapter_notes = {
                "chapter_name": chapter_name,
                "summary": self.text_processor.summarize_text(
                    self.extract_text(pdf_path, chapter_start, chapter_end)
                ),
                "topics": [],
            }

            for topic in chapter["subtopics"]:
                topic_name = topic["name"]
                topic_start = topic["page_start"] + offset_start
                topic_end = topic["page_end"] + offset_start

                topic_text = self.extract_text(pdf_path, topic_start, topic_end)
                topic_summary = self.text_processor.summarize_text(topic_text)

                chapter_notes["topics"].append({
                    "topic_name": topic_name,
                    "topic_notes": topic_summary
                })

            chapters.append(chapter_notes)

        return chapters
