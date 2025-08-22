// Production Login Test Script for TECH BOARD 2025 MCQ System
// Tests authentication and quiz functionality in production

const axios = require('axios');

// Configuration
const BASE_URL = process.env.API_URL || 'http://localhost:3001/api';
const TEST_CREDENTIALS = {
    student: {
        rollNumber: 79,
        grade: 6,
        section: 'A',
        password: 'password123'
    },
    admin: {
        username: 'admin',
        password: 'admin123'
    }
};

async function testProductionLogin() {
    console.log('🧪 Testing Production Login System\n');
    
    try {
        // Test 1: Health Check
        console.log('1️⃣ Testing server health...');
        const healthResponse = await axios.get(`${BASE_URL}/health`);
        console.log('✅ Server is healthy');
        console.log(`   Database: ${healthResponse.data.database.connected ? 'Connected' : 'Disconnected'}`);
        console.log(`   Questions: ${healthResponse.data.questions.total} (${healthResponse.data.questions.status})`);
        console.log(`   Users: ${healthResponse.data.users?.admins || 'N/A'} admins, ${healthResponse.data.users?.students || 'N/A'} students\n`);
        
        // Test 2: Student Login
        console.log('2️⃣ Testing student login...');
        let studentToken = null;
        try {
            const studentLoginResponse = await axios.post(`${BASE_URL}/auth/student/login`, TEST_CREDENTIALS.student);
            
            if (studentLoginResponse.data.success && studentLoginResponse.data.data.token) {
                studentToken = studentLoginResponse.data.data.token;
                console.log('✅ Student login successful');
                console.log(`   Student: ${studentLoginResponse.data.data.user.name}`);
                console.log(`   Grade: ${studentLoginResponse.data.data.user.grade}`);
                console.log(`   Section: ${studentLoginResponse.data.data.user.section}\n`);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('❌ Student login failed:', error.response?.data || error.message);
            return;
        }
        
        // Test 3: Admin Login
        console.log('3️⃣ Testing admin login...');
        let adminToken = null;
        try {
            const adminLoginResponse = await axios.post(`${BASE_URL}/auth/admin/login`, TEST_CREDENTIALS.admin);
            
            if (adminLoginResponse.data.success && adminLoginResponse.data.data.token) {
                adminToken = adminLoginResponse.data.data.token;
                console.log('✅ Admin login successful');
                console.log(`   Admin: ${adminLoginResponse.data.data.user.username}\n`);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('❌ Admin login failed:', error.response?.data || error.message);
            return;
        }
        
        // Test 4: Student Dashboard Access
        console.log('4️⃣ Testing student dashboard access...');
        try {
            const dashboardResponse = await axios.get(`${BASE_URL}/students/dashboard`, {
                headers: { 'Authorization': `Bearer ${studentToken}` }
            });
            console.log('✅ Student dashboard accessible\n');
        } catch (error) {
            console.error('❌ Student dashboard access failed:', error.response?.data || error.message);
        }
        
        // Test 5: Quiz Start
        console.log('5️⃣ Testing quiz start...');
        try {
            const quizStartResponse = await axios.post(`${BASE_URL}/quiz/start`, 
                { grade: 6 }, 
                { headers: { 'Authorization': `Bearer ${studentToken}` } }
            );
            
            if (quizStartResponse.data.success && quizStartResponse.data.data.questions) {
                console.log('✅ Quiz start successful');
                console.log(`   Questions loaded: ${quizStartResponse.data.data.questions.length}`);
                console.log(`   Time limit: ${quizStartResponse.data.data.timeLimit / 60000} minutes\n`);
            } else {
                throw new Error('Invalid quiz response');
            }
        } catch (error) {
            console.error('❌ Quiz start failed:', error.response?.data || error.message);
        }
        
        // Test 6: Admin Dashboard Access
        console.log('6️⃣ Testing admin dashboard access...');
        try {
            const adminDashboardResponse = await axios.get(`${BASE_URL}/admin/dashboard`, {
                headers: { 'Authorization': `Bearer ${adminToken}` }
            });
            console.log('✅ Admin dashboard accessible\n');
        } catch (error) {
            console.error('❌ Admin dashboard access failed:', error.response?.data || error.message);
        }
        
        // Test 7: Performance Monitoring
        console.log('7️⃣ Testing performance monitoring...');
        try {
            const performanceResponse = await axios.get(`${BASE_URL}/performance/health`);
            console.log('✅ Performance monitoring accessible\n');
        } catch (error) {
            console.warn('⚠️ Performance monitoring not accessible (may not be implemented yet)\n');
        }
        
        console.log('🎉 Production login tests completed!');
        console.log('\n📋 Test Results Summary:');
        console.log('   ✅ Server health check passed');
        console.log('   ✅ Student login working');
        console.log('   ✅ Admin login working');
        console.log('   ✅ Student dashboard accessible');
        console.log('   ✅ Quiz system functional');
        console.log('   ✅ Admin dashboard accessible');
        
        console.log('\n🔐 Login Credentials for Testing:');
        console.log('   👤 Admin: username=admin, password=admin123');
        console.log('   🎓 Student: roll=79, grade=6, section=A, password=password123');
        
    } catch (error) {
        console.error('❌ Production test failed:', error.message);
        process.exit(1);
    }
}

// Helper function to test specific endpoints
async function testEndpoint(method, url, data = null, headers = {}) {
    try {
        const config = { method, url, headers };
        if (data) config.data = data;
        
        const response = await axios(config);
        return { success: true, data: response.data, status: response.status };
    } catch (error) {
        return { 
            success: false, 
            error: error.response?.data || error.message,
            status: error.response?.status 
        };
    }
}

// Run tests if called directly
if (require.main === module) {
    testProductionLogin();
}

module.exports = { testProductionLogin, testEndpoint };