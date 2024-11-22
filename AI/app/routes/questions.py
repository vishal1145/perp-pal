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
            
        extracted_values = {k.lower(): v for k, v in extracted_values.items()}
        subject = extracted_values.get('subject', '')
        topic = extracted_values.get('topic', '')
        difficulty = extracted_values.get('difficulty', '')
        numberOfQuestion=extracted_values.get('NumberOfQuestion','')
        
        if not difficulty:
            difficulty = "Easy"

        combined_prompt = f"{subject} {topic} {difficulty}"
        print(combined_prompt)
        
        if subject or topic:
            prompt_embedding = query_embedding(combined_prompt)
            results = search_questions(prompt_embedding, top_k=numberOfQuestion or 20)
            return jsonify({"questions": results.to_dict(orient="records")})
        else:
            return jsonify({"error": "Missing required information"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
