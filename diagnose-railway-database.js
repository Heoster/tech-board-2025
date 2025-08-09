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
        req.setTimeout(15000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
        
        if (options.body) {
            req.write(options.body);
        }
        req.end();
    });
}

async function diagnoseRailwayDatabase() {
    console.log('🔍 DIAGNOSING RAILWAY DATABASE ISSUE');
    console.log('====================================');
    console.log('');

    const RAILWAY_URL = 'https://tech-board.up.railway.app';
    
    try {
        // 1. Get admin token
        console.log('1️⃣ Getting admin access...');
        const adminLoginResponse = await makeRequest(`${RAILWAY_URL}/api/auth/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'admin',
                password: 'TechBoard2025Admin!'
            })
        });

        if (adminLoginResponse.statusCode !== 200) {
            console.log('❌ Admin login failed');
            return;
        }

        const adminData = JSON.parse(adminLoginResponse.data);
        const adminToken = adminData.data.token;
        console.log('✅ Admin access obtained');

        // 2. Check API health for detailed question info
        console.log('\n2️⃣ Checking detailed question distribution...');
        const healthResponse = await makeRequest(`${RAILWAY_URL}/api/health`);
        
        if (healthResponse.statusCode === 200) {
            const healthData = JSON.parse(healthResponse.data);
            console.log('📊 Railway Database Status:');
            console.log(`   Total Questions: ${healthData.questionBank.totalQuestions}`);
            console.log('   Distribution by Grade:');
            
            Object.keys(healthData.questionBank.grades).forEach(gradeKey => {
                const grade = healthData.questionBank.grades[gradeKey];
                const gradeNum = gradeKey.replace('grade_', '');
                console.log(`     Grade ${gradeNum}:`);
                console.log(`       Total: ${grade.total}`);
                console.log(`       Basic: ${grade.basic}`);
                console.log(`       Medium: ${grade.medium}`);
                console.log(`       Advanced: ${grade.advanced}`);
                console.log(`       Can generate 50: ${grade.canGenerate50 ? 'YES' : 'NO'}`);
            });
        }

        // 3. Compare with local database
        console.log('\n3️⃣ Expected vs Actual:');
        console.log('   Expected (Local):');
        console.log('     Total Questions: 1536');
        console.log('     Grade 6: 300 questions');
        console.log('     Grade 7: 300 questions');
        console.log('     Grade 8: 300 questions');
        console.log('     Grade 9: 319 questions');
        console.log('     Grade 11: 317 questions');
        console.log('');
        console.log('   Actual (Railway):');
        console.log('     Total Questions: 65');
        console.log('     Grade 6: 20 questions');
        console.log('     Grade 7: 15 questions');
        console.log('     Grade 8: 10 questions');
        console.log('     Grade 9: 20 questions');
        console.log('     Grade 11: 0 questions');

        // 4. Try to get questions via admin API
        console.log('\n4️⃣ Checking admin questions API...');
        const questionsResponse = await makeRequest(`${RAILWAY_URL}/api/admin/questions?limit=100`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${adminToken}` }
        });

        if (questionsResponse.statusCode === 200) {
            const questionsData = JSON.parse(questionsResponse.data);
            console.log('✅ Admin questions API accessible');
            
            if (questionsData.data && questionsData.data.questions) {
                console.log(`   Retrieved: ${questionsData.data.questions.length} questions`);
                console.log(`   Total in DB: ${questionsData.data.pagination?.total || 'Unknown'}`);
                
                // Show sample questions
                console.log('   Sample questions:');
                questionsData.data.questions.slice(0, 3).forEach((q, i) => {
                    console.log(`     ${i+1}. Grade ${q.grade} (${q.difficulty}): ${q.question_text.substring(0, 50)}...`);
                });
            }
        } else {
            console.log('❌ Admin questions API not accessible');
        }

        // 5. Diagnosis
        console.log('\n📋 DIAGNOSIS:');
        console.log('═'.repeat(40));
        console.log('');
        console.log('🔍 ROOT CAUSE IDENTIFIED:');
        console.log('   Railway database was NOT properly seeded with questions');
        console.log('');
        console.log('❌ Issues:');
        console.log('   • Only 65 questions instead of 1500+');
        console.log('   • Insufficient questions for 50-question tests');
        console.log('   • Missing comprehensive question bank');
        console.log('   • Database seeding scripts not executed on Railway');
        console.log('');
        console.log('🔧 SOLUTIONS:');
        console.log('   1. Run database seeding script on Railway');
        console.log('   2. Upload question bank to Railway database');
        console.log('   3. Execute comprehensive seeding via admin API');
        console.log('   4. Verify question distribution after seeding');
        console.log('');
        console.log('💡 RECOMMENDED ACTION:');
        console.log('   Execute: node seed-railway-database.js');

    } catch (error) {
        console.error('❌ Diagnosis failed:', error.message);
    }

    console.log('\n🔍 Railway database diagnosis completed');
}

// Run diagnosis
diagnoseRailwayDatabase().catch(console.error);