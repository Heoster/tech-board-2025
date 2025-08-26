#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing server startup configuration...');

// Check if the correct server file exists
const serverFile = path.join(__dirname, 'server', 'railway-production-server.js');
if (!fs.existsSync(serverFile)) {
    console.error('❌ railway-production-server.js not found');
    process.exit(1);
}
console.log('✅ railway-production-server.js exists');

// Check if React build files exist
const indexFile = path.join(__dirname, 'server', 'public', 'index.html');
if (!fs.existsSync(indexFile)) {
    console.error('❌ React build files not found in server/public');
    process.exit(1);
}
console.log('✅ React build files found in server/public');

// Check package.json configuration
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'server', 'package.json'), 'utf8'));
if (packageJson.main !== 'railway-production-server.js') {
    console.error('❌ package.json main field should point to railway-production-server.js');
    process.exit(1);
}
console.log('✅ package.json main field correctly configured');

if (packageJson.scripts.start !== 'node railway-production-server.js') {
    console.error('❌ package.json start script should run railway-production-server.js');
    process.exit(1);
}
console.log('✅ package.json start script correctly configured');

// Check nixpacks configuration
const nixpacksConfig = fs.readFileSync(path.join(__dirname, 'nixpacks.toml'), 'utf8');
if (!nixpacksConfig.includes('npm start')) {
    console.error('❌ nixpacks.toml should use npm start');
    process.exit(1);
}
console.log('✅ nixpacks.toml correctly configured');

console.log('🎉 All server startup checks passed!');