import os
import json
import requests
from utils.prompt_template import deepseek_prompt_template

class DeepSeekAPI:
    API_URL = os.getenv("DEEPSEEK_API_URL")
    DEEPSEEK_MODEL= os.getenv("DEEPSEEK_MODEL","deepseek-v2:16b")

    def __init__(self):
        if not self.API_URL:
            raise ValueError("DeepSeek API URL is not set in environment variables.")

    def query_api(self, text):
        if not text:
            return {"error": "No text provided for processing."}

        headers = {"Content-Type": "application/json"}
        payload = json.dumps(
            {
                "model":self.DEEPSEEK_MODEL,
                "messages": [
                    {
                        "role": "system",
                        "content": deepseek_prompt_template
                    },
                    {
                        "role": "user",
                        "content": text 
                    }
                ],
                "stream": False
            }
        )

        try:
    
            response = requests.post(self.API_URL, headers=headers, data=payload)
            print("response",response)
            result = response.json()
            
            if "error" in result:
                return {"error": result["error"]} 

            return result

        except requests.RequestException as e:
            return {"error": f"DeepSeek API request failed: {str(e)}"}
        except ValueError:
            return {"error": "Failed to parse the API response."}


