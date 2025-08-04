const axios = require('axios');

const API_BASE = 'http://192.168.31.234:8000/api';

async function testQuizFlow() {
    try {
        console.log('🧪 Testing Quiz Flow...\n');
        
        // Step 1: Login with existing test student
        console.log('1️⃣ Logging in test student...');
        const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
            rollNumber: 1,
            grade: 8,
            section: 'A',
            password: 'student123'
        });
        
        if (loginResponse.data.success) {
            console.log('✅ Student logged in successfully');
            const token = loginResponse.data.data.token;
            
            // Step 2: Start a quiz
            console.log('\n2️⃣ Starting quiz for Grade 8...');
            const quizResponse = await axios.get(`${API_BASE}/quiz/start/8`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (quizResponse.data.success) {
                console.log('✅ Quiz started successfully');
                console.log(`📊 Quiz ID: ${quizResponse.data.data.quizId}`);
                console.log(`📚 Total Questions: ${quizResponse.data.data.totalQuestions}`);
                console.log(`⏰ Time Limit: ${quizResponse.data.data.timeLimit} minutes`);
                console.log(`🎯 First Question: ${quizResponse.data.data.questions[0].question_text.substring(0, 50)}...`);
                
                return {
                    success: true,
                    token,
                    quizData: quizResponse.data.data
                };
            } else {
                console.log('❌ Failed to start quiz:', quizResponse.data.error);
                return { success: false, error: quizResponse.data.error };
            }
        } else {
            console.log('❌ Failed to login student:', loginResponse.data.error);
            return { success: false, error: loginResponse.data.error };
        }
        
    } catch (error) {
        console.log('❌ Error during test:', error.response?.data || error.message);
        return { success: false, error: error.response?.data || error.message };
    }
}

// Run the test
testQuizFlow().then(result => {
    if (result.success) {
        console.log('\n🎉 Quiz flow test completed successfully!');
    } else {
        console.log('\n💥 Quiz flow test failed:', result.error);
    }
});