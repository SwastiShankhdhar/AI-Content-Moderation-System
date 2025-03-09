from flask import Flask, request, jsonify
import os
import hashlib

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Offensive content model
OFFENSIVE_WORDS = ['abuse', 'hate', 'kill', 'stupid']

def detect_offensive_content(text):
    offensive_words_found = [word for word in OFFENSIVE_WORDS if word in text.lower()]
    if offensive_words_found:
        return True, offensive_words_found
    return False, []

@app.route('/detect-offensive', methods=['POST'])
def detect_offensive():
    data = request.get_json()
    text = data.get('text', '')
    is_offensive, words_found = detect_offensive_content(text)
    return jsonify({
        'offensive': is_offensive,
        'words_found': words_found
    })

# Copyright violation model
def calculate_file_hash(file_path):
    hasher = hashlib.md5()
    with open(file_path, 'rb') as f:
        buf = f.read()
        hasher.update(buf)
    return hasher.hexdigest()

copyright_database = {
    'f4c3b8c3e8f3f4a2a9f3e3e2b9f1e8f3': 'sample_video.mp4',
    '0a4d55a8d778e5022fab701977c5d840': 'sample_image.jpg'
}

@app.route('/detect-copyright', methods=['POST'])
def detect_copyright():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    file_hash = calculate_file_hash(file_path)

    if file_hash in copyright_database:
        return jsonify({
            'copyright_violation': True,
            'original_file': copyright_database[file_hash]
        })
    else:
        return jsonify({
            'copyright_violation': False
        })

if __name__ == '__main__':
    app.run(debug=True)
