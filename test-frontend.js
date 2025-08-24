#!/usr/bin/env node

const https = require('https');
const fs = require('fs');

console.log('🧪 Testing frontend deployment...');

const testEndpoints = [
    { path: '/', description: 'Main page' },
    { path: '/health', description: 'Health check' },
    { path: '/api', description: 'API info' },
    { path: '/assets/index-DMUTUhHV.js', description: 'Main JS bundle' },
    { path: '/assets/css/index-aP8m4AUh.css', description: 'Main CSS bundle' }
];

function testEndpoint(endpoint) {
    return new Promise((resolve) => {
        const options = {
            hostname: 'tech-board.up.railway.app',
            port: 443,
            path: endpoint.path,
            method: 'GET',
            rejectUnauthorized: false
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                const status = res.statusCode === 200 ? '✅' : '❌';
                const size = data.length;
                console.log(`${status} ${endpoint.description}: ${res.statusCode} (${size} bytes)`);
                
                if (endpoint.path === '/' && res.statusCode === 200) {
                    if (data.includes('Tech Board') || data.includes('Techno Board')) {
                        console.log('   📄 Frontend content detected');
                    } else {
                        console.log('   ⚠️  No frontend content detected');
                    }
                }
                
                resolve({ status: res.statusCode, size });
            });
        });

        req.on('error', (error) => {
            console.log(`❌ ${endpoint.description}: Error - ${error.message}`);
            resolve({ status: 'error', error: error.message });
        });

        req.setTimeout(10000, () => {
            console.log(`⏰ ${endpoint.description}: Timeout`);
            req.destroy();
            resolve({ status: 'timeout' });
        });

        req.end();
    });
}

async function runTests() {
    console.log('🌐 Testing https://tech-board.up.railway.app\n');
    
    for (const endpoint of testEndpoints) {
        await testEndpoint(endpoint);
    }
    
    console.log('\n📊 Frontend test complete');
}

runTests().catch(console.error);