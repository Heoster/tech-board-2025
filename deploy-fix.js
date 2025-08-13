const fs = require('fs');
const path = require('path');

async function deployFix() {
    console.log('🚀 Applying deployment fixes...');
    
    // 1. Ensure the correct database is used in production
    const serverDir = path.join(__dirname, 'server');
    const dbDir = path.join(serverDir, 'database');
    
    // Check if mcq_system_fixed.db exists
    const fixedDbPath = path.join(dbDir, 'mcq_system_fixed.db');
    const regularDbPath = path.join(dbDir, 'mcq_system.db');
    
    if (fs.existsSync(fixedDbPath)) {
        console.log('✅ Production database found');
        
        // Copy to regular name as backup
        if (!fs.existsSync(regularDbPath)) {
            fs.copyFileSync(fixedDbPath, regularDbPath);
            console.log('✅ Backup database created');
        }
    }
    
    // 2. Create a production start script
    const startScript = `#!/usr/bin/env node
const path = require('path');

// Set production environment
process.env.NODE_ENV = 'production';
process.env.DB_PATH = path.join(__dirname, 'database/mcq_system_fixed.db');

// Start the server
require('./index.js');
`;
    
    fs.writeFileSync(path.join(serverDir, 'start-production.js'), startScript);
    console.log('✅ Production start script created');
    
    // 3. Update package.json start script
    const packageJsonPath = path.join(serverDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        packageJson.scripts = packageJson.scripts || {};
        packageJson.scripts.start = 'node start-production.js';
        packageJson.scripts['start:dev'] = 'node index.js';
        
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log('✅ Package.json updated');
    }
    
    console.log('🎉 Deployment fixes applied!');
    console.log('📋 Next steps:');
    console.log('   1. Commit and push changes');
    console.log('   2. Redeploy on Railway');
    console.log('   3. Test the endpoints');
}

if (require.main === module) {
    deployFix().catch(console.error);
}

module.exports = deployFix;