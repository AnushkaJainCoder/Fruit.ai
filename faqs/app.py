# app.py
from flask import Flask, request, jsonify, abort

app = Flask(__name__)

# In-memory store for FAQs
faqs = []

@app.route('/faqs', methods=['GET'])
def get_faqs():
    return jsonify(faqs), 200

@app.route('/faqs/<int:id>', methods=['GET'])
def get_faq(id):
    faq = next((faq for faq in faqs if faq['id'] == id), None)
    if faq is None:
        abort(404)
    return jsonify(faq), 200

@app.route('/faqs', methods=['POST'])
def create_faq():
    if not request.json or 'question' not in request.json or 'answer' not in request.json:
        abort(400)
    faq = {
        'id': len(faqs) + 1,
        'question': request.json['question'],
        'answer': request.json['answer']
    }
    faqs.append(faq)
    return jsonify(faq), 201

@app.route('/faqs/<int:id>', methods=['PUT'])
def update_faq(id):
    faq = next((faq for faq in faqs if faq['id'] == id), None)
    if faq is None:
        abort(404)
    if not request.json:
        abort(400)
    faq['question'] = request.json.get('question', faq['question'])
    faq['answer'] = request.json.get('answer', faq['answer'])
    return jsonify(faq), 200

@app.route('/faqs/<int:id>', methods=['DELETE'])
def delete_faq(id):
    global faqs
    faqs = [faq for faq in faqs if faq['id'] != id]
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
