require('dotenv').config();
const axios = require('axios');

async function testLogin() {
    try {
        console.log('=== Testing Login API ===');
        
        const loginData = {
            rollNumber: 1,
            grade: 8,
            section: 'A',
            password: 'student123'
        };

        console.log('Testing login with:', loginData);

        const response = await axios.post('http://localhost:5000/api/auth/login', loginData);
        
        console.log('✅ Login successful!');
        console.log('Response:', response.data);
        
        // Test quiz start endpoint
        const token = response.data.data.token;
        const quizResponse = await axios.get('http://localhost:5000/api/quiz/start/8', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        console.log('✅ Quiz start successful!');
        console.log('Quiz data:', {
            quizId: quizResponse.data.data.quizId,
            totalQuestions: quizResponse.data.data.totalQuestions,
            questionCount: quizResponse.data.data.questions.length
        });

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
    }
}

testLogin();