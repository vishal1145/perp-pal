prompt_template = """
You are an advanced language model tasked with extracting academic subject, topic, and difficulty from the user input string.

Please extract the following details:

1. **Subject**: Academic subject.
2. **Topic**: Academic topic name.
3. **Chapter**:Chapter name.
4. **Class**: class 5,6 ? Standard
4. **Difficulty**: Hard, Medium, Easy
5. **NumberOfQuestion**: Number of Question
6. **QuestionType**: Single Choice,Multiple choice

### INPUT

User input string:
{user_query}

Please return the academic subject, topic, and difficulty as a structured JSON object.
Return only valid JSON, no other extra information like explanation.

## VALID JSON (NO PREAMBLE):
"""