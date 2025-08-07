@echo off
echo Testing Authentication System
echo =============================

echo.
echo Testing student login...
node -e "
const axios = require('axios');
async function testAuth() {
    try {
        const response = await axios.post('http://localhost:8000/api/auth/login', {
            rollNumber: 1,
            grade: 8,
            section: 'A',
            password: 'student123'
        });
        console.log('✅ Student login successful');
        console.log('Token:', response.data.data.token.substring(0, 20) + '...');
    } catch (error) {
        console.log('❌ Student login failed:', error.response?.data?.error?.message || error.message);
    }
    
    try {
        const response = await axios.post('http://localhost:8000/api/auth/admin/login', {
            username: 'admin',
            password: 'admin123'
        });
        console.log('✅ Admin login successful');
        console.log('Token:', response.data.data.token.substring(0, 20) + '...');
    } catch (error) {
        console.log('❌ Admin login failed:', error.response?.data?.error?.message || error.message);
    }
}
testAuth();
"

pause