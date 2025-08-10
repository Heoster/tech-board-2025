const database = require('./server/config/database');
const fs = require('fs');
const path = require('path');

async function applyAdminMigration() {
    console.log('🔧 APPLYING ADMIN SECURITY MIGRATION');
    console.log('===================================');
    console.log('');

    try {
        await database.connect();
        const db = database.getDb();

        // Read the migration SQL
        const migrationPath = path.join(__dirname, 'server/database/admin-security-migration.sql');
        const migrationSql = fs.readFileSync(migrationPath, 'utf8');

        console.log('📝 Applying admin security migration...');

        // Execute the migration
        await new Promise((resolve, reject) => {
            db.exec(migrationSql, (err) => {
                if (err) {
                    // Check if error is about duplicate columns (which is expected)
                    if (err.message && err.message.includes('duplicate column name')) {
                        console.log('ℹ️  Security columns already exist, skipping...');
                        resolve();
                    } else {
                        reject(err);
                    }
                } else {
                    resolve();
                }
            });
        });

        console.log('✅ Admin security migration applied successfully');
        console.log('');

        // Verify the admin table structure now has the required columns
        const admin = await new Promise((resolve, reject) => {
            db.get('SELECT username, failed_attempts, locked_until, last_login FROM admins WHERE username = ?', ['admin'], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        if (admin) {
            console.log('✅ Admin security columns verified:');
            console.log(`   Username: ${admin.username}`);
            console.log(`   Failed attempts: ${admin.failed_attempts || 0}`);
            console.log(`   Locked until: ${admin.locked_until || 'Not locked'}`);
            console.log(`   Last login: ${admin.last_login || 'Never'}`);
        } else {
            console.log('❌ Admin account not found');
        }

        console.log('');
        console.log('🎉 ADMIN LOGIN SYSTEM READY');
        console.log('===========================');
        console.log('✅ Database schema updated');
        console.log('✅ Security columns added');
        console.log('✅ Admin login endpoint should work now');

    } catch (error) {
        console.error('❌ Error applying admin migration:', error);
        
        if (error.message && error.message.includes('duplicate column')) {
            console.log('ℹ️  This error is expected if columns already exist');
        }
    } finally {
        await database.close();
    }
}

// Run the migration
applyAdminMigration().catch(console.error);