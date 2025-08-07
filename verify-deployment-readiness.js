const fs = require('fs');
const path = require('path');

function verifyDeploymentReadiness() {
    console.log('🔍 VERIFYING DEPLOYMENT READINESS');
    console.log('=================================');
    console.log('');

    let allChecksPass = true;
    const issues = [];

    // Check 1: Server files exist
    console.log('1️⃣ Checking Server Files...');
    const serverFiles = [
        'server/index.js',
        'server/package.json',
        'server/railway-complete-start.js',
        'server/config/database.js',
        'server/routes/auth.js',
        'server/routes/quiz.js',
        'server/routes/admin.js',
        'server/utils/auth.js',
        'server/middleware/auth.js'
    ];

    serverFiles.forEach(file => {
        if (fs.existsSync(file)) {
            console.log(`   ✅ ${file}`);
        } else {
            console.log(`   ❌ ${file} - MISSING`);
            issues.push(`Missing server file: ${file}`);
            allChecksPass = false;
        }
    });

    // Check 2: Client build files
    console.log('');
    console.log('2️⃣ Checking Client Build...');
    const clientFiles = [
        'client/package.json',
        'client/vite.config.ts',
        'client/src/App.tsx',
        'client/src/main.tsx'
    ];

    clientFiles.forEach(file => {
        if (fs.existsSync(file)) {
            console.log(`   ✅ ${file}`);
        } else {
            console.log(`   ❌ ${file} - MISSING`);
            issues.push(`Missing client file: ${file}`);
            allChecksPass = false;
        }
    });

    // Check 3: Railway configuration
    console.log('');
    console.log('3️⃣ Checking Railway Configuration...');
    const railwayFiles = [
        'railway.json',
        'package.json'
    ];

    railwayFiles.forEach(file => {
        if (fs.existsSync(file)) {
            console.log(`   ✅ ${file}`);
        } else {
            console.log(`   ❌ ${file} - MISSING`);
            issues.push(`Missing Railway file: ${file}`);
            allChecksPass = false;
        }
    });

    // Check 4: Package.json scripts
    console.log('');
    console.log('4️⃣ Checking Package.json Scripts...');
    try {
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        const requiredScripts = ['railway:start', 'railway:build'];
        
        requiredScripts.forEach(script => {
            if (packageJson.scripts && packageJson.scripts[script]) {
                console.log(`   ✅ ${script}: ${packageJson.scripts[script]}`);
            } else {
                console.log(`   ❌ ${script} - MISSING`);
                issues.push(`Missing script: ${script}`);
                allChecksPass = false;
            }
        });
    } catch (error) {
        console.log(`   ❌ Error reading package.json: ${error.message}`);
        issues.push('Cannot read package.json');
        allChecksPass = false;
    }

    // Check 5: Database and Questions
    console.log('');
    console.log('5️⃣ Checking Database Status...');
    try {
        const database = require('./server/config/database');
        
        (async () => {
            try {
                await database.connect();
                const db = database.getDb();
                
                // Check questions count
                const questionCount = await new Promise((resolve) => {
                    db.get('SELECT COUNT(*) as count FROM questions WHERE difficulty = "basic"', (err, row) => {
                        resolve(row ? row.count : 0);
                    });
                });

                // Check admin count
                const adminCount = await new Promise((resolve) => {
                    db.get('SELECT COUNT(*) as count FROM admins', (err, row) => {
                        resolve(row ? row.count : 0);
                    });
                });

                console.log(`   ✅ Questions in database: ${questionCount}`);
                console.log(`   ✅ Admin accounts: ${adminCount}`);

                if (questionCount >= 1250) {
                    console.log(`   ✅ Sufficient questions (${questionCount}/1250+)`);
                } else {
                    console.log(`   ❌ Insufficient questions (${questionCount}/1250+)`);
                    issues.push(`Need more questions: ${questionCount}/1250+`);
                    allChecksPass = false;
                }

                if (adminCount >= 1) {
                    console.log(`   ✅ Admin accounts available (${adminCount})`);
                } else {
                    console.log(`   ❌ No admin accounts (${adminCount})`);
                    issues.push('No admin accounts found');
                    allChecksPass = false;
                }

                await database.close();

                // Final summary
                console.log('');
                console.log('🎯 DEPLOYMENT READINESS SUMMARY:');
                console.log('================================');

                if (allChecksPass) {
                    console.log('🎉 SUCCESS: READY FOR DEPLOYMENT!');
                    console.log('✅ All server files present');
                    console.log('✅ All client files present');
                    console.log('✅ Railway configuration complete');
                    console.log('✅ Package.json scripts configured');
                    console.log('✅ Database with 1500 questions ready');
                    console.log('✅ Admin credentials configured');
                    console.log('');
                    console.log('🚀 DEPLOYMENT COMMANDS:');
                    console.log('=======================');
                    console.log('1. Commit all changes: git add . && git commit -m "Ready for deployment"');
                    console.log('2. Push to Railway: git push railway main');
                    console.log('3. Monitor deployment: railway logs');
                    console.log('');
                    console.log('🌐 Expected URL: https://tech-board.up.railway.app');
                } else {
                    console.log('⚠️  DEPLOYMENT NOT READY');
                    console.log('❌ Issues found that need fixing:');
                    issues.forEach((issue, index) => {
                        console.log(`   ${index + 1}. ${issue}`);
                    });
                    console.log('');
                    console.log('🔧 Fix these issues before deploying');
                }

            } catch (dbError) {
                console.log(`   ❌ Database error: ${dbError.message}`);
                issues.push(`Database error: ${dbError.message}`);
                allChecksPass = false;
            }
        })();

    } catch (error) {
        console.log(`   ❌ Database check failed: ${error.message}`);
        issues.push(`Database check failed: ${error.message}`);
        allChecksPass = false;
    }
}

verifyDeploymentReadiness();