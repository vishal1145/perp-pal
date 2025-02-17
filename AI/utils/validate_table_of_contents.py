import json

def validate_table_of_contents(data):
    expected_keys_chapter = {"chapter", "page_start", "page_end", "title", "subtopics"}
    expected_keys_subtopic = {"name", "page_start", "page_end"}

    if not isinstance(data, dict):
        raise ValueError("Input should be a dictionary.")

    if "table_of_contents" not in data or not isinstance(data["table_of_contents"], list):
        raise ValueError("Missing or invalid 'table_of_contents'. It must be a list.")

    for chapter_index, chapter in enumerate(data["table_of_contents"], start=1):
        if not isinstance(chapter, dict):
            raise ValueError(f"Chapter {chapter_index} must be a dictionary.")

        missing_keys = expected_keys_chapter - set(chapter.keys())
        extra_keys = set(chapter.keys()) - expected_keys_chapter
        if missing_keys:
            raise ValueError(f"Missing keys in chapter {chapter_index}: {', '.join(missing_keys)}")
        if extra_keys:
            raise ValueError(f"Unexpected keys in chapter {chapter_index}: {', '.join(extra_keys)}")

        if not isinstance(chapter["chapter"], int):
            raise ValueError(f"'chapter' must be an integer in chapter {chapter_index}.")
        if not isinstance(chapter["page_start"], int) or not isinstance(chapter["page_end"], int):
            raise ValueError(f"'page_start' and 'page_end' must be integers in chapter {chapter_index}.")
        if not isinstance(chapter["title"], str):
            raise ValueError(f"'title' must be a string in chapter {chapter_index}.")
        if not isinstance(chapter["subtopics"], list):
            raise ValueError(f"'subtopics' must be a list in chapter {chapter_index}.")


        if chapter["page_start"] >= chapter["page_end"]:
            raise ValueError(f"'page_start' should be less than 'page_end' in chapter {chapter_index}.")

        for subtopic_index, subtopic in enumerate(chapter["subtopics"], start=1):
            if not isinstance(subtopic, dict):
                raise ValueError(f"Subtopic {subtopic_index} in chapter {chapter_index} must be a dictionary.")

            missing_sub_keys = expected_keys_subtopic - set(subtopic.keys())
            extra_sub_keys = set(subtopic.keys()) - expected_keys_subtopic
            if missing_sub_keys:
                raise ValueError(f"Missing keys in subtopic {subtopic_index} of chapter {chapter_index}: {', '.join(missing_sub_keys)}")
            if extra_sub_keys:
                raise ValueError(f"Unexpected keys in subtopic {subtopic_index} of chapter {chapter_index}: {', '.join(extra_sub_keys)}")

            if not isinstance(subtopic["name"], str):
                raise ValueError(f"'name' must be a string in subtopic {subtopic_index} of chapter {chapter_index}.")
            if not isinstance(subtopic["page_start"], int) or not isinstance(subtopic["page_end"], int):
                raise ValueError(f"'page_start' and 'page_end' must be integers in subtopic {subtopic_index} of chapter {chapter_index}.")

            if subtopic["page_start"] >= subtopic["page_end"]:
                raise ValueError(f"'page_start' should be less than 'page_end' in subtopic {subtopic_index} of chapter {chapter_index}.")

            if not (chapter["page_start"] <= subtopic["page_start"] < chapter["page_end"] and 
                    chapter["page_start"] < subtopic["page_end"] <= chapter["page_end"]):
                raise ValueError(f"Subtopic '{subtopic['name']}' (subtopic {subtopic_index}) has pages out of chapter {chapter_index} range.")

    return True

