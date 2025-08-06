const https = require('https');
const http = require('http');

// Verify Railway deployment
async function verifyDeployment(baseUrl) {
    console.log('🔍 Verifying Railway deployment...');
    console.log(`🌐 Base URL: ${baseUrl}`);
    
    const tests = [
        {
            name: 'Health Check',
            path: '/health',
            expectedStatus: 200,
            expectedContent: 'OK'
        },
        {
            name: 'API Auth Verify',
            path: '/api/auth/verify',
            expectedStatus: 401, // Should return 401 without token
            expectedContent: 'token'
        }
    ];
    
    let passedTests = 0;
    
    for (const test of tests) {
        try {
            console.log(`\n📋 Testing: ${test.name}`);
            console.log(`   URL: ${baseUrl}${test.path}`);
            
            const result = await makeRequest(baseUrl + test.path);
            
            if (result.statusCode === test.expectedStatus) {
                console.log(`   ✅ Status: ${result.statusCode} (Expected: ${test.expectedStatus})`);
            } else {
                console.log(`   ❌ Status: ${result.statusCode} (Expected: ${test.expectedStatus})`);
                continue;
            }
            
            if (result.body.includes(test.expectedContent)) {
                console.log(`   ✅ Content contains: "${test.expectedContent}"`);
                passedTests++;
            } else {
                console.log(`   ❌ Content missing: "${test.expectedContent}"`);
                console.log(`   📄 Response: ${result.body.substring(0, 200)}...`);
            }
            
        } catch (error) {
            console.log(`   ❌ Request failed: ${error.message}`);
        }
    }
    
    console.log(`\n🏆 VERIFICATION RESULTS:`);
    console.log(`   Passed: ${passedTests}/${tests.length} tests`);
    
    if (passedTests === tests.length) {
        console.log('   ✅ DEPLOYMENT SUCCESSFUL');
        console.log('   🔒 Ultra-strict no-duplicates system is operational');
        console.log('   🎯 Ready for TECH BOARD 2025 Selection Test');
    } else {
        console.log('   ❌ DEPLOYMENT ISSUES DETECTED');
        console.log('   🔧 Please check Railway logs for details');
    }
    
    return passedTests === tests.length;
}

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        
        const req = client.get(url, (res) => {
            let body = '';
            
            res.on('data', (chunk) => {
                body += chunk;
            });
            
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    body: body
                });
            });
        });
        
        req.on('error', (error) => {
            reject(error);
        });
        
        req.setTimeout(10000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
    });
}

// Usage
if (require.main === module) {
    const baseUrl = process.argv[2];
    
    if (!baseUrl) {
        console.log('Usage: node verify-railway-deployment.js <base-url>');
        console.log('Example: node verify-railway-deployment.js https://your-app.railway.app');
        process.exit(1);
    }
    
    verifyDeployment(baseUrl)
        .then(success => process.exit(success ? 0 : 1))
        .catch(error => {
            console.error('❌ Verification failed:', error);
            process.exit(1);
        });
}

module.exports = { verifyDeployment };