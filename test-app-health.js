const axios = require('axios');

const BASE_URL = 'https://tech-board.up.railway.app';

async function testAppHealth() {
    console.log('🔍 TESTING APP HEALTH AND FUNCTIONALITY');
    console.log('=======================================');
    console.log('');

    let allTestsPassed = true;
    const testResults = [];

    // Test 1: Basic Health Check
    try {
        console.log('1️⃣ Testing Basic Health Check...');
        const healthResponse = await axios.get(`${BASE_URL}/api/health`, { timeout: 10000 });
        
        if (healthResponse.status === 200) {
            console.log('✅ Health check passed');
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

    // Test 2: Frontend Loading
    try {
        console.log('');
        console.log('2️⃣ Testing Frontend Loading...');
        const frontendResponse = await axios.get(BASE_URL, { timeout: 10000 });
        
        if (frontendResponse.status === 200 && frontendResponse.data.includes('TECH BOARD')) {
            console.log('✅ Frontend loads successfully');
            testResults.push({ test: 'Frontend Loading', status: 'PASS' });
        } else {
            console.log('❌ Frontend loading failed');
            testResults.push({ test: 'Frontend Loading', status: 'FAIL' });
            allTestsPassed = false;
        }
    } catch (error) {
        console.log(`❌ Frontend loading failed: ${error.message}`);
        testResults.push({ test: 'Frontend Loading', status: 'FAIL', error: error.message });
        allTestsPassed = false;
    }

    // Test 3: Student Registration
    try {
        console.log('');
        console.log('3️⃣ Testing Student Registration...');
        const testStudent = {
            rollNumber: Math.floor(Math.random() * 80) + 1,
            grade: 6,
            section: 'A'
        };

        const registerResponse = await axios.post(`${BASE_URL}/api/auth/register`, testStudent, { timeout: 10000 });
        
        if (registerResponse.status === 201 && registerResponse.data.success) {
            console.log('✅ Student registration works');
            testResults.push({ test: 'Student Registration', status: 'PASS' });
            
            // Test 4: Student Login
            console.log('');
            console.log('4️⃣ Testing Student Login...');
            const loginResponse = await axios.post(`${BASE_URL}/api/auth/login`, {
                rollNumber: testStudent.rollNumber,
                grade: testStudent.grade,
                section: testStudent.section
            }, { timeout: 10000 });

            if (loginResponse.status === 200 && loginResponse.data.token) {
                console.log('✅ Student login works');
                testResults.push({ test: 'Student Login', status: 'PASS' });
                
                const token = loginResponse.data.token;

                // Test 5: Quiz Generation
                console.log('');
                console.log('5️⃣ Testing Quiz Generation...');
                const quizResponse = await axios.get(`${BASE_URL}/api/quiz/start`, {
                    headers: { Authorization: `Bearer ${token}` },
                    timeout: 10000
                });

                if (quizResponse.status === 200 && quizResponse.data.questions && quizResponse.data.questions.length === 25) {
                    console.log('✅ Quiz generation works (25 questions)');
                    testResults.push({ test: 'Quiz Generation', status: 'PASS' });

                    // Test 6: Question Format Validation
                    console.log('');
                    console.log('6️⃣ Testing Question Format...');
                    const firstQuestion = quizResponse.data.questions[0];
                    
                    if (firstQuestion.question_text && 
                        firstQuestion.options && 
                        firstQuestion.options.length === 4 &&
                        firstQuestion.grade === testStudent.grade) {
                        console.log('✅ Question format is correct');
                        testResults.push({ test: 'Question Format', status: 'PASS' });
                    } else {
                        console.log('❌ Question format is incorrect');
                        testResults.push({ test: 'Question Format', status: 'FAIL' });
                        allTestsPassed = false;
                    }

                } else {
                    console.log('❌ Quiz generation failed');
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

    // Test 7: Admin Login
    try {
        console.log('');
        console.log('7️⃣ Testing Admin Login...');
        const adminLoginResponse = await axios.post(`${BASE_URL}/api/admin/login`, {
            username: 'admin',
            password: 'TechBoard2025!'
        }, { timeout: 10000 });

        if (adminLoginResponse.status === 200 && adminLoginResponse.data.token) {
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

    // Test 8: Database Connectivity
    try {
        console.log('');
        console.log('8️⃣ Testing Database Connectivity...');
        const statsResponse = await axios.get(`${BASE_URL}/api/admin/stats`, { timeout: 10000 });
        
        if (statsResponse.status === 200) {
            console.log('✅ Database connectivity works');
            testResults.push({ test: 'Database Connectivity', status: 'PASS' });
        } else {
            console.log('❌ Database connectivity failed');
            testResults.push({ test: 'Database Connectivity', status: 'FAIL' });
            allTestsPassed = false;
        }
    } catch (error) {
        console.log(`❌ Database connectivity failed: ${error.message}`);
        testResults.push({ test: 'Database Connectivity', status: 'FAIL', error: error.message });
        allTestsPassed = false;
    }

    // Summary
    console.log('');
    console.log('📊 TEST RESULTS SUMMARY:');
    console.log('========================');
    
    testResults.forEach((result, index) => {
        const status = result.status === 'PASS' ? '✅' : '❌';
        console.log(`${status} ${index + 1}. ${result.test}: ${result.status}`);
        if (result.error) {
            console.log(`   Error: ${result.error}`);
        }
    });

    console.log('');
    console.log('🎯 OVERALL SYSTEM STATUS:');
    console.log('=========================');
    
    if (allTestsPassed) {
        console.log('🎉 SUCCESS: ALL TESTS PASSED!');
        console.log('✅ App is running smoothly');
        console.log('✅ All core functionality working');
        console.log('✅ Ready for TECH BOARD 2025');
        console.log('');
        console.log('🌐 Live System: https://tech-board.up.railway.app');
        console.log('🔐 Admin Access: https://tech-board.up.railway.app/admin');
    } else {
        console.log('⚠️  SOME TESTS FAILED');
        console.log('❌ App may have issues');
        console.log('🔧 Requires attention before production use');
    }
}

testAppHealth().catch(console.error);