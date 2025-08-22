const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Test configuration
const BASE_URL = 'http://localhost:8000';
const TEST_TIMEOUT = 30000;

let server;
let testResults = {
    passed: 0,
    failed: 0,
    tests: []
};

// Helper function to log test results
function logTest(name, passed, message = '') {
    const status = passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${status}: ${name}${message ? ' - ' + message : ''}`);
    
    testResults.tests.push({ name, passed, message });
    if (passed) testResults.passed++;
    else testResults.failed++;
}

// Start server for testing
async function startServer() {
    console.log('🚀 Starting server for testing...');
    
    const { spawn } = require('child_process');
    server = spawn('node', ['server/index.js'], {
        cwd: __dirname,
        env: { ...process.env, NODE_ENV: 'test' }
    });
    
    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    try {
        const response = await axios.get(`${BASE_URL}/api/health`);
        if (response.status === 200) {
            console.log('✅ Server started successfully');
            return true;
        }
    } catch (error) {
        console.log('❌ Server failed to start');
        return false;
    }
}

// Stop server
function stopServer() {
    if (server) {
        server.kill();
        console.log('🛑 Server stopped');
    }
}

// Test database connectivity
async function testDatabase() {
    console.log('\n📊 Testing Database...');
    
    try {
        const response = await axios.get(`${BASE_URL}/api/health`);
        const health = response.data;
        
        logTest('Database Connection', health.database?.connected === true);
        logTest('Questions Available', health.questions?.total > 0, `${health.questions?.total || 0} questions`);
        logTest('Database Status', health.questions?.status === 'Ready');
        
    } catch (error) {
        logTest('Database Connection', false, error.message);
    }
}

// Test student registration
async function testStudentRegistration() {
    console.log('\n👥 Testing Student Registration...');
    
    const testStudent = {
        name: 'Test Student',
        rollNumber: 99,
        grade: 6,
        section: 'A',
        password: 'test123'
    };
    
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/register`, testStudent);
        logTest('Student Registration', response.status === 201);
        
        // Test duplicate registration
        try {
            await axios.post(`${BASE_URL}/api/auth/register`, testStudent);
            logTest('Duplicate Registration Prevention', false);
        } catch (error) {
            logTest('Duplicate Registration Prevention', error.response?.status === 400);
        }
        
    } catch (error) {
        logTest('Student Registration', false, error.message);
    }
}

// Test student login
async function testStudentLogin() {
    console.log('\n🔐 Testing Student Authentication...');
    
    const loginData = {
        rollNumber: 99,
        grade: 6,
        section: 'A',
        password: 'test123'
    };
    
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/login`, loginData);
        logTest('Student Login', response.status === 200 && response.data.token);
        
        if (response.data.token) {
            global.studentToken = response.data.token;
        }
        
    } catch (error) {
        logTest('Student Login', false, error.message);
    }
}

// Test admin login
async function testAdminLogin() {
    console.log('\n👨‍💼 Testing Admin Authentication...');
    
    const adminData = {
        username: 'admin',
        password: 'admin123'
    };
    
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/admin/login`, adminData);
        logTest('Admin Login', response.status === 200 && response.data.token);
        
        if (response.data.token) {
            global.adminToken = response.data.token;
        }
        
    } catch (error) {
        logTest('Admin Login', false, error.message);
    }
}

// Test quiz functionality
async function testQuizFunctionality() {
    console.log('\n📝 Testing Quiz System...');
    
    if (!global.studentToken) {
        logTest('Quiz Start', false, 'No student token available');
        return;
    }
    
    try {
        // Test quiz start
        const startResponse = await axios.post(`${BASE_URL}/api/quiz/start`, {}, {
            headers: { Authorization: `Bearer ${global.studentToken}` }
        });
        
        logTest('Quiz Start', startResponse.status === 200 && startResponse.data.success);
        
        if (startResponse.data.success) {
            const { quizId, questions } = startResponse.data.data;
            logTest('Quiz Questions Generated', questions && questions.length > 0, `${questions.length} questions`);
            
            // Test quiz submission with sample answers
            const answers = questions.slice(0, Math.min(10, questions.length)).map(q => ({
                questionId: q.id,
                selectedOptionId: q.options[0]?.id
            }));
            
            // For testing, we'll submit partial answers
            if (answers.length > 0) {
                try {
                    const submitResponse = await axios.post(`${BASE_URL}/api/quiz/submit`, {
                        quizId,
                        answers: answers.concat(Array(50 - answers.length).fill(answers[0])), // Fill to 50
                        startTime: new Date().toISOString()
                    }, {
                        headers: { Authorization: `Bearer ${global.studentToken}` }
                    });
                    
                    logTest('Quiz Submission', submitResponse.status === 200);
                    logTest('Results Privacy', !submitResponse.data.score, 'Score hidden from student');
                    
                } catch (error) {
                    logTest('Quiz Submission', false, error.response?.data?.error || error.message);
                }
            }
        }
        
    } catch (error) {
        logTest('Quiz Start', false, error.response?.data?.error || error.message);
    }
}

