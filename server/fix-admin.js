const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database/mcq_system.db');

async function fixAdminPassword() {
    const db = new sqlite3.Database(dbPath);
    
    const hashedPassword = await bcrypt.hash('password', 10);
    
    await new Promise((resolve, reject) => {
        db.run('UPDATE admins SET password = ? WHERE username = ?', 
            [hashedPassword, 'admin'], (err) => {
                if (err) reject(err);
                else resolve();
            });
    });
    
    console.log('✅ Admin password updated');
    db.close();
}

fixAdminPassword().catch(console.error);