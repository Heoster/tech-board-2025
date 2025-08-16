#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating Tech Board 2025 MCQ System...\n');

// Check for critical files
const criticalFiles = [
    'server/index.js',
    'server/package.json',
    'client/package.json',
    'package.json'
];

console.log('📁 Checking critical files...');
let fileErrors = 0;

criticalFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        console.log(`✅ ${file} exists`);
    } else {
        console.log(`❌ ${file} missing`);
        fileErrors++;
    }
});

// Check database
console.log('\n💾 Checking database...');
const dbPath = path.join(__dirname, 'server', 'database', 'mcq_system_fixed.db');
if (fs.existsSync(dbPath)) {
    const stats = fs.statSync(dbPath);
    console.log(`✅ Database exists (${Math.round(stats.size / 1024)}KB)`);
} else {
    console.log('❌ Database missing');
    fileErrors++;
}

// Check for syntax errors in main files
console.log('\n🔧 Checking for syntax errors...');
const jsFiles = [
    'server/index.js',
    'server/config/database.js'
];

let syntaxErrors = 0;
jsFiles.forEach(file => {
    try {
        const filePath = path.join(__dirname, file);
        if (fs.existsSync(filePath)) {
            require(filePath);
            console.log(`✅ ${file} syntax OK`);
        }
    } catch (error) {
        console.log(`❌ ${file} syntax error: ${error.message}`);
        syntaxErrors++;
    }
});

// Check dependencies
console.log('\n📦 Checking dependencies...');
try {
    const packageJson = require('./package.json');
    const serverPackageJson = require('./server/package.json');
    
    console.log(`✅ Main package.json loaded (${Object.keys(packageJson.dependencies || {}).length} deps)`);
    console.log(`✅ Server package.json loaded (${Object.keys(serverPackageJson.dependencies || {}).length} deps)`);
} catch (error) {
    console.log(`❌ Package.json error: ${error.message}`);
    syntaxErrors++;
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 VALIDATION SUMMARY');
console.log('='.repeat(50));

if (fileErrors === 0 && syntaxErrors === 0) {
    console.log('🎉 ALL CHECKS PASSED!');
    console.log('✨ The application appears to be error-free');
    process.exit(0);
} else {
    console.log(`❌ Found ${fileErrors} file errors and ${syntaxErrors} syntax errors`);
    console.log('🔧 Please fix the issues above');
    process.exit(1);
}
