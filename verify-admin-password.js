const database = require('./server/config/database');
const authUtils = require('./server/utils/auth');

async function verifyAdminPassword() {
    console.log('🔍 VERIFYING ADMIN PASSWORD');
    console.log('============================');
    console.log('');

    try {
        await database.connect();
        const db = database.getDb();

        // Get admin from database
        const admin = await new Promise((resolve, reject) => {
            db.get('SELECT username, password_hash FROM admins WHERE username = "admin"', (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        if (!admin) {
            console.log('❌ No admin found with username "admin"');
            return;
        }

        console.log('✅ Found admin:', admin.username);
        console.log('   Password hash:', admin.password_hash);
        console.log('');

        // Test common passwords
        const testPasswords = ['admin123', 'admin', 'password', '123456', 'admin2024', 'techboard'];
        
        console.log('🔑 Testing passwords:');
        for (const testPassword of testPasswords) {
            try {
                const isValid = await authUtils.verifyPassword(testPassword, admin.password_hash);
                console.log(`   "${testPassword}": ${isValid ? '✅ VALID' : '❌ Invalid'}`);
                if (isValid) {
                    console.log('');
                    console.log('🎉 FOUND CORRECT PASSWORD!');
                    console.log(`   Username: admin`);
                    console.log(`   Password: ${testPassword}`);
                }
            } catch (error) {
                console.log(`   "${testPassword}": ❌ Error - ${error.message}`);
            }
        }

        await database.close();

    } catch (error) {
        console.error('❌ Error verifying admin password:', error);
    }
}

// Run the verification
verifyAdminPassword().catch(console.error);