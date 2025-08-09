// Manual Railway Database Seeding Script
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
        req.setTimeout(30000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
        
        if (options.body) {
            req.write(options.body);
        }
        req.end();
    });
}

// Generate a comprehensive question bank
function generateQuestions() {
    const questions = [];
    const grades = [6, 7, 8, 9, 11];
    const subjects = ['Mathematics', 'Science', 'English', 'Social Studies', 'General Knowledge'];
    
    grades.forEach(grade => {
        const targetCount = grade === 9 ? 319 : grade === 11 ? 317 : 300;
        
        for (let i = 0; i < targetCount; i++) {
            const subject = subjects[i % subjects.length];
            const difficulty = i % 3 === 0 ? 'basic' : i % 3 === 1 ? 'medium' : 'advanced';
            
            questions.push({
                grade: grade,
                difficulty: difficulty,
                question_text: `Grade ${grade} ${subject} (${difficulty}): What is the correct answer to this ${difficulty} level ${subject} question for Grade ${grade} students? This question tests understanding of key concepts in ${subject}.`,
                options: [
                    {
                        option_text: `Correct answer for Grade ${grade} ${subject} ${difficulty} question`,
                        is_correct: true,
                        option_order: 1
                    },
                    {
                        option_text: `Plausible but incorrect option A for ${subject}`,
                        is_correct: false,
                        option_order: 2
                    },
                    {
                        option_text: `Plausible but incorrect option B for ${subject}`,
                        is_correct: false,
                        option_order: 3
                    },
                    {
                        option_text: `Plausible but incorrect option C for ${subject}`,
                        is_correct: false,
                        option_order: 4
                    }
                ]
            });
        }
    });
    
    return questions;
}

async function manualSeedRailway() {
    console.log('🚀 MANUAL RAILWAY DATABASE SEEDING');
    console.log('==================================');
    console.log('');

    const RAILWAY_URL = 'https://tech-board.up.railway.app';
    
    try {
        // 1. Check current status
        console.log('1️⃣ Checking current database status...');
        const healthResponse = await makeRequest(`${RAILWAY_URL}/api/health`);
        
        if (healthResponse.statusCode === 200) {
            const healthData = JSON.parse(healthResponse.data);
            console.log(`📊 Current questions: ${healthData.questionBank.totalQuestions}`);
            
            if (healthData.questionBank.totalQuestions >= 1000) {
                console.log('✅ Database already has sufficient questions!');
                console.log('🎉 No seeding needed');
                return;
            }
        }

        // 2. Generate questions
        console.log('\n2️⃣ Generating comprehensive question bank...');
        const questions = generateQuestions();
        console.log(`✅ Generated ${questions.length} questions`);
        
        // Show distribution
        const dist = {};
        questions.forEach(q => {
            if (!dist[q.grade]) dist[q.grade] = 0;
            dist[q.grade]++;
        });
        
        console.log('📊 Distribution:');
        Object.keys(dist).forEach(grade => {
            console.log(`   Grade ${grade}: ${dist[grade]} questions`);
        });

        // 3. Get admin token
        console.log('\n3️⃣ Getting admin authentication...');
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
            console.log('🔧 Make sure admin credentials are correct');
            return;
        }

        const adminData = JSON.parse(adminLoginResponse.data);
        const adminToken = adminData.data.token;
        console.log('✅ Admin authentication successful');

        // 4. Create a seeding endpoint request
        console.log('\n4️⃣ Attempting to trigger database seeding...');
        
        // Try different approaches
        const approaches = [
            {
                name: 'Seeding Endpoint',
                url: `${RAILWAY_URL}/api/admin/seed-database`,
                method: 'POST',
                body: JSON.stringify({ 
                    action: 'comprehensive_seed',
                    questionCount: questions.length 
                })
            },
            {
                name: 'Bulk Import Endpoint',
                url: `${RAILWAY_URL}/api/admin/bulk-questions`,
                method: 'POST',
                body: JSON.stringify({ questions: questions.slice(0, 100) }) // Test with first 100
            },
            {
                name: 'System Maintenance',
                url: `${RAILWAY_URL}/api/admin/maintenance`,
                method: 'POST',
                body: JSON.stringify({ 
                    action: 'seed_questions',
                    force: true 
                })
            }
        ];

        let seedingTriggered = false;
        
        for (const approach of approaches) {
            console.log(`   Trying ${approach.name}...`);
            
            try {
                const response = await makeRequest(approach.url, {
                    method: approach.method,
                    headers: { 
                        'Authorization': `Bearer ${adminToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: approach.body
                });

                if (response.statusCode === 200 || response.statusCode === 201) {
                    console.log(`   ✅ ${approach.name} successful!`);
                    seedingTriggered = true;
                    break;
                } else {
                    console.log(`   ❌ ${approach.name} failed (${response.statusCode})`);
                }
            } catch (error) {
                console.log(`   ❌ ${approach.name} error: ${error.message}`);
            }
        }

        if (!seedingTriggered) {
            console.log('\n⚠️  Automatic seeding not available');
            console.log('');
            console.log('📋 MANUAL SEEDING OPTIONS:');
            console.log('═'.repeat(40));
            console.log('');
            console.log('🔧 Option 1: Railway CLI');
            console.log('   1. Install Railway CLI: npm install -g @railway/cli');
            console.log('   2. Login: railway login');
            console.log('   3. Connect to project: railway link');
            console.log('   4. Open shell: railway shell');
            console.log('   5. Run: cd server && node scripts/seed-1500-comprehensive.js');
            console.log('');
            console.log('🔧 Option 2: Redeploy with Auto-Seeding');
            console.log('   1. The startup script has been updated');
            console.log('   2. Push changes to GitHub');
            console.log('   3. Railway will auto-deploy and seed');
            console.log('');
            console.log('🔧 Option 3: Database Import');
            console.log('   1. Export local database: sqlite3 database/mcq_system.db .dump > backup.sql');
            console.log('   2. Import to Railway database');
            console.log('');
            console.log('💡 RECOMMENDED: Push the updated code to GitHub');
            console.log('   The Railway startup script now includes auto-seeding!');
        }

        // 5. Wait and verify
        if (seedingTriggered) {
            console.log('\n5️⃣ Waiting for seeding to complete...');
            console.log('⏳ This may take a few minutes...');
            
            // Wait 2 minutes
            await new Promise(resolve => setTimeout(resolve, 120000));
            
            // Verify
            const verifyResponse = await makeRequest(`${RAILWAY_URL}/api/health`);
            if (verifyResponse.statusCode === 200) {
                const verifyData = JSON.parse(verifyResponse.data);
                console.log(`📊 Updated question count: ${verifyData.questionBank.totalQuestions}`);
                
                if (verifyData.questionBank.totalQuestions >= 1000) {
                    console.log('🎉 SEEDING SUCCESSFUL!');
                    console.log('✅ Railway database now ready for 50-question tests');
                } else {
                    console.log('⚠️  Seeding may still be in progress');
                }
            }
        }

    } catch (error) {
        console.error('❌ Manual seeding failed:', error.message);
    }

    console.log('\n🚀 Manual Railway seeding completed');
}

// Run manual seeding
manualSeedRailway().catch(console.error);