from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
faqs = [
    {"id": 1, "question": "What is Fruit.ai?", "answer": "Fruit.ai is a platform that uses artificial intelligence to analyze and provide insights on various types of fruit, including their nutritional content, ripeness, and optimal storage conditions."},
    {"id": 2, "question": "How does Fruit.ai determine the ripeness of fruit?", "answer": "Fruit.ai uses machine learning algorithms and image recognition technology to assess the color, texture, and size of fruit to estimate its ripeness."},
    {"id": 3, "question": "Can Fruit.ai provide nutritional information about different fruits?", "answer": "Yes, Fruit.ai can analyze fruit and provide detailed nutritional information, including vitamins, minerals, and caloric content."},
    {"id": 4, "question": "Is there a mobile app for Fruit.ai?", "answer": "Currently, Fruit.ai is available as a web-based platform. We are exploring the development of a mobile app to provide more accessibility."},
    {"id": 5, "question": "How accurate is the fruit ripeness prediction?", "answer": "Fruit.ai's ripeness predictions are based on advanced AI models and are generally highly accurate. However, the predictions can vary depending on the quality of the input images and other factors."},
    {"id": 6, "question": "How can I contact support for Fruit.ai?", "answer": "You can contact Fruit.ai support by emailing support@fruit.ai or through the contact form on our website."},
    {"id": 7, "question": "Is Fruit.ai a free service?", "answer": "Fruit.ai offers both free and premium services. The free version provides basic features, while the premium version includes advanced analysis and additional features."},
    {"id": 8, "question": "How do I create an account on Fruit.ai?", "answer": "To create an account on Fruit.ai, visit our website and click on the 'Sign Up' button. Follow the instructions to provide your details and set up your account."}
]


@app.route('/faqs', methods=['GET'])
def get_faqs():
    return jsonify(faqs)

@app.route('/faqs/<int:faq_id>', methods=['GET'])
def get_faq(faq_id):
    for faq in faqs:
        if faq['id'] == faq_id:
            return jsonify(faq)
    return jsonify({"error": "FAQ not found"}), 404

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
