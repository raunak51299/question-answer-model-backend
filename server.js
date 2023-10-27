import axios from 'axios';

var apiUrl = process.env.PORT || 'http://localhost:5000';
apiUrl += '/ask';

const askQuestion = async (question, context) => {
  try {
    const response = await axios.post(apiUrl, { question, context });
    return response.data.answer;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Usage
const question = 'Where was this model trained?';
const context = 'This model was trained by Deepset AI.';
askQuestion(question, context)
  .then(answer => {
    console.log('Answer:', answer);
  });
