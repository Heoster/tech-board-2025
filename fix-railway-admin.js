#!/usr/bin/env node

/**
 * Fix Railway Admin Account
 * Creates/fixes the admin account for Railway deployment
 */

const database = require('./server/config/database');
const authUtils = require('./server/utils/auth');

async function fixRailwayAdmin() {
    console.log('🔧 FIXING RAILWAY ADMIN ACCOUNT');
    console.log('===============================');
    console.log('');

    try {
        await database.connect();
        const db = database.getDb();

        // Check if admin table exists and has data
        console.log('📋 Checking admin table...');
        const adminCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM admins', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        console.log(`   Found ${adminCount} admin accounts`);

        if (adminCount === 0) {
            console.log('');
            console.log('👨‍💼 Creating admin account...');
            
            // Create admin account
            const adminUsername = 'admin';
            const adminPassword = 'TechBoard2025Admin!';
            const hashedPassword = await authUtils.hashPassword(adminPassword);

            await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO admins (username, password_hash, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)',
                    [adminUsername, hashedPassword],
                    function(err) {
                        if (err) reject(err);
                        else resolve(this.lastID);
                    }
                );
            });

            console.log('✅ Admin account created successfully');
            console.log(`   Username: ${adminUsername}`);
            console.log(`   Password: ${adminPassword}`);
        } else {
            console.log('');
            console.log('🔄 Resetting existing admin account...');
            
            // Reset admin account password and clear lockout
            const adminPassword = 'TechBoard2025Admin!';
            const hashedPassword = await authUtils.hashPassword(adminPassword);

            await new Promise((resolve, reject) => {
                db.run(
                    'UPDATE admins SET password_hash = ?, failed_attempts = 0, locked_until = NULL WHERE username = ?',
                    [hashedPassword, 'admin'],
                    function(err) {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });

            console.log('✅ Admin account reset successfully');
            console.log(`   Username: admin`);
            console.log(`   Password: ${adminPassword}`);
            console.log('   Lockout: Cleared');
        }

        // Verify admin account
        console.log('');
        console.log('🔍 Verifying admin account...');
        const admin = await new Promise((resolve, reject) => {
            db.get(
                'SELECT id, username, failed_attempts, locked_until FROM admins WHERE username = ?',
                ['admin'],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });

        if (admin) {
            console.log('✅ Admin account verified');
            console.log(`   ID: ${admin.id}`);
            console.log(`   Username: ${admin.username}`);
            console.log(`   Failed Attempts: ${admin.failed_attempts || 0}`);
            console.log(`   Locked Until: ${admin.locked_until || 'Not locked'}`);
        } else {
            console.log('❌ Admin account verification failed');
        }

        // Test password verification
        console.log('');
        console.log('🔐 Testing password verification...');
        const testPassword = 'TechBoard2025Admin!';
        const isValid = await authUtils.verifyPassword(testPassword, admin.password_hash);
        
        if (isValid) {
            console.log('✅ Password verification successful');
        } else {
            console.log('❌ Password verification failed');
        }

        // Log the fix
        await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO admin_logs (action, details, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)',
                ['RAILWAY_ADMIN_FIX', 'Fixed admin account for Railway deployment'],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                }
            );
        });

        await database.close();

        console.log('');
        console.log('🎉 RAILWAY ADMIN FIX COMPLETE!');
        console.log('==============================');
        console.log('✅ Admin account is ready');
        console.log('✅ Password reset and verified');
        console.log('✅ Lockout cleared');
        console.log('✅ Database updated');
        console.log('');
        console.log('🌐 Try logging in at:');
        console.log('   https://tech-board.up.railway.app/admin/login');
        console.log('');
        console.log('🔑 Credentials:');
        console.log('   Username: admin');
        console.log('   Password: TechBoard2025Admin!');

    } catch (error) {
        console.error('❌ Error fixing Railway admin:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    fixRailwayAdmin();
}

module.exports = { fixRailwayAdmin };