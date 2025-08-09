#!/usr/bin/env node

/**
 * Registration Test Script
 * Tests the student registration functionality
 */

const axios = require('axios');

async function testRegistration() {
    console.log('🧪 TESTING STUDENT REGISTRATION');
    console.log('===============================');
    console.log('');

    const baseURL = process.env.NODE_ENV === 'production' 
        ? 'https://tech-board.up.railway.app'
        : 'http://localhost:8000';

    console.log(`🌐 Testing against: ${baseURL}`);
    console.log('');

    // Test data with roll number between 70-80
    const testStudent = {
        name: 'Test Student',
        rollNumber: 75,
        grade: 8,
        section: 'A',
        password: 'test123'
    };

    try {
        console.log('📝 Test Registration Data:');
        console.log(JSON.stringify(testStudent, null, 2));
        console.log('');

        console.log('🚀 Sending registration request...');
        
        const response = await axios.post(`${baseURL}/api/auth/register`, testStudent, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 10000
        });

        console.log('✅ Registration successful!');
        console.log('Response:', JSON.stringify(response.data, null, 2));

    } catch (error) {
        console.error('❌ Registration failed!');
        
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Response:', JSON.stringify(error.response.data, null, 2));
            
            // Analyze the error
            if (error.response.status === 409) {
                console.log('\n🔍 Analysis: Student already exists with this roll number');
            } else if (error.response.status === 400) {
                console.log('\n🔍 Analysis: Validation error - check input data format');
            } else if (error.response.status === 500) {
                console.log('\n🔍 Analysis: Server error - check database connection');
            }
        } else if (error.request) {
            console.error('❌ No response received from server');
            console.error('Request error:', error.message);
            console.log('\n🔍 Analysis: Server might be down or unreachable');
        } else {
            console.error('❌ Request setup error:', error.message);
        }
    }

    // Test with different roll number
    console.log('\n🔄 Testing with different roll number...');
    
    const testStudent2 = {
        ...testStudent,
        rollNumber: 73,
        name: 'Test Student 2'
    };

    try {
        console.log('📝 Second Test Data:');
        console.log(JSON.stringify(testStudent2, null, 2));
        console.log('');

        const response2 = await axios.post(`${baseURL}/api/auth/register`, testStudent2, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 10000
        });

        console.log('✅ Second registration successful!');
        console.log('Response:', JSON.stringify(response2.data, null, 2));

    } catch (error2) {
        console.error('❌ Second registration also failed!');
        
        if (error2.response) {
            console.error('Status:', error2.response.status);
            console.error('Response:', JSON.stringify(error2.response.data, null, 2));
        } else {
            console.error('Error:', error2.message);
        }
    }

    // Test server health
    console.log('\n🏥 Testing server health...');
    
    try {
        const healthResponse = await axios.get(`${baseURL}/health`, {
            timeout: 5000
        });
        
        console.log('✅ Server is healthy!');
        console.log('Health response:', JSON.stringify(healthResponse.data, null, 2));
        
    } catch (healthError) {
        console.error('❌ Server health check failed!');
        console.error('Health error:', healthError.message);
    }

    console.log('\n📊 REGISTRATION TEST COMPLETE');
}

if (require.main === module) {
    testRegistration();
}

module.exports = { testRegistration };