const https = require('https');

async function makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    data: data
                });
            });
        });
        
        req.on('error', reject);
        req.setTimeout(10000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
        
        if (options.body) {
            req.write(options.body);
        }
        req.end();
    });
}

async function checkRailwayStatus() {
    console.log('🔍 CHECKING CURRENT RAILWAY STATUS');
    console.log('==================================');
    console.log('');

    const RAILWAY_URL = 'https://tech-board.up.railway.app';
    
    try {
        // 1. Check if server is running
        console.log('1️⃣ Checking if Railway server is running...');
        const healthResponse = await makeRequest(`${RAILWAY_URL}/health`);
        
        if (healthResponse.statusCode === 200) {
            console.log('✅ Railway server is running');
            const healthData = JSON.parse(healthResponse.data);
            console.log(`   Status: ${healthData.status}`);
        } else {
            console.log('❌ Railway server is not responding properly');
            return;
        }

        // 2. Test admin login with old password
        console.log('\n2️⃣ Testing admin login with old password...');
        const oldPasswordResponse = await makeRequest(`${RAILWAY_URL}/api/auth/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'admin',
                password: 'TechBoard2025Admin!'
            })
        });

        if (oldPasswordResponse.statusCode === 200) {
            console.log('⚠️  Old admin password still active');
            console.log('   This means the updated code is not deployed yet');
        } else {
            console.log('ℹ️  Old admin password not working');
        }

        // 3. Test admin login with new password
        console.log('\n3️⃣ Testing admin login with new password...');
        const newPasswordResponse = await makeRequest(`${RAILWAY_URL}/api/auth/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'admin',
                password: 'admin123'
            })
        });

        if (newPasswordResponse.statusCode === 200) {
            console.log('✅ New admin password is active');
            console.log('   Updated code has been deployed');
        } else {
            console.log('⚠️  New admin password not working');
            console.log('   Code may not be fully deployed');
        }

        // 4. Test quiz generation (if we can login)
        let adminToken = null;
        if (newPasswordResponse.statusCode === 200) {
            const adminData = JSON.parse(newPasswordResponse.data);
            adminToken = adminData.data.token;
        } else if (oldPasswordResponse.statusCode === 200) {
            const adminData = JSON.parse(oldPasswordResponse.data);
            adminToken = adminData.data.token;
        }

        if (adminToken) {
            console.log('\n4️⃣ Testing quiz generation capability...');
            
            // Register a test student
            const testStudent = {
                name: 'Railway Quiz Test',
                rollNumber: 77,
                grade: 6,
                section: 'A',
                password: 'test123'
            };

            const registerResponse = await makeRequest(`${RAILWAY_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(testStudent)
            });

            let studentToken;
            if (registerResponse.statusCode === 201) {
                const registerData = JSON.parse(registerResponse.data);
                studentToken = registerData.data.token;
            } else if (registerResponse.statusCode === 409) {
                // Student exists, try login
                const loginResponse = await makeRequest(`${RAILWAY_URL}/api/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        rollNumber: testStudent.rollNumber,
                        grade: testStudent.grade,
                        section: testStudent.section,
                        password: testStudent.password
                    })
                });
                if (loginResponse.statusCode === 200) {
                    const loginData = JSON.parse(loginResponse.data);
                    studentToken = loginData.data.token;
                }
            }

            if (studentToken) {
                // Test quiz generation
                const quizResponse = await makeRequest(`${RAILWAY_URL}/api/quiz/start/6`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${studentToken}` }
                });

                if (quizResponse.statusCode === 200) {
                    const quizData = JSON.parse(quizResponse.data);
                    console.log('✅ Quiz generation working');
                    console.log(`   Questions generated: ${quizData.data.questions.length}`);
                    console.log(`   Total questions: ${quizData.data.totalQuestions}`);
                    
                    if (quizData.data.questions.length === 50) {
                        console.log('🎉 Perfect! Generating 50 questions');
                    } else {
                        console.log(`⚠️  Generating ${quizData.data.questions.length} questions (not 50)`);
                    }
                } else if (quizResponse.statusCode === 409) {
                    console.log('✅ Quiz generation system working (quiz already exists)');
                } else {
                    console.log('❌ Quiz generation failed');
                    console.log(`   Status: ${quizResponse.statusCode}`);
                    console.log(`   Response: ${quizResponse.data}`);
                }
            }
        }

        // 5. Summary and recommendations
        console.log('\n📋 RAILWAY STATUS SUMMARY:');
        console.log('═'.repeat(40));

        const isNewCodeDeployed = newPasswordResponse.statusCode === 200;
        
        if (isNewCodeDeployed) {
            console.log('✅ UPDATED CODE IS DEPLOYED');
            console.log('✅ New admin password (admin123) is active');
            console.log('✅ Quiz generation system should be updated');
            console.log('');
            console.log('🎯 Next steps:');
            console.log('   1. Test full quiz generation: node test-railway-quiz-generation.js');
            console.log('   2. Verify all grades work properly');
            console.log('   3. System is ready for production use');
        } else {
            console.log('⚠️  OLD CODE IS STILL DEPLOYED');
            console.log('⚠️  Updated quiz generation is not active');
            console.log('⚠️  Admin password is still the old one');
            console.log('');
            console.log('🔧 Required actions:');
            console.log('   1. Deploy updated code to Railway');
            console.log('   2. Run: node deploy-to-railway.js');
            console.log('   3. Or manually push to Railway via git');
            console.log('   4. Wait for deployment to complete');
            console.log('   5. Re-run this check');
        }

    } catch (error) {
        console.error('❌ Railway status check failed:', error.message);
        console.log('\n🔧 Possible issues:');
        console.log('   1. Railway deployment is down');
        console.log('   2. Network connectivity issues');
        console.log('   3. Railway service maintenance');
    }

    console.log('\n🔍 Railway status check completed');
}

// Run the check
checkRailwayStatus().catch(console.error);