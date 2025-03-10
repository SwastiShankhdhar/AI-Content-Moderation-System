# from flask import Flask, request, jsonify
# from transformers import pipeline
# from database.db_connection import connect_db  # 💯 This is the PERFECT way

# app = Flask(__name__)
# db = connect_db()

# # Load Hugging Face Model
# model = pipeline("text-classification", model="KoalaAI/Text-Moderation")

# @app.route('/moderate', methods=['POST'])
# def moderate_content():
#     data = request.json
#     text = data.get('text', '')

#     if not text:
#         return jsonify({'error': 'No content provided'}), 400

#     result = model(text)[0]
#     label = result['label']
#     score = round(result['score'], 4)

#     # Save to MongoDB
#     db.reports.insert_one({
#         "content": text,
#         "label": label,
#         "score": score
#     })

#     return jsonify({
#         "label": label,
#         "score": score
#     })

# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, request, jsonify
from transformers import pipeline
from database import connect_db  # 💯 Now it will work perfectly

app = Flask(__name__)
db = connect_db()

# Load Hugging Face Model
model = pipeline("text-classification", model="KoalaAI/Text-Moderation")

@app.route('/moderate', methods=['POST'])
def moderate_content():
    data = request.json
    text = data.get('text', '')

    if not text:
        return jsonify({'error': 'No content provided'}), 400

    result = model(text)[0]
    label = result['label']
    score = round(result['score'], 4)

    # Save to MongoDB
    db.reports.insert_one({
        "content": text,
        "label": label,
        "score": score
    })

    return jsonify({
        "label": label,
        "score": score
    })

if __name__ == '__main__':
    app.run(debug=True)
