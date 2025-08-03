require('dotenv').config();
const database = require('../config/database');
const authUtils = require('../utils/auth');

async function cleanupDatabase() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('=== Cleaning up database ===');
        
        // Drop and recreate triggers to avoid conflicts
        await new Promise((resolve, reject) => {
            db.run('DROP TRIGGER IF EXISTS enforce_roll_number_rules_insert', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        await new Promise((resolve, reject) => {
            db.run('DROP TRIGGER IF EXISTS enforce_roll_number_rules_update', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        // Clean up invalid students
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM students', (err) => {
                if (err) reject(err);
                else {
                    console.log('Cleared all students');
                    resolve();
                }
            });
        });

        // Create a proper test student
        const studentPassword = await authUtils.hashPassword('student123');
        await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO students (name, roll_number, grade, section, password_hash) VALUES (?, ?, ?, ?, ?)',
                ['Test Student', 1, 8, 'A', studentPassword],
                function(err) {
                    if (err) reject(err);
                    else {
                        console.log('Created test student: roll=1, grade=8, section=A, password=student123');
                        resolve();
                    }
                }
            );
        });

        // Ensure admin exists
        const adminExists = await new Promise((resolve, reject) => {
            db.get('SELECT id FROM admins WHERE username = ?', ['admin'], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        if (!adminExists) {
            const adminPassword = await authUtils.hashPassword('admin123');
            await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO admins (username, password_hash) VALUES (?, ?)',
                    ['admin', adminPassword],
                    function(err) {
                        if (err) reject(err);
                        else {
                            console.log('Created admin: username=admin, password=admin123');
                            resolve();
                        }
                    }
                );
            });
        } else {
            console.log('Admin already exists');
        }

        console.log('=== Database cleanup completed ===');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await database.close();
    }
}

cleanupDatabase();