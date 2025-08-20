const express = require('express');
const request = require('supertest');
const database = require('./server/config/database');

const app = express();
app.use(express.json());

// Import routes
const authRoutes = require('./server/routes/auth');
const quizRoutes = require('./server/routes/quiz');

app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);

async function debugQuizStart() {
    console.log('🔍 Debugging quiz start issue...\n');
    
    try {
        // Connect to database
        await database.connect();
        console.log('✅ Database connected');
        
        // Create a test student
        const hashedPassword = require('bcrypt').hashSync('password123', 10);
        const result = await database.run(
            'INSERT OR REPLACE INTO students (id, name, roll_number, password, grade, section) VALUES (?, ?, ?, ?, ?, ?)',
            [1, 'Test Student', 1, hashedPassword, 9, 'A']
        );
        console.log('✅ Test student created');
        
        // Test login
        console.log('\n🔐 Testing login...');
        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send({
                rollNumber: 1,
                grade: 9,
                section: 'A',
                password: 'password123'
            });
        
        console.log('Login status:', loginResponse.status);
        console.log('Login response:', loginResponse.body);
        
        if (loginResponse.status === 200) {
            const token = loginResponse.body.data.token;
            console.log('✅ Login successful, token received');
            
            // Decode token to see what's inside
            const jwt = require('jsonwebtoken');
            const decoded = jwt.decode(token);
            console.log('Token payload:', decoded);
            
            // Test quiz start
            console.log('\n🎯 Testing quiz start...');
            const quizStartResponse = await request(app)
                .post('/api/quiz/start')
                .set('Authorization', `Bearer ${token}`)
                .send({ grade: 9 });
            
            console.log('Quiz start status:', quizStartResponse.status);
            console.log('Quiz start response:', quizStartResponse.body);
            
            if (quizStartResponse.status !== 200) {
                console.log('❌ Quiz start failed');
                
                // Test token verification manually
                console.log('\n🔍 Testing token verification...');
                jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
                    if (err) {
                        console.log('❌ Token verification failed:', err.message);
                    } else {
                        console.log('✅ Token verification successful:', user);
                    }
                });
            } else {
                console.log('✅ Quiz start successful');
            }
        } else {
            console.log('❌ Login failed');
        }
        
    } catch (error) {
        console.error('❌ Debug failed:', error);
    } finally {
        await database.close();
    }
}

debugQuizStart();