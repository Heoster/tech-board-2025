#!/usr/bin/env node

/**
 * Direct Registration Test
 * Tests registration directly with the database
 */

const database = require('./server/config/database');
const authUtils = require('./server/utils/auth');

async function testDirectRegistration() {
    console.log('🧪 TESTING DIRECT REGISTRATION');
    console.log('==============================');
    console.log('');

    try {
        await database.connect();
        const db = database.getDb();

        // Test student data with roll number between 70-80
        const testStudents = [
            {
                name: 'Test Student 71',
                rollNumber: 71,
                grade: 8,
                section: 'A',
                password: 'test123'
            },
            {
                name: 'Test Student 72',
                rollNumber: 72,
                grade: 9,
                section: 'B',
                password: 'test456'
            },
            {
                name: 'Test Student 77',
                rollNumber: 77,
                grade: 7,
                section: 'A',
                password: 'test789'
            }
        ];

        for (const student of testStudents) {
            console.log(`📝 Testing registration for Roll ${student.rollNumber}...`);
            
            try {
                // Check if student already exists
                const existingStudent = await new Promise((resolve, reject) => {
                    db.get(
                        'SELECT id, name FROM students WHERE roll_number = ? AND grade = ? AND section = ?',
                        [student.rollNumber, student.grade, student.section],
                        (err, row) => {
                            if (err) reject(err);
                            else resolve(row);
                        }
                    );
                });

                if (existingStudent) {
                    console.log(`   ⚠️  Student already exists: ${existingStudent.name}`);
                    continue;
                }

                // Hash password
                const passwordHash = await authUtils.hashPassword(student.password);
                console.log(`   🔐 Password hashed successfully`);

                // Insert student
                const studentId = await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO students (name, roll_number, grade, section, password_hash) VALUES (?, ?, ?, ?, ?)',
                        [student.name, student.rollNumber, student.grade, student.section, passwordHash],
                        function(err) {
                            if (err) reject(err);
                            else resolve(this.lastID);
                        }
                    );
                });

                console.log(`   ✅ Student registered successfully with ID: ${studentId}`);

                // Verify the registration
                const verifyStudent = await new Promise((resolve, reject) => {
                    db.get(
                        'SELECT id, name, roll_number, grade, section FROM students WHERE id = ?',
                        [studentId],
                        (err, row) => {
                            if (err) reject(err);
                            else resolve(row);
                        }
                    );
                });

                console.log(`   📋 Verified: ${verifyStudent.name} - Roll ${verifyStudent.roll_number}, Grade ${verifyStudent.grade}, Section ${verifyStudent.section}`);

            } catch (error) {
                console.error(`   ❌ Registration failed for Roll ${student.rollNumber}:`, error.message);
            }

            console.log('');
        }

        // Show all students in the database
        console.log('👥 ALL REGISTERED STUDENTS:');
        console.log('──────────────────────────');
        
        const allStudents = await new Promise((resolve, reject) => {
            db.all(
                'SELECT id, name, roll_number, grade, section, created_at FROM students ORDER BY grade, roll_number',
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });

        if (allStudents.length === 0) {
            console.log('   📝 No students registered yet');
        } else {
            allStudents.forEach((student, index) => {
                console.log(`   ${index + 1}. ${student.name} - Roll ${student.roll_number}, Grade ${student.grade}, Section ${student.section}`);
                console.log(`      ID: ${student.id}, Created: ${student.created_at}`);
            });
        }

        console.log(`\n📊 Total Students: ${allStudents.length}`);

        await database.close();
        console.log('\n✅ Direct registration test complete!');

    } catch (error) {
        console.error('❌ Error in direct registration test:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    testDirectRegistration();
}

module.exports = { testDirectRegistration };