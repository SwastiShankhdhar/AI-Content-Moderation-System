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
CORS(app)  # Enable CORS for frontend communication

# Connect to MongoDB
db = connect_db()

# Load Hugging Face AI Model
model = pipeline("text-classification", model="KoalaAI/Text-Moderation")


# ===================================
# ✅ Route 1: Moderate Content
# ===================================
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


# ===================================
# ✅ Route 2: Get All Reports
# ===================================
@app.route('/reports', methods=['GET'])
def get_reports():
    """
    This route retrieves all flagged content from MongoDB.
    """
    reports = list(db.reports.find())

    # Convert MongoDB ObjectId to string
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


# ===================================
# ✅ Route 3: Update Report Status (Approve/Reject)
# ===================================
@app.route('/reports/<string:report_id>', methods=['POST'])
def update_report_status(report_id):
    """
    This route allows the admin to approve or reject content.
    """
    action = request.json.get('action')

    # Validate the action
    if action not in ['approve', 'reject']:
        return jsonify({"error": "Invalid action"}), 400

    # Convert report_id to ObjectId
    try:
        object_id = ObjectId(report_id)
    except:
        return jsonify({"error": "Invalid report ID"}), 400

    # Update status in MongoDB
    status = "Approved" if action == 'approve' else "Rejected"
    result = db.reports.update_one(
        {"_id": object_id},
        {"$set": {"status": status}}
    )

    # If no document was found
    if result.matched_count == 0:
        return jsonify({"error": "Report not found"}), 404

    return jsonify({"message": f"Content has been {status.lower()} successfully!"})


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)


