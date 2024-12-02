import pytest

def query_embedding(prompt):
    return f"embedding_for_{prompt}"

def search_questions(embedding, top_k):
    return [{'id': f"question_{i}_for_{embedding}"} for i in range(1, top_k + 1)]

@pytest.fixture
def setup_test():
    number_of_questions = 5
    all_results = []
    return number_of_questions, all_results

def test_search_with_subject_only(setup_test):
    number_of_questions, all_results = setup_test
    subject = "Math"
    combined_prompt = f"subject: {subject}"
    prompt_embedding = query_embedding(combined_prompt)
    results = search_questions(prompt_embedding, top_k=number_of_questions)
    all_results.extend(results)
    
    assert len(all_results) == number_of_questions
    assert all(f"question_{i}_for_embedding_for_subject: Math" in res['id'] for i, res in enumerate(all_results, 1))

def test_search_with_topic(setup_test):
    number_of_questions, all_results = setup_test
    topic = "Algebra"
    combined_prompt = f"topic: {topic}"
    prompt_embedding = query_embedding(combined_prompt)
    results = search_questions(prompt_embedding, top_k=number_of_questions)
    all_results.extend(results)
    
    assert len(all_results) == number_of_questions
    assert all(f"question_{i}_for_embedding_for_topic: Algebra" in res['id'] for i, res in enumerate(all_results, 1))

def test_search_with_chapter_only(setup_test):
    number_of_questions, all_results = setup_test
    chapter = "Linear Equations"
    combined_prompt = f"chapter: {chapter}"
    prompt_embedding = query_embedding(combined_prompt)
    results = search_questions(prompt_embedding, top_k=number_of_questions)
    all_results.extend(results)
    
    assert len(all_results) == number_of_questions
    assert all(f"question_{i}_for_embedding_for_chapter: Linear Equations" in res['id'] for i, res in enumerate(all_results, 1))

def test_search_with_multiple_parameters(setup_test):
    number_of_questions, all_results = setup_test
    subject = "Math"
    topic = "Algebra"
    combined_prompt = f"subject: {subject}, topic: {topic}"
    prompt_embedding = query_embedding(combined_prompt)
    results = search_questions(prompt_embedding, top_k=number_of_questions)
    all_results.extend(results)
    
    assert len(all_results) == number_of_questions
    assert all(f"question_{i}_for_embedding_for_subject: Math, topic: Algebra" in res['id'] for i, res in enumerate(all_results, 1))
