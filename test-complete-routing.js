#!/usr/bin/env node

const axios = require('axios');

console.log('🧪 Testing Complete Routing for Tech Board 2025');
console.log('===============================================');

const BASE_URL = process.env.TEST_URL || 'http://localhost:8080';
let adminToken = null;
let studentToken = null;

// Test configuration
const testConfig = {
    timeout: 10000,
    retries: 3
};

// Helper function to make requests with retry
async function makeRequest(config, retries = testConfig.retries) {
    try {
        const response = await axios({
            ...config,
            timeout: testConfig.timeout
        });
        return response;
    } catch (error) {
        if (retries > 0 && (error.code === 'ECONNREFUSED' || error.code === 'TIMEOUT')) {
            console.log(`⏳ Retrying request... (${retries} attempts left)`);
            await new Promise(resolve => setTimeout(resolve, 2000));
            return makeRequest(config, retries - 1);
        }
        throw error;
    }
}

// Test functions
async function testHealthEndpoints() {
    console.log('\n🏥 Testing Health Endpoints...');
    
    try {
        // Test /health
        const healthResponse = await makeRequest({
            method: 'GET',
            url: `${BASE_URL}/health`
        });
        
        if (healthResponse.status === 200 && healthResponse.data.status === 'OK') {
            console.log('✅ /health endpoint working');
        } else {
            console.log('❌ /health endpoint failed');
            return false;
        }
        
        // Test /api/health
        const apiHealthResponse = await makeRequest({
            method: 'GET',
            url: `${BASE_URL}/api/health`
        });
        
        if (apiHealthResponse.status === 200 && apiHealthResponse.data.status === 'OK') {
            console.log('✅ /api/health endpoint working');
            console.log(`   Database: ${apiHealthResponse.data.database.connected ? 'Connected' : 'Disconnected'}`);
            console.log(`   Questions: ${apiHealthResponse.data.questions.total}`);
        } else {
            console.log('❌ /api/health endpoint failed');
            return false;
        }
        
        return true;
    } catch (error) {
        console.log('❌ Health endpoints failed:', error.message);
        return false;
    }
}

async function testApiInfo() {
    console.log('\n📋 Testing API Info...');
    
    try {
        const response = await makeRequest({
            method: 'GET',
            url: `${BASE_URL}/api`
        });
        
        if (response.status === 200 && response.data.message.includes('Tech Board 2025')) {
            console.log('✅ /api endpoint working');
            console.log(`   Available endpoints: ${response.data.endpoints.length}`);
            return true;
        } else {
            console.log('❌ /api endpoint failed');
            return false;
        }
    } catch (error) {
        console.log('❌ API info failed:', error.message);
        return false;
    }
}

async function testAdminLogin() {
    console.log('\n👨‍💼 Testing Admin Login...');
    
    try {
        const response = await makeRequest({
            method: 'POST',
            url: `${BASE_URL}/api/auth/admin/login`,
            data: {
                username: 'admin',
                password: 'admin123'
            }
        });
        
        if (response.status === 200 && response.data.success && response.data.token) {
            console.log('✅ Admin login working');
            adminToken = response.data.token;
            console.log(`   Token received: ${adminToken.substring(0, 20)}...`);
            return true;
        } else {
            console.log('❌ Admin login failed');
            return false;
        }
    } catch (error) {
        console.log('❌ Admin login failed:', error.response?.data?.error || error.message);
        return false;
    }
}

async function testStudentRegistration() {
    console.log('\n👨‍🎓 Testing Student Registration...');
    
    const testStudent = {
        name: 'Test Student',
        rollNumber: Math.floor(Math.random() * 1000) + 1,
        grade: 6,
        section: 'A',
        password: 'test123'
    };
    
    try {
        const response = await makeRequest({
            method: 'POST',
            url: `${BASE_URL}/api/auth/register`,
            data: testStudent
        });
        
        if (response.status === 201 && response.data.success && response.data.token) {
            console.log('✅ Student registration working');
            studentToken = response.data.token;
            console.log(`   Student registered: ${testStudent.name} (Roll: ${testStudent.rollNumber})`);
            return { success: true, student: testStudent };
        } else {
            console.log('❌ Student registration failed');
            return { success: false };
        }
    } catch (error) {
        console.log('❌ Student registration failed:', error.response?.data?.error || error.message);
        return { success: false };
    }
}

