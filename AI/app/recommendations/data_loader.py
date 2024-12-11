import pandas as pd

QUESTIONS_PATH = 'data/processed_questions/test_question.json'
INTERACTIONS_PATH = 'data/interactions/interactions.json'

def load_data():
    questions = pd.read_json(QUESTIONS_PATH)
    interactions = pd.read_json(INTERACTIONS_PATH)
    return questions, interactions

def add_interaction(user_id, current_topic, next_topic):
    new_data = {"user_id": user_id, "current_topic": current_topic, "next_topic": next_topic}
    
    interactions = pd.read_json(INTERACTIONS_PATH)
    new_data_df = pd.DataFrame([new_data])
    # interactions = interactions.append(new_data, ignore_index=True)
    interactions = pd.concat([interactions, new_data_df], ignore_index=True)
    interactions.to_json(INTERACTIONS_PATH, orient='records', indent=4)
    
    print(f"Interaction added: {new_data}")
