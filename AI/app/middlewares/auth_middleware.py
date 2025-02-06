import requests
from flask import request, jsonify
import os

AUTH_API_URL = os.getenv("AUTH_API_URL")

def is_authorized():
    if not (token := request.headers.get("Authorization")):
        return jsonify({"error": "Unauthorized user"}), 403

    try:
        response = requests.get(AUTH_API_URL,headers={
        "Authorization": token
    })
        if response.status_code == 200 and response.json().get("success"):
            return None 
        
        return jsonify({"error": "Unauthorized user"}),

    except Exception as e:
        return jsonify({"error": "Authorization check failed"}), 403
