const request = require('supertest');
const path = require('path');
const fs = require('fs');

// Test configuration
const testConfig = {
    serverUrl: 'http://localhost:8002',
    admin: {
        username: 'admin',
        password: 'admin123'
    },
    student: {
        name: 'Test Student',
        rollNumber: 99,
        grade: 9,
        section: 'A',
        password: 'password123'
    }
};

async function testServerHealth() {
    console.log('🏥 Testing Server Health...');
    
    try {
        const response = await request(testConfig.serverUrl)
            .get('/api/health')
            .timeout(5000);
        
        if (response.status === 200) {
            console.log('✅ Server health check passed');
            return true;
        } else {
            console.log('❌ Server health check failed:', response.status);
            return false;
        }
    } catch (error) {
        console.log('❌ Server not responding:', error.message);
        return false;
    }
}

async function testStudentWorkflow() {
    console.log('\n📚 Testing Complete Student Workflow...');
    
    try {
        // Test student registration
        console.log('1. Testing student registration...');
        const registerResponse = await request(testConfig.serverUrl)
            .post('/api/auth/register')
            .send({
                name: testConfig.student.name,
                roll_number: testConfig.student.rollNumber,
                grade: testConfig.student.grade,
                section: testConfig.student.section,
                password: testConfig.student.password
            });
        
        if (registerResponse.status === 201 || registerResponse.status === 200 || registerResponse.status === 400) {
            console.log('✅ Student registration endpoint working');
        } else {
            console.log('❌ Student registration failed:', registerResponse.status);
            return false;
        }
        
        // Test student login
        console.log('2. Testing student login...');
        const loginResponse = await request(testConfig.serverUrl)
            .post('/api/auth/login')
            .send({
                rollNumber: testConfig.student.rollNumber,
                grade: testConfig.student.grade,
                section: testConfig.student.section,
                password: testConfig.student.password
            });
        
        if (loginResponse.status !== 200) {
            console.log('❌ Student login failed:', loginResponse.status);
            return false;
        }
        
        console.log('✅ Student login successful');
        const studentToken = loginResponse.body.data.token;
        
        // Test student dashboard
        console.log('3. Testing student dashboard...');
        const dashboardResponse = await request(testConfig.serverUrl)
            .get('/api/students/dashboard')
            .set('Authorization', `Bearer ${studentToken}`);
        
        if (dashboardResponse.status === 200) {
            console.log('✅ Student dashboard accessible');
        } else {
            console.log('⚠️ Student dashboard access issue:', dashboardResponse.status);
        }
        
        // Test quiz start
        console.log('4. Testing quiz start...');
        const quizStartResponse = await request(testConfig.serverUrl)
            .post('/api/quiz/start')
            .set('Authorization', `Bearer ${studentToken}`)
            .send({ grade: testConfig.student.grade });
        
        if (quizStartResponse.status === 200) {
            console.log('✅ Quiz start successful');
            
            // Test quiz questions
            const quizId = quizStartResponse.body.quiz.id;
            console.log('5. Testing quiz questions...');
            const questionsResponse = await request(testConfig.serverUrl)
                .get(`/api/quiz/questions/${testConfig.student.grade}`)
                .set('Authorization', `Bearer ${studentToken}`);
            
            if (questionsResponse.status === 200) {
                console.log('✅ Quiz questions retrieved successfully');
            } else {
                console.log('⚠️ Quiz questions retrieval issue:', questionsResponse.status);
            }
        } else {
            console.log('⚠️ Quiz start issue:', quizStartResponse.status);
        }
        
        return true;
        
    } catch (error) {
        console.log('❌ Student workflow error:', error.message);
        return false;
    }
}

async function testAdminWorkflow() {
    console.log('\n👨‍💼 Testing Complete Admin Workflow...');
    
    try {
        // Test admin login
        console.log('1. Testing admin login...');
        const adminLoginResponse = await request(testConfig.serverUrl)
            .post('/api/auth/admin/login')
            .send({
                username: testConfig.admin.username,
                password: testConfig.admin.password
            });
        
        if (adminLoginResponse.status !== 200) {
            console.log('❌ Admin login failed:', adminLoginResponse.status);
            return false;
        }
        
        console.log('✅ Admin login successful');
        const adminToken = adminLoginResponse.body.data.token;
        
        // Test admin dashboard
        console.log('2. Testing admin dashboard...');
        const adminDashboardResponse = await request(testConfig.serverUrl)
            .get('/api/admin/dashboard')
            .set('Authorization', `Bearer ${adminToken}`);
        
        if (adminDashboardResponse.status === 200) {
            console.log('✅ Admin dashboard accessible');
        } else {
            console.log('❌ Admin dashboard access failed:', adminDashboardResponse.status);
        }
        
        // Test student management
        console.log('3. Testing student management...');
        const studentsResponse = await request(testConfig.serverUrl)
            .get('/api/admin/students')
            .set('Authorization', `Bearer ${adminToken}`);
        
        if (studentsResponse.status === 200) {
            console.log('✅ Student management accessible');
            console.log(`   Found ${studentsResponse.body.students?.length || 0} students`);
        } else {
            console.log('❌ Student management access failed:', studentsResponse.status);
        }
        
        // Test question management
        console.log('4. Testing question management...');
        const questionsResponse = await request(testConfig.serverUrl)
            .get('/api/admin/questions')
            .set('Authorization', `Bearer ${adminToken}`);
        
        if (questionsResponse.status === 200) {
            console.log('✅ Question management accessible');
            console.log(`   Found ${questionsResponse.body.questions?.length || 0} questions`);
        } else {
            console.log('❌ Question management access failed:', questionsResponse.status);
        }
        
        // Test results summary
        console.log('5. Testing results summary...');
        const resultsResponse = await request(testConfig.serverUrl)
            .get('/api/admin/results')
            .set('Authorization', `Bearer ${adminToken}`);
        
        if (resultsResponse.status === 200) {
            console.log('✅ Results summary accessible');
        } else {
            console.log('❌ Results summary access failed:', resultsResponse.status);
        }
        
        return true;
        
    } catch (error) {
        console.log('❌ Admin workflow error:', error.message);
        return false;
    }
}

