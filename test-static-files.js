#!/usr/bin/env node

const https = require('https');

console.log('🧪 Testing static file serving...');

const testPaths = [
    { path: '/', description: 'Root (should be HTML)' },
    { path: '/assets/index-DMUTUhHV.js', description: 'JS Asset' },
    { path: '/assets/css/index-aP8m4AUh.css', description: 'CSS Asset' },
    { path: '/health', description: 'Health endpoint' }
];

async function testPath(pathInfo) {
    return new Promise((resolve) => {
        const options = {
            hostname: 'tech-board.up.railway.app',
            port: 443,
            path: pathInfo.path,
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
                console.log(`\n${pathInfo.description}:`);
                console.log(`  Status: ${res.statusCode}`);
                console.log(`  Content-Type: ${res.headers['content-type']}`);
                console.log(`  Size: ${data.length} bytes`);
                
                if (pathInfo.path === '/') {
                    if (data.includes('<!doctype html>')) {
                        console.log('  ✅ HTML detected');
                    } else if (data.includes('"message"')) {
                        console.log('  ❌ JSON response (wrong server)');
                    }
                }
                
                resolve();
            });
        });

        req.on('error', (error) => {
            console.error(`  ❌ Error: ${error.message}`);
            resolve();
        });

        req.setTimeout(10000, () => {
            console.error('  ⏰ Timeout');
            req.destroy();
            resolve();
        });

        req.end();
    });
}

async function runTests() {
    for (const pathInfo of testPaths) {
        await testPath(pathInfo);
    }
    console.log('\n🔍 Static file test complete');
}

runTests();