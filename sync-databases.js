const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

async function syncDatabases() {
    console.log('🔄 Syncing databases...');
    
    const sourceDb = path.join(__dirname, 'server/database/mcq_system_fixed.db');
    const targetDb = path.join(__dirname, 'server/database/mcq_system.db');
    
    console.log('Source:', sourceDb);
    console.log('Target:', targetDb);
    
    // Check if source exists
    if (!fs.existsSync(sourceDb)) {
        console.log('❌ Source database not found');
        return;
    }
    
    try {
        // Copy the entire database file
        fs.copyFileSync(sourceDb, targetDb);
        console.log('✅ Database copied successfully');
        
        // Verify the copy
        const db = new sqlite3.Database(targetDb);
        
        const questionCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                if (err) reject(err);
                else resolve(row?.count || 0);
            });
        });
        
        const adminCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM admins', (err, row) => {
                if (err) reject(err);
                else resolve(row?.count || 0);
            });
        });
        
        db.close();
        
        console.log('📊 Target database verification:');
        console.log('   Questions:', questionCount);
        console.log('   Admins:', adminCount);
        
        console.log('🎉 Database sync completed!');
        
    } catch (error) {
        console.error('❌ Error syncing databases:', error);
    }
}

if (require.main === module) {
    syncDatabases().catch(console.error);
}

module.exports = syncDatabases;