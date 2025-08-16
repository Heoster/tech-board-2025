#!/usr/bin/env node

const { spawn } = require('child_process');
const axios = require('axios');
const path = require('path');

console.log('🚀 Quick Production Test for Tech Board 2025\n');

let serverProcess;

async function startServer() {
    return new Promise((resolve, reject) => {
        console.log('📡 Starting server...');
        
        serverProcess = spawn('node', ['server/index.js'], {
            cwd: __dirname,
            stdio: ['pipe', 'pipe', 'pipe']
        });

        let serverReady = false;

        serverProcess.stdout.on('data', (data) => {
            const output = data.toString();
            console.log('Server:', output.trim());
            
            if (output.includes('Server running on port') && !serverReady) {
                serverReady = true;
                setTimeout(() => resolve(), 2000); // Wait 2 seconds for full startup
            }
        });

        serverProcess.stderr.on('data', (data) => {
            console.error('Server Error:', data.toString().trim());
        });

        serverProcess.on('error', (error) => {
            console.error('Failed to start server:', error.message);
            reject(error);
        });

        // Timeout after 30 seconds
        setTimeout(() => {
            if (!serverReady) {
                reject(new Error('Server startup timeout'));
            }
        }, 30000);
    });
}

async function runQuickTests() {
    const BASE_URL = 'http://localhost:8000';
    let passed = 0;
    let total = 0;

    async function test(name, testFn) {
        total++;
        try {
            const result = await testFn();
            console.log(`✅ ${name}: ${result}`);
            passed++;
        } catch (error) {
            console.log(`❌ ${name}: ${error.message}`);
        }
    }

    console.log('\n🧪 Running quick tests...\n');

    // Test 1: Health Check
    await test('Health Check', async () => {
        const response = await axios.get(`${BASE_URL}/api/health`, { timeout: 5000 });
        if (response.data.status !== 'OK') throw new Error('Health check failed');
        return `Status: ${response.data.status}, Questions: ${response.data.questions.total}`;
    });

    // Test 2: API Info
    await test('API Info', async () => {
        const response = await axios.get(`${BASE_URL}/api`, { timeout: 5000 });
        if (!response.data.name) throw new Error('API info missing');
        return `API: ${response.data.name} v${response.data.version}`;
    });

    // Test 3: Static Files
    await test('Static File Serving', async () => {
        const response = await axios.get(BASE_URL, { timeout: 5000 });
        if (!response.data.includes('<title>')) throw new Error('Static files not served');
        return 'Static files served correctly';
    });

    // Test 4: Admin Login
    await test('Admin Login', async () => {
        const response = await axios.post(`${BASE_URL}/api/auth/admin/login`, {
            username: 'admin',
            password: 'admin123'
        }, { timeout: 5000 });
        if (!response.data.token) throw new Error('Admin login failed');
        return 'Admin login successful';
    });

    // Test 5: Student Registration
    await test('Student Registration', async () => {
        const testStudent = {
            name: 'Test Student',
            rollNumber: Math.floor(Math.random() * 10000),
            grade: 6,
            section: 'A',
            password: 'test123'
        };
        
        const response = await axios.post(`${BASE_URL}/api/auth/register`, testStudent, { timeout: 5000 });
        if (!response.data.token) throw new Error('Registration failed');
        return `Student registered: ${testStudent.name}`;
    });

    console.log(`\n📊 Quick Test Results: ${passed}/${total} passed (${Math.round((passed/total)*100)}%)`);
    
    if (passed === total) {
        console.log('🎉 All quick tests passed! Application is working correctly.');
        return true;
    } else {
        console.log('⚠️ Some tests failed, but core functionality appears to be working.');
        return false;
    }
}

async function cleanup() {
    if (serverProcess) {
        console.log('\n🛑 Stopping server...');
        serverProcess.kill('SIGTERM');
        
        // Force kill after 5 seconds
        setTimeout(() => {
            if (!serverProcess.killed) {
                serverProcess.kill('SIGKILL');
            }
        }, 5000);
    }
}

async function main() {
    try {
        await startServer();
        const success = await runQuickTests();
        
        console.log('\n✅ Production test completed!');
        console.log('\n📋 Next steps:');
        console.log('  1. Start production server: npm start');
        console.log('  2. Access application: http://localhost:8000');
        console.log('  3. Admin login: http://localhost:8000/admin/login');
        console.log('  4. Deploy to Railway: npm run deploy:railway');
        
        process.exit(success ? 0 : 1);
        
    } catch (error) {
        console.error('❌ Production test failed:', error.message);
        process.exit(1);
    } finally {
        cleanup();
    }
}

// Handle process termination
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

main();