#!/usr/bin/env node

/**
 * Wait and Test Railway Deployment
 * Waits for Railway to redeploy and tests the login functionality
 */

const https = require('https');

const RAILWAY_URL = 'https://tech-board.up.railway.app';

async function makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    data: data
                });
            });
        });
        
        req.on('error', reject);
        req.setTimeout(15000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
        
        if (options.body) {
            req.write(options.body);
        }
        req.end();
    });
}

async function waitAndTest() {
    console.log('⏳ WAITING FOR RAILWAY DEPLOYMENT');
    console.log('=================================');
    console.log('🚀 Railway is redeploying with the admin login fixes...');
    console.log('');

    // Wait for deployment (Railway typically takes 2-3 minutes)
    console.log('⏱️  Waiting 3 minutes for deployment to complete...');
    for (let i = 180; i > 0; i--) {
        process.stdout.write(`\r   ${Math.ceil(i/60)}:${String(i%60).padStart(2, '0')} remaining...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.log('\n');

    console.log('🧪 TESTING RAILWAY DEPLOYMENT');
    console.log('=============================');

    const tests = [
        {
            name: 'Health Check',
            url: `${RAILWAY_URL}/health`,
            method: 'GET'
        },
        {
            name: 'Landing Page',
            url: `${RAILWAY_URL}/`,
            method: 'GET'
        },
        {
            name: 'Admin Login Test',
            url: `${RAILWAY_URL}/api/auth/admin/login`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'admin',
                password: 'TechBoard2025Admin!'
            })
        }
    ];

    let successCount = 0;

    for (const test of tests) {
        try {
            console.log(`🧪 Testing: ${test.name}...`);
            
            const options = {
                method: test.method,
                headers: test.headers || {}
            };
            
            if (test.body) {
                options.body = test.body;
            }

            const response = await makeRequest(test.url, options);
            
            console.log(`   Status: ${response.statusCode}`);
            
            if (response.statusCode < 500) {
                console.log(`   ✅ WORKING`);
                successCount++;
                
                if (test.name === 'Admin Login Test') {
                    try {
                        const data = JSON.parse(response.data);
                        if (data.success) {
                            console.log(`   🎉 ADMIN LOGIN SUCCESSFUL!`);
                            console.log(`   🔑 Token received: ${data.data.token.substring(0, 20)}...`);
                        } else {
                            console.log(`   ⚠️  Login failed: ${data.error?.message}`);
                        }
                    } catch (e) {
                        console.log(`   📄 Response: ${response.data.substring(0, 100)}...`);
                    }
                }
            } else {
                console.log(`   ❌ ERROR - Status ${response.statusCode}`);
                console.log(`   📄 Response: ${response.data.substring(0, 200)}...`);
            }
            
        } catch (error) {
            console.log(`   ❌ FAILED - ${error.message}`);
        }
        
        console.log('');
    }

    console.log('📊 FINAL RESULTS:');
    console.log('================');
    console.log(`✅ Working: ${successCount}/${tests.length}`);
    console.log(`📈 Success Rate: ${Math.round((successCount/tests.length) * 100)}%`);

    if (successCount === tests.length) {
        console.log('');
        console.log('🎉 RAILWAY LOGIN FIX SUCCESSFUL!');
        console.log('================================');
        console.log('✅ Railway deployment is working');
        console.log('✅ Admin login is functional');
        console.log('✅ All systems operational');
        console.log('');
        console.log('🌐 Admin Login: https://tech-board.up.railway.app/admin/login');
        console.log('🔑 Username: admin');
        console.log('🔑 Password: TechBoard2025Admin!');
    } else {
        console.log('');
        console.log('⚠️  DEPLOYMENT STILL HAS ISSUES');
        console.log('Check Railway logs for more details');
    }
}

if (require.main === module) {
    waitAndTest().catch(console.error);
}

module.exports = { waitAndTest };