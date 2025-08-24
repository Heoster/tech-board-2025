#!/usr/bin/env node

const https = require('https');
const http = require('http');

const BASE_URL = 'https://tech-board.up.railway.app';

console.log('🧪 Testing Tech Board 2025 Deployment');
console.log('=====================================');

const tests = [
    {
        name: 'Health Check',
        path: '/health',
        method: 'GET',
        expected: 200
    },
    {
        name: 'Root Endpoint',
        path: '/',
        method: 'GET',
        expected: 200
    },
    {
        name: 'API Info',
        path: '/api',
        method: 'GET',
        expected: 200
    },
    {
        name: 'Admin Login',
        path: '/api/auth/admin/login',
        method: 'POST',
        body: JSON.stringify({ username: 'admin', password: 'admin123' }),
        headers: { 'Content-Type': 'application/json' },
        expected: 200
    }
];

function makeRequest(test) {
    return new Promise((resolve) => {
        const url = new URL(BASE_URL + test.path);
        
        const options = {
            hostname: url.hostname,
            port: url.port || 443,
            path: url.pathname,
            method: test.method,
            headers: test.headers || {},
            rejectUnauthorized: false // Allow self-signed certificates
        };

        const req = https.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    data: data,
                    headers: res.headers
                });
            });
        });

        req.on('error', (error) => {
            resolve({
                error: error.message,
                statusCode: 0
            });
        });

        req.setTimeout(10000, () => {
            req.destroy();
            resolve({
                error: 'Request timeout',
                statusCode: 0
            });
        });

        if (test.body) {
            req.write(test.body);
        }
        
        req.end();
    });
}

async function runTests() {
    let passed = 0;
    let failed = 0;

    for (const test of tests) {
        console.log(`\n🔍 Testing: ${test.name}`);
        console.log(`   ${test.method} ${test.path}`);
        
        const result = await makeRequest(test);
        
        if (result.error) {
            console.log(`   ❌ FAILED: ${result.error}`);
            failed++;
        } else if (result.statusCode === test.expected) {
            console.log(`   ✅ PASSED: ${result.statusCode}`);
            
            // Try to parse and show JSON response
            try {
                const json = JSON.parse(result.data);
                if (json.status) console.log(`   📊 Status: ${json.status}`);
                if (json.message) console.log(`   💬 Message: ${json.message}`);
                if (json.version) console.log(`   🏷️  Version: ${json.version}`);
                if (json.database) console.log(`   🗄️  Database: ${json.database}`);
                if (json.token) console.log(`   🔑 Token: ${json.token.substring(0, 20)}...`);
            } catch (e) {
                // Not JSON, show first 100 chars
                if (result.data.length > 0) {
                    console.log(`   📄 Response: ${result.data.substring(0, 100)}${result.data.length > 100 ? '...' : ''}`);
                }
            }
            passed++;
        } else {
            console.log(`   ❌ FAILED: Expected ${test.expected}, got ${result.statusCode}`);
            console.log(`   📄 Response: ${result.data.substring(0, 200)}`);
            failed++;
        }
    }

    console.log('\n📊 Test Results:');
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);

    if (failed === 0) {
        console.log('\n🎉 All tests passed! Deployment is working correctly.');
    } else {
        console.log('\n⚠️  Some tests failed. Check the deployment.');
    }
}

runTests().catch(console.error);