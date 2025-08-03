// This script simulates the exact requests the frontend makes
const http = require('http');

function makeRequest(path, method, data = null) {
    return new Promise((resolve, reject) => {
        const postData = data ? JSON.stringify(data) : null;
        
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: `/api${path}`,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:5173',
                ...(postData && { 'Content-Length': Buffer.byteLength(postData) })
            }
        };

        console.log(`\n🔄 Making ${method} request to: http://localhost:5000/api${path}`);
        if (data) console.log('📤 Request data:', data);

        const req = http.request(options, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                console.log(`📥 Status: ${res.statusCode}`);
                console.log(`📥 Headers:`, res.headers);
                
                try {
                    const parsed = JSON.parse(responseData);
                    console.log(`📥 Response:`, parsed);
                    resolve({ status: res.statusCode, data: parsed, headers: res.headers });
                } catch (e) {
                    console.log(`📥 Raw response:`, responseData);
                    resolve({ status: res.statusCode, data: responseData, headers: res.headers });
                }
            });
        });

        req.on('error', (error) => {
            console.error(`❌ Request failed:`, error.message);
            reject(error);
        });

        if (postData) {
            req.write(postData);
        }
        req.end();
    });
}

async function testFrontendRequests() {
    console.log('🧪 Testing Frontend API Requests...\n');

    try {
        // Test 1: Health check
        console.log('=== TEST 1: Health Check ===');
        await makeRequest('/health', 'GET');

        // Test 2: Registration
        console.log('\n=== TEST 2: Registration ===');
        const regData = {
            name: 'Debug Test User',
            rollNumber: 30,
            grade: 8,
            section: 'A',
            password: 'test123'
        };
        await makeRequest('/auth/register', 'POST', regData);

        // Test 3: Login
        console.log('\n=== TEST 3: Login ===');
        const loginData = {
            rollNumber: 3,
            grade: 8,
            section: 'A',
            password: 'test123'
        };
        await makeRequest('/auth/login', 'POST', loginData);

        console.log('\n✅ All tests completed!');

    } catch (error) {
        console.error('\n❌ Test suite failed:', error.message);
    }
}

testFrontendRequests();