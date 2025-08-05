const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Railway Setup Starting...');

// Ensure database directory exists
const dbDir = path.join(__dirname, 'server/database');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log('📁 Created database directory');
}

// Check if database exists
const dbPath = path.join(dbDir, 'mcq_system.db');
const dbExists = fs.existsSync(dbPath);

if (!dbExists) {
    console.log('📊 Database not found, seeding with questions...');
    
    // Change to server directory and run seed
    const seedProcess = spawn('npm', ['run', 'seed'], {
        cwd: path.join(__dirname, 'server'),
        stdio: 'inherit'
    });
    
    seedProcess.on('close', (code) => {
        if (code === 0) {
            console.log('✅ Database seeded successfully!');
        } else {
            console.log('⚠️ Database seeding completed with warnings, continuing...');
        }
        
        // Start the server
        console.log('🚀 Starting server...');
        require('./server/index.js');
    });
    
    seedProcess.on('error', (error) => {
        console.error('❌ Error seeding database:', error);
        console.log('🚀 Starting server without seeding...');
        require('./server/index.js');
    });
} else {
    console.log('📊 Database exists, starting server...');
    require('./server/index.js');
}