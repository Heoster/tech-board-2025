#!/usr/bin/env node

const https = require('https');

console.log('🧪 Testing main page...');

const options = {
    hostname: 'tech-board.up.railway.app',
    port: 443,
    path: '/',
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
        console.log(`Response size: ${data.length} bytes`);
        
        if (data.includes('<!doctype html>')) {
            console.log('✅ HTML document detected');
        }
        
        if (data.includes('id="root"')) {
            console.log('✅ React root element found');
        }
        
        if (data.includes('/assets/index-')) {
            console.log('✅ Vite build assets referenced');
        }
        
        if (data.includes('Techno Board') || data.includes('Tech Board')) {
            console.log('✅ App title found');
        }
        
        // Show first 500 characters
        console.log('\n📄 Response preview:');
        console.log(data.substring(0, 500));
        console.log(data.length > 500 ? '...' : '');
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