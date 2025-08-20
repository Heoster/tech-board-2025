const axios = require('axios');

const RAILWAY_URL = 'https://tech-board.up.railway.app';

async function debugRailwayIssues() {
  console.log('🔍 Debugging Railway Issues...\n');

  // Test 1: Basic connectivity
  console.log('1️⃣ Testing basic connectivity...');
  try {
    const response = await axios.get(RAILWAY_URL, { 
      timeout: 15000,
      validateStatus: () => true,
      maxRedirects: 5
    });
    console.log(`Status: ${response.status}`);
    console.log(`Content-Type: ${response.headers['content-type']}`);
    console.log(`Content-Length: ${response.headers['content-length']}`);
    console.log(`Response preview: ${response.data.toString().substring(0, 200)}...`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }

  // Test 2: API Health
  console.log('\n2️⃣ Testing API health...');
  try {
    const response = await axios.get(`${RAILWAY_URL}/api/health`, { 
      timeout: 15000,
      validateStatus: () => true
    });
    console.log(`Status: ${response.status}`);
    console.log(`Response:`, JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }

  // Test 3: API root
  console.log('\n3️⃣ Testing API root...');
  try {
    const response = await axios.get(`${RAILWAY_URL}/api`, { 
      timeout: 15000,
      validateStatus: () => true
    });
    console.log(`Status: ${response.status}`);
    console.log(`Response:`, JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }

  // Test 4: Admin login with detailed error
  console.log('\n4️⃣ Testing admin login with details...');
  try {
    const response = await axios.post(`${RAILWAY_URL}/api/auth/admin/login`, {
      username: 'admin',
      password: 'admin123'
    }, { 
      timeout: 15000,
      validateStatus: () => true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(`Status: ${response.status}`);
    console.log(`Response:`, JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log(`Error: ${error.message}`);
    if (error.response) {
      console.log(`Response Status: ${error.response.status}`);
      console.log(`Response Data:`, error.response.data);
    }
  }

  // Test 5: Student registration with detailed error
  console.log('\n5️⃣ Testing student registration with details...');
  try {
    const response = await axios.post(`${RAILWAY_URL}/api/auth/register`, {
      rollNumber: 'TEST001',
      name: 'Test Student',
      grade: 6,
      section: 'A'
    }, { 
      timeout: 15000,
      validateStatus: () => true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(`Status: ${response.status}`);
    console.log(`Response:`, JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log(`Error: ${error.message}`);
    if (error.response) {
      console.log(`Response Status: ${error.response.status}`);
      console.log(`Response Data:`, error.response.data);
    }
  }

  // Test 6: Check if server is serving static files
  console.log('\n6️⃣ Testing static file serving...');
  try {
    const response = await axios.get(`${RAILWAY_URL}/index.html`, { 
      timeout: 15000,
      validateStatus: () => true
    });
    console.log(`Status: ${response.status}`);
    console.log(`Content-Type: ${response.headers['content-type']}`);
    if (response.status === 200) {
      console.log(`HTML preview: ${response.data.substring(0, 300)}...`);
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }

  // Test 7: Check different endpoints
  console.log('\n7️⃣ Testing various endpoints...');
  const endpoints = [
    '/api/auth/login',
    '/api/quiz/start',
    '/api/admin/dashboard',
    '/login',
    '/register',
    '/admin'
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await axios.get(`${RAILWAY_URL}${endpoint}`, { 
        timeout: 10000,
        validateStatus: () => true
      });
      console.log(`${endpoint}: ${response.status} (${response.headers['content-type']})`);
    } catch (error) {
      console.log(`${endpoint}: ERROR - ${error.message}`);
    }
  }
}

debugRailwayIssues().catch(console.error);