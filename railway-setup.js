const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Railway Setup Starting...');

// Check if database exists
const dbPath = path.join(__dirname, 'server/database/mcq_system.db');
const dbExists = fs.existsSync(dbPath);

if (!dbExists) {
    console.log('📊 Database not found, seeding with questions...');
    
    exec('cd server && npm run seed', (error, stdout, stderr) => {
        if (error) {
            console.error('❌ Error seeding database:', error);
            return;
        }
        console.log('✅ Database seeded successfully!');
        console.log(stdout);
        
        // Start the server
        console.log('🚀 Starting server...');
        require('./server/index.js');
    });
} else {
    console.log('📊 Database exists, starting server...');
    require('./server/index.js');
}