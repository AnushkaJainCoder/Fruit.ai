from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample data (for now we'll store FAQs in memory, later we can connect to a database)
faqs = [
    {'id': 1, 'question': 'What is an apple?', 'answer': 'An apple is a type of fruit.'},
    {'id': 2, 'question': 'What is a banana?', 'answer': 'A banana is a yellow fruit.'},
]

# Route to fetch all FAQs
@app.route('/faqs', methods=['GET'])
def get_faqs():
    return jsonify(faqs)

# Route to fetch a single FAQ by ID
@app.route('/faqs/<int:id>', methods=['GET'])
def get_faq(id):
    faq = next((faq for faq in faqs if faq['id'] == id), None)
    if faq is None:
        return jsonify({'error': 'FAQ not found'}), 404
    return jsonify(faq)

# Route to create a new FAQ
@app.route('/faqs', methods=['POST'])
def create_faq():
    new_faq = request.get_json()
    new_faq['id'] = len(faqs) + 1
    faqs.append(new_faq)
    return jsonify(new_faq), 201

# Route to update a FAQ by ID
@app.route('/faqs/<int:id>', methods=['PUT'])
def update_faq(id):
    faq = next((faq for faq in faqs if faq['id'] == id), None)
    if faq is None:
        return jsonify({'error': 'FAQ not found'}), 404
    updated_data = request.get_json()
    faq.update(updated_data)
    return jsonify(faq)

# Route to delete a FAQ by ID
@app.route('/faqs/<int:id>', methods=['DELETE'])
def delete_faq(id):
    global faqs
    faqs = [faq for faq in faqs if faq['id'] != id]
    return jsonify({'message': 'FAQ deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
