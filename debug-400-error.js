// Debug script for 400 Bad Request error in TECH BOARD 2025 MCQ System

const axios = require('axios');

// Configuration
const BASE_URL = process.env.API_URL || 'http://localhost:3001/api';
const TEST_CREDENTIALS = {
    rollNumber: 79,
    grade: 6,
    section: 'A',
    password: 'password123'
};

async function debugAPIError() {
    console.log('🔍 Debugging 400 Bad Request Error\n');
    
    try {
        // Step 1: Test server health
        console.log('1. Testing server health...');
        try {
            const healthResponse = await axios.get(`${BASE_URL}/health`);
            console.log('✅ Server is healthy:', healthResponse.data);
        } catch (error) {
            console.log('❌ Server health check failed:', error.message);
            return;
        }
        
        // Step 2: Test student login
        console.log('\n2. Testing student login...');
        console.log('Login credentials:', TEST_CREDENTIALS);
        let authToken = null;
        try {
            const loginResponse = await axios.post(`${BASE_URL}/auth/student/login`, TEST_CREDENTIALS, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log('✅ Login successful');
            console.log('Response structure:', Object.keys(loginResponse.data));
            
            if (loginResponse.data.success && loginResponse.data.data && loginResponse.data.data.token) {
                authToken = loginResponse.data.data.token;
                console.log('✅ Auth token obtained');
                console.log('User data:', loginResponse.data.data.user);
            } else {
                console.log('❌ Unexpected login response structure:', loginResponse.data);
                return;
            }
        } catch (error) {
            console.log('❌ Login failed');
            console.log('Status:', error.response?.status);
            console.log('Error data:', error.response?.data);
            console.log('Request data sent:', TEST_CREDENTIALS);
            
            // Try to get more details from server logs
            if (error.response?.status === 500) {
                console.log('Server error - check server logs for details');
            }
            return;
        }
        
        // Step 3: Test auth verification
        console.log('\n3. Testing auth verification...');
        try {
            const verifyResponse = await axios.post(`${BASE_URL}/auth/verify`, {}, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            console.log('✅ Auth verification successful');
            console.log('Verified user:', verifyResponse.data);
        } catch (error) {
            console.log('❌ Auth verification failed:', error.response?.data || error.message);
        }
        
        // Step 4: Test quiz start (the problematic endpoint)
        console.log('\n4. Testing quiz start...');
        try {
            const quizStartResponse = await axios.post(`${BASE_URL}/quiz/start`, 
                { grade: 6 }, // Explicitly provide grade
                { 
                    headers: { 
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('✅ Quiz start successful');
            console.log('Quiz data:', quizStartResponse.data);
        } catch (error) {
            console.log('❌ Quiz start failed (400 error likely here)');
            console.log('Status:', error.response?.status);
            console.log('Error data:', error.response?.data);
            console.log('Request headers:', error.config?.headers);
            console.log('Request data:', error.config?.data);
            
            // Additional debugging
            if (error.response?.status === 400) {
                console.log('\n🔍 Analyzing 400 Bad Request:');
                console.log('- Check if grade is properly set in JWT token');
                console.log('- Check if student ID is available');
                console.log('- Check if database connection is working');
                console.log('- Check if student already has an active quiz');
            }
        }
        
        // Step 5: Test with different grade values
        console.log('\n5. Testing with different request formats...');
        const testCases = [
            { description: 'No grade in body', data: {} },
            { description: 'Grade as string', data: { grade: '6' } },
            { description: 'Grade as number', data: { grade: 6 } },
            { description: 'Invalid grade', data: { grade: 12 } }
        ];
        
        for (const testCase of testCases) {
            try {
                console.log(`\nTesting: ${testCase.description}`);
                const response = await axios.post(`${BASE_URL}/quiz/start`, testCase.data, {
                    headers: { 
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log('✅ Success:', response.data.success);
            } catch (error) {
                console.log('❌ Failed:', error.response?.data?.error || error.message);
            }
        }
        
    } catch (error) {
        console.error('❌ Debug script failed:', error.message);
    }
}

// Additional helper functions
function analyzeJWTToken(token) {
    try {
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        console.log('JWT Payload:', payload);
        return payload;
    } catch (error) {
        console.log('❌ Failed to decode JWT:', error.message);
        return null;
    }
}

function suggestFixes() {
    console.log('\n🔧 Suggested Fixes for 400 Bad Request:');
    console.log('1. Check if student exists in database');
    console.log('2. Verify JWT token contains grade field');
    console.log('3. Ensure grade is a valid number (6, 7, 8, 9, 11)');
    console.log('4. Check if student already has an active quiz');
    console.log('5. Verify database connection and question availability');
    console.log('6. Check server logs for detailed error messages');
    console.log('7. Ensure request Content-Type is application/json');
    console.log('8. Verify authentication middleware is working correctly');
}

// Run the debug script
if (require.main === module) {
    debugAPIError().then(() => {
        suggestFixes();
        console.log('\n✅ Debug analysis complete');
    });
}

module.exports = { debugAPIError, analyzeJWTToken, suggestFixes };