#!/usr/bin/env node

/**
 * Reset Admin Account Lockout
 * Removes access blocks and resets failed login attempts
 */

const database = require('./server/config/database');

async function resetAdminLockout() {
    console.log('🔓 RESETTING ADMIN ACCOUNT LOCKOUT');
    console.log('==================================');
    console.log('');

    try {
        await database.connect();
        const db = database.getDb();

        // Check current admin status
        console.log('📋 Checking current admin account status...');
        const adminAccounts = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    id,
                    username,
                    failed_attempts,
                    locked_until,
                    last_login
                FROM admins
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        if (adminAccounts.length === 0) {
            console.log('❌ No admin accounts found in database');
            await database.close();
            return;
        }

        console.log('Current admin account status:');
        adminAccounts.forEach(admin => {
            console.log(`   👤 ${admin.username}:`);
            console.log(`      Failed Attempts: ${admin.failed_attempts || 0}`);
            console.log(`      Locked Until: ${admin.locked_until || 'Not locked'}`);
            console.log(`      Last Login: ${admin.last_login || 'Never'}`);
        });

        // Reset all admin accounts
        console.log('');
        console.log('🔄 Resetting admin account lockouts...');
        
        const resetResult = await new Promise((resolve, reject) => {
            db.run(`
                UPDATE admins 
                SET 
                    failed_attempts = 0,
                    locked_until = NULL
                WHERE failed_attempts > 0 OR locked_until IS NOT NULL
            `, (err) => {
                if (err) reject(err);
                else resolve(this.changes);
            });
        });

        console.log(`✅ Reset ${resetResult} admin account(s)`);

        // Verify the reset
        console.log('');
        console.log('🔍 Verifying reset...');
        const verifyAccounts = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    id,
                    username,
                    failed_attempts,
                    locked_until
                FROM admins
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log('Updated admin account status:');
        verifyAccounts.forEach(admin => {
            console.log(`   👤 ${admin.username}:`);
            console.log(`      Failed Attempts: ${admin.failed_attempts || 0}`);
            console.log(`      Locked Until: ${admin.locked_until || 'Not locked'}`);
            
            if ((admin.failed_attempts || 0) === 0 && !admin.locked_until) {
                console.log(`      Status: ✅ UNLOCKED - Ready for login`);
            } else {
                console.log(`      Status: ⚠️  Still has restrictions`);
            }
        });

        // Log the reset action
        console.log('');
        console.log('📝 Logging reset action...');
        await new Promise((resolve, reject) => {
            db.run(`
                INSERT INTO admin_logs (action, details, created_at) 
                VALUES (?, ?, CURRENT_TIMESTAMP)
            `, [
                'ADMIN_LOCKOUT_RESET',
                `Reset failed login attempts and removed access blocks for ${resetResult} admin account(s)`
            ], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        console.log('✅ Reset action logged successfully');

        await database.close();
        console.log('');
        console.log('🎉 ADMIN LOCKOUT RESET COMPLETE!');
        console.log('================================');
        console.log('✅ All admin accounts are now unlocked');
        console.log('✅ Failed login attempts reset to 0');
        console.log('✅ Access blocks removed');
        console.log('✅ Admin can now login immediately');

        process.exit(0);

    } catch (error) {
        console.error('❌ Error resetting admin lockout:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    resetAdminLockout();
}

module.exports = { resetAdminLockout };