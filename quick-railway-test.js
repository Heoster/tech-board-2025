#!/usr/bin/env node

/**
 * Quick Railway Test
 * Tests if Railway deployment is working
 */

const https = require('https');

async function quickTest() {
    console.log('🚀 QUICK RAILWAY TEST');
    console.log('====================');
    
    try {
        const response = await new Promise((resolve, reject) => {
            const req = https.request('https://tech-board.up.railway.app/health', (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => resolve({ statusCode: res.statusCode, data }));
            });
            req.on('error', reject);
            req.setTimeout(10000, () => {
                req.destroy();
                reject(new Error('Timeout'));
            });
            req.end();
        });

        console.log(`Status: ${response.statusCode}`);
        
        if (response.statusCode === 200) {
            console.log('✅ Railway is ONLINE!');
            
            // Test admin login
            console.log('');
            console.log('🔐 Testing admin login...');
            
            const loginResponse = await new Promise((resolve, reject) => {
                const postData = JSON.stringify({
                    username: 'admin',
                    password: 'TechBoard2025Admin!'
                });
                
                const options = {
                    hostname: 'tech-board.up.railway.app',
                    port: 443,
                    path: '/api/auth/admin/login',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(postData)
                    }
                };
                
                const req = https.request(options, (res) => {
                    let data = '';
                    res.on('data', chunk => data += chunk);
                    res.on('end', () => resolve({ statusCode: res.statusCode, data }));
                });
                
                req.on('error', reject);
                req.setTimeout(10000, () => {
                    req.destroy();
                    reject(new Error('Login timeout'));
                });
                
                req.write(postData);
                req.end();
            });
            
            console.log(`Login Status: ${loginResponse.statusCode}`);
            
            if (loginResponse.statusCode === 200) {
                const loginData = JSON.parse(loginResponse.data);
                if (loginData.success) {
                    console.log('🎉 ADMIN LOGIN WORKING!');
                    console.log('✅ Railway deployment successful');
                    console.log('✅ Admin authentication fixed');
                    console.log('');
                    console.log('🌐 Login at: https://tech-board.up.railway.app/admin/login');
                    console.log('🔑 Username: admin');
                    console.log('🔑 Password: TechBoard2025Admin!');
                } else {
                    console.log('❌ Login failed:', loginData.error?.message);
                }
            } else {
                console.log('❌ Login API error:', loginResponse.data);
            }
            
        } else {
            console.log('❌ Railway is still down');
            console.log('Response:', response.data);
        }
        
    } catch (error) {
        console.log('❌ Railway test failed:', error.message);
    }
}

quickTest();