from app.services.question_search_service import query_embedding, search_questions
from app.LLMHelper import LLMHelper
from flask import jsonify
import json

class QuestionIdsListService:
     def __init__(self, prompt: str):
        self.prompt = prompt
        
     def get_question_ids(self):
        try:
            llmhelper = LLMHelper()
            extracted_values = llmhelper.extract_information(self.prompt)
        
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
                chapter=item.get('chapter','')
                difficulty = item.get('difficulty', 'Easy')
                questionType=item.get('QuestionType','Multiple Choice')
                number_of_questions = item.get('numberofquestions', 20)

                combined_prompt = f"{subject} {topic} {chapter} {difficulty} {questionType}".strip()
                print(combined_prompt)

                if subject or topic or chapter:
                    prompt_embedding = query_embedding(combined_prompt)
                    results = search_questions(prompt_embedding, top_k=number_of_questions)
                    all_results.extend(results[['_id']].to_dict(orient="records"))
                else:
                    print("Skipping due to missing subject or topic for:", item)
                    
            return all_results
    
        except Exception as e:
                raise Exception(f"Error processing the prompt for question IDs: {str(e)}")