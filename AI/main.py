from app import initialize_app
import os
from dotenv import load_dotenv

load_dotenv()
app = initialize_app()

port = int(os.getenv("FLASK_RUN_PORT", 5000))

if __name__ == "__main__":
    app.run(debug=True,port=port)
