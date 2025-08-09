const axios = require('axios');

// Simple verification script to test Grade 9 questions
async function verifyGrade9Questions() {
    console.log('🔍 VERIFYING GRADE 9 QUESTIONS');
    console.log('==============================\n');

    try {
        // Test 1: Check server health
        console.log('1️⃣ Testing server health...');
        const healthResponse = await axios.get('http://localhost:8000/health');
        console.log('✅ Server is running\n');

        // Test 2: Register a test student for Grade 9
        console.log('2️⃣ Registering test student for Grade 9...');
        const registerResponse = await axios.post('http://localhost:8000/api/auth/register', {
            name: 'Test Student Grade9',
            rollNumber: 70,
            grade: 9,
            section: 'A',
            password: 'test123'
        });
        console.log('✅ Student registered successfully\n');

        // Test 3: Login the student
        console.log('3️⃣ Logging in test student...');
        const loginResponse = await axios.post('http://localhost:8000/api/auth/login', {
            rollNumber: 70,
            grade: 9,
            section: 'A',
            password: 'test123'
        });

        const token = loginResponse.data.data.token;
        console.log('✅ Student logged in successfully\n');

        // Test 4: Start a quiz for Grade 9
        console.log('4️⃣ Starting quiz for Grade 9...');
        const quizResponse = await axios.get('http://localhost:8000/api/quiz/start/9', {
            headers: { Authorization: `Bearer ${token}` }
        });

        const quizData = quizResponse.data.data;
        console.log('📊 Grade 9 Quiz Configuration:');
        console.log(`   - Total Questions: ${quizData.totalQuestions}`);
        console.log(`   - Time Limit: ${quizData.timeLimit} minutes`);
        console.log(`   - Actual Questions Provided: ${quizData.questions.length}`);
        console.log(`   - Question Distribution:`);
        console.log(`     * Basic: ${quizData.questionDistribution.basic}`);
        console.log(`     * Medium: ${quizData.questionDistribution.medium}`);
        console.log(`     * Advanced: ${quizData.questionDistribution.advanced}`);

        // Verify the configuration
        const questionsCount = quizData.questions.length;
        const timeLimit = quizData.timeLimit;
        const totalQuestions = quizData.totalQuestions;
        
        const isValid = questionsCount > 0 && 
                       timeLimit > 0 && 
                       totalQuestions > 0 && 
                       questionsCount === totalQuestions &&
                       timeLimit === totalQuestions; // 1 minute per question

        console.log('\n✅ Verification Results:');
        console.log(`   - Questions Available: ${questionsCount > 0 ? '✅' : '❌'}`);
        console.log(`   - Time Limit Set: ${timeLimit > 0 ? '✅' : '❌'}`);
        console.log(`   - Configuration Valid: ${isValid ? '✅' : '❌'}`);

        console.log('\n🎯 FINAL RESULT:');
        console.log('=====================================');
        if (isValid) {
            console.log('✅ GRADE 9 QUESTIONS SUCCESSFULLY ADDED AND WORKING!');
            console.log(`📊 Quiz generated with ${questionsCount} questions in ${timeLimit} minutes`);
        } else {
            console.log('❌ GRADE 9 QUESTIONS STILL HAVE ISSUES');
        }

    } catch (error) {
        console.error('❌ Verification failed:', error.response?.data || error.message);
        console.log('\n🔧 Troubleshooting:');
        console.log('   - Make sure the server is running on port 8000');
        console.log('   - Check if Grade 9 questions were properly added to the database');
        console.log('   - Verify the quiz routes are properly configured');
    }
}

// Run the verification
verifyGrade9Questions();
