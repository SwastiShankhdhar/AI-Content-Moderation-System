import requests

def test_moderate_content():
    print("Running test_moderate_content...")

    url = 'http://localhost:5000/moderate'
    sample_text = {
        "text": "This is a sample content for testing offensive words."
    }

    response = requests.post(url, json=sample_text)
    assert response.status_code == 200
    assert 'label' in response.json()
    assert 'score' in response.json()

def test_moderate_content_no_text():
    print("Running test_moderate_content_no_text...")

    url = 'http://localhost:5000/moderate'
    sample_text = {
        "text": ""
    }

    response = requests.post(url, json=sample_text)
    assert response.status_code == 400
    assert response.json() == {'error': 'No content provided'}

if __name__ == '__main__':
    test_moderate_content()
    test_moderate_content_no_text()
