require('dotenv').config();
const axios = require('axios');

async function testVerify() {
    try {
        console.log('=== Testing Token Verification ===');
        
        // First login to get a token
        const loginData = {
            rollNumber: 1,
            grade: 8,
            section: 'A',
            password: 'student123'
        };

        const loginResponse = await axios.post('http://localhost:5000/api/auth/login', loginData);
        const token = loginResponse.data.data.token;
        console.log('✅ Login successful, got token');

        // Test token verification
        const verifyResponse = await axios.get('http://localhost:5000/api/auth/verify', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        console.log('✅ Token verification successful');
        console.log('Verified user:', verifyResponse.data.data.user);

        // Test with invalid token
        try {
            await axios.get('http://localhost:5000/api/auth/verify', {
                headers: { 'Authorization': `Bearer invalid_token` }
            });
            console.log('❌ Invalid token should have failed');
        } catch (invalidError) {
            console.log('✅ Invalid token correctly failed:', invalidError.response?.status);
        }

    } catch (error) {
        console.error('❌ Verify test failed:', error.response?.data || error.message);
    }
}

testVerify();