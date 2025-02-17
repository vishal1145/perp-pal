prompt_template = """
You are an advanced language model tasked with extracting academic subject, topic, and difficulty from the user input string.

Extract the following details for **each subject mentioned** in the user input:

1. **Subject**: Academic subject.
2. **Topic**: Corresponding Academic topic name.
3. **Chapter**: Corresponding chapter name.
4. **Class**: Grades or standard.
5. **Difficulty**: The difficulty level (Easy, Medium, Hard). If not specified, default to "Easy".
6. **NumberOfQuestions**: The total count of questions requested. If not specified, default to `20`.
7. **QuestionType**: The type of questions (Single Choice, Subjective, Multiple Choice). if not specified default to `Multiple choice`

### INPUT

User input string:
{user_query}

### OUTPUT
Return the extracted information in a **strictly valid JSON array**. Each item in the array should be a dictionary containing the extracted details for each subject. Do not wrap the output in any additional objects or keys (e.g., `subjects`). If any details are missing, apply the default values as specified.

## VALID JSON (NO PREAMBLE):
"""


deepseek_prompt_template="You are an expert academic assistant. Transform the following topic text into a list of pure, concise bullet points that capture the key ideas. Return only a markdown-formatted list of bullet points with no headings, chapter references, or extra commentary. Each bullet point should represent a single clear idea."