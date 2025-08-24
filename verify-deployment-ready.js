#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying deployment readiness...');

const checks = [
    {
        name: 'Server file exists',
        check: () => fs.existsSync('./server/railway-production-server.js'),
        required: true
    },
    {
        name: 'Client build exists',
        check: () => fs.existsSync('./server/public/index.html'),
        required: true
    },
    {
        name: 'Server package.json exists',
        check: () => fs.existsSync('./server/package.json'),
        required: true
    },
    {
        name: 'Database directory exists',
        check: () => fs.existsSync('./server/database'),
        required: true
    },
    {
        name: 'Database file exists',
        check: () => fs.existsSync('./server/database/mcq_system_fixed.db'),
        required: false
    },
    {
        name: 'Node modules exist',
        check: () => fs.existsSync('./server/node_modules'),
        required: true
    }
];

let allPassed = true;
let requiredPassed = true;

checks.forEach(check => {
    const passed = check.check();
    const status = passed ? '✅' : '❌';
    const required = check.required ? '(required)' : '(optional)';
    
    console.log(`${status} ${check.name} ${required}`);
    
    if (!passed) {
        allPassed = false;
        if (check.required) {
            requiredPassed = false;
        }
    }
});

console.log('\n📊 Summary:');
console.log(`Required checks: ${requiredPassed ? '✅ PASSED' : '❌ FAILED'}`);
console.log(`All checks: ${allPassed ? '✅ PASSED' : '⚠️ SOME FAILED'}`);

if (!requiredPassed) {
    console.log('\n❌ Deployment not ready - required checks failed');
    process.exit(1);
} else {
    console.log('\n✅ Deployment ready!');
    process.exit(0);
}