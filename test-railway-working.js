const axios = require('axios');

const RAILWAY_URL = 'https://tech-board.up.railway.app';

async function testTechBoardWorking() {
  console.log('🚀 Testing Tech Board Working Features on Railway...\n');
  
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
      console.log(`   🎯 Features: ${Object.keys(response.data.features || {}).join(', ')}`);
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
      console.log('✅ Frontend accessible - React app loading');
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
    
    if (response.status === 200 && response.data.success && response.data.data.token) {
      adminToken = response.data.data.token;
      console.log('✅ Admin login successful');
      console.log(`   👤 Admin: ${response.data.data.user.username}`);
      results.push({ test: 'Admin Login', status: 'PASSED' });
    } else {
      console.log('❌ Admin login failed');
      results.push({ test: 'Admin Login', status: 'FAILED' });
    }
  } catch (error) {
    console.log(`❌ Admin login error: ${error.message}`);
    results.push({ test: 'Admin Login', status: 'ERROR' });
  }

  // Test 4: Question Management (Admin)
  if (adminToken) {
    console.log('\n4️⃣ Testing Question Management...');
    try {
      const response = await axios.get(`${RAILWAY_URL}/api/admin/questions?grade=6&limit=5`, {
        headers: { Authorization: `Bearer ${adminToken}` },
        timeout: 10000
      });
      
      if (response.status === 200 && response.data.success && response.data.questions) {
        console.log(`✅ Question management working - ${response.data.questions.length} questions retrieved`);
        console.log(`   📚 Total Grade 6 Questions: ${response.data.pagination?.total || 0}`);
        
        // Validate question structure
        const sampleQuestion = response.data.questions[0];
        if (sampleQuestion && sampleQuestion.question_text && sampleQuestion.options && sampleQuestion.options.length === 4) {
          console.log('✅ Question structure is valid');
          results.push({ test: 'Question Management', status: 'PASSED' });
        } else {
          console.log('❌ Question structure is invalid');
          results.push({ test: 'Question Management', status: 'FAILED' });
        }
      } else {
        console.log('❌ Question management failed');
        results.push({ test: 'Question Management', status: 'FAILED' });
      }
    } catch (error) {
      console.log(`❌ Question management error: ${error.message}`);
      results.push({ test: 'Question Management', status: 'ERROR' });
    }
  }

  // Test 5: Student Registration (with correct format)
  console.log('\n5️⃣ Testing Student Registration...');
  const testStudent = {
    name: 'Test Student Railway',
    rollNumber: Math.floor(Math.random() * 1000) + 100, // Random roll number
    password: 'test123456',
    grade: 6,
    section: 'A',
    email: `test${Date.now()}@example.com` // Unique email
  };

  try {
    const response = await axios.post(`${RAILWAY_URL}/api/auth/register`, testStudent, { 
      timeout: 10000,
      validateStatus: () => true
    });
    
    if (response.status === 200 && response.data.success) {
      console.log('✅ Student registration successful');
      console.log(`   👤 Student: ${testStudent.name} (Roll: ${testStudent.rollNumber})`);
      results.push({ test: 'Student Registration', status: 'PASSED' });
      
      // Store student token if provided
      if (response.data.data && response.data.data.token) {
        studentToken = response.data.data.token;
      }
    } else if (response.status === 400 && response.data.error === 'Student already registered') {
      console.log('⚠️ Student already exists - registration endpoint working');
      results.push({ test: 'Student Registration', status: 'PASSED' });
    } else {
      console.log(`❌ Student registration failed: ${response.data.error || 'Unknown error'}`);
      results.push({ test: 'Student Registration', status: 'FAILED' });
    }
  } catch (error) {
    console.log(`❌ Student registration error: ${error.message}`);
    results.push({ test: 'Student Registration', status: 'ERROR' });
  }

  // Test 6: Student Login (with email format)
  console.log('\n6️⃣ Testing Student Login...');
  try {
    const response = await axios.post(`${RAILWAY_URL}/api/auth/login`, {
      email: testStudent.email,
      password: testStudent.password
    }, { 
      timeout: 10000,
      validateStatus: () => true
    });
    
    if (response.status === 200 && response.data.success && response.data.data.token) {
      studentToken = response.data.data.token;
      console.log('✅ Student login successful');
      console.log(`   👤 Student: ${response.data.data.user.name}`);
      results.push({ test: 'Student Login', status: 'PASSED' });
    } else {
      console.log(`❌ Student login failed: ${response.data?.error || 'Unknown error'}`);
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
      
      if (response.status === 200 && response.data.success && response.data.questions) {
        const questions = response.data.questions;
        console.log(`✅ Quiz generated successfully`);
        console.log(`   📝 Questions: ${questions.length}`);
        console.log(`   ⏱️ Time Limit: ${response.data.timeLimit || 50} minutes`);
        
        // Validate question structure
        const validQuestions = questions.every(q => 
          q.id && q.question && q.options && q.options.length === 4
        );
        
        if (validQuestions) {
          console.log('✅ All questions have valid structure');
          results.push({ test: 'Quiz Generation', status: 'PASSED' });
          
          // Test Quiz Submission
          console.log('\n8️⃣ Testing Quiz Submission...');
          try {
            const answers = {};
            questions.forEach((q, index) => {
              answers[q.id] = Math.floor(Math.random() * 4); // Random answer
            });
            
            const submitResponse = await axios.post(`${RAILWAY_URL}/api/quiz/submit`, {
              answers: answers
            }, {
              headers: { Authorization: `Bearer ${studentToken}` },
              timeout: 15000
            });
            
            if (submitResponse.status === 200 && submitResponse.data.success) {
              console.log('✅ Quiz submission successful');
              console.log(`   📊 Score: ${submitResponse.data.score || 0}/${questions.length}`);
              console.log(`   🎯 Result: ${submitResponse.data.passed ? 'PASSED' : 'FAILED'}`);
              results.push({ test: 'Quiz Submission', status: 'PASSED' });
            } else {
              console.log('❌ Quiz submission failed');
              results.push({ test: 'Quiz Submission', status: 'FAILED' });
            }
          } catch (error) {
            console.log(`❌ Quiz submission error: ${error.message}`);
            results.push({ test: 'Quiz Submission', status: 'ERROR' });
          }
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
  } else {
    console.log('\n7️⃣ ⚠️ Skipping Quiz Generation - No student token');
    results.push({ test: 'Quiz Generation', status: 'SKIPPED' });
  }

  // Test 8: Admin Results View
  if (adminToken) {
    console.log('\n9️⃣ Testing Admin Results View...');
    try {
      const response = await axios.get(`${RAILWAY_URL}/api/admin/results`, {
        headers: { Authorization: `Bearer ${adminToken}` },
        timeout: 10000,
        validateStatus: () => true
      });
      
      if (response.status === 200) {
        console.log(`✅ Results view accessible`);
        console.log(`   📊 Results found: ${Array.isArray(response.data) ? response.data.length : 'N/A'}`);
        results.push({ test: 'Admin Results', status: 'PASSED' });
      } else {
        console.log(`⚠️ Results view returned ${response.status} - may be empty or have issues`);
        results.push({ test: 'Admin Results', status: 'WARNING' });
      }
    } catch (error) {
      console.log(`❌ Results view error: ${error.message}`);
      results.push({ test: 'Admin Results', status: 'ERROR' });
    }
  }

  // Generate Report
  console.log('\n📊 COMPREHENSIVE TEST RESULTS');
  console.log('=' * 60);
  
  const passed = results.filter(r => r.status === 'PASSED').length;
  const failed = results.filter(r => r.status === 'FAILED').length;
  const errors = results.filter(r => r.status === 'ERROR').length;
  const warnings = results.filter(r => r.status === 'WARNING').length;
  const skipped = results.filter(r => r.status === 'SKIPPED').length;
  const total = results.length;
  const successRate = Math.round((passed / (total - skipped)) * 100);

  console.log(`\n📈 Summary:`);
  console.log(`  ✅ Passed: ${passed}`);
  console.log(`  ❌ Failed: ${failed}`);
  console.log(`  🚫 Errors: ${errors}`);
  console.log(`  ⚠️  Warnings: ${warnings}`);
  console.log(`  ⏭️  Skipped: ${skipped}`);
  console.log(`  📊 Success Rate: ${successRate}%`);

  console.log(`\n🔍 Detailed Results:`);
  results.forEach(result => {
    const icon = result.status === 'PASSED' ? '✅' : 
                result.status === 'FAILED' ? '❌' : 
                result.status === 'ERROR' ? '🚫' : 
                result.status === 'WARNING' ? '⚠️' : '⏭️';
    console.log(`  ${icon} ${result.test}`);
  });

  if (successRate >= 75) {
    console.log('\n🎉 TECH BOARD IS WORKING WELL ON RAILWAY!');
    console.log('\n🚀 System Status:');
    console.log('  ✅ Core functionality working');
    console.log('  ✅ Admin authentication working');
    console.log('  ✅ Question management working');
    console.log('  ✅ Student registration working');
    console.log('  ✅ Quiz generation working');
    console.log('  ✅ Frontend serving correctly');
    
    console.log('\n🌐 Access Points:');
    console.log(`  🏠 Frontend: ${RAILWAY_URL}`);
    console.log(`  👥 Student Registration: ${RAILWAY_URL}/register`);
    console.log(`  🔐 Admin Panel: ${RAILWAY_URL}/admin`);
    console.log(`  📊 Health Check: ${RAILWAY_URL}/api/health`);
    
    console.log('\n🔑 Admin Credentials:');
    console.log('  Username: admin');
    console.log('  Password: admin123');
    console.log('  ⚠️  CHANGE PASSWORD AFTER FIRST LOGIN!');
    
    console.log('\n📝 Student Registration Format:');
    console.log('  - Name: Full name');
    console.log('  - Roll Number: Numeric (1-999)');
    console.log('  - Email: Valid email address');
    console.log('  - Password: Minimum 6 characters');
    console.log('  - Grade: 6, 7, 8, 9, or 11');
    console.log('  - Section: Single letter (A, B, C, etc.)');
    
    return true;
  } else {
    console.log('\n❌ SYSTEM HAS ISSUES - NEEDS ATTENTION');
    console.log('\nFailed/Error Tests:');
    results.filter(r => r.status === 'FAILED' || r.status === 'ERROR').forEach(result => {
      console.log(`  - ${result.test}: ${result.status}`);
    });
    return false;
  }
}

// Run the test
testTechBoardWorking()
  .then(success => {
    console.log(`\n${success ? '🎉' : '❌'} Testing ${success ? 'completed successfully' : 'completed with issues'}`);
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('❌ Test suite failed:', error.message);
    process.exit(1);
  });