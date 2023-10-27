import axios from 'axios';
import fs from 'fs';

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

const context = fs.readFileSync('context.txt', 'utf8');
const question = 'when did he attend harvard?';

askQuestion(question, context).then((answer) => {
  console.log(answer);
});
