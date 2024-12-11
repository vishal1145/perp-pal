from flask import Blueprint, request
from app.recommendations.data_loader import load_data, add_interaction
from app.recommendations.recommender import build_cooccurrence_matrix, recommend_next_topic

suggestion_api = Blueprint("suggestion_api", __name__)

questions, interactions = load_data()
cooccurrence_matrix = build_cooccurrence_matrix(interactions)

@suggestion_api.route("/recommend", methods=['GET'])
def get_recommendation():
    global cooccurrence_matrix
    current_topic = request.args.get("current_topic")
    top_n = int(request.args.get("top_n", 1))
    
    if not current_topic:
        return {"error": "current_topic is required"}, 400

    recommendations = recommend_next_topic(cooccurrence_matrix, current_topic, top_n)
    return {"current_topic": current_topic, "recommendations": recommendations}

@suggestion_api.route("/add_interaction", methods=['POST'])
def post_interaction():
    global cooccurrence_matrix, interactions
    data = request.get_json() 
    user_id = data.get("user_id")
    current_topic = data.get("current_topic")
    next_topic = data.get("next_topic")
    
    if not all([user_id, current_topic, next_topic]):
        return {"error": "user_id, current_topic, and next_topic are required"}, 400
    
    add_interaction(user_id, current_topic, next_topic)
    questions, interactions = load_data()
    cooccurrence_matrix = build_cooccurrence_matrix(interactions)
    return {"message": "Interaction added & co-occurrence matrix Updated."}