// Test admin dashboard
async function testAdminDashboard() {
    console.log('\n📊 Testing Admin Dashboard...');
    
    if (!global.adminToken) {
        logTest('Admin Dashboard', false, 'No admin token available');
        return;
    }
    
    try {
        // Test dashboard data
        const dashboardResponse = await axios.get(`${BASE_URL}/api/admin/dashboard`, {
            headers: { Authorization: `Bearer ${global.adminToken}` }
        });
        
        logTest('Admin Dashboard Access', dashboardResponse.status === 200);
        
        // Test results access
        const resultsResponse = await axios.get(`${BASE_URL}/api/admin/results`, {
            headers: { Authorization: `Bearer ${global.adminToken}` }
        });
        
        logTest('Admin Results Access', resultsResponse.status === 200);
        logTest('Results Data Structure', Array.isArray(resultsResponse.data.results));
        
        // Test results summary
        const summaryResponse = await axios.get(`${BASE_URL}/api/admin/results-summary`, {
            headers: { Authorization: `Bearer ${global.adminToken}` }
        });
        
        logTest('Results Summary', summaryResponse.status === 200);
        
    } catch (error) {
        logTest('Admin Dashboard', false, error.response?.data?.error || error.message);
    }
}

// Test question management
async function testQuestionManagement() {
    console.log('\n❓ Testing Question Management...');
    
    if (!global.adminToken) {
        logTest('Question Management', false, 'No admin token available');
        return;
    }
    
    try {
        // Test getting questions
        const questionsResponse = await axios.get(`${BASE_URL}/api/admin/questions`, {
            headers: { Authorization: `Bearer ${global.adminToken}` }
        });
        
        logTest('Questions Retrieval', questionsResponse.status === 200);
        logTest('Questions Data Structure', questionsResponse.data.questions && Array.isArray(questionsResponse.data.questions));
        
        // Test question counts
        const countsResponse = await axios.get(`${BASE_URL}/api/admin/question-counts`, {
            headers: { Authorization: `Bearer ${global.adminToken}` }
        });
        
        logTest('Question Counts', countsResponse.status === 200);
        
    } catch (error) {
        logTest('Question Management', false, error.response?.data?.error || error.message);
    }
}

// Test security
async function testSecurity() {
    console.log('\n🔒 Testing Security...');
    
    try {
        // Test unauthorized access to admin endpoints
        try {
            await axios.get(`${BASE_URL}/api/admin/dashboard`);
            logTest('Admin Endpoint Security', false, 'Unauthorized access allowed');
        } catch (error) {
            logTest('Admin Endpoint Security', error.response?.status === 401);
        }
        
        // Test unauthorized access to results
        try {
            await axios.get(`${BASE_URL}/api/admin/results`);
            logTest('Results Security', false, 'Unauthorized access to results');
        } catch (error) {
            logTest('Results Security', error.response?.status === 401);
        }
        
    } catch (error) {
        logTest('Security Tests', false, error.message);
    }
}

// Main test runner
async function runAllTests() {
    console.log('🧪 Starting Comprehensive Functionality Tests\n');
    console.log('=' .repeat(50));
    
    const startTime = Date.now();
    
    try {
        // Start server
        const serverStarted = await startServer();
        if (!serverStarted) {
            console.log('❌ Cannot run tests - server failed to start');
            return;
        }
        
        // Run all tests
        await testDatabase();
        await testStudentRegistration();
        await testStudentLogin();
        await testAdminLogin();
        await testQuizFunctionality();
        await testAdminDashboard();
        await testQuestionManagement();
        await testSecurity();
        
    } catch (error) {
        console.error('❌ Test execution failed:', error.message);
    } finally {
        stopServer();
    }
    
    // Generate test report
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    console.log('\n' + '=' .repeat(50));
    console.log('📋 TEST SUMMARY');
    console.log('=' .repeat(50));
    console.log(`✅ Passed: ${testResults.passed}`);
    console.log(`❌ Failed: ${testResults.failed}`);
    console.log(`⏱️  Duration: ${duration}s`);
    console.log(`📊 Success Rate: ${Math.round((testResults.passed / (testResults.passed + testResults.failed)) * 100)}%`);
    
    if (testResults.failed === 0) {
        console.log('\n🎉 ALL TESTS PASSED! Ready for GitHub deployment.');
    } else {
        console.log('\n⚠️  Some tests failed. Please review before deployment.');
    }
    
    // Save test report
    const report = {
        timestamp: new Date().toISOString(),
        duration,
        results: testResults,
        summary: {
            total: testResults.passed + testResults.failed,
            passed: testResults.passed,
            failed: testResults.failed,
            successRate: Math.round((testResults.passed / (testResults.passed + testResults.failed)) * 100)
        }
    };
    
    fs.writeFileSync(path.join(__dirname, 'test-report.json'), JSON.stringify(report, null, 2));
    console.log('\n📄 Test report saved to test-report.json');
    
    return testResults.failed === 0;
}

// Run tests if called directly
if (require.main === module) {
    runAllTests().then(success => {
        process.exit(success ? 0 : 1);
    }).catch(error => {
        console.error('Test runner failed:', error);
        process.exit(1);
    });
}

module.exports = { runAllTests };