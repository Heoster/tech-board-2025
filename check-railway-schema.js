const axios = require('axios');

const RAILWAY_URL = 'https://tech-board.up.railway.app';

async function checkRailwaySchema() {
  console.log('🔍 Checking Railway Database Schema...\n');

  // First, get admin token
  console.log('1️⃣ Getting admin token...');
  try {
    const loginResponse = await axios.post(`${RAILWAY_URL}/api/auth/admin/login`, {
      username: 'admin',
      password: 'admin123'
    }, { timeout: 10000 });

    if (loginResponse.status === 200 && loginResponse.data.data.token) {
      const adminToken = loginResponse.data.data.token;
      console.log('✅ Admin token obtained');

      // Check database schema via admin endpoint
      console.log('\n2️⃣ Checking database schema...');
      try {
        const schemaResponse = await axios.get(`${RAILWAY_URL}/api/admin/dashboard`, {
          headers: { Authorization: `Bearer ${adminToken}` },
          timeout: 10000
        });

        if (schemaResponse.status === 200) {
          console.log('✅ Dashboard data retrieved');
          console.log('Dashboard data:', JSON.stringify(schemaResponse.data, null, 2));
        } else {
          console.log('❌ Dashboard access failed');
        }
      } catch (error) {
        console.log(`❌ Dashboard error: ${error.message}`);
      }

      // Check questions
      console.log('\n3️⃣ Checking questions...');
      try {
        const questionsResponse = await axios.get(`${RAILWAY_URL}/api/admin/questions?grade=6&limit=1`, {
          headers: { Authorization: `Bearer ${adminToken}` },
          timeout: 10000
        });

        if (questionsResponse.status === 200) {
          console.log('✅ Questions retrieved');
          console.log('Sample question:', JSON.stringify(questionsResponse.data, null, 2));
        } else {
          console.log('❌ Questions access failed');
        }
      } catch (error) {
        console.log(`❌ Questions error: ${error.message}`);
      }

      // Check students
      console.log('\n4️⃣ Checking students...');
      try {
        const studentsResponse = await axios.get(`${RAILWAY_URL}/api/admin/students`, {
          headers: { Authorization: `Bearer ${adminToken}` },
          timeout: 10000
        });

        if (studentsResponse.status === 200) {
          console.log('✅ Students retrieved');
          console.log('Students data:', JSON.stringify(studentsResponse.data, null, 2));
        } else {
          console.log('❌ Students access failed');
        }
      } catch (error) {
        console.log(`❌ Students error: ${error.message}`);
      }

    } else {
      console.log('❌ Failed to get admin token');
    }
  } catch (error) {
    console.log(`❌ Admin login error: ${error.message}`);
  }

  // Test correct student registration format
  console.log('\n5️⃣ Testing correct student registration format...');
  try {
    const regResponse = await axios.post(`${RAILWAY_URL}/api/auth/register`, {
      name: 'Test Student',
      rollNumber: 123,
      password: 'test123',
      grade: 6,
      section: 'A',

    }, { 
      timeout: 10000,
      validateStatus: () => true
    });

    console.log(`Registration Status: ${regResponse.status}`);
    console.log('Registration Response:', JSON.stringify(regResponse.data, null, 2));
  } catch (error) {
    console.log(`❌ Registration error: ${error.message}`);
  }

  // Test student login with roll number
  console.log('\n6️⃣ Testing student login with roll number...');
  try {
    const loginResponse = await axios.post(`${RAILWAY_URL}/api/auth/login`, {
      rollNumber: 123,
      password: 'test123'
    }, { 
      timeout: 10000,
      validateStatus: () => true
    });

    console.log(`Login Status: ${loginResponse.status}`);
    console.log('Login Response:', JSON.stringify(loginResponse.data, null, 2));
  } catch (error) {
    console.log(`❌ Login error: ${error.message}`);
  }
}

checkRailwaySchema().catch(console.error);