const axios = require('axios');

async function testRailwayDeployment() {
  const baseUrl = process.argv[2] || 'http://localhost:8000';
  
  console.log(`🧪 Testing Railway deployment at: ${baseUrl}\n`);

  const tests = [
    {
      name: 'Health Check',
      url: '/api/health',
      method: 'GET',
      expectedStatus: 200,
      validate: (data) => {
        return data.status === 'OK' && 
               data.questions && 
               data.questions.total >= 1500 &&
               data.database &&
               data.database.connected === true;
      }
    },
    {
      name: 'Frontend Serving',
      url: '/',
      method: 'GET',
      expectedStatus: 200,
      validate: (data) => {
        return typeof data === 'string' && 
               (data.includes('TECH BOARD') || data.includes('<!DOCTYPE html>'));
      }
    },
    {
      name: 'API Info',
      url: '/api',
      method: 'GET',
      expectedStatus: 200,
      validate: (data) => {
        return data.name && data.version && data.status === 'operational';
      }
    },
    {
      name: 'Admin Login Endpoint',
      url: '/api/auth/admin/login',
      method: 'POST',
      expectedStatus: 400,
      data: {},
      validate: (data) => data.error
    },
    {
      name: 'Student Registration Endpoint',
      url: '/api/auth/register',
      method: 'POST',
      expectedStatus: 400,
      data: {},
      validate: (data) => data.error
    }
  ];

  let passed = 0;
  let failed = 0;
  const results = [];

  for (const test of tests) {
    try {
      console.log(`Testing: ${test.name}...`);
      
      const config = {
        method: test.method,
        url: `${baseUrl}${test.url}`,
        timeout: 15000,
        validateStatus: () => true,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Railway-Deployment-Test/1.0'
        }
      };

      if (test.data) {
        config.data = test.data;
      }

      const response = await axios(config);
      
      const statusMatch = response.status === test.expectedStatus;
      const validationPass = !test.validate || test.validate(response.data);
      
      if (statusMatch && validationPass) {
        console.log(`  ✅ ${test.name}: PASSED`);
        passed++;
        results.push({ test: test.name, status: 'PASSED', details: 'All checks passed' });
      } else {
        console.log(`  ❌ ${test.name}: FAILED`);
        console.log(`     Expected status: ${test.expectedStatus}, got: ${response.status}`);
        if (test.validate && !validationPass) {
          console.log(`     Validation failed for response:`, JSON.stringify(response.data, null, 2));
        }
        failed++;
        results.push({ 
          test: test.name, 
          status: 'FAILED', 
          details: `Status: ${response.status}, Validation: ${validationPass}` 
        });
      }
    } catch (error) {
      console.log(`  ❌ ${test.name}: ERROR - ${error.message}`);
      failed++;
      results.push({ test: test.name, status: 'ERROR', details: error.message });
    }
  }

  console.log(`\n📊 Railway Deployment Test Results:`);
  console.log(`  ✅ Passed: ${passed}`);
  console.log(`  ❌ Failed: ${failed}`);
  console.log(`  📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);

  if (failed === 0) {
    console.log('\n🎉 All tests passed! Railway deployment is working perfectly.');
    
    // Additional Railway-specific checks
    console.log('\n🔧 Railway Production Checklist:');
    
    try {
      const healthResponse = await axios.get(`${baseUrl}/api/health`, { timeout: 10000 });
      const health = healthResponse.data;
      
      console.log(`  ${health.database?.connected ? '✅' : '❌'} Database connected`);
      console.log(`  ${health.questions?.total >= 1500 ? '✅' : '❌'} Questions seeded (${health.questions?.total || 0}/1500)`);
      console.log(`  ${health.environment === 'production' ? '✅' : '⚠️'} Production environment`);
      console.log(`  ${health.features?.authentication === 'Available' ? '✅' : '❌'} Authentication system`);
      console.log(`  ${health.features?.quizSystem === 'Available' ? '✅' : '❌'} Quiz system`);
      console.log(`  ${health.features?.adminPanel === 'Available' ? '✅' : '❌'} Admin panel`);
      
    } catch (error) {
      console.log('  ⚠️ Could not fetch detailed health information');
    }
    
    console.log('\n🚀 Railway deployment is ready for production use!');
    return true;
  } else {
    console.log('\n❌ Some tests failed. Please check the Railway deployment.');
    console.log('\nFailed tests:');
    results.filter(r => r.status !== 'PASSED').forEach(r => {
      console.log(`  - ${r.test}: ${r.details}`);
    });
    return false;
  }
}

// Run test if called directly
if (require.main === module) {
  const baseUrl = process.argv[2];
  if (!baseUrl) {
    console.log('Usage: node test-railway-deployment.js <base-url>');
    console.log('Example: node test-railway-deployment.js https://your-app.up.railway.app');
    process.exit(1);
  }
  
  testRailwayDeployment()
    .then(success => process.exit(success ? 0 : 1))
    .catch(error => {
      console.error('Test execution failed:', error);
      process.exit(1);
    });
}

module.exports = testRailwayDeployment;