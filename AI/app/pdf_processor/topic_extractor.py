import re

def segment_text_into_topics(text):
    headings = re.findall(r'(Chapter\s\d+|[1-9]+\.[1-9]*\s+[A-Z][^\n]*)', text)
    sections = re.split(r'(Chapter\s\d+|[1-9]+\.[1-9]*\s+[A-Z][^\n]*)', text)
    topic_dict = {}
    for i in range(1, len(sections), 2):
        heading = sections[i].strip()
        content = sections[i + 1].strip()
        topic_dict[heading] = content
    return topic_dict
