#!/usr/bin/env node

const https = require('https');

console.log('🔍 Debugging root response...');

const options = {
    hostname: 'tech-board.up.railway.app',
    port: 443,
    path: '/',
    method: 'GET',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
    },
    rejectUnauthorized: false
};

const req = https.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Content-Type: ${res.headers['content-type']}`);
    console.log(`Content-Length: ${res.headers['content-length']}`);
    console.log(`Server: ${res.headers['server'] || 'Unknown'}`);
    
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        console.log(`\nResponse length: ${data.length} bytes`);
        
        if (res.headers['content-type']?.includes('application/json')) {
            console.log('📄 JSON Response:');
            try {
                const json = JSON.parse(data);
                console.log(JSON.stringify(json, null, 2));
            } catch (e) {
                console.log(data);
            }
        } else if (res.headers['content-type']?.includes('text/html')) {
            console.log('📄 HTML Response (first 500 chars):');
            console.log(data.substring(0, 500));
            
            console.log('\n🔍 HTML Analysis:');
            console.log(`Contains <!DOCTYPE html>: ${data.includes('<!DOCTYPE html>') || data.includes('<!doctype html>') ? '✅' : '❌'}`);
            console.log(`Contains <div id="root">: ${data.includes('id="root"') ? '✅' : '❌'}`);
            console.log(`Contains /assets/ references: ${data.includes('/assets/') ? '✅' : '❌'}`);
            console.log(`Contains React app title: ${data.includes('Techno Board') ? '✅' : '❌'}`);
        } else {
            console.log('📄 Raw Response (first 500 chars):');
            console.log(data.substring(0, 500));
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