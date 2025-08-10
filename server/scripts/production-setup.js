const fs = require('fs');
const path = require('path');
const database = require('../config/database');
const logger = require('../utils/logger');

async function setupProduction() {
    console.log('🚀 Setting up production environment...');
    
    try {
        // Ensure logs directory exists
        const logsDir = path.join(__dirname, '../logs');
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
            console.log('✅ Created logs directory');
        }

        // Ensure database directory exists
        const dbDir = path.join(__dirname, '../../database');
        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
            console.log('✅ Created database directory');
        }

        // Initialize database
        console.log('🔧 Initializing database...');
        await database.connect();
        
        // Verify database has questions
        const db = database.getDb();
        const questionCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        console.log(`✅ Database initialized with ${questionCount} questions`);

        // Create production log files
        const logFiles = ['error.log', 'access.log', 'security.log'];
        logFiles.forEach(file => {
            const filePath = path.join(logsDir, file);
            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, '');
                console.log(`✅ Created ${file}`);
            }
        });

        console.log('🎉 Production setup completed successfully!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Production setup failed:', error);
        process.exit(1);
    }
}

setupProduction();