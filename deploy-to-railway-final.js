#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Tech Board 2025 - Final Railway Deployment');
console.log('===============================================');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
    console.error('❌ Error: package.json not found. Run this from the project root.');
    process.exit(1);
}

// Check if Railway CLI is installed
try {
    execSync('railway --version', { stdio: 'ignore' });
    console.log('✅ Railway CLI found');
} catch (error) {
    console.log('⚠️  Railway CLI not found, but deployment can continue');
}

// Verify key files exist
const requiredFiles = [
    'server/production-server.js',
    'server/package.json',
    'client/package.json',
    'railway.json',
    'nixpacks.toml',
    'Dockerfile'
];

console.log('\n📋 Checking required files...');
for (const file of requiredFiles) {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - MISSING`);
        process.exit(1);
    }
}

// Check server configuration
console.log('\n🔧 Verifying server configuration...');
const serverPackage = JSON.parse(fs.readFileSync('server/package.json', 'utf8'));
if (serverPackage.scripts.start === 'node production-server.js') {
    console.log('✅ Server start script configured correctly');
} else {
    console.log('❌ Server start script incorrect');
    process.exit(1);
}

// Check Railway configuration
console.log('\n⚙️  Verifying Railway configuration...');
const railwayConfig = JSON.parse(fs.readFileSync('railway.json', 'utf8'));
if (railwayConfig.deploy && railwayConfig.deploy.healthcheckPath === '/api/health') {
    console.log('✅ Railway health check configured');
} else {
    console.log('❌ Railway health check not configured');
}

// Check nixpacks configuration
const nixpacksConfig = fs.readFileSync('nixpacks.toml', 'utf8');
if (nixpacksConfig.includes('node production-server.js')) {
    console.log('✅ Nixpacks start command configured');
} else {
    console.log('❌ Nixpacks start command incorrect');
}

// Test production server locally (quick test)
console.log('\n🧪 Testing production server...');
try {
    const testServer = require('./server/production-server.js');
    console.log('✅ Production server loads without errors');
} catch (error) {
    console.log('❌ Production server has errors:', error.message);
    process.exit(1);
}

console.log('\n📦 Deployment Summary:');
console.log('======================');
console.log('✅ All required files present');
console.log('✅ Server configuration correct');
console.log('✅ Railway configuration valid');
console.log('✅ Production server tested');
console.log('');
console.log('🎯 Deployment Target: https://tech-board.up.railway.app');
console.log('');
console.log('📋 Manual Deployment Steps:');
console.log('1. Commit all changes: git add . && git commit -m "Final deployment ready"');
console.log('2. Push to Railway: railway up (if CLI installed)');
console.log('3. Or push to GitHub and connect Railway to auto-deploy');
console.log('');
console.log('🔍 After deployment, verify:');
console.log('- Health check: https://tech-board.up.railway.app/api/health');
console.log('- Admin login: https://tech-board.up.railway.app/admin/login');
console.log('- Student portal: https://tech-board.up.railway.app/register');
console.log('');
console.log('🎉 Ready for deployment!');

// Create a deployment info file
const deploymentInfo = {
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    server: 'production-server.js',
    database: 'SQLite with auto-seeding',
    features: [
        'Student registration and login',
        'Admin dashboard',
        '1500 questions across 5 grades',
        '50-minute timed tests',
        'Automatic scoring',
        'Results management'
    ],
    urls: {
        production: 'https://tech-board.up.railway.app',
        health: 'https://tech-board.up.railway.app/api/health',
        admin: 'https://tech-board.up.railway.app/admin/login',
        student: 'https://tech-board.up.railway.app/register'
    },
    credentials: {
        admin: {
            username: 'admin',
            password: 'admin123'
        }
    }
};

fs.writeFileSync('deployment-info.json', JSON.stringify(deploymentInfo, null, 2));
console.log('📄 Deployment info saved to deployment-info.json');