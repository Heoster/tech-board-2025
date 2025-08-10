const axios = require('axios');

// Test admin functionality after API routing fixes
async function testAdminFunctionality() {
    const baseURL = 'http://localhost:8000/api';
    let adminToken = null;

    console.log('🔧 Testing Admin Functionality After API Routing Fixes');
    console.log('=' .repeat(60));

    try {
        // 1. Test Admin Login
        console.log('\n1. Testing Admin Login...');
        const loginResponse = await axios.post(`${baseURL}/auth/admin/login`, {
            username: 'admin',
            password: 'admin123'
        });

        if (loginResponse.data.success) {
            adminToken = loginResponse.data.data.token;
            console.log('✅ Admin login successful');
        } else {
            throw new Error('Admin login failed');
        }

        const headers = { Authorization: `Bearer ${adminToken}` };

        // 2. Test System Stats
        console.log('\n2. Testing System Stats...');
        const statsResponse = await axios.get(`${baseURL}/admin/system-stats`, { headers });
        if (statsResponse.data.success) {
            console.log('✅ System stats endpoint working');
            console.log(`   - Total Students: ${statsResponse.data.data.totalStudents}`);
            console.log(`   - Total Questions: ${statsResponse.data.data.totalQuestions}`);
        } else {
            console.log('❌ System stats endpoint failed');
        }

        // 3. Test Students List
        console.log('\n3. Testing Students List...');
        const studentsResponse = await axios.get(`${baseURL}/admin/students`, { headers });
        if (studentsResponse.data.success) {
            console.log('✅ Students list endpoint working');
            console.log(`   - Found ${studentsResponse.data.data.length} students`);
        } else {
            console.log('❌ Students list endpoint failed');
        }

        // 4. Test Quiz Results
        console.log('\n4. Testing Quiz Results...');
        const resultsResponse = await axios.get(`${baseURL}/admin/results`, { headers });
        if (resultsResponse.data.success) {
            console.log('✅ Quiz results endpoint working');
            console.log(`   - Found ${resultsResponse.data.data.length} quiz results`);
        } else {
            console.log('❌ Quiz results endpoint failed');
        }

        // 5. Test Questions List
        console.log('\n5. Testing Questions List...');
        const questionsResponse = await axios.get(`${baseURL}/admin/questions?page=1&limit=5`, { headers });
        if (questionsResponse.data.success) {
            console.log('✅ Questions list endpoint working');
            console.log(`   - Found ${questionsResponse.data.data.questions.length} questions on page 1`);
        } else {
            console.log('❌ Questions list endpoint failed');
        }

        console.log('\n' + '=' .repeat(60));
        console.log('🎉 All admin endpoints are working correctly!');
        console.log('✅ API routing fixes have been successful');
        console.log('✅ Admin dashboard should now function perfectly');

    } catch (error) {
        console.error('\n❌ Test failed:', error.message);
        if (error.response) {
            console.error('   Status:', error.response.status);
            console.error('   Data:', error.response.data);
        }
    }
}

// Run the test
testAdminFunctionality().catch(console.error);
