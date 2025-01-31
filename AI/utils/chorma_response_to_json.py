from typing import List, Dict
from pathlib import Path

class ChromaResponseToJson:
    def __init__(self, records: Dict):
        self.records = records

    def format_single_record(self, index: int) -> Dict:
        metadata = self.records["metadatas"][index]
        table_of_contents_metadata = self.records["documents"][index]
        request_id = self.records["ids"][index]

        return {
            "request_id": request_id,
            "notes__path": metadata.get("notes_path", ''),
            "status": metadata.get("status", "pending"),
            "title": Path(metadata.get('file_path')).name,
            "upload_pdf_path": metadata.get('file_path', ''),
            "table_of_contents": table_of_contents_metadata
        }

    def format_multiple_records(self) -> List[Dict]:
        formatted_records = []
        for i in range(len(self.records["ids"])):
            formatted_records.append(self.format_single_record(i))
        return formatted_records