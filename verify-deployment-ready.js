#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying deployment readiness...');

// Check server file
const serverFile = path.join(__dirname, 'server', 'railway-production-server.js');
if (!fs.existsSync(serverFile)) {
    console.error('❌ Server file missing');
    process.exit(1);
}

// Check React build
const buildFiles = [
    'server/public/index.html',
    'server/public/assets'
];

for (const file of buildFiles) {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
        console.error(`❌ Missing: ${file}`);
        process.exit(1);
    }
}

// Check database
const dbFile = path.join(__dirname, 'server', 'database', 'mcq_system_fixed.db');
if (!fs.existsSync(dbFile)) {
    console.error('❌ Database file missing');
    process.exit(1);
}

console.log('✅ Deployment verification passed');
console.log('🚀 Ready for Railway deployment');