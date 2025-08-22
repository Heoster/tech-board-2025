const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

async function runDeploymentTests() {
    console.log('🚀 Final Deployment Readiness Test\n');
    
    let passed = 0;
    let total = 0;
    
    // Test 1: Database Structure
    console.log('1️⃣ Testing Database Structure...');
    total++;
    try {
        const dbPath = path.join(__dirname, 'server/database/mcq_system.db');
        const db = new sqlite3.Database(dbPath);
        
        const counts = await new Promise((resolve, reject) => {
            db.all('SELECT grade, COUNT(*) as count FROM questions GROUP BY grade', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        db.close();
        
        console.log('   Question counts per grade:');
        counts.forEach(c => console.log(`     Grade ${c.grade}: ${c.count} questions`));
        
        if (counts.length === 5 && counts.every(c => c.count === 300)) {
            console.log('   ✅ Database structure: PASSED');
            passed++;
        } else {
            console.log('   ❌ Database structure: FAILED');
        }
    } catch (error) {
        console.log('   ❌ Database structure: FAILED -', error.message);
    }
    
    // Test 2: Quiz Generation Logic
    console.log('\\n2️⃣ Testing Quiz Generation Logic...');
    total++;
    try {
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
                LIMIT 50
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows.map(q => ({
                    ...q,
                    options: q.options ? JSON.parse(`[${q.options}]`) : []
                })));
            });
        });
        
        db.close();
        
        console.log(`   Generated ${questions.length} questions`);
        console.log(`   Sample: "${questions[0]?.question_text?.substring(0, 60)}..."`);
        
        const validQuestions = questions.filter(q => 
            q.question_text && 
            q.options.length === 4 && 
            q.options.every(opt => opt.text)
        );
        
        if (validQuestions.length === 50) {
            console.log('   ✅ Quiz generation: PASSED');
            passed++;
        } else {
            console.log(`   ❌ Quiz generation: FAILED - Only ${validQuestions.length}/50 valid questions`);
        }
    } catch (error) {
        console.log('   ❌ Quiz generation: FAILED -', error.message);
    }
    
    // Test 3: File Structure
    console.log('\\n3️⃣ Testing File Structure...');
    total++;
    try {
        const requiredFiles = [
            'server/index.js',
            'server/package.json',
            'client/package.json',
            'Dockerfile',
            'railway.json'
        ];
        
        const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(__dirname, file)));
        
        if (missingFiles.length === 0) {
            console.log('   ✅ File structure: PASSED');
            passed++;
        } else {
            console.log('   ❌ File structure: FAILED - Missing:', missingFiles.join(', '));
        }
    } catch (error) {
        console.log('   ❌ File structure: FAILED -', error.message);
    }
    
    // Test 4: Configuration Files
    console.log('\\n4️⃣ Testing Configuration Files...');
    total++;
    try {
        // Check Dockerfile
        const dockerfile = fs.readFileSync(path.join(__dirname, 'Dockerfile'), 'utf8');
        const hasClientBuild = dockerfile.includes('npm run build');
        const hasServerCopy = dockerfile.includes('COPY server/');
        
        // Check railway.json
        const railwayConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'railway.json'), 'utf8'));
        const hasHealthCheck = railwayConfig.deploy?.healthcheckPath === '/api/health';
        
        if (hasClientBuild && hasServerCopy && hasHealthCheck) {
            console.log('   ✅ Configuration files: PASSED');
            passed++;
        } else {
            console.log('   ❌ Configuration files: FAILED');
            if (!hasClientBuild) console.log('     - Dockerfile missing client build');
            if (!hasServerCopy) console.log('     - Dockerfile missing server copy');
            if (!hasHealthCheck) console.log('     - railway.json missing health check');
        }
    } catch (error) {
        console.log('   ❌ Configuration files: FAILED -', error.message);
    }
    
    // Test 5: Environment Configuration
    console.log('\\n5️⃣ Testing Environment Configuration...');
    total++;
    try {
        const clientEnv = fs.readFileSync(path.join(__dirname, 'client/.env.production'), 'utf8');
        const hasApiUrl = clientEnv.includes('VITE_API_BASE_URL');
        
        if (hasApiUrl) {
            console.log('   ✅ Environment configuration: PASSED');
            passed++;
        } else {
            console.log('   ❌ Environment configuration: FAILED - Missing API URL');
        }
    } catch (error) {
        console.log('   ❌ Environment configuration: FAILED -', error.message);
    }
    
    // Final Results
    console.log('\\n📊 DEPLOYMENT READINESS REPORT');
    console.log('================================');
    console.log(`✅ Tests Passed: ${passed}/${total}`);
    console.log(`❌ Tests Failed: ${total - passed}/${total}`);
    console.log(`📈 Success Rate: ${Math.round((passed/total) * 100)}%`);
    
    if (passed === total) {
        console.log('\\n🎉 ALL TESTS PASSED! 🚀');
        console.log('✅ App is ready for Railway deployment!');
        console.log('\\n📋 Deployment Checklist:');
        console.log('   ✅ Database with 1,500 unique questions');
        console.log('   ✅ Quiz generation working correctly');
        console.log('   ✅ All required files present');
        console.log('   ✅ Dockerfile configured for full-stack build');
        console.log('   ✅ Railway configuration ready');
        console.log('   ✅ Environment variables set');
        console.log('\\n🚀 Ready to deploy to Railway!');
    } else {
        console.log('\\n⚠️  SOME TESTS FAILED');
        console.log('Please fix the failing tests before deployment.');
    }
}

runDeploymentTests().catch(console.error);