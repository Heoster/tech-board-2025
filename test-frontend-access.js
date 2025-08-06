const https = require('https');

// Test if frontend is accessible on Railway
async function testFrontendAccess() {
    console.log('🌐 Testing Frontend Access on Railway');
    console.log('🔗 URL: https://tech-board.up.railway.app\n');
    
    const tests = [
        {
            name: 'Main Page',
            path: '/',
            expectedContent: ['html', 'DOCTYPE', 'TECH BOARD']
        },
        {
            name: 'Login Page',
            path: '/login',
            expectedContent: ['html', 'DOCTYPE']
        },
        {
            name: 'Static Assets Check',
            path: '/assets/',
            expectedContent: [''] // Just check if it doesn't 404
        }
    ];
    
    for (const test of tests) {
        try {
            console.log(`📋 Testing: ${test.name}`);
            console.log(`   URL: https://tech-board.up.railway.app${test.path}`);
            
            const result = await makeRequest(test.path);
            console.log(`   Status: ${result.statusCode}`);
            
            if (result.statusCode === 200) {
                const hasExpectedContent = test.expectedContent.some(content => 
                    content === '' || result.body.toLowerCase().includes(content.toLowerCase())
                );
                
                if (hasExpectedContent || test.expectedContent.includes('')) {
                    console.log(`   ✅ Content looks correct`);
                    console.log(`   📄 Preview: ${result.body.substring(0, 100).replace(/\n/g, ' ')}...`);
                } else {
                    console.log(`   ⚠️  Content might be incorrect`);
                    console.log(`   📄 Preview: ${result.body.substring(0, 200)}...`);
                }
            } else if (result.statusCode === 404 && test.path === '/assets/') {
                console.log(`   ℹ️  Assets directory not directly accessible (normal)`);
            } else {
                console.log(`   ❌ Unexpected status code`);
                console.log(`   📄 Response: ${result.body.substring(0, 200)}...`);
            }
            
        } catch (error) {
            console.log(`   ❌ Request failed: ${error.message}`);
        }
        
        console.log(''); // Empty line
    }
    
    // Test API endpoint accessibility
    console.log('📋 Testing: API Endpoint');
    console.log('   URL: https://tech-board.up.railway.app/api/auth/verify');
    
    try {
        const apiResult = await makeRequest('/api/auth/verify');
        console.log(`   Status: ${apiResult.statusCode}`);
        
        if (apiResult.statusCode === 401) {
            console.log(`   ✅ API is working (401 expected without token)`);
        } else {
            console.log(`   ⚠️  Unexpected API response`);
            console.log(`   📄 Response: ${apiResult.body}`);
        }
    } catch (error) {
        console.log(`   ❌ API request failed: ${error.message}`);
    }
}

function makeRequest(path) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'tech-board.up.railway.app',
            port: 443,
            path: path,
            method: 'GET',
            headers: {
                'User-Agent': 'Frontend-Test-Client',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            }
        };
        
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
        });
        
        req.on('error', reject);
        req.setTimeout(10000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
        
        req.end();
    });
}

// Run the test
testFrontendAccess()
    .then(() => {
        console.log('🏆 Frontend access test completed');
        console.log('📝 Check the results above to see if frontend is properly served');
    })
    .catch(error => {
        console.error('❌ Frontend test failed:', error);
    });