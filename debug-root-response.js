#!/usr/bin/env node

const https = require('https');

console.log('🔍 Debugging Railway deployment...');

// Test health endpoint to see which server is running
const testEndpoint = (path, description) => {
    return new Promise((resolve) => {
        const options = {
            hostname: 'tech-board.up.railway.app',
            port: 443,
            path: path,
            method: 'GET',
            rejectUnauthorized: false,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                console.log(`\n${description}:`);
                console.log(`Status: ${res.statusCode}`);
                console.log(`Content-Type: ${res.headers['content-type']}`);
                console.log(`Response: ${data.substring(0, 200)}${data.length > 200 ? '...' : ''}`);
                resolve();
            });
        });

        req.on('error', (error) => {
            console.error(`❌ ${description} failed:`, error.message);
            resolve();
        });

        req.setTimeout(10000, () => {
            console.error(`⏰ ${description} timeout`);
            req.destroy();
            resolve();
        });

        req.end();
    });
};

async function runTests() {
    await testEndpoint('/', 'Root endpoint');
    await testEndpoint('/health', 'Health endpoint');
    await testEndpoint('/api', 'API endpoint');
    console.log('\n🔍 Analysis complete');
}

runTests();