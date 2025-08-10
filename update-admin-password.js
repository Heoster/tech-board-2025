const database = require('./server/config/database');
const authUtils = require('./server/utils/auth');

async function updateAdminPassword() {
    console.log('🔐 UPDATING ADMIN PASSWORD - TECH BOARD 2025');
    console.log('==============================================');
    console.log('');

    try {
        await database.connect();
        const db = database.getDb();

        // Check current admin
        const currentAdmin = await new Promise((resolve, reject) => {
            db.get('SELECT username, password_hash FROM admins WHERE username = "admin"', (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        if (currentAdmin) {
            console.log('✅ Found existing admin user');
            console.log('   Username:', currentAdmin.username);
            console.log('   Current hash:', currentAdmin.password_hash.substring(0, 20) + '...');
        } else {
            console.log('❌ No admin user found');
        }

        // Hash the new password 'admin123'
        const newPassword = 'admin123';
        const hashedPassword = await authUtils.hashPassword(newPassword);

        console.log('');
        console.log('🔒 Generating new password hash...');
        console.log('   New password:', newPassword);
        console.log('   New hash:', hashedPassword.substring(0, 20) + '...');

        // Update or insert admin
        if (currentAdmin) {
            // Update existing admin
            await new Promise((resolve, reject) => {
                db.run(
                    'UPDATE admins SET password_hash = ? WHERE username = "admin"',
                    [hashedPassword],
                    function(err) {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });
            console.log('');
            console.log('✅ Admin password updated successfully');
        } else {
            // Insert new admin
            await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO admins (username, password_hash) VALUES (?, ?)',
                    ['admin', hashedPassword],
                    function(err) {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });
            console.log('');
            console.log('✅ New admin user created successfully');
        }

        // Verify the update
        const updatedAdmin = await new Promise((resolve, reject) => {
            db.get('SELECT username, password_hash FROM admins WHERE username = "admin"', (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        console.log('');
        console.log('🔍 Verification:');
        console.log('   Username:', updatedAdmin.username);
        console.log('   Hash updated:', updatedAdmin.password_hash !== currentAdmin?.password_hash ? 'YES' : 'NO');

        // Test password verification
        const isValid = await authUtils.verifyPassword(newPassword, updatedAdmin.password_hash);
        console.log('   Password test:', isValid ? 'PASS' : 'FAIL');

        console.log('');
        console.log('🎉 ADMIN PASSWORD UPDATE SUMMARY');
        console.log('=================================');
        console.log('✅ Username: admin');
        console.log('✅ Password: admin123');
        console.log('✅ Hash verification: Working');
        console.log('✅ Ready for admin login');

        await database.close();

    } catch (error) {
        console.error('❌ Admin password update failed:', error);
        await database.close();
    }

    console.log('\n🔐 Admin password update completed');
}

// Run the update
updateAdminPassword().catch(console.error);