const axios = require('axios');
const https = require('https');

// Ignore SSL certificate issues for testing
const agent = new https.Agent({  
  rejectUnauthorized: false
});

const axiosInstance = axios.create({
  httpsAgent: agent
});

const BASE_URL = 'https://tech-board.up.railway.app';

async function testDatabaseContent() {
    console.log('🗄️ Testing Database Content...\n');

    try {
        // Step 1: Login as admin
        console.log('1. Logging in as admin...');
        const adminLogin = await axiosInstance.post(`${BASE_URL}/api/auth/admin/login`, {
            username: 'admin',
            password: 'admin123'
        });

        const token = adminLogin.data.token || adminLogin.data.data?.token;
        if (!token) {
            console.log('❌ Admin login failed - no token received');
            console.log('Response:', adminLogin.data);
            return;
        }
        console.log('✅ Admin logged in successfully');

        // Step 2: Check students
        console.log('\n2. Checking students in database...');
        try {
            const studentsResponse = await axiosInstance.get(`${BASE_URL}/api/admin/students`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('✅ Students found:', studentsResponse.data.students?.length || 0);
            
            if (studentsResponse.data.students?.length > 0) {
                console.log('First few students:');
                studentsResponse.data.students.slice(0, 5).forEach(student => {
                    console.log(`- ID: ${student.id}, Name: ${student.name}, Roll: ${student.roll_number}, Grade: ${student.grade}, Section: ${student.section}`);
                });
            }
        } catch (error) {
            console.log('❌ Failed to get students:', error.response?.status, error.response?.data);
        }

        // Step 3: Check questions
        console.log('\n3. Checking questions in database...');
        try {
            const questionsResponse = await axiosInstance.get(`${BASE_URL}/api/admin/question-counts`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('✅ Question counts:', questionsResponse.data.data);
        } catch (error) {
            console.log('❌ Failed to get question counts:', error.response?.status, error.response?.data);
        }

        // Step 4: Try to create a test student
        console.log('\n4. Creating test student...');
        try {
            const createStudent = await axiosInstance.post(`${BASE_URL}/api/admin/students`, {
                name: 'Test Student',
                rollNumber: 100,
                grade: 6,
                section: 'A',
                password: 'test123'
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('✅ Test student created:', createStudent.data);
        } catch (error) {
            if (error.response?.status === 400 && error.response?.data?.error?.code === 'STUDENT_EXISTS') {
                console.log('✅ Test student already exists');
            } else {
                console.log('❌ Failed to create test student:', error.response?.status, error.response?.data);
            }
        }

        // Step 5: Now try student login again
        console.log('\n5. Testing student login...');
        try {
            const studentLogin = await axiosInstance.post(`${BASE_URL}/api/auth/student/login`, {
                rollNumber: 100,
                grade: 6,
                section: 'A',
                password: 'test123'
            });
            console.log('✅ Student login successful:', studentLogin.data);
        } catch (error) {
            console.log('❌ Student login failed:', error.response?.status, error.response?.data);
        }

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
    }
}

testDatabaseContent();