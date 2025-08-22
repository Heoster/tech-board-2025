const { spawn } = require('child_process');
const axios = require('axios');
require('dotenv').config();

const BASE_URL = 'http://localhost:8000/api';

async function testDatabase() {
    console.log('🧪 Testing Database...');
    const sqlite3 = require('sqlite3').verbose();
    const path = require('path');
    const dbPath = path.join(__dirname, 'server/database/mcq_system.db');
    const db = new sqlite3.Database(dbPath);
    
    const counts = await new Promise((resolve, reject) => {
        db.all('SELECT grade, COUNT(*) as count FROM questions GROUP BY grade', (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
    
    db.close();
    
    console.log('Database question counts:');
    counts.forEach(c => console.log(`  Grade ${c.grade}: ${c.count} questions`));
    
    if (counts.length === 5 && counts.every(c => c.count === 300)) {
        console.log('✅ Database test PASSED');
        return true;
    } else {
        console.log('❌ Database test FAILED');
        return false;
    }
}

async function testQuizGeneration() {
    console.log('\n🧪 Testing Quiz Generation...');
    const sqlite3 = require('sqlite3').verbose();
    const path = require('path');
    const dbPath = path.join(__dirname, 'server/database/mcq_system.db');
    const db = new sqlite3.Database(dbPath);
    
    const questions = await new Promise((resolve, reject) => {
        db.all(`
            SELECT q.id, q.question_text, q.difficulty,
                   GROUP_CONCAT(
                       json_object('id', o.id, 'text', o.option_text)
                   ) as options
            FROM questions q
            LEFT JOIN options o ON q.id = o.question_id
            WHERE q.grade = 6
            GROUP BY q.id
            ORDER BY RANDOM()
            LIMIT 25
        `, (err, rows) => {
            if (err) reject(err);
            else resolve(rows.map(q => ({
                ...q,
                options: q.options ? JSON.parse(`[${q.options}]`) : []
            })));
        });
    });
    
    db.close();
    
    console.log(`Generated ${questions.length} questions`);
    console.log(`Sample: ${questions[0]?.question_text?.substring(0, 50)}...`);
    
    if (questions.length === 25 && questions.every(q => q.options.length === 4)) {
        console.log('✅ Quiz Generation test PASSED');
        return true;
    } else {
        console.log('❌ Quiz Generation test FAILED');
        return false;
    }
}

async function testAPIEndpoints() {
    console.log('\n🧪 Testing API Endpoints...');
    
    try {
        // Test health endpoint
        const health = await axios.get(`${BASE_URL}/health`);
        console.log('Health check:', health.data.status);
        
        // Test admin login
        const adminLogin = await axios.post(`${BASE_URL}/auth/admin/login`, {
            username: process.env.ADMIN_USERNAME || 'admin',
            password: process.env.ADMIN_PASSWORD || 'admin123'
        });
        console.log('Admin login: SUCCESS');
        
        const adminToken = adminLogin.data.data.token;
        
        // Test student registration
        const studentReg = await axios.post(`${BASE_URL}/auth/register`, {
            name: 'Test Student',
            roll_number: Math.floor(Math.random() * 1000) + 1,
            password: process.env.TEST_STUDENT_PASSWORD || 'test123',
            grade: 6
        });
        console.log('Student registration: SUCCESS');
        
        const studentToken = studentReg.data.data.token;
        
        // Test quiz start
        const quizStart = await axios.post(`${BASE_URL}/quiz/start`, 
            { grade: 6 },
            { headers: { Authorization: `Bearer ${studentToken}` } }
        );
        console.log(`Quiz start: Generated ${quizStart.data.data.questions.length} questions`);
        
        console.log('✅ API Endpoints test PASSED');
        return true;
        
    } catch (error) {
        console.log('❌ API Endpoints test FAILED:', error.response?.data?.error || error.message);
        return false;
    }
}

async function runTests() {
    console.log('🚀 Running App Tests Before Deployment\n');
    
    let passed = 0;
    let total = 0;
    
    // Test 1: Database
    total++;
    if (await testDatabase()) passed++;
    
    // Test 2: Quiz Generation
    total++;
    if (await testQuizGeneration()) passed++;
    
    // Test 3: Start server and test APIs
    console.log('\n🔧 Starting server...');
    const server = spawn('node', ['server/index.js'], { 
        stdio: 'pipe',
        cwd: __dirname 
    });
    
    let serverReady = false;
    
    server.stdout.on('data', (data) => {
        const output = data.toString();
        if (output.includes('Server running on port')) {
            serverReady = true;
        }
    });
    
    // Wait for server
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    if (serverReady) {
        console.log('✅ Server started');
        total++;
        if (await testAPIEndpoints()) passed++;
    } else {
        console.log('❌ Server failed to start');
        total++;
    }
    
    // Cleanup
    server.kill();
    
    // Results
    console.log('\n📊 Test Results:');
    console.log(`✅ Passed: ${passed}/${total}`);
    console.log(`❌ Failed: ${total - passed}/${total}`);
    
    if (passed === total) {
        console.log('\n🎉 All tests passed! App is ready for deployment! 🚀');
    } else {
        console.log('\n⚠️  Some tests failed. Please fix issues before deployment.');
    }
}

runTests().catch(console.error);