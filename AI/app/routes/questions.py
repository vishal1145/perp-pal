from flask import Blueprint, request, jsonify

from app.services.questions_ids_list_service import QuestionIdsListService

api = Blueprint("api", __name__)
@api.route('/get_questions', methods=['POST'])
def get_questions_route():
    data = request.json
    prompt = data.get("prompt", "")
    
    if not prompt:
        return jsonify({"error": "Prompt cannot be empty"}), 500
    
    try:
        question_ids_service = QuestionIdsListService(prompt)
        question_ids = question_ids_service.get_question_ids()

        return jsonify({"questions_ids": question_ids})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
