import threading
import uuid
import json
from utils.chroma_storage import ChromaStorage
from app.services.pdf_processing_service import PDFProcessor
from utils.config import Config


class NotesService:
    def __init__(self):
        self.db = ChromaStorage(persist_directory=Config.CHROMA_FOLDER)

    def start_processing(self, file_path, offset_start, table_of_contents):
        request_id = str(uuid.uuid4())
        print(f"Adding entry with request_id={request_id}, file_path={file_path}")
        result=self.db.add_entry(
            request_id=request_id,
            status="processing",
            file_path=file_path,
            document=json.dumps(table_of_contents),
        )

        threading.Thread(
            target=self._process_pdf,
            args=(request_id, file_path, offset_start, table_of_contents),
        ).start()

        return request_id

    def _process_pdf(self, request_id, file_path, offset_start, table_of_contents):
        processor = PDFProcessor()
        notes = processor.generate_notes(file_path, offset_start, table_of_contents)
        notes_path = f"{Config.NOTES_FOLDER}/{request_id}.json"

        with open(notes_path, "w") as f:
            json.dump(notes, f)

        self.db.update_entry(
            request_id=request_id,
            status="completed",
            notes_path=notes_path,
        )

    def get_status(self, request_id):
        return self.db.get_entry(request_id)
