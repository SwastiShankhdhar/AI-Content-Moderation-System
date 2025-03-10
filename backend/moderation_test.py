import requests

url = 'http://localhost:5000/moderate'

sample_text = {
    "text": "This is a sample content for testing offensive words."
}

response = requests.post(url, json=sample_text)

if response.status_code == 200:
    print("Moderation Result:", response.json())
else:
    print("Error:", response.text)
