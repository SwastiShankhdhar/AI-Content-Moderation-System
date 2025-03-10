# from flask import Flask, request, jsonify
# from transformers import pipeline
# from database.db_connnection import connect_db  

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
#     from werkzeug.serving import run_simple
#     run_simple('localhost', 5000, app, use_reloader=False)

from flask import Flask, request, jsonify
from transformers import pipeline
from database.db_connnection import connect_db  

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
    app.run(host='localhost', port=5000, debug=True)
