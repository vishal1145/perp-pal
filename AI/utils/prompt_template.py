prompt_template = """
You are an advanced language model tasked with extracting academic subject, topic, and difficulty from the user input string.

Extract the following details for **each subject mentioned** in the user input:

1. **Subject**: Academic subject.
2. **Topic**: Corresponding Academic topic name.
3. **Chapter**: Corresponding chapter name.
4. **Class**: Grade 5,6 or standard.
5. **Difficulty**: The difficulty level (Easy, Medium, Hard). If not specified, default to "Easy".
6. **NumberOfQuestions**: The total count of questions requested. If not specified, default to `20`.
7. **QuestionType**: The type of questions (Single Choice, Subjective, Multiple Choice). if not specified default to `Multiple choice`

### INPUT

User input string:
{user_query}

### OUTPUT
Ensure the JSON output is strictly valid and defaults are applied when information is missing and return the extracted information in **strictly valid JSON format**. Do not include any explanations or additional text.


## VALID JSON (NO PREAMBLE):
"""
