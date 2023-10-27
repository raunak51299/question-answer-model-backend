from flask import Flask, request, jsonify
from transformers import AutoModelForQuestionAnswering, AutoTokenizer, pipeline

app = Flask(__name__)

# Load the pre-trained model and tokenizer
model_name = "deepset/tinyroberta-squad2"
nlp = pipeline('question-answering', model=model_name, tokenizer=model_name)

@app.route('/ask', methods=['POST'])
def answer_question():
    try:
        data = request.get_json()
        question = data.get('question')
        context = data.get('context')
        
        if not question or not context:
            return jsonify({'error': 'Both question and context are required'}), 400

        QA_input = {'question': question, 'context': context}
        result = nlp(QA_input)

        return jsonify({'answer': result['answer']})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
