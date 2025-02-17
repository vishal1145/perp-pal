import fitz
from app.services.text_processing_service import TextProcessor
from utils.deep_seek_api import DeepSeekAPI

class PDFProcessor:
    def __init__(self):
        self.text_processor = TextProcessor()
        self.deepseek_api = DeepSeekAPI()

    def extract_text(self, pdf_path, page_start, page_end):
        text = ""
        try:
            with fitz.open(pdf_path) as pdf:
                for page_num in range(page_start - 1, page_end):
                    page_text = pdf[page_num].get_text()
                    if page_text:
                        text += page_text
        except Exception as e:
            print(f"Error extracting text from PDF: {e}")
        return self.text_processor.clean_text(text)

    def generate_notes(self, pdf_path, offset_start, table_of_contents):
        if not table_of_contents.get("table_of_contents"):
            return []

        chapters = []
        for chapter in table_of_contents["table_of_contents"]:
            chapter_name = chapter.get("title")
            chapter_start = chapter.get("page_start") + offset_start
            chapter_end = chapter.get("page_end") + offset_start

            chapter_notes = {
                "chapter_name": chapter_name,
                "topics": [],
            }

            for topic in chapter.get("subtopics", []):
                topic_name = topic.get("name")
                topic_start = topic.get("page_start") + offset_start
                topic_end = topic.get("page_end") + offset_start

                topic_text = self.extract_text(pdf_path, topic_start, topic_end)
                topic_summary = self.text_processor.summarize_text(topic_text)

                if topic_text:
                        summarized_text = self.text_processor.summarize_text(topic_text)
                        api_response = self.deepseek_api.query_api(summarized_text)

                        chapter_notes["topics"].append({
                            "topic_name": topic_name,
                            "topic_notes": api_response.get("message", {}).get("content"),
                        })
                else:
                    chapter_notes["topics"].append({
                        "topic_name": topic_name,
                        "topic_notes": "No relevant content found for this topic.",
                    })

            chapters.append(chapter_notes)

        return chapters
