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
from bson import ObjectId

app = Flask(__name__)
CORS(app)

db = connect_db()
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

    report_id = db.reports.insert_one({
        "text": text,
        "label": label,
        "score": score,
        "status": "Pending"
    }).inserted_id

    return jsonify({"id": str(report_id), "label": label, "score": score})


@app.route('/reports', methods=['GET'])
def get_reports():
    reports = list(db.reports.find())
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
    action = request.json.get('action')

    if action not in ['approve', 'reject']:
        return jsonify({"error": "Invalid action"}), 400

    object_id = ObjectId(report_id)
    status = "Approved" if action == 'approve' else "Rejected"

    db.reports.update_one(
        {"_id": object_id},
        {"$set": {"status": status}}
    )

    return jsonify({"message": f"Content has been {status.lower()} successfully!"})


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)


