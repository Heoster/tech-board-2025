const fs = require('fs');
const path = require('path');
const database = require('../config/database');

async function setupProduction() {
    console.log('Setting up production environment...');
    
    try {
        // Ensure database directory exists
        const dbDir = path.join(__dirname, '../database');
        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
            console.log('Created database directory');
        }
        
        // Ensure logs directory exists
        const logsDir = path.join(__dirname, '../logs');
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
            console.log('Created logs directory');
        }
        
        // Initialize database
        console.log('Initializing database...');
        await database.connect();
        console.log('Database initialized successfully');
        
        // Close database connection
        await database.close();
        console.log('Production setup completed successfully');
        
    } catch (error) {
        console.error('Production setup failed:', error);
        process.exit(1);
    }
}

// Run setup if this script is executed directly
if (require.main === module) {
    setupProduction();
}

module.exports = setupProduction;