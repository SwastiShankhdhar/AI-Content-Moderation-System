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
#     app.run(host='localhost', port=5000, debug=True)

from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS
from database.db_connnection import connect_db  

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Connect to MongoDB
db = connect_db()

# Load Hugging Face AI Model
model = pipeline("text-classification", model="KoalaAI/Text-Moderation")

@app.route('/moderate', methods=['POST'])
def moderate_content():
    """
    This route handles text moderation and saves the result to MongoDB.
    """
    data = request.json
    text = data.get('text', '')

    if not text:
        return jsonify({'error': 'No content provided'}), 400

    # Predict using the HuggingFace model
    result = model(text)[0]
    label = result['label']
    score = round(result['score'], 4)

    # Save the content to MongoDB
    report_id = db.reports.insert_one({
        "text": text,
        "label": label,
        "score": score,
        "status": "Pending"
    }).inserted_id

    return jsonify({
        "id": str(report_id),
        "label": label,
        "score": score
    })

@app.route('/reports', methods=['GET'])
def get_reports():
    """
    This route retrieves all flagged content from MongoDB.
    """
    reports = list(db.reports.find({}, {'_id': 1, 'text': 1, 'label': 1, 'score': 1, 'status': 1}))
    formatted_reports = []

    for report in reports:
        formatted_reports.append({
            "id": str(report['_id']),
            "text": report['text'],
            "label": report['label'],
            "score": report['score'],
            "status": report['status']
        })

    return jsonify(formatted_reports)

@app.route('/reports/<string:report_id>', methods=['POST'])
def update_report_status(report_id):
    """
    This route allows the admin to approve or reject content.
    """
    action = request.json.get('action')

    if action not in ['approve', 'reject']:
        return jsonify({"error": "Invalid action"}), 400

    status = "Approved" if action == 'approve' else "Rejected"

    db.reports.update_one(
        {"_id": report_id},
        {"$set": {"status": status}}
    )

    return jsonify({"message": f"Content has been {status.lower()} successfully!"})

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)

