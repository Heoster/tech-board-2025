const axios = require('axios');

// Configure axios to handle SSL issues
const https = require('https');
const agent = new https.Agent({  
  rejectUnauthorized: false
});

const RAILWAY_URL = 'https://tech-board.up.railway.app';

async function finalRailwayTest() {
  console.log('🚀 Final Tech Board Railway Test...\n');
  console.log(`🎯 Target: ${RAILWAY_URL}\n`);

  const axiosConfig = {
    timeout: 20000,
    httpsAgent: agent,
    headers: {
      'User-Agent': 'Tech-Board-Test/1.0',
      'Accept': 'application/json, text/html, */*'
    }
  };

  let testResults = {
    health: false,
    frontend: false,
    adminLogin: false,
    questionManagement: false,
    studentRegistration: false,
    studentLogin: false,
    quizGeneration: false
  };

  // Test 1: Health Check
  console.log('1️⃣ Testing Health Check...');
  try {
    const response = await axios.get(`${RAILWAY_URL}/api/health`, axiosConfig);
    if (response.status === 200 && response.data.status === 'OK') {
      console.log('✅ Health Check: PASSED');
      console.log(`   📊 Questions: ${response.data.questions?.total || 0}`);
      console.log(`   🗄️ Database: ${response.data.database?.connected ? 'Connected' : 'Disconnected'}`);
      testResults.health = true;
    } else {
      console.log('❌ Health Check: FAILED');
    }
  } catch (error) {
    console.log(`❌ Health Check: ERROR - ${error.code || error.message}`);
  }

  // Test 2: Frontend
  console.log('\n2️⃣ Testing Frontend...');
  try {
    const response = await axios.get(RAILWAY_URL, axiosConfig);
    if (response.status === 200 && response.data.includes('<!DOCTYPE html>')) {
      console.log('✅ Frontend: PASSED - React app accessible');
      testResults.frontend = true;
    } else {
      console.log('❌ Frontend: FAILED');
    }
  } catch (error) {
    console.log(`❌ Frontend: ERROR - ${error.code || error.message}`);
  }

  // Test 3: Admin Login
  console.log('\n3️⃣ Testing Admin Login...');
  try {
    const response = await axios.post(`${RAILWAY_URL}/api/auth/admin/login`, {
      username: 'admin',
      password: 'admin123'
    }, {
      ...axiosConfig,
      headers: {
        ...axiosConfig.headers,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.status === 200 && response.data.success && response.data.data.token) {
      console.log('✅ Admin Login: PASSED');
      console.log(`   👤 Admin: ${response.data.data.user.username}`);
      testResults.adminLogin = true;
      
      // Test Question Management
      console.log('\n4️⃣ Testing Question Management...');
      try {
        const questionsResponse = await axios.get(`${RAILWAY_URL}/api/admin/questions?grade=6&limit=3`, {
          ...axiosConfig,
          headers: {
            ...axiosConfig.headers,
            'Authorization': `Bearer ${response.data.data.token}`
          }
        });
        
        if (questionsResponse.status === 200 && questionsResponse.data.success) {
          console.log('✅ Question Management: PASSED');
          console.log(`   📚 Questions Retrieved: ${questionsResponse.data.questions?.length || 0}`);
          console.log(`   📊 Total Grade 6: ${questionsResponse.data.pagination?.total || 0}`);
          testResults.questionManagement = true;
        } else {
          console.log('❌ Question Management: FAILED');
        }
      } catch (error) {
        console.log(`❌ Question Management: ERROR - ${error.code || error.message}`);
      }
    } else {
      console.log('❌ Admin Login: FAILED');
    }
  } catch (error) {
    console.log(`❌ Admin Login: ERROR - ${error.code || error.message}`);
  }

  // Test 4: Student Registration
  console.log('\n5️⃣ Testing Student Registration...');
  const testStudent = {
    name: 'Railway Test Student',
    rollNumber: Math.floor(Math.random() * 900) + 100,
    password: 'test123456',
    grade: 6,
    section: 'A',
    email: `railwaytest${Date.now()}@example.com`
  };

  try {
    const response = await axios.post(`${RAILWAY_URL}/api/auth/register`, testStudent, {
      ...axiosConfig,
      headers: {
        ...axiosConfig.headers,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.status === 200 && response.data.success) {
      console.log('✅ Student Registration: PASSED');
      console.log(`   👤 Student: ${testStudent.name} (${testStudent.email})`);
      testResults.studentRegistration = true;
      
      // Test Student Login
      console.log('\n6️⃣ Testing Student Login...');
      try {
        const loginResponse = await axios.post(`${RAILWAY_URL}/api/auth/login`, {
          email: testStudent.email,
          password: testStudent.password
        }, {
          ...axiosConfig,
          headers: {
            ...axiosConfig.headers,
            'Content-Type': 'application/json'
          }
        });
        
        if (loginResponse.status === 200 && loginResponse.data.success && loginResponse.data.data.token) {
          console.log('✅ Student Login: PASSED');
          console.log(`   👤 Logged in: ${loginResponse.data.data.user.name}`);
          testResults.studentLogin = true;
          
          // Test Quiz Generation
          console.log('\n7️⃣ Testing Quiz Generation...');
          try {
            const quizResponse = await axios.post(`${RAILWAY_URL}/api/quiz/start`, {
              grade: testStudent.grade
            }, {
              ...axiosConfig,
              headers: {
                ...axiosConfig.headers,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${loginResponse.data.data.token}`
              }
            });
            
            if (quizResponse.status === 200 && quizResponse.data.success && quizResponse.data.questions) {
              console.log('✅ Quiz Generation: PASSED');
              console.log(`   📝 Questions Generated: ${quizResponse.data.questions.length}`);
              console.log(`   ⏱️ Time Limit: ${quizResponse.data.timeLimit || 50} minutes`);
              testResults.quizGeneration = true;
            } else {
              console.log('❌ Quiz Generation: FAILED');
            }
          } catch (error) {
            console.log(`❌ Quiz Generation: ERROR - ${error.code || error.message}`);
          }
        } else {
          console.log('❌ Student Login: FAILED');
        }
      } catch (error) {
        console.log(`❌ Student Login: ERROR - ${error.code || error.message}`);
      }
    } else if (response.status === 400 && response.data.error === 'Student already registered') {
      console.log('⚠️ Student Registration: WORKING (student exists)');
      testResults.studentRegistration = true;
    } else {
      console.log('❌ Student Registration: FAILED');
    }
  } catch (error) {
    console.log(`❌ Student Registration: ERROR - ${error.code || error.message}`);
  }

  // Generate Final Report
  console.log('\n' + '='.repeat(60));
  console.log('📊 FINAL TECH BOARD RAILWAY TEST RESULTS');
  console.log('='.repeat(60));

  const tests = [
    { name: 'Health Check', status: testResults.health },
    { name: 'Frontend Access', status: testResults.frontend },
    { name: 'Admin Login', status: testResults.adminLogin },
    { name: 'Question Management', status: testResults.questionManagement },
    { name: 'Student Registration', status: testResults.studentRegistration },
    { name: 'Student Login', status: testResults.studentLogin },
    { name: 'Quiz Generation', status: testResults.quizGeneration }
  ];

  const passed = tests.filter(t => t.status).length;
  const total = tests.length;
  const successRate = Math.round((passed / total) * 100);

  console.log(`\n📈 Summary:`);
  console.log(`  ✅ Passed: ${passed}/${total}`);
  console.log(`  📊 Success Rate: ${successRate}%`);

  console.log(`\n🔍 Test Results:`);
  tests.forEach(test => {
    const icon = test.status ? '✅' : '❌';
    console.log(`  ${icon} ${test.name}`);
  });

  if (successRate >= 70) {
    console.log('\n🎉 TECH BOARD IS WORKING ON RAILWAY!');
    console.log('\n🚀 System Ready For:');
    if (testResults.health) console.log('  ✅ System monitoring');
    if (testResults.frontend) console.log('  ✅ Student access via web');
    if (testResults.adminLogin) console.log('  ✅ Admin management');
    if (testResults.questionManagement) console.log('  ✅ Question bank management');
    if (testResults.studentRegistration) console.log('  ✅ Student registration');
    if (testResults.studentLogin) console.log('  ✅ Student authentication');
    if (testResults.quizGeneration) console.log('  ✅ Quiz generation and testing');
    
    console.log('\n🌐 Access Information:');
    console.log(`  🏠 Main Site: ${RAILWAY_URL}`);
    console.log(`  👥 Student Registration: ${RAILWAY_URL}/register`);
    console.log(`  🔐 Admin Panel: ${RAILWAY_URL}/admin`);
    console.log(`  📊 System Health: ${RAILWAY_URL}/api/health`);
    
    console.log('\n🔑 Admin Access:');
    console.log('  Username: admin');
    console.log('  Password: admin123');
    console.log('  ⚠️  CHANGE PASSWORD IMMEDIATELY!');
    
    console.log('\n📝 Student Registration Requirements:');
    console.log('  - Full Name');
    console.log('  - Roll Number (numeric)');
    console.log('  - Email Address');
    console.log('  - Password (6+ characters)');
    console.log('  - Grade (6, 7, 8, 9, or 11)');
    console.log('  - Section (A, B, C, etc.)');
    
    return true;
  } else {
    console.log('\n❌ TECH BOARD HAS ISSUES ON RAILWAY');
    console.log('\n🔧 Failed Components:');
    tests.filter(t => !t.status).forEach(test => {
      console.log(`  ❌ ${test.name}`);
    });
    
    console.log('\n💡 Troubleshooting Steps:');
    console.log('  1. Check Railway deployment logs');
    console.log('  2. Verify environment variables');
    console.log('  3. Ensure database is properly seeded');
    console.log('  4. Check network connectivity');
    
    return false;
  }
}

// Run the final test
finalRailwayTest()
  .then(success => {
    console.log(`\n${success ? '🎉 SUCCESS' : '❌ ISSUES DETECTED'}: Railway testing complete`);
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('❌ Test suite crashed:', error.message);
    process.exit(1);
  });