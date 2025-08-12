const axios = require('axios');

async function testLogin() {
    try {
        console.log('Testing login on Railway...');
        
        const response = await axios.post('https://tech-board.up.railway.app/api/auth/student/login', {
            roll_number: 1,
            password: 'password123',
            grade: 6,
            section: 'A'
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 10000
        });
        
        console.log('✅ Login successful!');
        console.log('Response:', response.data);
        
    } catch (error) {
        console.log('❌ Login failed:');
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Data:', error.response.data);
        } else if (error.request) {
            console.log('No response received:', error.message);
        } else {
            console.log('Error:', error.message);
        }
    }
}

testLogin();