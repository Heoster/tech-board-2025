const fs = require('fs');
const path = require('path');

console.log('🔍 RAILWAY BUILD DIAGNOSTIC');
console.log('==========================');
console.log('');

// Check client build
const clientDistPath = path.join(__dirname, 'client/dist');
const clientIndexPath = path.join(clientDistPath, 'index.html');

console.log('📁 Client Build Check:');
console.log(`   Build directory: ${clientDistPath}`);
console.log(`   Exists: ${fs.existsSync(clientDistPath) ? '✅ YES' : '❌ NO'}`);

if (fs.existsSync(clientDistPath)) {
    console.log(`   Index.html: ${fs.existsSync(clientIndexPath) ? '✅ YES' : '❌ NO'}`);
    
    // List files in dist
    try {
        const files = fs.readdirSync(clientDistPath);
        console.log(`   Files in dist: ${files.length}`);
        console.log(`   Files: ${files.slice(0, 10).join(', ')}${files.length > 10 ? '...' : ''}`);
    } catch (error) {
        console.log(`   Error reading dist: ${error.message}`);
    }
} else {
    console.log('   ❌ Client build not found!');
    console.log('   Run: cd client && npm run build');
}

console.log('');

// Check server configuration
console.log('🖥️  Server Configuration:');
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
console.log(`   PORT: ${process.env.PORT || 'not set'}`);
console.log(`   FRONTEND_URL: ${process.env.FRONTEND_URL || 'not set'}`);

console.log('');

// Check package.json scripts
const packageJson = require('./package.json');
console.log('📦 Package.json Scripts:');
console.log(`   railway:build: ${packageJson.scripts['railway:build'] || 'not found'}`);
console.log(`   railway:start: ${packageJson.scripts['railway:start'] || 'not found'}`);

console.log('');

// Check Railway configuration
const railwayConfigPath = path.join(__dirname, 'railway.json');
console.log('🚂 Railway Configuration:');
console.log(`   Config file: ${fs.existsSync(railwayConfigPath) ? '✅ EXISTS' : '❌ MISSING'}`);

if (fs.existsSync(railwayConfigPath)) {
    try {
        const railwayConfig = require('./railway.json');
        console.log(`   Build command: ${railwayConfig.build?.buildCommand || 'not set'}`);
        console.log(`   Start command: ${railwayConfig.deploy?.startCommand || 'not set'}`);
    } catch (error) {
        console.log(`   Error reading config: ${error.message}`);
    }
}

console.log('');
console.log('🎯 RECOMMENDATIONS:');

if (!fs.existsSync(clientDistPath)) {
    console.log('   1. ❌ Build the client: cd client && npm run build');
}

if (!process.env.NODE_ENV) {
    console.log('   2. ⚠️  Set NODE_ENV=production for Railway');
}

if (fs.existsSync(clientDistPath) && fs.existsSync(clientIndexPath)) {
    console.log('   ✅ Build looks good! Ready for Railway deployment.');
}

console.log('');
console.log('🚀 After fixing issues, redeploy to Railway and check:');
console.log('   https://tech-board.up.railway.app/');
console.log('==========================');