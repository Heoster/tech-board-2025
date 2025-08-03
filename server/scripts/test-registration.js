require('dotenv').config();
const database = require('../config/database');
const authUtils = require('../utils/auth');

async function testRegistration() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('=== Testing Registration Logic ===');
        
        // Test data
        const testStudent = {
            name: 'Test Student 3',
            rollNumber: 3,
            grade: 8,
            section: 'A',
            password: 'test123'
        };

        console.log('Testing with data:', testStudent);

        // Check if student already exists
        const existingStudent = await new Promise((resolve, reject) => {
            db.get(
                'SELECT id FROM students WHERE roll_number = ? AND grade = ? AND section = ?',
                [testStudent.rollNumber, testStudent.grade, testStudent.section],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });

        if (existingStudent) {
            console.log('❌ Student already exists');
            return;
        }

        // Hash password
        const passwordHash = await authUtils.hashPassword(testStudent.password);
        console.log('✅ Password hashed successfully');

        // Try to insert student
        const studentId = await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO students (name, roll_number, grade, section, password_hash) VALUES (?, ?, ?, ?, ?)',
                [testStudent.name, testStudent.rollNumber, testStudent.grade, testStudent.section, passwordHash],
                function(err) {
                    if (err) {
                        console.log('❌ Insert failed:', err.message);
                        reject(err);
                    } else {
                        console.log('✅ Student inserted with ID:', this.lastID);
                        resolve(this.lastID);
                    }
                }
            );
        });

        // Generate token
        const token = authUtils.generateToken({
            id: studentId,
            rollNumber: testStudent.rollNumber,
            grade: testStudent.grade,
            section: testStudent.section,
            role: 'student'
        });
        console.log('✅ Token generated successfully');

        console.log('=== Registration test completed successfully ===');

    } catch (error) {
        console.error('❌ Registration test failed:', error.message);
    } finally {
        await database.close();
    }
}

testRegistration();