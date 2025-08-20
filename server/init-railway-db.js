const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

async function initializeDatabase() {
    const dbPath = path.join(__dirname, 'database', 'mcq_system_fixed.db');
    
    // Check if database exists
    if (!fs.existsSync(dbPath)) {
        console.log('❌ Database file not found at:', dbPath);
        
        // Try to copy from root database folder
        const rootDbPath = path.join(__dirname, '..', 'database', 'mcq_system_fixed.db');
        if (fs.existsSync(rootDbPath)) {
            console.log('📋 Copying database from root folder...');
            fs.copyFileSync(rootDbPath, dbPath);
            console.log('✅ Database copied successfully');
        } else {
            console.log('❌ No database found in root folder either');
            return false;
        }
    }

    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('❌ Database connection failed:', err.message);
                reject(err);
                return;
            }

            console.log('✅ Database connected successfully');

            // Test basic queries
            db.get('SELECT COUNT(*) as count FROM students', (err, row) => {
                if (err) {
                    console.error('❌ Students table check failed:', err.message);
                } else {
                    console.log(`📊 Students table: ${row.count} records`);
                }
            });

            db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                if (err) {
                    console.error('❌ Questions table check failed:', err.message);
                } else {
                    console.log(`📊 Questions table: ${row.count} records`);
                }
            });

            db.get('SELECT COUNT(*) as count FROM admins', (err, row) => {
                if (err) {
                    console.error('❌ Admins table check failed:', err.message);
                } else {
                    console.log(`📊 Admins table: ${row.count} records`);
                }
            });

            db.close((err) => {
                if (err) {
                    console.error('❌ Error closing database:', err.message);
                    reject(err);
                } else {
                    console.log('✅ Database initialization complete');
                    resolve(true);
                }
            });
        });
    });
}

// Run if called directly
if (require.main === module) {
    initializeDatabase()
        .then(() => {
            console.log('🎉 Railway database initialization successful');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Railway database initialization failed:', error);
            process.exit(1);
        });
}

module.exports = initializeDatabase;