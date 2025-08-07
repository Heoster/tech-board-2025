require('dotenv').config();
const database = require('../config/database');
const bcrypt = require('bcrypt');

// Admin credentials for TECH BOARD 2025
const adminCredentials = [
    {
        username: 'admin',
        password: 'TechBoard2025!',
        description: 'Main administrator account'
    },
    {
        username: 'techboard',
        password: 'Admin@2025',
        description: 'TECH BOARD specific admin account'
    },
    {
        username: 'supervisor',
        password: 'Supervisor123!',
        description: 'Supervisor account for monitoring'
    }
];

async function createAdminCredentials() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🔐 CREATING ADMIN CREDENTIALS');
        console.log('============================');
        console.log('');

        // Clear existing admin accounts
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM admins', (err) => {
                if (err && !err.message.includes('no such table')) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        console.log('🗑️  Cleared existing admin accounts');

        let createdCount = 0;

        // Create new admin accounts
        for (const admin of adminCredentials) {
            try {
                // Hash the password
                const saltRounds = 10;
                const passwordHash = await bcrypt.hash(admin.password, saltRounds);

                // Insert admin account
                await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO admins (username, password_hash) VALUES (?, ?)',
                        [admin.username, passwordHash],
                        function(err) {
                            if (err) reject(err);
                            else resolve(this.lastID);
                        }
                    );
                });

                console.log(`✅ Created admin: ${admin.username}`);
                console.log(`   Description: ${admin.description}`);
                console.log(`   Password: ${admin.password}`);
                console.log('');
                createdCount++;

            } catch (error) {
                console.log(`❌ Failed to create admin ${admin.username}: ${error.message}`);
            }
        }

        // Verify admin accounts
        const adminCount = await new Promise((resolve) => {
            db.get('SELECT COUNT(*) as count FROM admins', (err, row) => {
                resolve(row ? row.count : 0);
            });
        });

        console.log('📊 ADMIN CREDENTIALS SUMMARY:');
        console.log('============================');
        console.log(`✅ Total Admin Accounts: ${adminCount}`);
        console.log(`✅ Successfully Created: ${createdCount}`);
        console.log('');

        console.log('🔑 LOGIN CREDENTIALS:');
        console.log('=====================');
        adminCredentials.forEach((admin, index) => {
            console.log(`${index + 1}. Username: ${admin.username}`);
            console.log(`   Password: ${admin.password}`);
            console.log(`   Purpose: ${admin.description}`);
            console.log('');
        });

        console.log('🎯 ADMIN ACCESS READY:');
        console.log('======================');
        console.log('✅ Admin accounts created successfully');
        console.log('✅ Passwords are securely hashed');
        console.log('✅ Ready for TECH BOARD 2025 administration');
        console.log('✅ Access via: https://tech-board.up.railway.app/admin');

    } catch (error) {
        console.error('❌ Error creating admin credentials:', error);
    } finally {
        await database.close();
    }
}

if (require.main === module) {
    createAdminCredentials();
}

module.exports = createAdminCredentials;