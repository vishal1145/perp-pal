import fitz
import openai
from app.services.summarization_service import Summarizer

class PDFProcessor:
    def __init__(self):
        self.summarizer = Summarizer()
        self.deepseek_client = openai.OpenAI(api_key="sk-df0d96acc6594dad886d363e580650b8", base_url="https://api.deepseek.com")

    def extract_text(self, pdf_path, page_start, page_end):
        text = ""
        with fitz.open(pdf_path) as pdf:
            for page_num in range(page_start - 1, page_end):
                text += pdf[page_num].get_text()
        return text

    def refine_notes(self, raw_notes):
        response = self.deepseek_client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": "You are a strict academic assistant. Remove non-academic content and refine the text."},
                {"role": "user", "content": f"Refine these notes:\n\n{raw_notes}"},
            ],
            stream=False
        )
        return response.choices[0].message.content

    def generate_notes(self, pdf_path, offset_start, table_of_contents):
        chapters = []

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
                
                # refined_summary = self.refine_notes(topic_summary)

                chapter_notes["topics"].append({
                    "topic_name": topic_name,
                    "topic_notes":  topic_text
                })

            chapters.append(chapter_notes)


        return chapters
