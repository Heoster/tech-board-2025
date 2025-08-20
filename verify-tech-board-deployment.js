const axios = require('axios');

const RAILWAY_URL = 'https://tech-board.up.railway.app';

async function verifyTechBoardDeployment() {
  console.log(`🔍 Verifying Tech Board deployment at: ${RAILWAY_URL}\n`);

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
      name: 'Frontend Application',
      url: '/',
      method: 'GET',
      expectedStatus: 200,
      validate: (data) => {
        return typeof data === 'string' && 
               (data.includes('TECH BOARD') || data.includes('<!DOCTYPE html>'));
      }
    },
    {
      name: 'API Information',
      url: '/api',
      method: 'GET',
      expectedStatus: 200,
      validate: (data) => {
        return data.name && 
               data.version && 
               data.status === 'operational' &&
               data.features &&
               data.features.length >= 5;
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
    },
    {
      name: 'Quiz Start Endpoint (Protected)',
      url: '/api/quiz/start',
      method: 'POST',
      expectedStatus: 401,
      data: { grade: 6 },
      validate: (data) => data.error
    }
  ];

  let passed = 0;
  let failed = 0;
  const results = [];

  console.log('🧪 Running deployment tests...\n');

  for (const test of tests) {
    try {
      console.log(`Testing: ${test.name}...`);
      
      const config = {
        method: test.method,
        url: `${RAILWAY_URL}${test.url}`,
        timeout: 15000,
        validateStatus: () => true,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Tech-Board-Deployment-Test/1.0'
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
          console.log(`     Validation failed`);
        }
        failed++;
        results.push({ 
          test: test.name, 
          status: 'FAILED', 
          details: `Status: ${response.status}, Expected: ${test.expectedStatus}` 
        });
      }
    } catch (error) {
      console.log(`  ❌ ${test.name}: ERROR - ${error.message}`);
      failed++;
      results.push({ test: test.name, status: 'ERROR', details: error.message });
    }
  }

  console.log(`\n📊 Tech Board Deployment Test Results:`);
  console.log(`  ✅ Passed: ${passed}`);
  console.log(`  ❌ Failed: ${failed}`);
  console.log(`  📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);

  if (failed === 0) {
    console.log('\n🎉 All tests passed! Tech Board is live and working perfectly!');
    
    // Additional detailed checks
    console.log('\n🔧 Tech Board Production Status:');
    
    try {
      const healthResponse = await axios.get(`${RAILWAY_URL}/api/health`, { timeout: 10000 });
      const health = healthResponse.data;
      
      console.log(`  ${health.database?.connected ? '✅' : '❌'} Database: ${health.database?.connected ? 'Connected' : 'Disconnected'}`);
      console.log(`  ${health.questions?.total >= 1500 ? '✅' : '❌'} Questions: ${health.questions?.total || 0}/1500`);
      console.log(`  ${health.questions?.gradesReady >= 5 ? '✅' : '❌'} Grades Ready: ${health.questions?.gradesReady || 0}/5`);
      console.log(`  ${health.environment === 'production' ? '✅' : '⚠️'} Environment: ${health.environment || 'unknown'}`);
      console.log(`  ${health.features?.authentication === 'Available' ? '✅' : '❌'} Authentication: ${health.features?.authentication || 'Unknown'}`);
      console.log(`  ${health.features?.quizSystem === 'Available' ? '✅' : '❌'} Quiz System: ${health.features?.quizSystem || 'Unknown'}`);
      console.log(`  ${health.features?.adminPanel === 'Available' ? '✅' : '❌'} Admin Panel: ${health.features?.adminPanel || 'Unknown'}`);
      
      console.log('\n🎯 Access Points:');
      console.log(`  🌐 Frontend: ${RAILWAY_URL}`);
      console.log(`  👥 Student Registration: ${RAILWAY_URL}/register`);
      console.log(`  🔐 Admin Login: ${RAILWAY_URL}/admin`);
      console.log(`  📊 Health Check: ${RAILWAY_URL}/api/health`);
      
      console.log('\n🔑 Default Admin Credentials:');
      console.log(`  Username: admin`);
      console.log(`  Password: admin123`);
      console.log(`  ⚠️  IMPORTANT: Change password immediately after first login!`);
      
    } catch (error) {
      console.log('  ⚠️ Could not fetch detailed health information');
    }
    
    console.log('\n🚀 Tech Board 2025 is LIVE and ready for students!');
    console.log('🎓 The system is ready to handle the selection process.');
    
    return true;
  } else {
    console.log('\n❌ Some tests failed. Please check the deployment.');
    console.log('\nFailed tests:');
    results.filter(r => r.status !== 'PASSED').forEach(r => {
      console.log(`  - ${r.test}: ${r.details}`);
    });
    
    console.log('\n🔧 Troubleshooting:');
    console.log('  1. Check Railway logs: railway logs');
    console.log('  2. Verify environment variables are set');
    console.log('  3. Ensure build completed successfully');
    console.log('  4. Check database seeding completed');
    
    return false;
  }
}

// Run verification
verifyTechBoardDeployment()
  .then(success => {
    console.log(`\n${success ? '🎉' : '❌'} Verification ${success ? 'completed successfully' : 'failed'}`);
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('❌ Verification failed with error:', error.message);
    process.exit(1);
  });