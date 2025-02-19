import fitz
import pytesseract
from PIL import Image
from io import BytesIO
from transformers import BlipProcessor, BlipForConditionalGeneration
from app.services.text_processing_service import TextProcessor
from utils.deep_seek_api import DeepSeekAPI
from utils.cloudinary_config import upload_to_cloudinary

class PDFProcessor:
    def __init__(self):
        self.text_processor = TextProcessor()
        self.deepseek_api = DeepSeekAPI()
        self.blip_processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
        self.blip_model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

    def extract_text_and_images(self, pdf_path, topic_start, topic_end):
        text = ""
        images = []
        
        with fitz.open(pdf_path) as pdf:
            for page_num in range(topic_start - 1, topic_end):
                page = pdf[page_num]

                page_text = page.get_text()
                if page_text:
                    text += page_text + "\n"

                for img_index, img in enumerate(page.get_images(full=True)):
                    xref = img[0]
                    image_bytes = pdf.extract_image(xref)["image"]
                    image = Image.open(BytesIO(image_bytes)).convert("RGB")

                    image_caption = self.process_image_for_notes(image)

                    cloudinary_url = upload_to_cloudinary(image)

                    if cloudinary_url:
                        images.append({
                            "image_url": cloudinary_url,
                            "caption": image_caption
                        })

        return text, images

    def process_image_for_notes(self, image):
        ocr_text = pytesseract.image_to_string(image).strip()

        if ocr_text:
            return f"OCR Extracted Text: {ocr_text}"

        inputs = self.blip_processor(images=image, return_tensors="pt")
        out = self.blip_model.generate(**inputs)
        caption = self.blip_processor.decode(out[0], skip_special_tokens=True)

        return f"AI Image Description: {caption}"

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

                topic_text, topic_images = self.extract_text_and_images(pdf_path, topic_start, topic_end)

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
