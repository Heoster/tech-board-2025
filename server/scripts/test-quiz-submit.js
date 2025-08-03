require('dotenv').config();
const axios = require('axios');

async function testQuizSubmit() {
    try {
        console.log('=== Testing Quiz Submission ===');
        
        // First login
        const loginData = {
            rollNumber: 1,
            grade: 8,
            section: 'A',
            password: 'student123'
        };

        const loginResponse = await axios.post('http://localhost:5000/api/auth/login', loginData);
        const token = loginResponse.data.data.token;
        console.log('✅ Login successful');

        // Start quiz
        const quizResponse = await axios.get('http://localhost:5000/api/quiz/start/8', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const { quizId, questions } = quizResponse.data.data;
        console.log('✅ Quiz started, ID:', quizId);
        console.log('Questions count:', questions.length);

        // Create sample responses (select first option for each question)
        const responses = questions.map(question => ({
            questionId: question.id,
            selectedOptionId: question.options[0].id
        }));

        console.log('Sample response format:', responses[0]);

        // Submit quiz
        const submitResponse = await axios.post('http://localhost:5000/api/quiz/submit', {
            quizId: quizId,
            responses: responses
        }, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        console.log('✅ Quiz submitted successfully!');
        console.log('Result:', submitResponse.data);

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
        if (error.response?.data?.error?.details) {
            console.error('Validation details:', error.response.data.error.details);
        }
    }
}

testQuizSubmit();