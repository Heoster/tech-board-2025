const axios = require('axios');

const BASE_URL = 'http://localhost:8000';

async function testLocalApp() {
    console.log('🔍 TESTING LOCAL APP FUNCTIONALITY');
    console.log('==================================');
    console.log('');

    let allTestsPassed = true;
    const testResults = [];

    // Wait a bit for server to start
    console.log('⏳ Waiting for server to start...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Test 1: Basic Health Check
    try {
        console.log('1️⃣ Testing Basic Health Check...');
        const healthResponse = await axios.get(`${BASE_URL}/health`, { timeout: 5000 });
        
        if (healthResponse.status === 200) {
            console.log('✅ Health check passed');
            console.log(`   Response: ${JSON.stringify(healthResponse.data)}`);
            testResults.push({ test: 'Health Check', status: 'PASS' });
        } else {
            console.log('❌ Health check failed');
            testResults.push({ test: 'Health Check', status: 'FAIL' });
            allTestsPassed = false;
        }
    } catch (error) {
        console.log(`❌ Health check failed: ${error.message}`);
        testResults.push({ test: 'Health Check', status: 'FAIL', error: error.message });
        allTestsPassed = false;
    }

    // Test 2: Student Registration
    try {
        console.log('');
        console.log('2️⃣ Testing Student Registration...');
        const testStudent = {
            name: 'Test Student Local',
            rollNumber: Math.floor(Math.random() * 80) + 1,
            grade: 6,
            section: 'A',
            password: 'testpass123'
        };

        const registerResponse = await axios.post(`${BASE_URL}/api/auth/register`, testStudent, { timeout: 5000 });
        
        if (registerResponse.status === 201 && registerResponse.data.success) {
            console.log('✅ Student registration works');
            console.log(`   Student ID: ${registerResponse.data.data.student.id}`);
            testResults.push({ test: 'Student Registration', status: 'PASS' });
            
            // Test 3: Student Login
            console.log('');
            console.log('3️⃣ Testing Student Login...');
            const loginResponse = await axios.post(`${BASE_URL}/api/auth/login`, {
                rollNumber: testStudent.rollNumber,
                grade: testStudent.grade,
                section: testStudent.section,
                password: testStudent.password
            }, { timeout: 5000 });

            if (loginResponse.status === 200 && loginResponse.data.data.token) {
                console.log('✅ Student login works');
                testResults.push({ test: 'Student Login', status: 'PASS' });
                
                const token = loginResponse.data.data.token;

                // Test 4: Quiz Generation
                console.log('');
                console.log('4️⃣ Testing Quiz Generation...');
                const quizResponse = await axios.get(`${BASE_URL}/api/quiz/start`, {
                    headers: { Authorization: `Bearer ${token}` },
                    timeout: 5000
                });

                if (quizResponse.status === 200 && quizResponse.data.questions && quizResponse.data.questions.length === 25) {
                    console.log('✅ Quiz generation works (25 questions)');
                    console.log(`   Sample question: "${quizResponse.data.questions[0].question_text}"`);
                    testResults.push({ test: 'Quiz Generation', status: 'PASS' });
                } else {
                    console.log('❌ Quiz generation failed');
                    console.log('   Response:', quizResponse.data);
                    testResults.push({ test: 'Quiz Generation', status: 'FAIL' });
                    allTestsPassed = false;
                }

            } else {
                console.log('❌ Student login failed');
                testResults.push({ test: 'Student Login', status: 'FAIL' });
                allTestsPassed = false;
            }

        } else {
            console.log('❌ Student registration failed');
            testResults.push({ test: 'Student Registration', status: 'FAIL' });
            allTestsPassed = false;
        }
    } catch (error) {
        console.log(`❌ Student registration/login failed: ${error.message}`);
        testResults.push({ test: 'Student Registration/Login', status: 'FAIL', error: error.message });
        allTestsPassed = false;
    }

    // Test 5: Admin Login
    try {
        console.log('');
        console.log('5️⃣ Testing Admin Login...');
        const adminLoginResponse = await axios.post(`${BASE_URL}/api/auth/admin/login`, {
            username: 'admin',
            password: 'TechBoard2025!'
        }, { timeout: 5000 });

        if (adminLoginResponse.status === 200 && adminLoginResponse.data.data.token) {
            console.log('✅ Admin login works');
            testResults.push({ test: 'Admin Login', status: 'PASS' });
        } else {
            console.log('❌ Admin login failed');
            testResults.push({ test: 'Admin Login', status: 'FAIL' });
            allTestsPassed = false;
        }
    } catch (error) {
        console.log(`❌ Admin login failed: ${error.message}`);
        testResults.push({ test: 'Admin Login', status: 'FAIL', error: error.message });
        allTestsPassed = false;
    }

    // Summary
    console.log('');
    console.log('📊 LOCAL TEST RESULTS:');
    console.log('======================');
    
    testResults.forEach((result, index) => {
        const status = result.status === 'PASS' ? '✅' : '❌';
        console.log(`${status} ${index + 1}. ${result.test}: ${result.status}`);
    });

    console.log('');
    if (allTestsPassed) {
        console.log('🎉 SUCCESS: ALL LOCAL TESTS PASSED!');
        console.log('✅ App is working correctly locally');
        console.log('✅ Ready for Railway deployment');
    } else {
        console.log('⚠️  SOME LOCAL TESTS FAILED');
        console.log('❌ App has issues that need fixing');
    }
}

testLocalApp().catch(console.error);