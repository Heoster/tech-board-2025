#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Tech Board 2025 - Manual Deployment Script');
console.log('==============================================');

// Check if Railway CLI is installed
try {
    execSync('railway --version', { stdio: 'ignore' });
    console.log('✅ Railway CLI found');
} catch (error) {
    console.log('❌ Railway CLI not found. Installing...');
    try {
        execSync('npm install -g @railway/cli', { stdio: 'inherit' });
        console.log('✅ Railway CLI installed');
    } catch (installError) {
        console.error('❌ Failed to install Railway CLI');
        console.log('Please install manually: npm install -g @railway/cli');
        process.exit(1);
    }
}

// Verify production readiness
console.log('\n🔍 Checking production readiness...');
const checks = [
    'server/database/mcq_system_fixed.db',
    'server/public/index.html',
    '.env.production',
    'server/.env.production',
    'server/complete-production-server.js'
];

let allReady = true;
checks.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file}`);
        allReady = false;
    }
});

if (!allReady) {
    console.log('\n❌ Some required files are missing. Please ensure all files are present.');
    process.exit(1);
}

console.log('\n🎉 All files ready for deployment!');

// Check Railway login status
console.log('\n🔐 Checking Railway authentication...');
try {
    execSync('railway whoami', { stdio: 'pipe' });
    console.log('✅ Railway authenticated');
} catch (error) {
    console.log('❌ Not logged in to Railway');
    console.log('Please run: railway login');
    process.exit(1);
}

// Check if project is linked
console.log('\n🔗 Checking Railway project link...');
try {
    const status = execSync('railway status', { encoding: 'utf8' });
    console.log('✅ Railway project linked');
    console.log(status);
} catch (error) {
    console.log('❌ Railway project not linked');
    console.log('Please run: railway link');
    process.exit(1);
}

// Deploy to Railway
console.log('\n🚀 Deploying to Railway...');
try {
    execSync('railway up', { stdio: 'inherit' });
    console.log('\n🎉 Deployment completed successfully!');
    
    // Get deployment URL
    try {
        const url = execSync('railway domain', { encoding: 'utf8' }).trim();
        console.log(`\n🌐 Your application is live at: ${url}`);
        console.log(`🏥 Health check: ${url}/api/health`);
        console.log(`👨‍💼 Admin login: ${url}/admin/login`);
        console.log(`👨‍🎓 Student portal: ${url}/register`);
    } catch (urlError) {
        console.log('\n🌐 Deployment successful! Check Railway dashboard for URL.');
    }
    
} catch (deployError) {
    console.error('\n❌ Deployment failed');
    console.error('Error:', deployError.message);
    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Check Railway logs: railway logs');
    console.log('2. Verify project settings in Railway dashboard');
    console.log('3. Ensure all environment variables are set');
    process.exit(1);
}

console.log('\n✅ Manual deployment completed successfully!');
console.log('🎓 Tech Board 2025 is now live and ready for use.');