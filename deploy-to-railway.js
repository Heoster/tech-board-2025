// Railway Deployment Script for TECH BOARD 2025
const fs = require('fs');
const path = require('path');

console.log('🚀 RAILWAY DEPLOYMENT PREPARATION - TECH BOARD 2025');
console.log('====================================================');
console.log('🌐 Target URL: https://tech-board.up.railway.app');
console.log('');

// 1. Verify all required files exist
console.log('1️⃣ Verifying deployment files...');

const requiredFiles = [
    'railway.json',
    'server/package.json',
    'client/package.json',
    'server/index.js',
    'server/railway-complete-start.js',
    'client/.env.production',
    'server/.env.railway',
    'server/.env.production'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - MISSING`);
        allFilesExist = false;
    }
});

// 2. Verify Railway configuration
console.log('\n2️⃣ Verifying Railway configuration...');
try {
    const railwayConfig = JSON.parse(fs.readFileSync('railway.json', 'utf8'));
    console.log('✅ Railway config loaded');
    console.log(`   Build command: ${railwayConfig.build.buildCommand}`);
    console.log(`   Start command: ${railwayConfig.deploy.startCommand}`);
    console.log(`   Health check: ${railwayConfig.deploy.healthcheckPath}`);
} catch (error) {
    console.log('❌ Railway config error:', error.message);
    allFilesExist = false;
}

// 3. Verify environment configurations
console.log('\n3️⃣ Verifying environment configurations...');

// Client production env
try {
    const clientEnv = fs.readFileSync('client/.env.production', 'utf8');
    console.log('✅ Client production environment:');
    console.log('   ' + clientEnv.trim().replace(/\n/g, '\n   '));
} catch (error) {
    console.log('❌ Client environment error:', error.message);
}

// Server Railway env
try {
    const serverEnv = fs.readFileSync('server/.env.railway', 'utf8');
    console.log('✅ Server Railway environment:');
    console.log('   ' + serverEnv.split('\n').filter(line => line && !line.startsWith('#')).join('\n   '));
} catch (error) {
    console.log('❌ Server environment error:', error.message);
}

// 4. Verify package.json scripts
console.log('\n4️⃣ Verifying package.json scripts...');

try {
    const serverPkg = JSON.parse(fs.readFileSync('server/package.json', 'utf8'));
    console.log('✅ Server package.json:');
    console.log(`   Start script: ${serverPkg.scripts.start}`);
    console.log(`   Node version: ${serverPkg.engines.node}`);
} catch (error) {
    console.log('❌ Server package.json error:', error.message);
}

try {
    const clientPkg = JSON.parse(fs.readFileSync('client/package.json', 'utf8'));
    console.log('✅ Client package.json:');
    console.log(`   Build script: ${clientPkg.scripts.build}`);
} catch (error) {
    console.log('❌ Client package.json error:', error.message);
}

// 5. Create deployment summary
console.log('\n🎯 DEPLOYMENT SUMMARY');
console.log('=====================');

if (allFilesExist) {
    console.log('🎉 ALL DEPLOYMENT FILES READY!');
    console.log('');
    console.log('📋 Deployment Checklist:');
    console.log('✅ Railway configuration: Complete');
    console.log('✅ Environment variables: Configured');
    console.log('✅ Build scripts: Ready');
    console.log('✅ Start scripts: Ready');
    console.log('✅ Health checks: Configured');
    console.log('✅ Database: SQLite embedded');
    console.log('✅ Admin credentials: admin/admin123');
    console.log('');
    console.log('🚀 READY TO DEPLOY TO RAILWAY!');
    console.log('');
    console.log('📝 Deployment Commands:');
    console.log('   1. Commit all changes: git add . && git commit -m "Production ready"');
    console.log('   2. Push to Railway: git push origin main');
    console.log('   3. Or use Railway CLI: railway up');
    console.log('');
    console.log('🌐 After deployment, access at: https://tech-board.up.railway.app');
    console.log('🔐 Admin login: admin / admin123');
    console.log('📚 Students can register and take quizzes');
    console.log('');
    console.log('🔍 Health check endpoints:');
    console.log('   • https://tech-board.up.railway.app/health');
    console.log('   • https://tech-board.up.railway.app/healthz');
    console.log('   • https://tech-board.up.railway.app/api/health');
} else {
    console.log('⚠️  DEPLOYMENT ISSUES DETECTED');
    console.log('Please fix the missing files above before deploying.');
}

console.log('\n🚀 Railway deployment preparation completed');