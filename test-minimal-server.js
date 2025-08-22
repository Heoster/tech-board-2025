#!/usr/bin/env node

console.log('🧪 Testing minimal server locally...\n');

const http = require('http');

function testEndpoint(path, expectedStatus = 200) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 8000,
            path: path,
            method: 'GET',
            timeout: 5000
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                console.log(`✅ ${path}: ${res.statusCode} (expected ${expectedStatus})`);
                if (res.statusCode === expectedStatus) {
                    try {
                        const json = JSON.parse(data);
                        console.log(`   Response: ${JSON.stringify(json).substring(0, 100)}...`);
                    } catch (e) {
                        console.log(`   Response: ${data.substring(0, 100)}...`);
                    }
                    resolve(true);
                } else {
                    console.log(`❌ Expected ${expectedStatus}, got ${res.statusCode}`);
                    resolve(false);
                }
            });
        });

        req.on('error', (error) => {
            console.log(`❌ ${path}: ${error.message}`);
            resolve(false);
        });

        req.on('timeout', () => {
            console.log(`❌ ${path}: Request timeout`);
            req.destroy();
            resolve(false);
        });

        req.end();
    });
}

async function runTests() {
    console.log('Testing endpoints...\n');
    
    const tests = [
        { path: '/health', status: 200 },
        { path: '/api/health', status: 200 },
        { path: '/', status: 200 },
        { path: '/random-path', status: 200 }
    ];
    
    let passed = 0;
    
    for (const test of tests) {
        const result = await testEndpoint(test.path, test.status);
        if (result) passed++;
        console.log('');
    }
    
    console.log(`🎯 Tests completed: ${passed}/${tests.length} passed`);
    
    if (passed === tests.length) {
        console.log('✅ All tests passed! Server is working correctly.');
        console.log('🚂 This should work on Railway.');
    } else {
        console.log('❌ Some tests failed. Check server configuration.');
    }
}

// Check if server is running
console.log('Checking if server is running on port 8000...');
testEndpoint('/health').then((working) => {
    if (working) {
        runTests();
    } else {
        console.log('❌ Server is not running on port 8000');
        console.log('💡 Start the server first: cd server && node minimal-server.js');
    }
});