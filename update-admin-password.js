const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

async function updateAdminPassword() {
    console.log('🔐 UPDATING ADMIN PASSWORD TO "admin123"');
    console.log('=====================================');

    const dbPath = path.join(__dirname, 'server', 'database', 'quiz.db');
    const db = new sqlite3.Database(dbPath);

    try {
        // Hash the new password
        const newPassword = 'admin123';
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        console.log('✅ Password hashed successfully');

        // Check if admin table exists and has data
        const adminExists = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM admins', (err, row) => {
                if (err) {
                    console.log('⚠️  Admin table might not exist, will create it');
                    resolve(false);
                } else {
                    resolve(row.count > 0);
                }
            });
        });

        if (adminExists) {
            // Update existing admin password
            await new Promise((resolve, reject) => {
                db.run(
                    'UPDATE admins SET password_hash = ?, failed_attempts = 0, locked_until = NULL WHERE username = ?',
                    [hashedPassword, 'admin'],
                    function(err) {
                        if (err) reject(err);
                        else resolve(this.changes);
                    }
                );
            });
            console.log('✅ Updated existing admin password');
        } else {
            // Create new admin account
            await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO admins (username, password_hash, failed_attempts, locked_until) VALUES (?, ?, 0, NULL)',
                    ['admin', hashedPassword],
                    function(err) {
                        if (err) reject(err);
                        else resolve(this.lastID);
                    }
                );
            });
            console.log('✅ Created new admin account');
        }

        // Verify the update
        const admin = await new Promise((resolve, reject) => {
            db.get('SELECT username, password_hash FROM admins WHERE username = ?', ['admin'], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        if (admin) {
            // Test the password
            const isValid = await bcrypt.compare(newPassword, admin.password_hash);
            if (isValid) {
                console.log('✅ Password verification successful');
                console.log('');
                console.log('🎉 ADMIN PASSWORD UPDATED SUCCESSFULLY!');
                console.log('');
                console.log('📋 LOGIN CREDENTIALS:');
                console.log('   Username: admin');
                console.log('   Password: admin123');
                console.log('');
                console.log('🔒 Security Features:');
                console.log('   • Password is securely hashed with bcrypt');
                console.log('   • Failed attempt counter reset to 0');
                console.log('   • Account lockout cleared');
                console.log('   • Ready for immediate use');
            } else {
                console.log('❌ Password verification failed');
            }
        } else {
            console.log('❌ Admin account not found after update');
        }

    } catch (error) {
        console.error('❌ Error updating admin password:', error);
    } finally {
        db.close();
        console.log('');
        console.log('🔐 Admin password update completed');
    }
}

// Run the update
updateAdminPassword().catch(console.error);