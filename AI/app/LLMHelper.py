from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from utils.prompt_template import prompt_template
from utils.config import GROQ_API_KEY
import os

parser=JsonOutputParser()
class LLMHelper:
    def __init__(self, model_name="llama-3.1-70b-versatile"):
        if not GROQ_API_KEY:
            raise ValueError("GROQ_API_KEY not present in .env file.")
    
        os.environ["GROQ_API_KEY"] = GROQ_API_KEY
    
        self.llm = ChatGroq(model=model_name)
        
        self.extract_academic_info_prompt = PromptTemplate.from_template(prompt_template)
    
    def extract_information(self, input_text):
        chain_extract = self.extract_academic_info_prompt | self.llm | parser
        res = chain_extract.invoke({"user_query": input_text})
        print(res)
        return res

