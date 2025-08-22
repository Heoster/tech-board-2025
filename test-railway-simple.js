const axios = require('axios');

const RAILWAY_URL = 'https://tech-board.up.railway.app';

async function testTechBoard() {
  console.log('🚀 Testing Tech Board on Railway...\n');
  
  const results = [];
  let adminToken = null;
  let studentToken = null;

  // Test 1: Health Check
  console.log('1️⃣ Testing Health Check...');
  try {
    const response = await axios.get(`${RAILWAY_URL}/api/health`, { timeout: 10000 });
    if (response.status === 200 && response.data.status === 'OK') {
      console.log('✅ Health check passed');
      console.log(`   📊 Questions: ${response.data.questions?.total || 0}`);
      console.log(`   🗄️ Database: ${response.data.database?.connected ? 'Connected' : 'Disconnected'}`);
      results.push({ test: 'Health Check', status: 'PASSED' });
    } else {
      console.log('❌ Health check failed');
      results.push({ test: 'Health Check', status: 'FAILED' });
    }
  } catch (error) {
    console.log(`❌ Health check error: ${error.message}`);
    results.push({ test: 'Health Check', status: 'ERROR' });
  }

  // Test 2: Frontend Access
  console.log('\n2️⃣ Testing Frontend Access...');
  try {
    const response = await axios.get(RAILWAY_URL, { timeout: 10000 });
    if (response.status === 200 && response.data.includes('<!DOCTYPE html>')) {
      console.log('✅ Frontend accessible');
      results.push({ test: 'Frontend Access', status: 'PASSED' });
    } else {
      console.log('❌ Frontend not accessible');
      results.push({ test: 'Frontend Access', status: 'FAILED' });
    }
  } catch (error) {
    console.log(`❌ Frontend error: ${error.message}`);
    results.push({ test: 'Frontend Access', status: 'ERROR' });
  }

  // Test 3: Admin Login
  console.log('\n3️⃣ Testing Admin Login...');
  try {
    const response = await axios.post(`${RAILWAY_URL}/api/auth/admin/login`, {
      username: 'admin',
      password: 'admin123'
    }, { timeout: 10000 });
    
    if (response.status === 200 && response.data.token) {
      adminToken = response.data.token;
      console.log('✅ Admin login successful');
      results.push({ test: 'Admin Login', status: 'PASSED' });
    } else {
      console.log('❌ Admin login failed');
      results.push({ test: 'Admin Login', status: 'FAILED' });
    }
  } catch (error) {
    console.log(`❌ Admin login error: ${error.message}`);
    results.push({ test: 'Admin Login', status: 'ERROR' });
  }

  // Test 4: Admin Dashboard
  if (adminToken) {
    console.log('\n4️⃣ Testing Admin Dashboard...');
    try {
      const response = await axios.get(`${RAILWAY_URL}/api/admin/dashboard`, {
        headers: { Authorization: `Bearer ${adminToken}` },
        timeout: 10000
      });
      
      if (response.status === 200) {
        console.log('✅ Admin dashboard accessible');
        console.log(`   👥 Students: ${response.data.totalStudents || 0}`);
        console.log(`   📝 Results: ${response.data.totalResults || 0}`);
        results.push({ test: 'Admin Dashboard', status: 'PASSED' });
      } else {
        console.log('❌ Admin dashboard failed');
        results.push({ test: 'Admin Dashboard', status: 'FAILED' });
      }
    } catch (error) {
      console.log(`❌ Admin dashboard error: ${error.message}`);
      results.push({ test: 'Admin Dashboard', status: 'ERROR' });
    }
  }

  // Test 5: Student Registration
  console.log('\n5️⃣ Testing Student Registration...');
  const testStudent = {
    rollNumber: 'TEST001',
    name: 'Test Student',
    grade: 6,
    section: 'A'
  };

  try {
    const response = await axios.post(`${RAILWAY_URL}/api/auth/register`, testStudent, { timeout: 10000 });
    
    if (response.status === 201 || response.status === 200 || response.status === 409) {
      console.log('✅ Student registration working');
      results.push({ test: 'Student Registration', status: 'PASSED' });
    } else {
      console.log('❌ Student registration failed');
      results.push({ test: 'Student Registration', status: 'FAILED' });
    }
  } catch (error) {
    console.log(`❌ Student registration error: ${error.message}`);
    results.push({ test: 'Student Registration', status: 'ERROR' });
  }

  // Test 6: Student Login
  console.log('\n6️⃣ Testing Student Login...');
  try {
    const response = await axios.post(`${RAILWAY_URL}/api/auth/login`, {
      rollNumber: testStudent.rollNumber,
      grade: testStudent.grade
    }, { timeout: 10000 });
    
    if (response.status === 200 && response.data.token) {
      studentToken = response.data.token;
      console.log('✅ Student login successful');
      results.push({ test: 'Student Login', status: 'PASSED' });
    } else {
      console.log('❌ Student login failed');
      results.push({ test: 'Student Login', status: 'FAILED' });
    }
  } catch (error) {
    console.log(`❌ Student login error: ${error.message}`);
    results.push({ test: 'Student Login', status: 'ERROR' });
  }

  // Test 7: Quiz Generation
  if (studentToken) {
    console.log('\n7️⃣ Testing Quiz Generation...');
    try {
      const response = await axios.post(`${RAILWAY_URL}/api/quiz/start`, {
        grade: testStudent.grade
      }, {
        headers: { Authorization: `Bearer ${studentToken}` },
        timeout: 15000
      });
      
      if (response.status === 200 && response.data.questions) {
        const questions = response.data.questions;
        console.log(`✅ Quiz generated with ${questions.length} questions`);
        
        // Validate question structure
        const validQuestions = questions.every(q => 
          q.id && q.question && q.options && q.options.length === 4
        );
        
        if (validQuestions) {
          console.log('✅ All questions have valid structure');
          results.push({ test: 'Quiz Generation', status: 'PASSED' });
        } else {
          console.log('❌ Some questions have invalid structure');
          results.push({ test: 'Quiz Generation', status: 'FAILED' });
        }
      } else {
        console.log('❌ Quiz generation failed');
        results.push({ test: 'Quiz Generation', status: 'FAILED' });
      }
    } catch (error) {
      console.log(`❌ Quiz generation error: ${error.message}`);
      results.push({ test: 'Quiz Generation', status: 'ERROR' });
    }
  }

  // Test 8: Admin Question Management
  if (adminToken) {
    console.log('\n8️⃣ Testing Admin Question Management...');
    try {
      const response = await axios.get(`${RAILWAY_URL}/api/admin/questions?grade=6&limit=5`, {
        headers: { Authorization: `Bearer ${adminToken}` },
        timeout: 10000
      });
      
      if (response.status === 200 && response.data.questions) {
        console.log(`✅ Question management working - ${response.data.questions.length} questions retrieved`);
        results.push({ test: 'Question Management', status: 'PASSED' });
      } else {
        console.log('❌ Question management failed');
        results.push({ test: 'Question Management', status: 'FAILED' });
      }
    } catch (error) {
      console.log(`❌ Question management error: ${error.message}`);
      results.push({ test: 'Question Management', status: 'ERROR' });
    }
  }

  // Test 9: Admin Results View
  if (adminToken) {
    console.log('\n9️⃣ Testing Admin Results View...');
    try {
      const response = await axios.get(`${RAILWAY_URL}/api/admin/results`, {
        headers: { Authorization: `Bearer ${adminToken}` },
        timeout: 10000
      });
      
      if (response.status === 200) {
        console.log(`✅ Results view working - ${response.data.length || 0} results found`);
        results.push({ test: 'Results View', status: 'PASSED' });
      } else {
        console.log('❌ Results view failed');
        results.push({ test: 'Results View', status: 'FAILED' });
      }
    } catch (error) {
      console.log(`❌ Results view error: ${error.message}`);
      results.push({ test: 'Results View', status: 'ERROR' });
    }
  }

  // Generate Report
  console.log('\n📊 TEST RESULTS SUMMARY');
  console.log('=' * 50);
  
  const passed = results.filter(r => r.status === 'PASSED').length;
  const failed = results.filter(r => r.status === 'FAILED').length;
  const errors = results.filter(r => r.status === 'ERROR').length;
  const total = results.length;
  const successRate = Math.round((passed / total) * 100);

  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`🚫 Errors: ${errors}`);
  console.log(`📊 Success Rate: ${successRate}%`);

  console.log('\nDetailed Results:');
  results.forEach(result => {
    const icon = result.status === 'PASSED' ? '✅' : result.status === 'FAILED' ? '❌' : '🚫';
    console.log(`  ${icon} ${result.test}`);
  });

  if (successRate >= 80) {
    console.log('\n🎉 TECH BOARD IS READY FOR PRODUCTION!');
    console.log('\n🚀 Access Points:');
    console.log(`  🌐 Frontend: ${RAILWAY_URL}`);
    console.log(`  👥 Student Registration: ${RAILWAY_URL}/register`);
    console.log(`  🔐 Admin Panel: ${RAILWAY_URL}/admin`);
    console.log(`  📊 Health Check: ${RAILWAY_URL}/api/health`);
    
    console.log('\n🔑 Admin Credentials:');
    console.log('  Username: admin');
    console.log('  Password: admin123');
    console.log('  ⚠️  CHANGE PASSWORD AFTER FIRST LOGIN!');
    
    return true;
  } else {
    console.log('\n❌ SYSTEM NOT READY - ISSUES DETECTED');
    console.log('\nFailed Tests:');
    results.filter(r => r.status !== 'PASSED').forEach(result => {
      console.log(`  - ${result.test}`);
    });
    return false;
  }
}

// Run the test
testTechBoard()
  .then(success => {
    console.log(`\n${success ? '🎉' : '❌'} Testing ${success ? 'completed successfully' : 'failed'}`);
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('❌ Test suite failed:', error.message);
    process.exit(1);
  });