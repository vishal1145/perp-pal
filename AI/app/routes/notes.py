import os
import json
from flask import Blueprint, request, jsonify
from app.services.notes_service import NotesService
from utils.config import Config

class Routes:
    blueprint = Blueprint("routes", __name__)

    @staticmethod
    @blueprint.route("/upload", methods=["POST"])
    def upload_pdf():
        if "file" not in request.files:
            return jsonify({"error": "File is required"}), 400

        file = request.files["file"]
        if not file.filename.endswith(".pdf"):
            return jsonify({"error": "Invalid file format. Only PDF files are accepted"}), 400

        offset_start = request.form.get("offset_start", type=int, default=0)
        table_of_contents = request.form.get("table_of_contents")

        if not table_of_contents:
            return jsonify({"error": "'table_of_contents' is required"}), 400

        try:
            table_of_contents = json.loads(table_of_contents)
        except json.JSONDecodeError:
            return jsonify({"error": "Invalid JSON for 'table_of_contents'"}), 400

        file_path = os.path.join(Config.UPLOAD_FOLDER, file.filename)
        file.save(file_path)

        notes_service = NotesService()
        request_id = notes_service.start_processing(file_path, offset_start, table_of_contents)

        return jsonify({"message": "File uploaded successfully", "request_id": request_id}), 202

    @staticmethod
    @blueprint.route("/status/<request_id>", methods=["GET"])
    def check_status(request_id):
        notes_service = NotesService()
        status = notes_service.get_status(request_id)
        if not status:
            return jsonify({"error": "Request ID not found"}), 404
        return jsonify(status)
    

    @staticmethod
    @blueprint.route("/records", methods=["GET"])
    def get_all_records():
        notes_service = NotesService()
        records = notes_service.db.collection.get()
        return jsonify(records), 200

    @staticmethod
    @blueprint.route("/records/<request_id>", methods=["GET"])
    def get_record_by_request_id(request_id):
        notes_service = NotesService()
        record = notes_service.db.get_entry(request_id)
        if not record:
            return jsonify({"error": "Request ID not found"}), 404
        return jsonify(record), 200

    @staticmethod
    @blueprint.route("/records/<request_id>", methods=["DELETE"])
    def delete_record(request_id):
        notes_service = NotesService()
        record = notes_service.db.get_entry(request_id)
        if not record:
            return jsonify({"error": "Request ID not found"}), 404
        
        notes_service.db.delete_entry(request_id)
        return jsonify({"message": "Record deleted successfully"}), 200

