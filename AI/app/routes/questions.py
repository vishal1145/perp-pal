from flask import Blueprint, request, jsonify
from app.services.questions_ids_list_service import QuestionIdsListService
from app.services.refine_prompt_service import Refine_Prompt
from data.training.customize_spacy_train import Custom_Train_Spacy_Model


trainer = Custom_Train_Spacy_Model()
refine_prompt = Refine_Prompt()

api = Blueprint("api", __name__)
@api.route('/get_questions', methods=['POST'])
def get_questions_route():
    if request.method == 'OPTIONS':
        return '', 200
    
    data = request.json
    prompt = data.get("prompt", "")
    
    if not prompt:
        return jsonify({"error": "Prompt cannot be empty"}), 500

    try:
        is_correct_prompt = trainer.predict(prompt)
        refined_prompt=refine_prompt.correct_prompt(is_correct_prompt)

        question_ids_service = QuestionIdsListService(refined_prompt)
        question_info = question_ids_service.get_question_ids()

        return jsonify({"questions_ids": question_info["results"],
                        "totalQuestions":question_info["question_count"],
                        "metadata":question_info["metadata"]})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
