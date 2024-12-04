from flask import Blueprint, request, jsonify
from app.services.questions_ids_list_service import QuestionIdsListService
from app.services.refine_prompt import Refine_Prompt

api = Blueprint("api", __name__)
@api.route('/get_questions', methods=['POST'])
def get_questions_route():
    data = request.json
    prompt = data.get("prompt", "")
    
    if not prompt:
        return jsonify({"error": "Prompt cannot be empty"}), 500
    
    refine_prompt = Refine_Prompt()
    try:
        refined_prompt=refine_prompt.correct_prompt(prompt)
        print(refined_prompt)
        question_ids_service = QuestionIdsListService(refined_prompt)
        question_info = question_ids_service.get_question_ids()

        return jsonify({"questions_ids": question_info["results"],
                        "totalQuestions":question_info["question_count"],
                        "metadata":question_info["metadata"]})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
