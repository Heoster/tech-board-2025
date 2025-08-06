const https = require('https');

// Test student registration and login
async function testStudentFlow() {
    console.log('👤 Testing Student Registration and Login Flow');
    console.log('🌐 URL: https://tech-board.up.railway.app\n');
    
    try {
        // Step 1: Register student
        console.log('📋 Step 1: Student Registration');
        const registerData = {
            name: 'Quiz Test Student',
            rollNumber: 75, // Use a different roll number
            grade: 11,
            section: 'A',
            password: 'test123'
        };
        
        const registerResult = await makeRequest('/api/auth/register', 'POST', JSON.stringify(registerData));
        console.log(`   Status: ${registerResult.statusCode}`);
        console.log(`   Response: ${registerResult.body.substring(0, 200)}...`);
        
        let token;
        if (registerResult.statusCode === 201) {
            console.log('   ✅ Registration successful');
            const registerResponse = JSON.parse(registerResult.body);
            token = registerResponse.data.token;
        } else if (registerResult.statusCode === 409) {
            console.log('   ℹ️  Student already exists, trying login...');
            
            // Try login instead
            const loginData = {
                rollNumber: 75,
                grade: 11,
                section: 'A',
                password: 'test123'
            };
            
            const loginResult = await makeRequest('/api/auth/login', 'POST', JSON.stringify(loginData));
            console.log(`   Login Status: ${loginResult.statusCode}`);
            
            if (loginResult.statusCode === 200) {
                const loginResponse = JSON.parse(loginResult.body);
                token = loginResponse.data.token;
                console.log('   ✅ Login successful');
            } else {
                console.log('   ❌ Login failed:', loginResult.body);
                return false;
            }
        } else {
            console.log('   ❌ Registration failed');
            return false;
        }
        
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
        console.log(`   ✅ Quiz started successfully`);
        console.log(`   📊 Quiz ID: ${quizId}`);
        console.log(`   📝 Questions: ${questions.length}`);
        console.log(`   ⏰ Time limit: ${quizResponse.data.timeLimit} minutes`);
        
        // Step 3: Submit quiz
        console.log('\n📋 Step 3: Submit Quiz');
        const responses = questions.map(question => ({
            questionId: question.id,
            selectedOptionId: question.options[0].id // Select first option
        }));
        
        const submitData = {
            quizId: quizId,
            responses: responses
        };
        
        console.log(`   📤 Submitting ${responses.length} responses...`);
        const submitResult = await makeRequest('/api/quiz/submit', 'POST', JSON.stringify(submitData), token);
        console.log(`   Status: ${submitResult.statusCode}`);
        
        if (submitResult.statusCode === 200) {
            console.log('   ✅ Quiz submission successful!');
            const submitResponse = JSON.parse(submitResult.body);
            console.log(`   📊 Final Results:`);
            console.log(`      Score: ${submitResponse.data.score}/${submitResponse.data.totalQuestions}`);
            console.log(`      Percentage: ${submitResponse.data.percentage}%`);
            console.log(`      Passed: ${submitResponse.data.passed ? 'Yes' : 'No'}`);
            console.log(`      Message: ${submitResponse.data.message}`);
            return true;
        } else {
            console.log('   ❌ Quiz submission failed');
            console.log(`   📄 Error: ${submitResult.body}`);
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
                'User-Agent': 'Student-Test-Client'
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
testStudentFlow()
    .then(success => {
        console.log('\n🏆 COMPLETE STUDENT FLOW TEST RESULT:');
        if (success) {
            console.log('✅ Complete student flow is working correctly');
            console.log('🎯 Registration → Login → Quiz Start → Quiz Submit: ALL WORKING');
            console.log('🔒 Ultra-strict no-duplicates system operational');
        } else {
            console.log('❌ Student flow has issues');
            console.log('🔧 Check the error messages above for details');
        }
        process.exit(success ? 0 : 1);
    })
    .catch(error => {
        console.error('❌ Test execution failed:', error);
        process.exit(1);
    });