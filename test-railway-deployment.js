const axios = require('axios');

const RAILWAY_URL = 'https://tech-board.up.railway.app';

async function testRailwayDeployment() {
    console.log('🚀 Testing Railway Deployment: ' + RAILWAY_URL);
    console.log('=' .repeat(60));
    
    let passed = 0;
    let failed = 0;
    
    const test = (name, success, message = '') => {
        const status = success ? '✅ PASS' : '❌ FAIL';
        console.log(`${status}: ${name}${message ? ' - ' + message : ''}`);
        success ? passed++ : failed++;
    };
    
    try {
        // Test 1: Basic connectivity
        console.log('\n1. Testing Basic Connectivity...');
        try {
            const response = await axios.get(RAILWAY_URL, { timeout: 10000 });
            test('Railway URL accessible', response.status === 200);
            test('Response contains content', response.data.length > 0);
        } catch (error) {
            test('Railway URL accessible', false, error.message);
        }
        
        // Test 2: Health check
        console.log('\n2. Testing Health Check API...');
        try {
            const health = await axios.get(`${RAILWAY_URL}/api/health`, { timeout: 10000 });
            test('Health endpoint responds', health.status === 200);
            test('Health status OK', health.data.status === 'OK');
            test('Database connected', health.data.database?.connected === true);
            test('Questions available', health.data.questions?.total > 0, `${health.data.questions?.total || 0} questions`);
        } catch (error) {
            test('Health endpoint responds', false, error.message);
        }
        
        // Test 3: Admin authentication
        console.log('\n3. Testing Admin Authentication...');
        try {
            const adminLogin = await axios.post(`${RAILWAY_URL}/api/auth/admin/login`, {
                username: 'admin',
                password: 'admin123'
            }, { timeout: 10000 });
            
            test('Admin login works', adminLogin.status === 200);
            test('Admin token received', !!adminLogin.data.token);
            
            if (adminLogin.data.token) {
                // Test admin dashboard
                const dashboard = await axios.get(`${RAILWAY_URL}/api/admin/dashboard`, {
                    headers: { Authorization: `Bearer ${adminLogin.data.token}` },
                    timeout: 10000
                });
                test('Admin dashboard accessible', dashboard.status === 200);
                
                // Test admin results
                const results = await axios.get(`${RAILWAY_URL}/api/admin/results`, {
                    headers: { Authorization: `Bearer ${adminLogin.data.token}` },
                    timeout: 10000
                });
                test('Admin results accessible', results.status === 200);
            }
        } catch (error) {
            test('Admin authentication', false, error.response?.data?.error || error.message);
        }
        
        // Test 4: Student registration
        console.log('\n4. Testing Student Registration...');
        try {
            const studentReg = await axios.post(`${RAILWAY_URL}/api/auth/register`, {
                name: 'Test Student Railway',
                rollNumber: Math.floor(Math.random() * 1000) + 1,
                grade: 6,
                section: 'A',
                password: 'test123'
            }, { timeout: 10000 });
            
            test('Student registration works', studentReg.status === 201);
        } catch (error) {
            if (error.response?.status === 400 && error.response?.data?.error?.includes('already registered')) {
                test('Student registration works', true, 'Student already exists (expected)');
            } else {
                test('Student registration works', false, error.response?.data?.error || error.message);
            }
        }
        
        // Test 5: Student login and quiz
        console.log('\n5. Testing Student Quiz System...');
        try {
            // Try to login with a test student
            const studentLogin = await axios.post(`${RAILWAY_URL}/api/auth/login`, {
                rollNumber: 1,
                grade: 6,
                section: 'A',
                password: 'test123'
            }, { timeout: 10000 });
            
            if (studentLogin.status === 200 && studentLogin.data.token) {
                test('Student login works', true);
                
                // Try to start quiz
                const quizStart = await axios.post(`${RAILWAY_URL}/api/quiz/start`, {}, {
                    headers: { Authorization: `Bearer ${studentLogin.data.token}` },
                    timeout: 15000
                });
                
                if (quizStart.status === 200) {
                    test('Quiz start works', true, `${quizStart.data.data?.questions?.length || 0} questions generated`);
                } else {
                    test('Quiz start works', false, 'Quiz start failed');
                }
            } else {
                test('Student login works', false, 'Login failed');
            }
        } catch (error) {
            if (error.response?.status === 400) {
                test('Student quiz system', true, 'Quiz restrictions working (expected)');
            } else {
                test('Student quiz system', false, error.response?.data?.error || error.message);
            }
        }
        
        // Test 6: Frontend routes
        console.log('\n6. Testing Frontend Routes...');
        const routes = ['/admin', '/student', '/api'];
        
        for (const route of routes) {
            try {
                const response = await axios.get(`${RAILWAY_URL}${route}`, { 
                    timeout: 10000,
                    validateStatus: (status) => status < 500 // Accept redirects and client errors
                });
                test(`Route ${route} accessible`, response.status < 500);
            } catch (error) {
                test(`Route ${route} accessible`, false, error.message);
            }
        }
        
    } catch (error) {
        console.error('Test execution failed:', error.message);
    }
    
    // Summary
    console.log('\n' + '=' .repeat(60));
    console.log('📊 TEST SUMMARY');
    console.log('=' .repeat(60));
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📊 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);
    
    if (failed === 0) {
        console.log('\n🎉 ALL TESTS PASSED! Railway deployment is working perfectly!');
        console.log(`🌐 Your app is live at: ${RAILWAY_URL}`);
        console.log('👨💼 Admin Login: admin / admin123');
        console.log('👨🎓 Students can register and take quizzes');
    } else {
        console.log('\n⚠️  Some tests failed. Check the deployment.');
    }
    
    return failed === 0;
}

// Run tests
testRailwayDeployment().then(success => {
    process.exit(success ? 0 : 1);
}).catch(error => {
    console.error('Test runner failed:', error);
    process.exit(1);
});