async function testStudentLogin(student) {
    console.log('\n🔐 Testing Student Login...');
    
    try {
        const response = await makeRequest({
            method: 'POST',
            url: `${BASE_URL}/api/auth/login`,
            data: {
                rollNumber: student.rollNumber,
                grade: student.grade,
                section: student.section,
                password: student.password
            }
        });
        
        if (response.status === 200 && response.data.success && response.data.token) {
            console.log('✅ Student login working');
            studentToken = response.data.token;
            return true;
        } else {
            console.log('❌ Student login failed');
            return false;
        }
    } catch (error) {
        console.log('❌ Student login failed:', error.response?.data?.error || error.message);
        return false;
    }
}

async function testQuizStart() {
    console.log('\n🎯 Testing Quiz Start...');
    
    if (!studentToken) {
        console.log('❌ No student token available for quiz test');
        return { success: false };
    }
    
    try {
        const response = await makeRequest({
            method: 'POST',
            url: `${BASE_URL}/api/quiz/start`,
            headers: {
                'Authorization': `Bearer ${studentToken}`
            },
            data: {
                grade: 6
            }
        });
        
        if (response.status === 200 && response.data.success && response.data.data.questions) {
            console.log('✅ Quiz start working');
            console.log(`   Questions received: ${response.data.data.questions.length}`);
            console.log(`   Quiz ID: ${response.data.data.quizId}`);
            console.log(`   Time limit: ${response.data.data.timeLimit / 60000} minutes`);
            return { success: true, quiz: response.data.data };
        } else {
            console.log('❌ Quiz start failed');
            return { success: false };
        }
    } catch (error) {
        console.log('❌ Quiz start failed:', error.response?.data?.error || error.message);
        return { success: false };
    }
}

async function testQuizSubmit(quiz) {
    console.log('\n📝 Testing Quiz Submit...');
    
    if (!quiz || !quiz.questions) {
        console.log('❌ No quiz data available for submit test');
        return false;
    }
    
    // Create sample answers (first option for each question)
    const answers = quiz.questions.slice(0, 10).map(question => ({
        questionId: question.id,
        selectedOptionId: question.options[0]?.id || null
    }));
    
    try {
        const response = await makeRequest({
            method: 'POST',
            url: `${BASE_URL}/api/quiz/submit`,
            headers: {
                'Authorization': `Bearer ${studentToken}`
            },
            data: {
                quizId: quiz.quizId,
                answers: answers,
                startTime: quiz.startTime
            }
        });
        
        if (response.status === 200 && response.data.success) {
            console.log('✅ Quiz submit working');
            console.log(`   Status: ${response.data.status}`);
            console.log(`   Message: ${response.data.message}`);
            return true;
        } else {
            console.log('❌ Quiz submit failed');
            return false;
        }
    } catch (error) {
        console.log('❌ Quiz submit failed:', error.response?.data?.error || error.message);
        return false;
    }
}

async function testAdminDashboard() {
    console.log('\n📊 Testing Admin Dashboard...');
    
    if (!adminToken) {
        console.log('❌ No admin token available for dashboard test');
        return false;
    }
    
    try {
        const response = await makeRequest({
            method: 'GET',
            url: `${BASE_URL}/api/admin/dashboard`,
            headers: {
                'Authorization': `Bearer ${adminToken}`
            }
        });
        
        if (response.status === 200 && response.data.success) {
            console.log('✅ Admin dashboard working');
            console.log(`   Total Students: ${response.data.totalStudents}`);
            console.log(`   Total Questions: ${response.data.totalQuestions}`);
            console.log(`   Total Quizzes: ${response.data.totalQuizzes}`);
            return true;
        } else {
            console.log('❌ Admin dashboard failed');
            return false;
        }
    } catch (error) {
        console.log('❌ Admin dashboard failed:', error.response?.data?.error || error.message);
        return false;
    }
}

async function testAdminResults() {
    console.log('\n📈 Testing Admin Results...');
    
    if (!adminToken) {
        console.log('❌ No admin token available for results test');
        return false;
    }
    
    try {
        const response = await makeRequest({
            method: 'GET',
            url: `${BASE_URL}/api/admin/results`,
            headers: {
                'Authorization': `Bearer ${adminToken}`
            }
        });
        
        if (response.status === 200 && response.data.success) {
            console.log('✅ Admin results working');
            console.log(`   Results found: ${response.data.results.length}`);
            return true;
        } else {
            console.log('❌ Admin results failed');
            return false;
        }
    } catch (error) {
        console.log('❌ Admin results failed:', error.response?.data?.error || error.message);
        return false;
    }
}

