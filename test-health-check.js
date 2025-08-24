#!/usr/bin/env node

const http = require('http');

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

console.log('🔍 Testing health check...');
console.log(`Checking: http://${HOST}:${PORT}/health`);

const options = {
    hostname: HOST,
    port: PORT,
    path: '/health',
    method: 'GET',
    timeout: 10000
};

const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers:`, res.headers);
    
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        console.log('Response:', data);
        if (res.statusCode === 200) {
            console.log('✅ Health check passed!');
            process.exit(0);
        } else {
            console.log('❌ Health check failed!');
            process.exit(1);
        }
    });
});

req.on('error', (error) => {
    console.error('❌ Health check error:', error.message);
    process.exit(1);
});

req.on('timeout', () => {
    console.error('❌ Health check timeout');
    req.destroy();
    process.exit(1);
});

req.setTimeout(10000);
req.end();