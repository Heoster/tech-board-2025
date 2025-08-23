const fs = require('fs');
const path = require('path');

console.log('🔍 Pre-deployment Check\n');

const checks = [
    {
        name: 'Production Server',
        file: 'production-server.js',
        required: true
    },
    {
        name: 'Package.json',
        file: 'package.json',
        required: true
    },
    {
        name: 'Dockerfile',
        file: 'Dockerfile',
        required: true
    },
    {
        name: 'Server Public Directory',
        file: 'server/public',
        required: false
    },
    {
        name: 'Database Directory',
        file: 'server/database',
        required: false
    }
];

let passed = 0;
let failed = 0;

checks.forEach(check => {
    const exists = fs.existsSync(check.file);
    const status = exists ? '✅' : (check.required ? '❌' : '⚠️');
    
    console.log(`${status} ${check.name}: ${check.file}`);
    
    if (exists) {
        passed++;
    } else if (check.required) {
        failed++;
    }
});

console.log(`\n📊 Summary: ${passed} passed, ${failed} failed`);

if (failed === 0) {
    console.log('🎉 Ready for deployment!');
    process.exit(0);
} else {
    console.log('❌ Fix issues before deployment');
    process.exit(1);
}