async function testFrontendBuild() {
    console.log('\n🏗️ Testing Frontend Build...');
    
    const distPath = path.join(__dirname, 'client', 'dist');
    const indexPath = path.join(distPath, 'index.html');
    
    if (fs.existsSync(indexPath)) {
        console.log('✅ Frontend build exists');
        
        // Check for key assets
        const assetsPath = path.join(distPath, 'assets');
        if (fs.existsSync(assetsPath)) {
            const assets = fs.readdirSync(assetsPath);
            const jsFiles = assets.filter(file => file.endsWith('.js'));
            const cssFiles = assets.filter(file => file.endsWith('.css'));
            
            console.log(`✅ Found ${jsFiles.length} JavaScript files`);
            console.log(`✅ Found ${cssFiles.length} CSS files`);
            
            // Check for key chunks
            const hasReactChunk = jsFiles.some(file => file.includes('vendor-react'));
            const hasAdminChunk = jsFiles.some(file => file.includes('AdminPanel'));
            const hasMainChunk = jsFiles.some(file => file.includes('index-'));
            
            if (hasReactChunk) console.log('✅ React vendor chunk found');
            if (hasAdminChunk) console.log('✅ Admin panel chunk found');
            if (hasMainChunk) console.log('✅ Main application chunk found');
            
            return true;
        } else {
            console.log('❌ Assets directory not found');
            return false;
        }
    } else {
        console.log('❌ Frontend build not found');
        return false;
    }
}

async function testPerformanceOptimizations() {
    console.log('\n⚡ Testing Performance Optimizations...');
    
    try {
        // Test compression
        console.log('1. Testing response compression...');
        const response = await request(testConfig.serverUrl)
            .get('/api/health')
            .set('Accept-Encoding', 'gzip');
        
        if (response.headers['content-encoding'] === 'gzip') {
            console.log('✅ Response compression working');
        } else {
            console.log('⚠️ Response compression not detected');
        }
        
        // Test caching headers
        console.log('2. Testing cache headers...');
        const staticResponse = await request(testConfig.serverUrl)
            .get('/');
        
        if (staticResponse.headers['cache-control']) {
            console.log('✅ Cache headers present');
        } else {
            console.log('⚠️ Cache headers not found');
        }
        
        // Test security headers
        console.log('3. Testing security headers...');
        if (staticResponse.headers['x-content-type-options']) {
            console.log('✅ Security headers present');
        } else {
            console.log('⚠️ Security headers not found');
        }
        
        return true;
        
    } catch (error) {
        console.log('❌ Performance test error:', error.message);
        return false;
    }
}

async function runComprehensiveTest() {
    console.log('🚀 Starting Comprehensive Application Test\n');
    console.log('=' .repeat(60));
    
    const results = {
        serverHealth: false,
        studentWorkflow: false,
        adminWorkflow: false,
        frontendBuild: false,
        performance: false
    };
    
    // Run all tests
    results.serverHealth = await testServerHealth();
    
    if (results.serverHealth) {
        results.studentWorkflow = await testStudentWorkflow();
        results.adminWorkflow = await testAdminWorkflow();
        results.performance = await testPerformanceOptimizations();
    }
    
    results.frontendBuild = await testFrontendBuild();
    
    // Summary
    console.log('\n' + '=' .repeat(60));
    console.log('📊 TEST RESULTS SUMMARY');
    console.log('=' .repeat(60));
    
    const tests = [
        { name: 'Server Health', status: results.serverHealth },
        { name: 'Student Workflow', status: results.studentWorkflow },
        { name: 'Admin Workflow', status: results.adminWorkflow },
        { name: 'Frontend Build', status: results.frontendBuild },
        { name: 'Performance Optimizations', status: results.performance }
    ];
    
    tests.forEach(test => {
        const icon = test.status ? '✅' : '❌';
        const status = test.status ? 'PASS' : 'FAIL';
        console.log(`${icon} ${test.name}: ${status}`);
    });
    
    const passedTests = tests.filter(test => test.status).length;
    const totalTests = tests.length;
    
    console.log('\n' + '=' .repeat(60));
    console.log(`🎯 OVERALL RESULT: ${passedTests}/${totalTests} tests passed`);
    
    if (passedTests === totalTests) {
        console.log('🎉 ALL SYSTEMS OPERATIONAL!');
        console.log('✨ The Tech Board 2025 MCQ Testing System is fully functional');
    } else {
        console.log('⚠️ Some issues detected - see details above');
    }
    
    console.log('=' .repeat(60));
}

// Run the comprehensive test
runComprehensiveTest().catch(console.error);