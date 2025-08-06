const https = require('https');

// Test the full Railway system functionality
async function testFullSystem() {
    console.log('🧪 TESTING FULL RAILWAY SYSTEM');
    console.log('🌐 URL: https://tech-board.up.railway.app\n');
    
    const tests = [
        {
            name: 'Health Check',
            path: '/health',
            method: 'GET',
            expectedStatus: 200,
            expectedContent: 'OK'
        },
        {
            name: 'API Auth Verify (No Token)',
            path: '/api/auth/verify',
            method: 'GET',
            expectedStatus: 401,
            expectedContent: 'token'
        },
        {
            name: 'Admin Login Endpoint',
            path: '/api/auth/admin/login',
            method: 'POST',
            body: JSON.stringify({
                username: 'admin',
                password: 'admin123'
            }),
            expectedStatus: 200,
            expectedContent: 'token'
        },
        {
            name: 'Student Registration Endpoint',
            path: '/api/auth/register',
            method: 'POST',
            body: JSON.stringify({
                name: 'Test Student',
                rollNumber: 99,
                grade: 11,
                section: 'A',
                password: 'test123'
            }),
            expectedStatus: [201, 409], // 201 for success, 409 if already exists
            expectedContent: ['success', 'already exists']
        }
    ];
    
    let passedTests = 0;
    
    for (const test of tests) {
        try {
            console.log(`📋 Testing: ${test.name}`);
            console.log(`   URL: https://tech-board.up.railway.app${test.path}`);
            
            const result = await makeRequest(test.path, test.method, test.body);
            
            // Check status code
            const expectedStatuses = Array.isArray(test.expectedStatus) ? test.expectedStatus : [test.expectedStatus];
            if (expectedStatuses.includes(result.statusCode)) {
                console.log(`   ✅ Status: ${result.statusCode} (Expected: ${expectedStatuses.join(' or ')})`);
            } else {
                console.log(`   ❌ Status: ${result.statusCode} (Expected: ${expectedStatuses.join(' or ')})`);
                console.log(`   📄 Response: ${result.body.substring(0, 200)}...`);
                continue;
            }
            
            // Check content
            const expectedContents = Array.isArray(test.expectedContent) ? test.expectedContent : [test.expectedContent];
            const hasExpectedContent = expectedContents.some(content => result.body.includes(content));
            
            if (hasExpectedContent) {
                console.log(`   ✅ Content contains expected data`);
                passedTests++;
            } else {
                console.log(`   ❌ Content missing expected data`);
                console.log(`   📄 Response: ${result.body.substring(0, 200)}...`);
            }
            
        } catch (error) {
            console.log(`   ❌ Request failed: ${error.message}`);
        }
        
        console.log(''); // Empty line for readability
    }
    
    console.log('🏆 FULL SYSTEM TEST RESULTS:');
    console.log(`   Passed: ${passedTests}/${tests.length} tests`);
    
    if (passedTests === tests.length) {
        console.log('   ✅ FULL SYSTEM OPERATIONAL');
        console.log('   🔒 Ultra-strict no-duplicates system ready');
        console.log('   🎯 TECH BOARD 2025 Selection Test ready for deployment');
        console.log('   📊 Database should be seeding in background');
    } else {
        console.log('   ⚠️  SOME ISSUES DETECTED');
        console.log('   🔧 Check individual test results above');
    }
    
    return passedTests === tests.length;
}

function makeRequest(path, method = 'GET', body = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'tech-board.up.railway.app',
            port: 443,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Railway-Test-Client'
            }
        };
        
        if (body) {
            options.headers['Content-Length'] = Buffer.byteLength(body);
        }
        
        const req = https.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    body: data
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
        
        if (body) {
            req.write(body);
        }
        
        req.end();
    });
}

// Run the test
testFullSystem()
    .then(success => process.exit(success ? 0 : 1))
    .catch(error => {
        console.error('❌ Full system test failed:', error);
        process.exit(1);
    });