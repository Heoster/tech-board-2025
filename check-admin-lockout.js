const database = require('./server/config/database');

async function checkAdminLockout() {
    console.log('🔍 CHECKING ADMIN ACCOUNT LOCKOUT STATUS');
    console.log('=========================================');
    console.log('');

    try {
        await database.connect();
        const db = database.getDb();

        // Get full admin record with security fields
        const admin = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM admins WHERE username = "admin"', (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        if (!admin) {
            console.log('❌ No admin found with username "admin"');
            return;
        }

        console.log('✅ Admin Account Status:');
        console.log('   ID:', admin.id);
        console.log('   Username:', admin.username);
        console.log('   Failed Attempts:', admin.failed_attempts || 0);
        console.log('   Locked Until:', admin.locked_until || 'Not locked');
        console.log('   Last Login:', admin.last_login || 'Never');
        console.log('   Created At:', admin.created_at);
        console.log('');

        // Check if currently locked
        if (admin.locked_until) {
            const lockedUntilMs = Date.parse(admin.locked_until);
            const now = Date.now();
            
            if (!Number.isNaN(lockedUntilMs)) {
                if (lockedUntilMs > now) {
                    const remainingMinutes = Math.ceil((lockedUntilMs - now) / (1000 * 60));
                    console.log('🚨 ACCOUNT IS CURRENTLY LOCKED!');
                    console.log(`   Locked until: ${admin.locked_until}`);
                    console.log(`   Time remaining: ${remainingMinutes} minutes`);
                    console.log('');
                    
                    // Clear the lockout
                    console.log('🔓 Clearing account lockout...');
                    await new Promise((resolve, reject) => {
                        db.run(
                            'UPDATE admins SET failed_attempts = 0, locked_until = NULL WHERE username = "admin"',
                            function(err) {
                                if (err) reject(err);
                                else resolve();
                            }
                        );
                    });
                    console.log('✅ Account lockout cleared!');
                } else {
                    console.log('ℹ️  Account was locked but lockout has expired');
                    console.log('   Clearing expired lockout...');
                    await new Promise((resolve, reject) => {
                        db.run(
                            'UPDATE admins SET failed_attempts = 0, locked_until = NULL WHERE username = "admin"',
                            function(err) {
                                if (err) reject(err);
                                else resolve();
                            }
                        );
                    });
                    console.log('✅ Expired lockout cleared!');
                }
            }
        } else {
            console.log('✅ Account is not locked');
            
            // Reset failed attempts just in case
            if (admin.failed_attempts > 0) {
                console.log('🔄 Resetting failed attempts...');
                await new Promise((resolve, reject) => {
                    db.run(
                        'UPDATE admins SET failed_attempts = 0 WHERE username = "admin"',
                        function(err) {
                            if (err) reject(err);
                            else resolve();
                        }
                    );
                });
                console.log('✅ Failed attempts reset to 0');
            }
        }

        console.log('');
        console.log('🎉 ADMIN LOGIN READY!');
        console.log('   Username: admin');
        console.log('   Password: admin123');
        console.log('   Status: Unlocked and ready');

        await database.close();

    } catch (error) {
        console.error('❌ Error checking admin lockout:', error);
    }
}

// Run the check
checkAdminLockout().catch(console.error);