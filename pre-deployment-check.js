const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 TechBoard 2025 - Pre-Deployment Check\n');

async function runPreDeploymentCheck() {
    let allPassed = true;
    const issues = [];
    const warnings = [];

    console.log('📋 Running comprehensive pre-deployment checks...\n');

    // 1. File Structure Check
    console.log('📁 Checking file structure...');
    // Determine if we're running from server directory or root
    const isRunningFromServer = process.cwd().endsWith('server');
    const rootPath = isRunningFromServer ? '..' : '.';
    
    const requiredFiles = [
        `${rootPath}/server/index.js`,
        `${rootPath}/server/start-production.js`,
        `${rootPath}/server/package.json`,
        `${rootPath}/server/routes/auth.js`,
        `${rootPath}/server/routes/quiz.js`,
        `${rootPath}/server/routes/admin.js`,
        `${rootPath}/server/middleware/auth.js`,
        `${rootPath}/server/config/database.js`,
        `${rootPath}/client/package.json`,
        `${rootPath}/client/vite.config.ts`,
        `${rootPath}/railway.json`,
        `${rootPath}/nixpacks.toml`
    ];

    for (const file of requiredFiles) {
        if (fs.existsSync(file)) {
            console.log(`  ✅ ${file}`);
        } else {
            console.log(`  ❌ ${file} - MISSING`);
            issues.push(`Missing required file: ${file}`);
            allPassed = false;
        }
    }

    // 2. Environment Configuration Check
    console.log('\n🔧 Checking environment configuration...');
    
    const envFiles = [
        `${rootPath}/server/.env.production`,
        `${rootPath}/client/.env.production`
    ];

    for (const envFile of envFiles) {
        if (fs.existsSync(envFile)) {
            console.log(`  ✅ ${envFile}`);
            
            // Check content
            const content = fs.readFileSync(envFile, 'utf8');
            if (envFile.includes('server') && content.includes('tech-board.up.railway.app')) {
                console.log(`    ✅ Railway URL configured`);
            } else if (envFile.includes('client')) {
                console.log(`    ✅ Client environment configured`);
            }
        } else {
            console.log(`  ❌ ${envFile} - MISSING`);
            issues.push(`Missing environment file: ${envFile}`);
            allPassed = false;
        }
    }

    // 3. Database Check
    console.log('\n🗄️ Checking database...');
    try {
        const ensureDbReady = require('./ensure-database-ready.js');
        const dbReady = await ensureDbReady();
        if (dbReady) {
            console.log('  ✅ Database ready for production');
        } else {
            console.log('  ⚠️ Database has warnings');
            warnings.push('Database verification had warnings');
        }
    } catch (error) {
        console.log('  ❌ Database check failed:', error.message);
        issues.push('Database check failed');
        allPassed = false;
    }

    // 4. Build Check
    console.log('\n🏗️ Checking build capability...');
    try {
        // Check if client can build
        if (fs.existsSync(`${rootPath}/client/node_modules`)) {
            console.log('  ✅ Client dependencies installed');
        } else {
            console.log('  ⚠️ Client dependencies not installed');
            warnings.push('Client dependencies not installed - will be installed during deployment');
        }

        // Check if server dependencies are ready
        if (fs.existsSync(`${rootPath}/server/node_modules`)) {
            console.log('  ✅ Server dependencies installed');
        } else {
            console.log('  ⚠️ Server dependencies not installed');
            warnings.push('Server dependencies not installed - will be installed during deployment');
        }

        // Check if static files exist (from previous build)
        if (fs.existsSync(`${rootPath}/server/public/index.html`)) {
            console.log('  ✅ Static files available');
        } else {
            console.log('  ⚠️ Static files not built yet');
            warnings.push('Static files will be built during deployment');
        }

    } catch (error) {
        console.log('  ❌ Build check failed:', error.message);
        issues.push('Build check failed');
        allPassed = false;
    }

    // 5. Railway Configuration Check
    console.log('\n🚂 Checking Railway configuration...');
    try {
        const railwayConfig = JSON.parse(fs.readFileSync(`${rootPath}/railway.json`, 'utf8'));
        
        if (railwayConfig.deploy && railwayConfig.deploy.startCommand) {
            console.log(`  ✅ Start command: ${railwayConfig.deploy.startCommand}`);
        } else {
            console.log('  ❌ Start command not configured');
            issues.push('Railway start command not configured');
            allPassed = false;
        }

        if (railwayConfig.deploy && railwayConfig.deploy.healthcheckPath) {
            console.log(`  ✅ Health check: ${railwayConfig.deploy.healthcheckPath}`);
        } else {
            console.log('  ⚠️ Health check not configured');
            warnings.push('Health check not configured in Railway');
        }

        // Check nixpacks
        const nixpacksContent = fs.readFileSync(`${rootPath}/nixpacks.toml`, 'utf8');
        if (nixpacksContent.includes('nodejs_20')) {
            console.log('  ✅ Node.js 20 configured in nixpacks');
        } else {
            console.log('  ⚠️ Node.js version not specified in nixpacks');
            warnings.push('Node.js version should be specified in nixpacks.toml');
        }

    } catch (error) {
        console.log('  ❌ Railway configuration error:', error.message);
        issues.push('Railway configuration error');
        allPassed = false;
    }

    // 6. Security Check
    console.log('\n🛡️ Checking security configuration...');
    try {
        const serverEnv = fs.readFileSync(`${rootPath}/server/.env.production`, 'utf8');
        
        if (serverEnv.includes('JWT_SECRET=') && !serverEnv.includes('JWT_SECRET=secret')) {
            console.log('  ✅ JWT secret configured');
        } else {
            console.log('  ❌ JWT secret not properly configured');
            issues.push('JWT secret must be set to a secure value');
            allPassed = false;
        }

        if (serverEnv.includes('BCRYPT_ROUNDS=')) {
            console.log('  ✅ Bcrypt rounds configured');
        } else {
            console.log('  ⚠️ Bcrypt rounds not configured');
            warnings.push('Bcrypt rounds should be configured');
        }

        if (serverEnv.includes('CORS_ORIGIN=https://tech-board.up.railway.app')) {
            console.log('  ✅ CORS properly configured for Railway');
        } else {
            console.log('  ❌ CORS not properly configured for Railway');
            issues.push('CORS must be configured for tech-board.up.railway.app');
            allPassed = false;
        }

    } catch (error) {
        console.log('  ❌ Security check failed:', error.message);
        issues.push('Security configuration check failed');
        allPassed = false;
    }

    // 7. Performance Check
    console.log('\n⚡ Checking performance configuration...');
    try {
        const serverEnv = fs.readFileSync(`${rootPath}/server/.env.production`, 'utf8');
        
        if (serverEnv.includes('ENABLE_COMPRESSION=true')) {
            console.log('  ✅ Compression enabled');
        } else {
            console.log('  ⚠️ Compression not enabled');
            warnings.push('Compression should be enabled for better performance');
        }

        if (serverEnv.includes('ENABLE_CACHE=true')) {
            console.log('  ✅ Caching enabled');
        } else {
            console.log('  ⚠️ Caching not enabled');
            warnings.push('Caching should be enabled for better performance');
        }

        if (serverEnv.includes('RATE_LIMIT_MAX=')) {
            console.log('  ✅ Rate limiting configured');
        } else {
            console.log('  ⚠️ Rate limiting not configured');
            warnings.push('Rate limiting should be configured');
        }

    } catch (error) {
        console.log('  ⚠️ Performance check warning:', error.message);
        warnings.push('Performance configuration check had issues');
    }

    // Summary
    console.log('\n📊 Pre-Deployment Check Summary:');
    console.log(`  Critical Issues: ${issues.length}`);
    console.log(`  Warnings: ${warnings.length}`);

    if (issues.length > 0) {
        console.log('\n❌ Critical Issues (Must Fix):');
        issues.forEach((issue, index) => {
            console.log(`  ${index + 1}. ${issue}`);
        });
    }

    if (warnings.length > 0) {
        console.log('\n⚠️ Warnings (Recommended to Fix):');
        warnings.forEach((warning, index) => {
            console.log(`  ${index + 1}. ${warning}`);
        });
    }

    if (allPassed && issues.length === 0) {
        console.log('\n🎉 Pre-deployment check passed!');
        console.log('✅ All critical requirements met');
        console.log('✅ Ready for Railway deployment');
        console.log('\n🚀 To deploy:');
        console.log('  railway login');
        console.log('  railway up');
        console.log('\n🔗 Your app will be available at: https://tech-board.up.railway.app');
        return true;
    } else {
        console.log('\n❌ Pre-deployment check failed!');
        console.log('Please fix the critical issues above before deploying.');
        if (warnings.length > 0) {
            console.log('Consider addressing the warnings for optimal performance.');
        }
        return false;
    }
}

// Run check if called directly
if (require.main === module) {
    runPreDeploymentCheck()
        .then(passed => {
            process.exit(passed ? 0 : 1);
        })
        .catch(error => {
            console.error('❌ Pre-deployment check error:', error);
            process.exit(1);
        });
}

module.exports = runPreDeploymentCheck;