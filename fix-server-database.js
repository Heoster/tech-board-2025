const sqlite3 = require('sqlite3').verbose();
const path = require('path');

async function fixServerDatabase() {
    console.log('🔧 FIXING SERVER DATABASE SCHEMA');
    console.log('=================================');
    console.log('');

    // Use the same path as the server config
    const dbPath = path.join(__dirname, 'server', 'database', 'mcq_system.db');
    console.log('Database path:', dbPath);

    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Error opening database:', err);
                reject(err);
                return;
            }

            console.log('✅ Connected to server database');

            // First, check current schema
            db.all("PRAGMA table_info(admins)", (err, columns) => {
                if (err) {
                    console.error('Error checking schema:', err);
                    db.close();
                    reject(err);
                    return;
                }

                console.log('📋 Current admin table columns:');
                columns.forEach(col => {
                    console.log(`   - ${col.name} (${col.type})`);
                });

                const hasFailedAttempts = columns.find(col => col.name === 'failed_attempts');
                const hasLockedUntil = columns.find(col => col.name === 'locked_until');
                const hasLastLogin = columns.find(col => col.name === 'last_login');

                if (hasFailedAttempts && hasLockedUntil && hasLastLogin) {
                    console.log('✅ All security columns already exist');
                    db.close();
                    resolve();
                    return;
                }

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

                let completed = 0;
                const total = addColumns.length;

                if (total === 0) {
                    console.log('✅ All columns exist');
                    db.close();
                    resolve();
                    return;
                }

                addColumns.forEach((sql, index) => {
                    db.run(sql, (err) => {
                        if (err) {
                            console.log(`⚠️  Column ${index + 1}: ${err.message} (might already exist)`);
                        } else {
                            console.log(`✅ Added column ${index + 1}/${total}`);
                        }
                        
                        completed++;
                        if (completed === total) {
                            // Verify the final schema
                            db.all("PRAGMA table_info(admins)", (err, newColumns) => {
                                if (err) {
                                    console.error('Error verifying schema:', err);
                                } else {
                                    console.log('');
                                    console.log('✅ Updated admin table columns:');
                                    newColumns.forEach(col => {
                                        console.log(`   - ${col.name} (${col.type})`);
                                    });
                                }

                                // Test a query to make sure it works
                                db.get('SELECT id, username, password_hash, failed_attempts, locked_until, last_login FROM admins WHERE username = ?', ['admin'], (err, row) => {
                                    if (err) {
                                        console.error('❌ Test query failed:', err.message);
                                        reject(err);
                                    } else if (row) {
                                        console.log('');
                                        console.log('✅ Test query successful!');
                                        console.log(`   Admin: ${row.username}`);
                                        console.log(`   Failed attempts: ${row.failed_attempts || 0}`);
                                        console.log(`   Locked until: ${row.locked_until || 'Not locked'}`);
                                        console.log(`   Last login: ${row.last_login || 'Never'}`);
                                        console.log('');
                                        console.log('🎉 DATABASE FIXED! Admin login should work now.');
                                        resolve();
                                    } else {
                                        console.log('❌ No admin user found');
                                        reject(new Error('No admin user found'));
                                    }

                                    db.close();
                                });
                            });
                        }
                    });
                });
            });
        });
    });
}

// Run the fix
fixServerDatabase().catch(console.error);