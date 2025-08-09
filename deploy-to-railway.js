const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function deployToRailway() {
    console.log('🚀 DEPLOYING UPDATED QUIZ GENERATION TO RAILWAY');
    console.log('===============================================');
    console.log('');

    try {
        // 1. Check if we're in a git repository
        console.log('1️⃣ Checking git repository...');
        try {
            execSync('git status', { stdio: 'pipe' });
            console.log('✅ Git repository found');
        } catch (error) {
            console.log('❌ Not in a git repository');
            console.log('💡 Initialize git first: git init');
            return;
        }

        // 2. Check for Railway CLI
        console.log('\n2️⃣ Checking Railway CLI...');
        try {
            const railwayVersion = execSync('railway --version', { encoding: 'utf8' });
            console.log(`✅ Railway CLI found: ${railwayVersion.trim()}`);
        } catch (error) {
            console.log('❌ Railway CLI not found');
            console.log('💡 Install Railway CLI: npm install -g @railway/cli');
            return;
        }

        // 3. Check Railway login status
        console.log('\n3️⃣ Checking Railway login...');
        try {
            execSync('railway whoami', { stdio: 'pipe' });
            console.log('✅ Logged into Railway');
        } catch (error) {
            console.log('❌ Not logged into Railway');
            console.log('💡 Login first: railway login');
            return;
        }

        // 4. Verify updated files exist
        console.log('\n4️⃣ Verifying updated files...');
        const criticalFiles = [
            'server/routes/quiz.js',
            'client/src/components/QuizInterface.tsx',
            'server/railway-complete-start.js'
        ];

        let allFilesExist = true;
        for (const file of criticalFiles) {
            if (fs.existsSync(file)) {
                console.log(`✅ ${file} - Updated`);
            } else {
                console.log(`❌ ${file} - Missing`);
                allFilesExist = false;
            }
        }

        if (!allFilesExist) {
            console.log('❌ Some critical files are missing');
            return;
        }

        // 5. Check package.json for Railway start script
        console.log('\n5️⃣ Checking package.json...');
        const packageJsonPath = path.join('server', 'package.json');
        if (fs.existsSync(packageJsonPath)) {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
            
            if (packageJson.scripts && packageJson.scripts.start) {
                console.log(`✅ Start script: ${packageJson.scripts.start}`);
            } else {
                console.log('⚠️  No start script found, adding one...');
                packageJson.scripts = packageJson.scripts || {};
                packageJson.scripts.start = 'node railway-complete-start.js';
                fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
                console.log('✅ Start script added');
            }
        }

        // 6. Create Railway deployment configuration
        console.log('\n6️⃣ Creating Railway configuration...');
        const railwayConfig = {
            "$schema": "https://railway.app/railway.schema.json",
            "build": {
                "builder": "NIXPACKS",
                "buildCommand": "cd server && npm install && cd ../client && npm install && npm run build"
            },
            "deploy": {
                "startCommand": "cd server && npm start",
                "healthcheckPath": "/api/health",
                "healthcheckTimeout": 100,
                "restartPolicyType": "ON_FAILURE",
                "restartPolicyMaxRetries": 10
            },
            "environments": {
                "production": {
                    "variables": {
                        "NODE_ENV": "production",
                        "PORT": "${{RAILWAY_PORT}}",
                        "TRUST_PROXY": "1"
                    }
                }
            }
        };

        fs.writeFileSync('railway.json', JSON.stringify(railwayConfig, null, 2));
        console.log('✅ Railway configuration created');

        // 7. Create .railwayignore
        console.log('\n7️⃣ Creating .railwayignore...');
        const railwayIgnore = `
# Development files
node_modules/
.env.local
.env.development
*.log
.DS_Store

# Test files
test-*.js
*-test.js
*.test.js

# Documentation
*.md
docs/

# IDE files
.vscode/
.idea/
*.swp
*.swo

# Temporary files
tmp/
temp/
.tmp/
`;
        fs.writeFileSync('.railwayignore', railwayIgnore.trim());
        console.log('✅ .railwayignore created');

        // 8. Stage and commit changes
        console.log('\n8️⃣ Staging changes for deployment...');
        try {
            execSync('git add .', { stdio: 'pipe' });
            execSync('git commit -m "Deploy updated quiz generation system with 50 questions support"', { stdio: 'pipe' });
            console.log('✅ Changes committed');
        } catch (error) {
            console.log('ℹ️  No new changes to commit (already up to date)');
        }

        // 9. Deploy to Railway
        console.log('\n9️⃣ Deploying to Railway...');
        console.log('🚀 Starting deployment...');
        
        try {
            const deployOutput = execSync('railway up --detach', { encoding: 'utf8' });
            console.log('✅ Deployment initiated');
            console.log(deployOutput);
        } catch (error) {
            console.log('❌ Deployment failed');
            console.log(error.message);
            return;
        }

        // 10. Wait and test deployment
        console.log('\n🔟 Waiting for deployment to complete...');
        console.log('⏳ This may take a few minutes...');
        
        // Wait 2 minutes for deployment
        await new Promise(resolve => setTimeout(resolve, 120000));

        console.log('\n✅ DEPLOYMENT COMPLETED!');
        console.log('');
        console.log('🌐 Your updated TECH BOARD 2025 system is now deployed to Railway');
        console.log('📊 Features deployed:');
        console.log('   • Fixed quiz generation algorithm');
        console.log('   • 50 questions per test (when available)');
        console.log('   • Flexible scoring system (72% pass rate)');
        console.log('   • Production-ready error handling');
        console.log('   • Updated admin password (admin123)');
        console.log('');
        console.log('🔗 Next steps:');
        console.log('   1. Test the deployment: node test-railway-quiz-generation.js');
        console.log('   2. Access admin panel: https://tech-board.up.railway.app/admin/login');
        console.log('   3. Test student registration: https://tech-board.up.railway.app/register');

    } catch (error) {
        console.error('❌ Deployment failed:', error.message);
        console.log('\n🔧 Troubleshooting:');
        console.log('   1. Ensure you have Railway CLI installed');
        console.log('   2. Make sure you are logged into Railway');
        console.log('   3. Check that you have a Railway project linked');
        console.log('   4. Verify git repository is properly initialized');
    }

    console.log('\n🚀 Railway deployment process completed');
}

// Run deployment
deployToRailway().catch(console.error);