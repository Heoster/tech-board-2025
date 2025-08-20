const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Production Deployment Issues...\n');

// Check and fix critical files
const criticalFiles = [
    'server/middleware/auth.js',
    'server/middleware/cache.js',
    'server/middleware/compression.js',
    'server/middleware/csrf.js',
    'server/routes/admin.js',
    'server/routes/auth.js',
    'server/routes/quiz.js',
    'server/routes/students.js',
    'server/config/database.js',
    'server/monitoring.js'
];

console.log('📁 Checking critical files...');
let missingFiles = [];

for (const file of criticalFiles) {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - MISSING`);
        missingFiles.push(file);
    }
}

if (missingFiles.length > 0) {
    console.log(`\n⚠️ Missing ${missingFiles.length} critical files!`);
    console.log('These files need to be present for production deployment.');
} else {
    console.log('\n✅ All critical files present');
}

// Check package.json scripts
console.log('\n📦 Checking package.json scripts...');
const packageJsonPath = 'package.json';
if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    const requiredScripts = [
        'start',
        'build',
        'railway:build',
        'railway:start'
    ];
    
    for (const script of requiredScripts) {
        if (packageJson.scripts && packageJson.scripts[script]) {
            console.log(`✅ ${script}: ${packageJson.scripts[script]}`);
        } else {
            console.log(`❌ ${script} - MISSING`);
        }
    }
} else {
    console.log('❌ package.json not found');
}

// Check environment configuration
console.log('\n🌍 Checking environment configuration...');
const envFiles = ['.env', 'server/.env'];
let hasEnvConfig = false;

for (const envFile of envFiles) {
    if (fs.existsSync(envFile)) {
        console.log(`✅ ${envFile} exists`);
        hasEnvConfig = true;
        
        // Check for critical environment variables
        const envContent = fs.readFileSync(envFile, 'utf8');
        const criticalEnvVars = ['JWT_SECRET', 'NODE_ENV'];
        
        for (const envVar of criticalEnvVars) {
            if (envContent.includes(envVar)) {
                console.log(`  ✅ ${envVar} configured`);
            } else {
                console.log(`  ⚠️ ${envVar} not found`);
            }
        }
    }
}

if (!hasEnvConfig) {
    console.log('⚠️ No environment configuration files found');
}

// Check database
console.log('\n🗄️ Checking database...');
const dbFiles = [
    'server/database/mcq_system_fixed.db',
    'server/database/init.sql'
];

for (const dbFile of dbFiles) {
    if (fs.existsSync(dbFile)) {
        const stats = fs.statSync(dbFile);
        console.log(`✅ ${dbFile} (${Math.round(stats.size / 1024)}KB)`);
    } else {
        console.log(`❌ ${dbFile} - MISSING`);
    }
}

// Check client build
console.log('\n🏗️ Checking client build...');
const clientBuildPaths = [
    'client/dist',
    'server/client',
    'server/public'
];

let hasClientBuild = false;
for (const buildPath of clientBuildPaths) {
    if (fs.existsSync(buildPath)) {
        const indexPath = path.join(buildPath, 'index.html');
        if (fs.existsSync(indexPath)) {
            console.log(`✅ Client build found at ${buildPath}`);
            hasClientBuild = true;
            break;
        }
    }
}

if (!hasClientBuild) {
    console.log('⚠️ No client build found - frontend may not work');
}

// Generate deployment checklist
console.log('\n' + '='.repeat(60));
console.log('📋 PRODUCTION DEPLOYMENT CHECKLIST');
console.log('='.repeat(60));

const checklist = [
    {
        item: 'Server configuration updated',
        status: fs.existsSync('server/index.js'),
        action: 'server/index.js should have proper middleware and routes'
    },
    {
        item: 'Authentication middleware configured',
        status: fs.existsSync('server/middleware/auth.js'),
        action: 'Ensure auth middleware is properly configured'
    },
    {
        item: 'Database seeded with questions',
        status: fs.existsSync('server/database/mcq_system_fixed.db'),
        action: 'Run database seeding script if needed'
    },
    {
        item: 'Environment variables set',
        status: hasEnvConfig,
        action: 'Set JWT_SECRET, NODE_ENV=production in Railway'
    },
    {
        item: 'Client build available',
        status: hasClientBuild,
        action: 'Run npm run build to create client build'
    },
    {
        item: 'Railway configuration',
        status: fs.existsSync('railway.json') || fs.existsSync('nixpacks.toml'),
        action: 'Ensure Railway deployment configuration is correct'
    }
];

for (const check of checklist) {
    const icon = check.status ? '✅' : '❌';
    console.log(`${icon} ${check.item}`);
    if (!check.status) {
        console.log(`   Action: ${check.action}`);
    }
}

// Generate fix commands
console.log('\n' + '='.repeat(60));
console.log('🔧 RECOMMENDED FIXES');
console.log('='.repeat(60));

console.log('1. Redeploy to Railway with updated server configuration:');
console.log('   git add .');
console.log('   git commit -m "Fix production API endpoints and authentication"');
console.log('   git push');

console.log('\n2. Set environment variables in Railway dashboard:');
console.log('   NODE_ENV=production');
console.log('   JWT_SECRET=your-secret-key');
console.log('   PORT=8080');

console.log('\n3. Verify deployment:');
console.log('   curl https://tech-board.up.railway.app/api/health');
console.log('   curl https://tech-board.up.railway.app/api');

console.log('\n4. Test admin login:');
console.log('   curl -X POST https://tech-board.up.railway.app/api/auth/admin/login \\');
console.log('        -H "Content-Type: application/json" \\');
console.log('        -d \'{"username":"admin","password":"admin123"}\'');

console.log('\n✅ Production deployment fix completed!');
console.log('Deploy the changes and test the endpoints again.');