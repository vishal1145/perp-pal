import requests
from flask import request, jsonify
import os

AUTH_API_URL = os.getenv("AUTH_API_URL")

def authorization_required():
    if not (token := request.headers.get("Authorization")):
        return jsonify({"error": "Unauthorized user"}), 403

    try:
        response = requests.get(AUTH_API_URL,headers={
        "Authorization": token
    })
        if response.status_code == 200:
            data = response.json()
        
            if data.get("success") and data.get("user"):
                return None
            else:
                return jsonify({"error": "Unauthorized user"}), 403
        else:
            return jsonify({"error": "Authorization service error"}), 403
    except Exception as e:
        return jsonify({"error": "Authorization check failed"}), 403
