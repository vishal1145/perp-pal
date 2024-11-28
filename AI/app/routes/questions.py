from flask import Blueprint, request, jsonify
from app.services.question_search_service import query_embedding, search_questions
from app.LLMHelper import LLMHelper
import json

api = Blueprint("api", __name__)
llmhelper = LLMHelper()
@api.route('/get_questions', methods=['POST'])
def get_questions_route():
    data = request.json
    prompt = data.get("prompt", "")
    try:
        extracted_values = llmhelper.extract_information(prompt)
        
        if isinstance(extracted_values, str):
            try:
                extracted_values = json.loads(extracted_values)
                print("Extracted values (parsed):", extracted_values)
            except json.JSONDecodeError as e:
                print(f"Error parsing JSON: {e}")
                return jsonify({"error": "Invalid JSON"}), 400
        
        all_results=[]
        for item in extracted_values:
            item = {k.lower(): v for k, v in item.items()}
            subject = item.get('subject', '')
            topic = item.get('topic', '')
            difficulty = item.get('difficulty', 'Easy')
            number_of_questions = item.get('numberofquestions', 20)

            combined_prompt = f"{subject} {topic} {difficulty}".strip()
            print(combined_prompt)

            if subject or topic:
                prompt_embedding = query_embedding(combined_prompt)
                results = search_questions(prompt_embedding, top_k=number_of_questions)
                all_results.extend(results.to_dict(orient="records"))
            else:
                 print("Skipping due to missing subject or topic for:", item)
            
        return jsonify({"questions": all_results})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
