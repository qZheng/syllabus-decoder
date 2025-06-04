from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import uuid

app = Flask(__name__)
CORS(app) 

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def receivefile():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'Upload error'}), 400

    ext = os.path.splitext(file.filename)[1]
    random_filename = f"{uuid.uuid4().hex}{ext}"
    file_path = os.path.join(UPLOAD_FOLDER, random_filename) # type: ignore
    file.save(file_path)

    return jsonify({'message': 'File uploaded!', 'filename': random_filename})

if __name__ == '__main__':
    app.run(debug=True)
