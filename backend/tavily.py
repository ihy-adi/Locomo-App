import requests
import re
import dateparser
import json
from datetime import datetime

url = "https://api.tavily.com/search"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer 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"
}
payload = {
    "query": "upcoming events in Delhi: music comedy concerts business food festivals dance",
    "topic": "general",
    "search_depth": "advanced",
    "max_results": 10,
    "include_answer": True,
    "include_raw_content": True,
    "include_images": True
}

try:
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    response_data = response.json()
    print("\nRAW API RESPONSE:\n")
    print(json.dumps(response_data, indent=2))
    print("\n" + "="*60 + "\n")
except requests.RequestException as e:
    print(f"Error: {e}")
    exit(1)

def is_duplicate(title, seen):
    if title in seen:
        return True
    seen.add(title)
    return False

def extract_date(text):
    if not text:
        return "TBA"
    
    # Match dates like "Fri, 18 Apr" or "2025-04-25"
    date_patterns = [
        r'(\b(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)[a-z]*,?\s+\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s*\d{0,4})',
        r'(\d{4}-\d{2}-\d{2})',
        r'(\b\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\b)'
    ]
    
    for pattern in date_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            raw_date = match.group(1).replace('\u2022', '-').strip()
            try:
                dt = dateparser.parse(raw_date, settings={'STRICT_PARSING': True})
                if dt and dt.year > 2020:  # Filter reasonable dates
                    return dt.strftime("%Y-%m-%d")
            except:
                continue
    return "TBA"

def extract_venue(text):
    if not text:
        return "TBA"
    
    # Match venue patterns like "Venue Name: City"
    venue_match = re.search(r'^(.+?)\s*:\s*(.+?)$', text, re.MULTILINE)
    if venue_match:
        return venue_match.group(1).strip()
    
    # Look for venue keywords in lines
    venue_keywords = [
        'auditorium', 'hall', 'stadium', 'center', 'centre', 
        'arena', 'grounds', 'club', 'theatre', 'social'
    ]
    for line in text.split('\n'):
        if any(kw in line.lower() for kw in venue_keywords):
            clean_line = re.sub(r'\s*\u20b9.*', '', line)  # Remove price info
            return clean_line.strip()
    return "TBA"

def determine_type(title, content):
    text = f"{title} {content}".lower()
    type_map = [
        ('comedy', ['comedy', 'stand-up', 'standup']),
        ('music', ['music', 'concert', 'gig', 'festival']),
        ('dance', ['dance', 'samaaj']),
        ('food', ['food', 'culinary']),
        ('business', ['business', 'conference', 'seminar']),
        ('workshop', ['workshop', 'class']),
    ]
    for event_type, keywords in type_map:
        if any(kw in text for kw in keywords):
            return event_type.title()
    return 'Other'

events = []
seen = set()

for result in response_data.get("results", []):
    title = result.get("title", "").strip()
    raw_content = result.get("raw_content") or ""
    content = result.get("content") or ""
    full_text = f"{raw_content} {content}".strip()
    
    if not title or is_duplicate(title, seen):
        continue

    date = extract_date(full_text)
    venue = extract_venue(full_text)
    event_type = determine_type(title, full_text)

    events.append({
        "title": title,
        "type": event_type,
        "date": date,
        "venue": venue
    })

print("PARSED EVENTS:\n")
for event in events:
    print(f"Title: {event['title']}")
    print(f"Type: {event['type']}")
    print(f"Date: {event['date']}")
    print(f"Venue: {event['venue']}")
    print("---")