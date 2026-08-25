import urllib.request
import re
import json

url = 'https://drive.google.com/drive/folders/1xnU4PDbhHBWJhyK5Kuf6AOceqbsfrc-I'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        
        # Save html to examine drive JS data
        with open('drive_dump.html', 'w', encoding='utf-8') as f:
            f.write(html)
            
        print("HTML length:", len(html))
        
        # Extract initial state JSON blobs in Google Drive window._DRIVE_ivd or AF_initDataCallback
        callbacks = re.findall(r'AF_initDataCallback\s*\(\s*(\{.*?\})\s*\)\s*;', html, re.DOTALL)
        print("Found callbacks count:", len(callbacks))
        
        keywords = ['MARGINS', 'MINISTRIES', 'ZONE 1', 'ZONE 2', 'ZONE 3', 'Nigeria', 'Ghana', 'Benin', 'Burkina Faso', 'Mali', 'DRC', 'Cameroon', '2026']
        found = []
        for kw in keywords:
            if kw in html:
                found.append(kw)
        print("Keywords present in Drive:", found)

except Exception as e:
    print("Error:", e)
