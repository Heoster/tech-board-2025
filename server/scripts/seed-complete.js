require('dotenv').config();
const database = require('../config/database');
const authUtils = require('../utils/auth');

// Complete seeding script for all grades with comprehensive questions
async function seedComplete() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🚀 COMPLETE SEEDING: All grades with comprehensive questions');
        console.log('📊 Grades: 6, 7, 8, 9, 11');
        console.log('🎯 Target: 250+ questions each');
        console.log('');

        // Create default admin
        const adminUsername = process.env.ADMIN_USERNAME || 'admin';
        const adminPasswordPlain = process.env.ADMIN_PASSWORD || 'admin123';
        const adminPassword = await authUtils.hashPassword(adminPasswordPlain);
        
        await new Promise((resolve, reject) => {
            db.run(
                'INSERT OR IGNORE INTO admins (username, password_hash) VALUES (?, ?)',
                [adminUsername, adminPassword],
                function(err) {
                    if (err) reject(err);
                    else {
                        console.log(`✅ Default admin created: ${adminUsername}`);
                        resolve();
                    }
                }
            );
        });

        // Create sample student
        const existingStudent = await new Promise((resolve, reject) => {
            db.get(
                'SELECT id FROM students WHERE roll_number = ? AND grade = ? AND section = ?',
                [1, 8, 'A'],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });

        if (!existingStudent) {
            const studentPassword = await authUtils.hashPassword('student123');
            await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO students (name, roll_number, grade, section, password_hash) VALUES (?, ?, ?, ?, ?)',
                    ['John Doe', 1, 8, 'A', studentPassword],
                    function(err) {
                        if (err) reject(err);
                        else {
                            console.log('✅ Sample student created');
                            resolve();
                        }
                    }
                );
            });
        }

        // Seed all grades using the master seeding function
        const seedMaster250 = require('./seed-master-250');
        await seedMaster250();

        console.log('');
        console.log('✅ COMPLETE SEEDING FINISHED!');
        console.log(`🔑 Admin credentials: ${adminUsername} / ${adminPasswordPlain}`);
        console.log('👤 Sample student: Roll=1, Grade=8, Section=A, Password=student123');

    } catch (error) {
        console.error('❌ Error in complete seeding:', error);
    } finally {
        await database.close();
    }
}

// Run seeding if this file is executed directly
if (require.main === module) {
    seedComplete();
}

module.exports = seedComplete;