import pandas as pd

def build_cooccurrence_matrix(interactions):
    cooccurrence = pd.crosstab(interactions['current_topic'], interactions['next_topic'])
    return cooccurrence

def recommend_next_topic(cooccurrence_matrix, current_topic, top_n=1):
    if current_topic not in cooccurrence_matrix.index:
        return ["No recommendations aVailable for this topic."]
    
    recommended_topics = cooccurrence_matrix.loc[current_topic].sort_values(ascending=False).head(top_n)
    return list(recommended_topics.index)
