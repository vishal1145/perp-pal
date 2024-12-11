import warnings
warnings.filterwarnings("ignore")
import pytest
from flask import Flask, jsonify
from unittest.mock import patch
from app.routes.questions import question_api

@pytest.fixture
def app():
    app = Flask(__name__)
    app.register_blueprint(question_api)
    return app

@pytest.fixture
def client(app):
    return app.test_client()

def test_empty_prompt(client):
    response = client.post('/get_questions', json={"prompt": ""})

    assert response.status_code == 500
    
    response_json = response.get_json()
    assert "error" in response_json
    assert response_json["error"] == "Prompt cannot be empty"
