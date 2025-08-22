const fs = require('fs');
const path = require('path');

console.log('🧪 Simple Application Test\n');

let errors = 0;
let passed = 0;

function test(description, condition) {
    if (condition) {
        console.log(`✅ ${description}`);
        passed++;
    } else {
        console.log(`❌ ${description}`);
        errors++;
    }
}

// Test 1: Check critical files exist
test('package.json exists', fs.existsSync(path.join(__dirname, 'package.json')));
test('server/package.json exists', fs.existsSync(path.join(__dirname, 'server/package.json')));
test('server/index.js exists', fs.existsSync(path.join(__dirname, 'server/index.js')));
test('server/config/database.js exists', fs.existsSync(path.join(__dirname, 'server/config/database.js')));

// Test 2: Check database files
const dbPath = path.join(__dirname, 'server/database/mcq_system_fixed.db');
test('Database file exists', fs.existsSync(dbPath));
if (fs.existsSync(dbPath)) {
    const stats = fs.statSync(dbPath);
    test('Database has content', stats.size > 1000);
}

// Test 3: Check package.json structure
try {
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
    test('package.json is valid JSON', true);
    test('package.json has scripts', pkg.scripts && Object.keys(pkg.scripts).length > 0);
    test('package.json has dependencies', pkg.dependencies && Object.keys(pkg.dependencies).length > 0);
} catch (e) {
    test('package.json is valid JSON', false);
}

// Test 4: Check server package.json
try {
    const serverPkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'server/package.json'), 'utf8'));
    test('server package.json is valid', true);
    test('server has express dependency', serverPkg.dependencies && serverPkg.dependencies.express);
    test('server has sqlite3 dependency', serverPkg.dependencies && serverPkg.dependencies.sqlite3);
} catch (e) {
    test('server package.json is valid', false);
}

// Test 5: Basic syntax check
try {
    const dbConfig = require('./server/config/database.js');
    test('database config loads without errors', true);
} catch (e) {
    test('database config loads without errors', false);
    console.log(`   Error: ${e.message}`);
}

console.log('\n' + '='.repeat(40));
console.log(`📊 Results: ${passed} passed, ${errors} failed`);

if (errors === 0) {
    console.log('🎉 All tests passed! Application appears error-free.');
} else {
    console.log(`🔧 ${errors} issues found that need attention.`);
}

process.exit(errors > 0 ? 1 : 0);
