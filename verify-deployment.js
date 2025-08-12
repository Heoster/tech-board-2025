const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function verifyDeployment(baseUrl = 'http://localhost:8000') {
    console.log(`🔍 Verifying deployment at ${baseUrl}...\n`);

    const tests = [
        {
            name: 'Health Check',
            url: '/api/health',
            method: 'GET',
            expectedStatus: 200,
            validate: (data) => data.status === 'OK' && data.questions?.total >= 1500
        },
        {
            name: 'API Info',
            url: '/api',
            method: 'GET',
            expectedStatus: 200,
            validate: (data) => data.name && data.version
        },
        {
            name: 'Static Files',
            url: '/',
            method: 'GET',
            expectedStatus: 200,
            validate: (data) => typeof data === 'string' && data.includes('TECH BOARD')
        },
        {
            name: 'Admin Login Endpoint',
            url: '/api/auth/admin/login',
            method: 'POST',
            expectedStatus: 400, // Should fail without credentials
            data: {},
            validate: (data) => data.error
        },
        {
            name: 'Student Registration Endpoint',
            url: '/api/auth/register',
            method: 'POST',
            expectedStatus: 400, // Should fail without data
            data: {},
            validate: (data) => data.error
        }
    ];

    let passed = 0;
    let failed = 0;

    for (const test of tests) {
        try {
            console.log(`Testing: ${test.name}...`);
            
            const config = {
                method: test.method,
                url: `${baseUrl}${test.url}`,
                timeout: 10000,
                validateStatus: () => true // Don't throw on any status
            };

            if (test.data) {
                config.data = test.data;
            }

            const response = await axios(config);
            
            if (response.status === test.expectedStatus) {
                if (test.validate && !test.validate(response.data)) {
                    console.log(`  ❌ ${test.name}: Validation failed`);
                    console.log(`     Response:`, JSON.stringify(response.data, null, 2));
                    failed++;
                } else {
                    console.log(`  ✅ ${test.name}: Passed`);
                    passed++;
                }
            } else {
                console.log(`  ❌ ${test.name}: Expected status ${test.expectedStatus}, got ${response.status}`);
                failed++;
            }
        } catch (error) {
            console.log(`  ❌ ${test.name}: ${error.message}`);
            failed++;
        }
    }

    console.log(`\n📊 Test Results:`);
    console.log(`  ✅ Passed: ${passed}`);
    console.log(`  ❌ Failed: ${failed}`);
    console.log(`  📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);

    if (failed === 0) {
        console.log('\n🎉 All tests passed! Deployment is ready for production.');
        
        // Additional production checks
        console.log('\n🔧 Production Readiness Checklist:');
        
        // Check if client build exists
        const clientPath = path.join(__dirname, 'server/client/index.html');
        console.log(`  ${fs.existsSync(clientPath) ? '✅' : '❌'} Client build available`);
        
        // Check database
        const dbPath = path.join(__dirname, 'server/database/mcq_system_fixed.db');
        console.log(`  ${fs.existsSync(dbPath) ? '✅' : '❌'} Database file exists`);
        
        // Check environment
        console.log(`  ${process.env.NODE_ENV === 'production' ? '✅' : '⚠️'} Production environment`);
        
        return true;
    } else {
        console.log('\n❌ Some tests failed. Please check the deployment.');
        return false;
    }
}

// Run verification if called directly
if (require.main === module) {
    const baseUrl = process.argv[2] || 'http://localhost:8000';
    verifyDeployment(baseUrl)
        .then(success => process.exit(success ? 0 : 1))
        .catch(error => {
            console.error('Verification failed:', error);
            process.exit(1);
        });
}

module.exports = verifyDeployment;