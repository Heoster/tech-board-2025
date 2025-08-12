const { spawn } = require('child_process');
const axios = require('axios');

const BASE_URL = 'http://localhost:8000/api';

async function runTest(testName, testFunction) {
    console.log(`\n🧪 ${testName}...`);
    try {
        await testFunction();
        console.log(`✅ ${testName} PASSED`);
        return true;
    } catch (error) {
        console.log(`❌ ${testName} FAILED:`, error.message);
        return false;
    }
}

async function testDatabase() {
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
    
    if (counts.length !== 5) throw new Error('Not all grades have questions');
    for (const c of counts) {
        if (c.count !== 300) throw new Error(`Grade ${c.grade} has ${c.count} questions, expected 300`);
    }
}

async function testQuizGeneration() {
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
    
    if (questions.length !== 25) throw new Error(`Generated ${questions.length} questions, expected 25`);
    
    for (const q of questions) {
        if (!q.question_text) throw new Error('Question has no text');
        if (q.options.length !== 4) throw new Error(`Question has ${q.options.length} options, expected 4`);
    }
}

async function testAPIEndpoints() {
    // Test health endpoint
    const health = await axios.get(`${BASE_URL}/health`);
    if (health.data.status !== 'OK') throw new Error('Health check failed');
    
    // Test admin login
    const adminLogin = await axios.post(`${BASE_URL}/auth/admin/login`, {
        username: 'admin',
        password: 'password'
    });
    if (!adminLogin.data.data?.token) throw new Error('Admin login failed');
    
    const adminToken = adminLogin.data.data.token;
    
    // Test student registration
    const studentReg = await axios.post(`${BASE_URL}/auth/register`, {
        name: 'Test Student',
        email: `test${Date.now()}@example.com`,
        password: 'password123',
        grade: 6
    });
    if (!studentReg.data.data?.token) throw new Error('Student registration failed');
    
    const studentToken = studentReg.data.data.token;
    
    // Test quiz start
    const quizStart = await axios.post(`${BASE_URL}/quiz/start`, 
        { grade: 6 },
        { headers: { Authorization: `Bearer ${studentToken}` } }
    );
    if (!quizStart.data.questions || quizStart.data.questions.length !== 25) {
        throw new Error('Quiz start failed or wrong question count');
    }
}

async function testClientBuild() {
    const fs = require('fs');
    const path = require('path');
    
    // Check if client can be built
    const clientPath = path.join(__dirname, 'client');
    const distPath = path.join(clientPath, 'dist');
    
    if (!fs.existsSync(path.join(clientPath, 'package.json'))) {
        throw new Error('Client package.json not found');
    }
    
    // Try to build client
    const buildProcess = spawn('npm', ['run', 'build'], { 
        cwd: clientPath,
        stdio: 'pipe'
    });
    
    return new Promise((resolve, reject) => {
        buildProcess.on('close', (code) => {
            if (code === 0 && fs.existsSync(path.join(distPath, 'index.html'))) {
                resolve();
            } else {
                reject(new Error(`Client build failed with code ${code}`));
            }
        });
        
        setTimeout(() => {
            buildProcess.kill();
            reject(new Error('Client build timeout'));
        }, 60000);
    });
}

async function runAllTests() {
    console.log('🚀 Running All App Tests Before Deployment\n');
    
    const tests = [
        ['Database Structure Test', testDatabase],
        ['Quiz Generation Test', testQuizGeneration],
        ['Client Build Test', testClientBuild]
    ];
    
    let passed = 0;
    let total = tests.length;
    
    // Run non-API tests first
    for (const [name, testFn] of tests) {
        if (await runTest(name, testFn)) passed++;
    }
    
    // Start server for API tests
    console.log('\n🔧 Starting server for API tests...');
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
    
    // Wait for server to start
    await new Promise(resolve => {
        const checkServer = setInterval(() => {
            if (serverReady) {
                clearInterval(checkServer);
                resolve();
            }
        }, 100);
        
        setTimeout(() => {
            clearInterval(checkServer);
            resolve();
        }, 5000);
    });
    
    if (serverReady) {
        console.log('✅ Server started successfully');
        
        // Run API tests
        if (await runTest('API Endpoints Test', testAPIEndpoints)) passed++;
        total++;
    } else {
        console.log('❌ Server failed to start');
    }
    
    // Cleanup
    server.kill();
    
    // Results
    console.log('\n📊 Test Results:');
    console.log(`✅ Passed: ${passed}/${total}`);
    console.log(`❌ Failed: ${total - passed}/${total}`);
    
    if (passed === total) {
        console.log('\n🎉 All tests passed! App is ready for deployment! 🚀');
        process.exit(0);
    } else {
        console.log('\n⚠️  Some tests failed. Please fix issues before deployment.');
        process.exit(1);
    }
}

runAllTests().catch(error => {
    console.error('❌ Test runner failed:', error.message);
    process.exit(1);
});