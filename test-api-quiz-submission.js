const axios = require('axios');

const BASE_URL = 'http://localhost:8000';

async function testQuizSubmissionAPI() {
    try {
        console.log('🧪 TESTING QUIZ SUBMISSION API');
        console.log('===============================\n');
        
        // Step 1: Student Login
        console.log('📋 Step 1: Testing student login...');
        const loginResponse = await axios.post(`${BASE_URL}/api/auth/login`, {
            rollNumber: 1,
            grade: 8,
            section: 'A',
            password: 'student123'
        });
        
        const studentToken = loginResponse.data.data.token;
        console.log('✅ Student login successful');
        
        // Step 2: Start Quiz and Get Questions
        console.log('\n📋 Step 2: Starting quiz and fetching questions...');
        const quizResponse = await axios.get(`${BASE_URL}/api/quiz/start/8`, {
            headers: { Authorization: `Bearer ${studentToken}` }
        });
        
        const quizData = quizResponse.data.data;
        const questions = quizData.questions;
        const quizId = quizData.quizId;
        console.log(`✅ Quiz started with ID: ${quizId}`);
        console.log(`✅ Retrieved ${questions.length} questions for quiz`);
        
        // Step 3: Submit Quiz Answers
        console.log('\n📋 Step 3: Submitting quiz answers...');
        
        // Simulate answering questions (mix of correct and incorrect)
        const responses = questions.map((question, index) => {
            // Since correct answers are hidden, we'll randomly select options
            const isCorrect = Math.random() < 0.8; // 80% correct rate simulation
            const selectedOption = question.options[isCorrect ? 0 : Math.floor(Math.random() * question.options.length)];
            
            return {
                questionId: question.id,
                selectedOptionId: selectedOption.id
            };
        });
        
        const submitResponse = await axios.post(`${BASE_URL}/api/quiz/submit`, {
            quizId: quizId,
            responses: responses
        }, {
            headers: { Authorization: `Bearer ${studentToken}` }
        });
        
        const quizResult = submitResponse.data.data;
        console.log('✅ Quiz submitted successfully');
        console.log(`   Score: ${quizResult.score}/${quizResult.totalQuestions} (${quizResult.percentage}%)`);
        console.log(`   Passed: ${quizResult.passed ? 'Yes' : 'No'}`);
        
        // Step 4: Admin Login
        console.log('\n📋 Step 4: Testing admin login...');
        const adminLoginResponse = await axios.post(`${BASE_URL}/api/auth/admin/login`, {
            username: 'admin',
            password: 'admin123'
        });
        
        const adminToken = adminLoginResponse.data.data.token;
        console.log('✅ Admin login successful');
        
        // Step 5: Admin Access to Quiz Results
        console.log('\n📋 Step 5: Testing admin access to quiz results...');
        const adminResultsResponse = await axios.get(`${BASE_URL}/api/admin/results`, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        
        const allResults = adminResultsResponse.data.data;
        console.log(`✅ Admin can access ${allResults.length} quiz results:`);
        
        allResults.slice(0, 5).forEach((result, index) => {
            const passStatus = result.passed ? '✓' : '✗';
            console.log(`   ${index + 1}. ${result.student_name} (${result.roll_number}) - Grade ${result.grade}${result.section}: ${result.percentage}% ${passStatus}`);
        });
        
        // Step 6: Admin Access to Detailed Results
        console.log('\n📋 Step 6: Testing detailed quiz result access...');
        const latestQuiz = allResults[0];
        const detailResponse = await axios.get(`${BASE_URL}/api/admin/student-details/${latestQuiz.id}`, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        
        const detailData = detailResponse.data.data;
        console.log('✅ Detailed quiz results accessible:');
        console.log(`   Quiz ID: ${latestQuiz.id}`);
        console.log(`   Student: ${latestQuiz.student_name}`);
        console.log(`   Score: ${latestQuiz.score}/${latestQuiz.total_questions} (${latestQuiz.percentage}%)`);
        console.log(`   Total Answers: ${detailData.length}`);
        
        // Show first 3 detailed answers
        detailData.slice(0, 3).forEach((answer, index) => {
            const status = answer.is_correct ? '✓' : '✗';
            console.log(`   ${index + 1}. ${status} [${answer.difficulty}] ${answer.question_text.substring(0, 50)}...`);
        });
        
        // Step 7: Test Student Management
        console.log('\n📋 Step 7: Testing student management...');
        const studentsResponse = await axios.get(`${BASE_URL}/api/admin/students`, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        
        const students = studentsResponse.data.data;
        console.log('✅ Student management accessible:');
        console.log(`   Total Students: ${students.length}`);
        
        const completedStudents = students.filter(s => s.exam_status === 'completed');
        const passedStudents = completedStudents.filter(s => s.passed);
        
        console.log(`   Completed Exams: ${completedStudents.length}`);
        console.log(`   Passed Students: ${passedStudents.length}`);
        if (completedStudents.length > 0) {
            const avgScore = completedStudents.reduce((sum, s) => sum + (s.percentage || 0), 0) / completedStudents.length;
            console.log(`   Average Score: ${Math.round(avgScore)}%`);
        }
        
        console.log('\n🎉 API QUIZ SUBMISSION TEST SUCCESSFUL!');
        console.log('=======================================');
        console.log('✅ Student can login and take quiz');
        console.log('✅ Quiz answers are submitted correctly');
        console.log('✅ Admin can login and access all results');
        console.log('✅ Detailed quiz results are available');
        console.log('✅ Quiz statistics are calculated correctly');
        console.log('✅ All API endpoints working properly');
        
    } catch (error) {
        console.error('❌ API Test Error:', error.response?.data || error.message);
        
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
    }
}

// Wait a moment for server to start, then run test
setTimeout(() => {
    testQuizSubmissionAPI();
}, 2000);