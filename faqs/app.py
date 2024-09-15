from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

faqs = [
    {"id": 1, "question": "What is your name?", "answer": "John Doe"},
    # other FAQs
]

@app.route('/faqs', methods=['GET'])
def get_faqs():
    return jsonify(faqs)

@app.route('/faqs', methods=['POST'])
def add_faq():
    new_faq = request.json
    new_faq['id'] = len(faqs) + 1
    faqs.append(new_faq)
    return jsonify(new_faq), 201

@app.route('/faqs/<int:faq_id>', methods=['PUT'])
def update_faq(faq_id):
    updated_faq = request.json
    for faq in faqs:
        if faq['id'] == faq_id:
            faq.update(updated_faq)
            return jsonify(faq)
    return jsonify({"error": "FAQ not found"}), 404

@app.route('/faqs/<int:faq_id>', methods=['DELETE'])
def delete_faq(faq_id):
    global faqs
    faqs = [faq for faq in faqs if faq['id'] != faq_id]
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
