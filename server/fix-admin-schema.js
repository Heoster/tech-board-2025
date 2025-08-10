const database = require('./config/database');

async function fixAdminSchema() {
    console.log('🔧 FIXING ADMIN SCHEMA IN SERVER DATABASE');
    console.log('========================================');
    console.log('');

    try {
        await database.connect();
        const db = database.getDb();

        console.log('✅ Connected to server database');

        // First, check current schema
        const columns = await new Promise((resolve, reject) => {
            db.all("PRAGMA table_info(admins)", (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log('📋 Current admin table columns:');
        columns.forEach(col => {
            console.log(`   - ${col.name} (${col.type})`);
        });

        const hasFailedAttempts = columns.find(col => col.name === 'failed_attempts');
        const hasLockedUntil = columns.find(col => col.name === 'locked_until');
        const hasLastLogin = columns.find(col => col.name === 'last_login');

        if (hasFailedAttempts && hasLockedUntil && hasLastLogin) {
            console.log('✅ All security columns already exist');
        } else {
            console.log('🔨 Adding missing security columns...');

            // Add columns one by one
            const addColumns = [];
            
            if (!hasFailedAttempts) {
                addColumns.push('ALTER TABLE admins ADD COLUMN failed_attempts INTEGER DEFAULT 0');
            }
            if (!hasLockedUntil) {
                addColumns.push('ALTER TABLE admins ADD COLUMN locked_until TEXT DEFAULT NULL');
            }
            if (!hasLastLogin) {
                addColumns.push('ALTER TABLE admins ADD COLUMN last_login TEXT DEFAULT NULL');
            }

            for (let i = 0; i < addColumns.length; i++) {
                try {
                    await new Promise((resolve, reject) => {
                        db.run(addColumns[i], (err) => {
                            if (err) reject(err);
                            else resolve();
                        });
                    });
                    console.log(`✅ Added column ${i + 1}/${addColumns.length}`);
                } catch (err) {
                    console.log(`⚠️  Column ${i + 1}: ${err.message} (might already exist)`);
                }
            }
        }

        // Verify the final schema and test query
        const testAdmin = await new Promise((resolve, reject) => {
            db.get('SELECT id, username, password_hash, failed_attempts, locked_until, last_login FROM admins WHERE username = ?', ['admin'], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        if (testAdmin) {
            console.log('');
            console.log('✅ Test query successful!');
            console.log(`   Admin: ${testAdmin.username}`);
            console.log(`   Failed attempts: ${testAdmin.failed_attempts || 0}`);
            console.log(`   Locked until: ${testAdmin.locked_until || 'Not locked'}`);
            console.log(`   Last login: ${testAdmin.last_login || 'Never'}`);
            console.log('');
            console.log('🎉 ADMIN SCHEMA FIXED! Admin login should work now.');
        } else {
            console.log('❌ No admin user found');
        }

    } catch (error) {
        console.error('❌ Error fixing admin schema:', error);
    } finally {
        await database.close();
    }
}

// Run the fix
fixAdminSchema().catch(console.error);