const axios = require('axios');
const jwt = require('jsonwebtoken');

const BASE_URL = 'http://localhost:8000';

async function debugAuth() {
  try {
    // Test admin login
    const adminLogin = await axios.post(`${BASE_URL}/api/auth/admin/login`, {
      username: 'admin',
      password: 'admin123'
    });
    
    console.log('Admin login response:', JSON.stringify(adminLogin.data, null, 2));
    
    const token = adminLogin.data.data.token;
    console.log('Token:', token);
    
    // Decode token
    const decoded = jwt.decode(token);
    console.log('Decoded token:', decoded);
    
    // Test dashboard with token
    const dashboardResult = await axios.get(`${BASE_URL}/api/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('Dashboard success!');
    
  } catch (error) {
    console.log('Error details:', {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers
    });
  }
}

debugAuth();