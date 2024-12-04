from flask import Blueprint, request, jsonify

from app.services.questions_ids_list_service import QuestionIdsListService
from app.services.refine_prompt import Refine_Prompt
from data.training.customize_spacy_train import Custom_Train_Spacy_Model

api = Blueprint("api", __name__)
@api.route('/get_questions', methods=['POST'])
def get_questions_route():
    data = request.json
    prompt = data.get("prompt", "")
    
    if not prompt:
        return jsonify({"error": "Prompt cannot be empty"}), 500
    
    trainer = Custom_Train_Spacy_Model()
    refine_prompt = Refine_Prompt()
    try:
        is_correct_prompt = trainer.predict(prompt)
        print(is_correct_prompt)
        refined_prompt=refine_prompt.correct_prompt(is_correct_prompt)
        print(refined_prompt)
        question_ids_service = QuestionIdsListService(refined_prompt)
        question_info = question_ids_service.get_question_ids()

        return jsonify({"questions_ids": question_ids["results"],
                        "totalQuestions":question_ids["question_count"],
                        "metadata":question_ids["metadata"]})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
