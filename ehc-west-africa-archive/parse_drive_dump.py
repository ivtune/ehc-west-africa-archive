import re
import json

with open('drive_dump.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Search for folder IDs and names in Google Drive JS state
# Google Drive encodes items in JS array format e.g. ["1abc...", "Folder Name", ...]
matches = re.findall(r'\[\"([a-zA-Z0-9_-]{25,35})\",\[\"([^\"]+)\"', html)
print("Matches found:", len(matches))
for m in matches[:20]:
    print(f"ID: {m[0]} -> Name: {m[1]}")

# Also search for text strings that look like folder/file titles
titles = re.findall(r'\"([A-[Z0-9\s—–\-_]{3,50})\"', html)
clean_titles = set()
for t in titles:
    if any(k in t for k in ['MARGINS', 'MINISTRIES', 'ZONE', 'Nigeria', 'Ghana', 'Benin', 'Burkina', 'Cape Verde', 'Mali', 'Guinea', 'Côte', 'Cameroon', 'Chad', 'DRC', 'CAR', 'Gabon', 'Congo', 'Liberia', 'Sierra', 'Equatorial', 'São', '2026', 'Photos', 'Videos', 'Graphics', 'Documents']):
        clean_titles.add(t)

print("\nExtracted drive titles:")
for t in sorted(clean_titles):
    print(" -", t)
