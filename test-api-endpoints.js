const axios = require('axios');

const BASE_URL = 'http://localhost:3002/api';

async function testEndpoints() {
    console.log('Testing API endpoints...\n');
    
    try {
        // Test health endpoint
        console.log('1. Testing health endpoint...');
        const health = await axios.get(`${BASE_URL}/health`);
        console.log('✅ Health check:', health.data);
        
        // Test admin login
        console.log('\n2. Testing admin login...');
        const adminLogin = await axios.post(`${BASE_URL}/auth/admin/login`, {
            username: 'admin',
            password: 'password'
        });
        console.log('✅ Admin login successful');
        const adminToken = adminLogin.data.data.token;
        
        // Test student registration
        console.log('\n3. Testing student registration...');
        const studentReg = await axios.post(`${BASE_URL}/auth/register`, {
            name: 'Test Student',
            email: 'test@example.com',
            password: 'password123',
            grade: 6
        });
        console.log('✅ Student registration successful');
        const studentToken = studentReg.data.data.token;
        
        // Test quiz start
        console.log('\n4. Testing quiz start...');
        const quizStart = await axios.post(`${BASE_URL}/quiz/start`, 
            { grade: 6 },
            { headers: { Authorization: `Bearer ${studentToken}` } }
        );
        console.log('✅ Quiz started successfully');
        console.log(`Generated ${quizStart.data.data.questions.length} questions`);
        
        // Test admin questions endpoint
        console.log('\n5. Testing admin questions...');
        const adminQuestions = await axios.get(`${BASE_URL}/admin/questions?limit=5`, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        console.log('✅ Admin questions retrieved');
        console.log(`Total questions: ${adminQuestions.data.data.pagination.total}`);
        
        console.log('\n✅ All API endpoints working correctly!');
        
    } catch (error) {
        console.error('❌ API test failed:', error.response?.data || error.message);
    }
}

// Start server first, then test
const { spawn } = require('child_process');

console.log('Starting server...');
const server = spawn('node', ['server/index.js'], { 
    stdio: 'pipe',
    cwd: __dirname 
});

server.stdout.on('data', (data) => {
    const output = data.toString();
    if (output.includes('Server running on port')) {
        console.log('✅ Server started successfully\n');
        setTimeout(() => testEndpoints(), 1000);
    }
});

server.stderr.on('data', (data) => {
    console.error('Server error:', data.toString());
});

// Cleanup
setTimeout(() => {
    server.kill();
    process.exit(0);
}, 10000);