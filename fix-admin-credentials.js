const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

async function fixAdminCredentials() {
    const dbPath = path.join(__dirname, 'server/database/mcq_system_fixed.db');
    
    console.log('🔧 Fixing admin credentials...');
    console.log('Database path:', dbPath);
    
    const db = new sqlite3.Database(dbPath);
    
    try {
        // Hash the password 'admin123'
        const hashedPassword = await bcrypt.hash('admin123', 10);
        
        // First, check if admin exists
        const admin = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM admins WHERE username = ?', ['admin'], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
        
        if (admin) {
            // Update existing admin
            await new Promise((resolve, reject) => {
                db.run('UPDATE admins SET password = ? WHERE username = ?', 
                    [hashedPassword, 'admin'], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
            });
            console.log('✅ Admin password updated successfully');
        } else {
            // Insert new admin
            await new Promise((resolve, reject) => {
                db.run('INSERT INTO admins (username, password) VALUES (?, ?)', 
                    ['admin', hashedPassword], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
            });
            console.log('✅ Admin user created successfully');
        }
        
        // Verify the admin exists
        const verifyAdmin = await new Promise((resolve, reject) => {
            db.get('SELECT username FROM admins WHERE username = ?', ['admin'], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
        
        if (verifyAdmin) {
            console.log('✅ Admin verification successful');
            console.log('📋 Admin credentials:');
            console.log('   Username: admin');
            console.log('   Password: admin123');
        } else {
            console.log('❌ Admin verification failed');
        }
        
    } catch (error) {
        console.error('❌ Error fixing admin credentials:', error);
    } finally {
        db.close();
    }
}

if (require.main === module) {
    fixAdminCredentials().catch(console.error);
}

module.exports = fixAdminCredentials;