async function testStaticFileServing() {
    console.log('\n🌐 Testing Static File Serving...');
    
    try {
        const response = await makeRequest({
            method: 'GET',
            url: `${BASE_URL}/`
        });
        
        if (response.status === 200 && (response.data.includes('Techno Board Selection Test 2025') || response.data.includes('root'))) {
            console.log('✅ Static file serving working');
            console.log('   Landing page loads correctly');
            return true;
        } else {
            console.log('❌ Static file serving failed - Expected React app HTML');
            console.log('   Response length:', response.data.length);
            return false;
        }
    } catch (error) {
        console.log('❌ Static file serving failed:', error.message);
        return false;
    }
}

async function testInvalidApiRoute() {
    console.log('\n🚫 Testing Invalid API Route Handling...');
    
    try {
        const response = await makeRequest({
            method: 'GET',
            url: `${BASE_URL}/api/nonexistent`
        });
        
        // Should return 404 for invalid API routes
        console.log('❌ Invalid API route should return 404');
        return false;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log('✅ Invalid API route handling working');
            console.log('   Returns 404 for non-existent API endpoints');
            return true;
        } else {
            console.log('❌ Invalid API route handling failed:', error.message);
            return false;
        }
    }
}

// Main test runner
async function runAllTests() {
    console.log(`🎯 Testing server at: ${BASE_URL}`);
    console.log('⏱️  Timeout per request: 10 seconds');
    console.log('🔄 Retries per request: 3');
    
    const results = {
        passed: 0,
        failed: 0,
        total: 0
    };
    
    const tests = [
        { name: 'Health Endpoints', fn: testHealthEndpoints },
        { name: 'API Info', fn: testApiInfo },
        { name: 'Admin Login', fn: testAdminLogin },
        { name: 'Student Registration', fn: testStudentRegistration },
        { name: 'Admin Dashboard', fn: testAdminDashboard },
        { name: 'Admin Results', fn: testAdminResults },
        { name: 'Static File Serving', fn: testStaticFileServing },
        { name: 'Invalid API Route', fn: testInvalidApiRoute }
    ];
    
    let student = null;
    let quiz = null;
    
    for (const test of tests) {
        results.total++;
        
        try {
            let result;
            
            if (test.name === 'Student Registration') {
                result = await test.fn();
                if (result.success) {
                    student = result.student;
                    results.passed++;
                } else {
                    results.failed++;
                }
            } else {
                result = await test.fn();
                if (result === true || (result && result.success)) {
                    results.passed++;
                } else {
                    results.failed++;
                }
            }
        } catch (error) {
            console.log(`❌ ${test.name} failed with error:`, error.message);
            results.failed++;
        }
    }
    
    // Additional tests that depend on previous results
    if (student) {
        console.log('\n🔄 Running dependent tests...');
        
        // Test student login
        results.total++;
        if (await testStudentLogin(student)) {
            results.passed++;
            
            // Test quiz start
            results.total++;
            const quizResult = await testQuizStart();
            if (quizResult.success) {
                results.passed++;
                quiz = quizResult.quiz;
                
                // Test quiz submit
                results.total++;
                if (await testQuizSubmit(quiz)) {
                    results.passed++;
                } else {
                    results.failed++;
                }
            } else {
                results.failed++;
            }
        } else {
            results.failed++;
        }
    }
    
    // Print final results
    console.log('\n' + '='.repeat(50));
    console.log('🎉 TEST RESULTS SUMMARY');
    console.log('='.repeat(50));
    console.log(`✅ Passed: ${results.passed}/${results.total}`);
    console.log(`❌ Failed: ${results.failed}/${results.total}`);
    console.log(`📊 Success Rate: ${Math.round((results.passed / results.total) * 100)}%`);
    
    if (results.failed === 0) {
        console.log('\n🎊 ALL TESTS PASSED! 🎊');
        console.log('✅ Frontend and Backend routing is working perfectly');
        console.log('✅ All API endpoints are functional');
        console.log('✅ Authentication system is working');
        console.log('✅ Quiz system is operational');
        console.log('✅ Admin features are accessible');
        console.log('✅ Static file serving is working');
        console.log('\n🚀 Application is ready for production deployment!');
        process.exit(0);
    } else {
        console.log('\n⚠️  Some tests failed. Please check the issues above.');
        console.log('🔧 Fix the failing components before deployment.');
        process.exit(1);
    }
}

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n\n⏹️  Test interrupted by user');
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// Start tests
runAllTests().catch(error => {
    console.error('❌ Test runner failed:', error.message);
    process.exit(1);
});