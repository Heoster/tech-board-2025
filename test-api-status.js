const axios = require('axios');

const BASE_URL = 'https://tech-board.up.railway.app';

async function testAPIStatus() {
    console.log('🔍 Testing API Status...\n');

    try {
        // Test 1: Health check
        console.log('1. Testing health endpoint...');
        const healthResponse = await axios.get(`${BASE_URL}/api/health`);
        console.log('✅ Health check:', healthResponse.data);
        console.log('');

        // Test 2: System stats (the missing endpoint)
        console.log('2. Testing system stats endpoint...');
        try {
            // First need to login as admin to get token
            const adminLogin = await axios.post(`${BASE_URL}/api/auth/admin/login`, {
                username: 'admin',
                password: 'admin123'
            });
            
            const token = adminLogin.data.token || adminLogin.data.data?.token;
            if (!token) {
                console.log('❌ Admin login failed - no token received');
                console.log('Response:', adminLogin.data);
                return;
            }

            const statsResponse = await axios.get(`${BASE_URL}/api/admin/system-stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('✅ System stats:', statsResponse.data);
        } catch (error) {
            console.log('❌ System stats failed:', error.response?.status, error.response?.data || error.message);
        }
        console.log('');

        // Test 3: Quiz submission validation
        console.log('3. Testing quiz submission validation...');
        try {
            // Try to submit without auth (should get 401)
            await axios.post(`${BASE_URL}/api/quiz/submit`, {
                quizId: 1,
                answers: []
            });
        } catch (error) {
            if (error.response?.status === 401) {
                console.log('✅ Quiz submission properly requires authentication');
            } else {
                console.log('❌ Unexpected quiz submission error:', error.response?.status, error.response?.data);
            }
        }

    } catch (error) {
        console.error('❌ API test failed:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
    }
}

testAPIStatus();