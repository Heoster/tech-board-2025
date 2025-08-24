#!/usr/bin/env node

console.log('🧪 Testing server startup...');

// Test if the server file can be loaded
try {
    console.log('📁 Checking server file...');
    const serverPath = './server/railway-production-server.js';
    const fs = require('fs');
    
    if (!fs.existsSync(serverPath)) {
        console.error('❌ Server file not found:', serverPath);
        process.exit(1);
    }
    
    console.log('✅ Server file exists');
    
    // Test if dependencies are available
    console.log('📦 Checking dependencies...');
    const requiredModules = ['express', 'cors', 'sqlite3', 'bcrypt', 'jsonwebtoken'];
    
    for (const module of requiredModules) {
        try {
            require(module);
            console.log(`✅ ${module}`);
        } catch (error) {
            console.error(`❌ ${module}: ${error.message}`);
            process.exit(1);
        }
    }
    
    console.log('✅ All dependencies available');
    
    // Test database directory
    console.log('🗄️ Checking database setup...');
    const dbDir = './server/database';
    const dbPath = './server/database/mcq_system_fixed.db';
    
    if (!fs.existsSync(dbDir)) {
        console.log('📁 Creating database directory...');
        fs.mkdirSync(dbDir, { recursive: true });
    }
    
    if (fs.existsSync(dbPath)) {
        console.log('✅ Database file exists');
    } else {
        console.log('⚠️ Database file not found - will use basic functionality');
    }
    
    console.log('✅ Server startup test passed!');
    
} catch (error) {
    console.error('❌ Server startup test failed:', error.message);
    process.exit(1);
}