#!/usr/bin/env node

const https = require('https');

console.log('🧪 Testing new endpoint...');

const options = {
    hostname: 'tech-board.up.railway.app',
    port: 443,
    path: '/test-new-server',
    method: 'GET',
    rejectUnauthorized: false,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
};

const req = https.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Content-Type: ${res.headers['content-type']}`);
    
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        console.log(`Response: ${data}`);
        
        if (data.includes('NEW SERVER IS RUNNING')) {
            console.log('✅ NEW server is working!');
        } else {
            console.log('❌ Still old server or error');
        }
    });
});

req.on('error', (error) => {
    console.error('❌ Request failed:', error.message);
});

req.setTimeout(10000, () => {
    console.error('⏰ Request timeout');
    req.destroy();
});

req.end();