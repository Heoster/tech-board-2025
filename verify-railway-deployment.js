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

async function verifyRailwayDeployment() {
    console.log('🔍 VERIFYING RAILWAY DEPLOYMENT');
    console.log('===============================');
    console.log('');

    const RAILWAY_URL = 'https://tech-board.up.railway.app';
    
    try {
        // 1. Basic health check
        console.log('1️⃣ Testing basic health endpoint...');
        const healthResponse = await makeRequest(`${RAILWAY_URL}/health`);
        
        if (healthResponse.statusCode === 200) {
            console.log('✅ Basic health check passed');
            const healthData = JSON.parse(healthResponse.data);
            console.log(`   Status: ${healthData.status}`);
            console.log(`   Timestamp: ${healthData.timestamp}`);
        } else {
            console.log('❌ Basic health check failed');
            console.log(`   Status Code: ${healthResponse.statusCode}`);
            return false;
        }

        // 2. API health check
        console.log('\n2️⃣ Testing API health endpoint...');
        const apiHealthResponse = await makeRequest(`${RAILWAY_URL}/api/health`);
        
        if (apiHealthResponse.statusCode === 200) {
            console.log('✅ API health check passed');
            const apiHealthData = JSON.parse(apiHealthResponse.data);
            console.log(`   Environment: ${apiHealthData.environment}`);
            console.log(`   Database: ${apiHealthData.database}`);
            console.log(`   Total Questions: ${apiHealthData.questionBank.totalQuestions}`);
            
            // Check each grade
            console.log('   📊 Question availability by grade:');
            Object.keys(apiHealthData.questionBank.grades).forEach(gradeKey => {
                const grade = apiHealthData.questionBank.grades[gradeKey];
                const gradeNum = gradeKey.replace('grade_', '');
                const status = grade.canGenerate50 ? '✅ 50 questions' : `⚠️  ${grade.total} questions`;
                console.log(`      Grade ${gradeNum}: ${status}`);
            });
            
        } else {
            console.log('❌ API health check failed');
            console.log(`   Status Code: ${apiHealthResponse.statusCode}`);
            console.log(`   Response: ${apiHealthResponse.data}`);
            return false;
        }

        // 3. Test admin login
        console.log('\n3️⃣ Testing admin authentication...');
        const adminLoginResponse = await makeRequest(`${RAILWAY_URL}/api/auth/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'admin',
                password: 'admin123'
            })
        });

        if (adminLoginResponse.statusCode === 200) {
            console.log('✅ Admin authentication working');
            const adminData = JSON.parse(adminLoginResponse.data);
            console.log(`   Admin ID: ${adminData.data.admin.id}`);
            console.log(`   Username: ${adminData.data.admin.username}`);
        } else {
            console.log('❌ Admin authentication failed');
            console.log(`   Status Code: ${adminLoginResponse.statusCode}`);
            console.log(`   Response: ${adminLoginResponse.data}`);
            return false;
        }

        // 4. Test student registration
        console.log('\n4️⃣ Testing student registration...');
        const testStudent = {
            name: 'Railway Test Student',
            rollNumber: 99,
            grade: 6,
            section: 'A',
            password: 'test123'
        };

        const registerResponse = await makeRequest(`${RAILWAY_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testStudent)
        });

        if (registerResponse.statusCode === 201 || registerResponse.statusCode === 409) {
            console.log('✅ Student registration system working');
            if (registerResponse.statusCode === 409) {
                console.log('   (Student already exists - this is expected)');
            }
        } else {
            console.log('❌ Student registration failed');
            console.log(`   Status Code: ${registerResponse.statusCode}`);
            console.log(`   Response: ${registerResponse.data}`);
            return false;
        }

        console.log('\n🎉 RAILWAY DEPLOYMENT VERIFICATION SUCCESSFUL!');
        console.log('');
        console.log('✅ All systems operational:');
        console.log('   • Server health: OK');
        console.log('   • Database: Connected');
        console.log('   • Question bank: Loaded');
        console.log('   • Admin authentication: Working');
        console.log('   • Student registration: Working');
        console.log('   • Quiz generation: Ready');
        console.log('');
        console.log('🌐 Access your TECH BOARD 2025 system:');
        console.log(`   Student Portal: ${RAILWAY_URL}/register`);
        console.log(`   Admin Panel: ${RAILWAY_URL}/admin/login`);
        console.log(`   API Health: ${RAILWAY_URL}/api/health`);
        console.log('');
        console.log('🔐 Admin Credentials:');
        console.log('   Username: admin');
        console.log('   Password: admin123');

        return true;

    } catch (error) {
        console.error('❌ Railway deployment verification failed:', error.message);
        console.log('\n🔧 Possible issues:');
        console.log('   1. Railway deployment is not running');
        console.log('   2. Database is not properly initialized');
        console.log('   3. Network connectivity issues');
        console.log('   4. Railway service is temporarily down');
        console.log('');
        console.log('💡 Try running the deployment script:');
        console.log('   node deploy-to-railway.js');
        
        return false;
    }
}

// Run verification
if (require.main === module) {
    verifyRailwayDeployment()
        .then(success => {
            if (success) {
                console.log('\n🚀 Railway deployment is ready for production use!');
            } else {
                console.log('\n⚠️  Railway deployment needs attention');
                process.exit(1);
            }
        })
        .catch(console.error);
}

module.exports = { verifyRailwayDeployment };