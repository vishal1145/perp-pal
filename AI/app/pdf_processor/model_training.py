from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

def train_model(data):
    current_topics = [item["current_topic"] for item in data]
    next_topics = [item["next_topic"] for item in data]
    
    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform(current_topics)
    y = next_topics

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = LogisticRegression()
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Model Accuracy: {accuracy * 100:.2f}%")
    
    return model, vectorizer
