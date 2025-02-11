import threading
import uuid
import json,os
from utils.chroma_storage import ChromaStorage
from app.services.pdf_processing_service import PDFProcessor
from utils.config import Config


class NotesService:
    def __init__(self):
        self.db = ChromaStorage(persist_directory=Config.CHROMA_FOLDER)

    def start_processing(self, file_path, offset_start, table_of_contents,reference_context):
        request_id = str(uuid.uuid4())
        print(f"Adding entry with request_id={request_id}, file_path={file_path}")
        result=self.db.add_entry(
            request_id=request_id,
            status="processing",
            file_path=file_path,
            reference_context=reference_context,
            document=json.dumps({
                "table_of_contents": table_of_contents,
            }),
        )

        threading.Thread(
            target=self._process_pdf,
            args=(request_id, file_path, offset_start, table_of_contents),
        ).start()

        return request_id

    def _process_pdf(self, request_id, file_path, offset_start, table_of_contents):
        try:
            if not os.path.exists(file_path):
                return

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


        except FileNotFoundError as e:
            print(f"FileNotFoundError: The file was deleted or not found during processing: {file_path}.")
        except Exception as e:
            print(f"An error occurred during note generation for request_id={request_id}: {e}")
        finally:
            entry = self.db.get_entry(request_id)
            metadata = entry['metadatas'][0]
            status = metadata.get('status')
            if status and status == "completed":
                print(f"Processing completed successfully for request_id={request_id}.")
            else:
                print(f"Processing failed for request_id={request_id}.")