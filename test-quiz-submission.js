const axios = require('axios');

const BASE_URL = 'https://tech-board.up.railway.app';

async function testQuizSubmission() {
    console.log('🎯 Testing Quiz Submission Flow...\n');

    try {
        // Step 1: Login as student
        console.log('1. Logging in as student...');
        const studentLogin = await axios.post(`${BASE_URL}/api/auth/student/login`, {
            rollNumber: 100,
            grade: 6,
            section: 'A',
            password: 'test123'
        });

        const token = studentLogin.data.token || studentLogin.data.data?.token;
        if (!token) {
            console.log('❌ Student login failed - no token received');
            console.log('Response:', studentLogin.data);
            return;
        }
        console.log('✅ Student logged in successfully');

        // Step 2: Try to start a quiz
        console.log('\n2. Starting quiz...');
        try {
            const quizStart = await axios.post(`${BASE_URL}/api/quiz/start`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('✅ Quiz started successfully');
            console.log('Quiz ID:', quizStart.data.data?.quizId);
            console.log('Questions count:', quizStart.data.data?.questions?.length);

            const quizId = quizStart.data.data?.quizId;
            const questions = quizStart.data.data?.questions || [];

            if (!quizId) {
                console.log('❌ No quiz ID received');
                return;
            }

            // Step 3: Test quiz submission with various scenarios
            console.log('\n3. Testing quiz submission scenarios...');

            // Test 3a: Submit with missing data
            console.log('\n3a. Testing submission with missing quizId...');
            try {
                await axios.post(`${BASE_URL}/api/quiz/submit`, {
                    answers: []
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.log('✅ Properly rejected missing quizId:', error.response?.data);
            }

            // Test 3b: Submit with wrong number of answers
            console.log('\n3b. Testing submission with wrong number of answers...');
            try {
                await axios.post(`${BASE_URL}/api/quiz/submit`, {
                    quizId: quizId,
                    answers: [{ questionId: 1, selectedOptionId: 1 }], // Only 1 answer instead of 50
                    startTime: new Date().toISOString()
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.log('✅ Properly rejected wrong answer count:', error.response?.data);
            }

            // Test 3c: Submit with correct format but fake answers
            console.log('\n3c. Testing submission with correct format...');
            const fakeAnswers = [];
            for (let i = 0; i < 50; i++) {
                fakeAnswers.push({
                    questionId: questions[i % questions.length]?.id || i + 1,
                    selectedOptionId: questions[i % questions.length]?.options?.[0]?.id || i + 1
                });
            }

            try {
                const submitResponse = await axios.post(`${BASE_URL}/api/quiz/submit`, {
                    quizId: quizId,
                    answers: fakeAnswers,
                    startTime: new Date().toISOString()
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log('✅ Quiz submitted successfully:', submitResponse.data);
            } catch (error) {
                console.log('❌ Quiz submission failed:', error.response?.status, error.response?.data);
                
                // Log more details about the error
                if (error.response?.data) {
                    console.log('Error details:', JSON.stringify(error.response.data, null, 2));
                }
            }

        } catch (error) {
            console.log('❌ Quiz start failed:', error.response?.status, error.response?.data);
        }

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
    }
}

testQuizSubmission();