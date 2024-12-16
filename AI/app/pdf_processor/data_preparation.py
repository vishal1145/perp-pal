import pandas as pd
import os
INTERACTIONS_PATH = 'data/interactions/interactions.json'


def prepare_training_data(topic_dict, json_file_path=INTERACTIONS_PATH):
    topics = list(topic_dict.keys())
    data = []
    
    for i in range(len(topics) - 1):
        data.append({
            "current_topic": topics[i],
            "next_topic": topics[i + 1]
        })
    
    if os.path.exists(json_file_path):
        existing_data = pd.read_json(json_file_path)
        updated_data = pd.concat([existing_data, pd.DataFrame(data)], ignore_index=True)
    else:
        updated_data = pd.DataFrame(data)

    updated_data.to_json(json_file_path, orient="records", indent=4)
    print(f"Data appended to {json_file_path}")
    return data