prompt_template = """
You are an advanced language model tasked with extracting academic subject, topic, and difficulty from the user input string.

Extract the following details for **each subject mentioned** in the user input:

1. **Subject**: Academic subject.
2. **Topic**: Corresponding Academic topic name.
3. **Chapter**: Corresponding chapter name.
4. **Class**: Grade 5,6 or standard.
5. **Difficulty**: Easy, Medium, or Hard.
6. **NumberOfQuestions**: Count of questions.
7. **QuestionType**: Single Choice,Subjective, Multiple Choice.

### INPUT

User input string:
{user_query}

### OUTPUT
Return only valid JSON. Do not include any explanations or additional text.

## VALID JSON (NO PREAMBLE):
"""
