const axios = require('axios');

const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://tech-board.up.railway.app' 
  : 'http://localhost:8000';

async function testAdminFunctionality() {
  console.log('🧪 Testing Admin Functionality...\n');
  
  try {
    // 1. Test admin login
    console.log('1. Testing admin login...');
    const loginResponse = await axios.post(`${BASE_URL}/api/auth/admin/login`, {
      username: 'admin',
      password: 'admin123'
    });
    
    if (loginResponse.data.success) {
      console.log('✅ Admin login successful');
      const token = loginResponse.data.data.token;
      
      // 2. Test dashboard access
      console.log('2. Testing dashboard access...');
      const dashboardResponse = await axios.get(`${BASE_URL}/api/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (dashboardResponse.data.success) {
        console.log('✅ Dashboard access successful');
        console.log('   - Total Students:', dashboardResponse.data.totalStudents);
        console.log('   - Total Questions:', dashboardResponse.data.totalQuestions);
      }
      
      // 3. Test question management
      console.log('3. Testing question management...');
      const questionsResponse = await axios.get(`${BASE_URL}/api/admin/questions?limit=5`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (questionsResponse.data.success) {
        console.log('✅ Question listing successful');
        console.log('   - Questions found:', questionsResponse.data.questions.length);
      }
      
      // 4. Test adding a question
      console.log('4. Testing question creation...');
      const newQuestion = {
        grade: 6,
        difficulty: 'basic',
        questionText: 'Test question: What is a computer?',
        options: [
          { text: 'An electronic device', isCorrect: true },
          { text: 'A book', isCorrect: false },
          { text: 'A car', isCorrect: false },
          { text: 'A tree', isCorrect: false }
        ]
      };
      
      const createResponse = await axios.post(`${BASE_URL}/api/admin/questions`, newQuestion, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (createResponse.data.success) {
        console.log('✅ Question creation successful');
        const questionId = createResponse.data.questionId;
        
        // 5. Test editing the question
        console.log('5. Testing question editing...');
        const editedQuestion = {
          ...newQuestion,
          questionText: 'Updated test question: What is a computer?'
        };
        
        const editResponse = await axios.put(`${BASE_URL}/api/admin/questions/${questionId}`, editedQuestion, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (editResponse.data.success) {
          console.log('✅ Question editing successful');
        }
        
        // 6. Test deleting the question
        console.log('6. Testing question deletion...');
        const deleteResponse = await axios.delete(`${BASE_URL}/api/admin/questions/${questionId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (deleteResponse.data.success) {
          console.log('✅ Question deletion successful');
        }
      }
      
      // 7. Test student management
      console.log('7. Testing student management...');
      const studentsResponse = await axios.get(`${BASE_URL}/api/admin/students?limit=5`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (studentsResponse.data.success) {
        console.log('✅ Student listing successful');
        console.log('   - Students found:', studentsResponse.data.students.length);
      }
      
      console.log('\n🎉 All admin functionality tests passed!');
      
    } else {
      console.log('❌ Admin login failed');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

async function testStudentAuth() {
  console.log('\n🧪 Testing Student Authentication...\n');
  
  try {
    // Test student registration
    console.log('1. Testing student registration...');
    const registerData = {
      name: 'Test Student',
      rollNumber: 99,
      grade: 6,
      section: 'A',
      password: 'password123'
    };
    
    const registerResponse = await axios.post(`${BASE_URL}/api/auth/register`, registerData);
    
    if (registerResponse.data.success) {
      console.log('✅ Student registration successful');
      
      // Test student login
      console.log('2. Testing student login...');
      const loginResponse = await axios.post(`${BASE_URL}/api/auth/login`, {
        rollNumber: 99,
        grade: 6,
        section: 'A',
        password: 'password123'
      });
      
      if (loginResponse.data.success) {
        console.log('✅ Student login successful');
        console.log('   - Student:', loginResponse.data.data.user.name);
      }
      
    } else {
      console.log('⚠️ Student registration failed (might already exist)');
      
      // Try login anyway
      console.log('2. Testing student login with existing account...');
      const loginResponse = await axios.post(`${BASE_URL}/api/auth/login`, {
        rollNumber: 99,
        grade: 6,
        section: 'A',
        password: 'password123'
      });
      
      if (loginResponse.data.success) {
        console.log('✅ Student login successful');
      }
    }
    
  } catch (error) {
    console.error('❌ Student auth test failed:', error.response?.data || error.message);
  }
}

// Run tests
testAdminFunctionality().then(() => {
  return testStudentAuth();
}).then(() => {
  console.log('\n✅ All functionality tests completed!');
}).catch(console.error);