require('dotenv').config();
const axios = require('axios');

async function testCompleteFlow() {
    try {
        console.log('=== Testing Complete Quiz Flow ===');
        
        // Step 1: Login
        const loginData = {
            rollNumber: 1,
            grade: 8,
            section: 'A',
            password: 'student123'
        };

        const loginResponse = await axios.post('http://localhost:5000/api/auth/login', loginData);
        const token = loginResponse.data.data.token;
        console.log('✅ Step 1: Login successful');

        // Step 2: Start quiz
        const quizResponse = await axios.get('http://localhost:5000/api/quiz/start/8', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const { quizId, questions } = quizResponse.data.data;
        console.log('✅ Step 2: Quiz started, ID:', quizId);

        // Step 3: Submit quiz
        const responses = questions.map(question => ({
            questionId: question.id,
            selectedOptionId: question.options[0].id
        }));

        const submitResponse = await axios.post('http://localhost:5000/api/quiz/submit', {
            quizId: quizId,
            responses: responses
        }, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        console.log('✅ Step 3: Quiz submitted successfully');
        console.log('Result:', submitResponse.data.data);

        // Step 4: Try to access quiz history (this might be causing the 400 error)
        try {
            const historyResponse = await axios.get('http://localhost:5000/api/quiz/history', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log('✅ Step 4: Quiz history retrieved');
            console.log('History:', historyResponse.data.data);
        } catch (historyError) {
            console.error('❌ Step 4 failed - Quiz history error:', historyError.response?.data || historyError.message);
        }

        // Step 5: Try to start another quiz (should fail)
        try {
            const secondQuizResponse = await axios.get('http://localhost:5000/api/quiz/start/8', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log('❌ Step 5: Second quiz start should have failed but succeeded');
        } catch (secondQuizError) {
            console.log('✅ Step 5: Second quiz start correctly failed:', secondQuizError.response?.data?.error?.message);
        }

        console.log('=== Complete flow test finished ===');

    } catch (error) {
        console.error('❌ Flow test failed:', error.response?.data || error.message);
    }
}

testCompleteFlow();