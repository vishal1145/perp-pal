import fitz
from app.services.summarization_service import Summarizer

class PDFProcessor:
    def __init__(self):
        self.summarizer = Summarizer()

    def extract_text(self, pdf_path, page_start, page_end):
        text = ""
        with fitz.open(pdf_path) as pdf:
            for page_num in range(page_start - 1, page_end):
                text += pdf[page_num].get_text()
        return text

    def generate_notes(self, pdf_path, offset_start, table_of_contents):
        notes = {}

        for chapter in table_of_contents["table_of_contents"]:
            chapter_name = chapter["title"]
            chapter_start = chapter["page_start"] + offset_start
            chapter_end = chapter["page_end"] + offset_start

            chapter_notes = {
                "chapter_name": chapter_name,
                "summary": f"Summary of content from pages {chapter_start} to {chapter_end}.",
                "topics": [],
            }

            for topic in chapter["subtopics"]:
                topic_name = topic["name"]
                topic_start = topic["page_start"] + offset_start
                topic_end = topic["page_end"] + offset_start

                topic_text = self.extract_text(pdf_path, topic_start, topic_end)
                topic_summary = self.summarizer.summarize(topic_text)

                chapter_notes["topics"].append({
                    "name": topic_name,
                    "content_highlights": topic_summary
                })

            notes[chapter_name] = chapter_notes

        return notes
