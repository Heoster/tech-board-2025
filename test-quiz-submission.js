const https = require('https');

// Test quiz submission flow on Railway
async function testQuizSubmission() {
    console.log('🧪 Testing Quiz Submission Flow on Railway');
    console.log('🌐 URL: https://tech-board.up.railway.app\n');
    
    try {
        // Step 1: Login as student
        console.log('📋 Step 1: Student Login');
        const loginData = {
            rollNumber: 50,
            grade: 11,
            section: 'A',
            password: 'test123'
        };
        
        const loginResult = await makeRequest('/api/auth/login', 'POST', JSON.stringify(loginData));
        console.log(`   Status: ${loginResult.statusCode}`);
        
        if (loginResult.statusCode !== 200) {
            console.log('❌ Login failed:', loginResult.body);
            return false;
        }
        
        const loginResponse = JSON.parse(loginResult.body);
        const token = loginResponse.data.token;
        console.log('   ✅ Login successful, token received');
        
        // Step 2: Start quiz
        console.log('\n📋 Step 2: Start Quiz');
        const quizResult = await makeRequest('/api/quiz/start/11', 'GET', null, token);
        console.log(`   Status: ${quizResult.statusCode}`);
        
        if (quizResult.statusCode !== 200) {
            console.log('❌ Quiz start failed:', quizResult.body);
            return false;
        }
        
        const quizResponse = JSON.parse(quizResult.body);
        const quizId = quizResponse.data.quizId;
        const questions = quizResponse.data.questions;
        console.log(`   ✅ Quiz started, ID: ${quizId}, Questions: ${questions.length}`);
        
        // Step 3: Submit quiz with sample answers
        console.log('\n📋 Step 3: Submit Quiz');
        const responses = questions.map(question => ({
            questionId: question.id,
            selectedOptionId: question.options[0].id // Select first option for all questions
        }));
        
        const submitData = {
            quizId: quizId,
            responses: responses
        };
        
        const submitResult = await makeRequest('/api/quiz/submit', 'POST', JSON.stringify(submitData), token);
        console.log(`   Status: ${submitResult.statusCode}`);
        console.log(`   Response: ${submitResult.body}`);
        
        if (submitResult.statusCode === 200) {
            console.log('   ✅ Quiz submission successful!');
            const submitResponse = JSON.parse(submitResult.body);
            console.log(`   📊 Score: ${submitResponse.data.score}/${submitResponse.data.totalQuestions}`);
            console.log(`   📈 Percentage: ${submitResponse.data.percentage}%`);
            console.log(`   🎯 Passed: ${submitResponse.data.passed ? 'Yes' : 'No'}`);
            return true;
        } else {
            console.log('❌ Quiz submission failed');
            return false;
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        return false;
    }
}

function makeRequest(path, method = 'GET', body = null, token = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'tech-board.up.railway.app',
            port: 443,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Quiz-Test-Client'
            }
        };
        
        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }
        
        if (body) {
            options.headers['Content-Length'] = Buffer.byteLength(body);
        }
        
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
        });
        
        req.on('error', reject);
        req.setTimeout(15000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
        
        if (body) req.write(body);
        req.end();
    });
}

// Run the test
testQuizSubmission()
    .then(success => {
        console.log('\n🏆 QUIZ SUBMISSION TEST RESULT:');
        if (success) {
            console.log('✅ Quiz submission is working correctly on Railway');
            console.log('🎯 Students should be able to submit tests successfully');
        } else {
            console.log('❌ Quiz submission has issues');
            console.log('🔧 Check the error messages above for details');
        }
        process.exit(success ? 0 : 1);
    })
    .catch(error => {
        console.error('❌ Test execution failed:', error);
        process.exit(1);
    });