const axios = require('axios');
require('dotenv').config();

const API_BASE = process.env.API_BASE || 'https://tech-board.up.railway.app/api';

async function testAPI() {
    console.log('🔍 Testing Tech Board API...\n');
    
    try {
        // 1. Test health endpoint
        console.log('1. Testing health endpoint...');
        const health = await axios.get(`${API_BASE}/health`);
        console.log('✅ Health check:', health.data.status);
        console.log('   Database:', health.data.database?.connected ? '✅ Connected' : '❌ Disconnected');
        console.log('   Questions:', health.data.questions?.total || 0);
        console.log('');
        
        // 2. Test admin login
        console.log('2. Testing admin login...');
        try {
            const adminLogin = await axios.post(`${API_BASE}/auth/admin/login`, {
                username: process.env.ADMIN_USERNAME || 'admin',
                password: process.env.ADMIN_PASSWORD || 'admin123'
            });
            console.log('✅ Admin login successful');
            const adminToken = adminLogin.data.data?.token;
            console.log('   Token preview:', adminToken?.substring(0, 20) + '...');
            console.log('');
            
            // 3. Test student login (create a test student first)
            console.log('3. Testing student registration...');
            try {
                const studentReg = await axios.post(`${API_BASE}/auth/register`, {
                    name: 'Test Student',
                    roll_number: 99,
                    grade: 6,
                    section: 'A',
                    password: process.env.TEST_STUDENT_PASSWORD || 'test123'
                });
                console.log('✅ Student registration successful');
            } catch (regError) {
                if (regError.response?.status === 400 && regError.response?.data?.error?.includes('already registered')) {
                    console.log('ℹ️ Test student already exists');
                } else {
                    console.log('❌ Student registration failed:', regError.response?.data?.error || regError.message);
                }
            }
            
            console.log('4. Testing student login...');
            try {
                const studentLogin = await axios.post(`${API_BASE}/auth/student/login`, {
                    roll_number: 99,
                    grade: 6,
                    section: 'A',
                    password: process.env.TEST_STUDENT_PASSWORD || 'test123'
                });
                console.log('✅ Student login successful');
                console.log('   Full response:', JSON.stringify(studentLogin.data, null, 2));
                const studentToken = studentLogin.data.data?.token || studentLogin.data.token;
                console.log('   Token preview:', studentToken?.substring(0, 20) + '...');
                console.log('');
                
                // 5. Test quiz start
                console.log('5. Testing quiz start...');
                try {
                    const quizStart = await axios.post(`${API_BASE}/quiz/start`, {
                        grade: 6
                    }, {
                        headers: {
                            'Authorization': `Bearer ${studentToken}`
                        }
                    });
                    console.log('✅ Quiz start successful');
                    console.log('   Quiz ID:', quizStart.data.data?.quizId);
                    console.log('   Questions count:', quizStart.data.data?.questions?.length);
                } catch (quizError) {
                    console.log('❌ Quiz start failed:', quizError.response?.status, quizError.response?.data?.error || quizError.message);
                    console.log('   Full error response:', JSON.stringify(quizError.response?.data, null, 2));
                }
                
            } catch (studentLoginError) {
                console.log('❌ Student login failed:', studentLoginError.response?.data?.error || studentLoginError.message);
            }
            
        } catch (adminError) {
            console.log('❌ Admin login failed:', adminError.response?.data?.error || adminError.message);
            console.log('   Status:', adminError.response?.status);
            console.log('   Full response:', JSON.stringify(adminError.response?.data, null, 2));
        }
        
    } catch (error) {
        console.log('❌ Health check failed:', error.message);
    }
}

testAPI().catch(console.error);