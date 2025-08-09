const authUtils = require('../utils/auth');
const database = require('../config/database');

async function updateAdminPassword() {
    console.log('🔐 UPDATING ADMIN PASSWORD TO "admin123"');
    console.log('=====================================');

    try {
        // Initialize database connection
        await database.connect();
        const db = database.getDb();

        // Hash the new password
        const newPassword = 'admin123';
        const hashedPassword = await authUtils.hashPassword(newPassword);

        console.log('✅ Password hashed successfully');

        // Check if admin exists
        const existingAdmin = await new Promise((resolve, reject) => {
            db.get('SELECT id, username FROM admins WHERE username = ?', ['admin'], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        if (existingAdmin) {
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
            const isValid = await authUtils.verifyPassword(newPassword, admin.password_hash);
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
                console.log('   • Password is securely hashed with bcrypt (12 rounds)');
                console.log('   • Failed attempt counter reset to 0');
                console.log('   • Account lockout cleared');
                console.log('   • Ready for immediate use');
                console.log('');
                console.log('🌐 Admin Login URL:');
                console.log('   • Local: http://localhost:3000/admin/login');
                console.log('   • Production: [your-domain]/admin/login');
            } else {
                console.log('❌ Password verification failed');
            }
        } else {
            console.log('❌ Admin account not found after update');
        }

    } catch (error) {
        console.error('❌ Error updating admin password:', error);
        
        // If database doesn't exist, provide instructions
        if (error.message && error.message.includes('SQLITE_CANTOPEN')) {
            console.log('');
            console.log('💡 DATABASE NOT FOUND - SETUP INSTRUCTIONS:');
            console.log('   1. Make sure the server has been started at least once');
            console.log('   2. Run: npm run dev (from server directory)');
            console.log('   3. Then run this script again');
        }
    } finally {
        console.log('');
        console.log('🔐 Admin password update completed');
    }
}

// Run the update
updateAdminPassword().catch(console.error);