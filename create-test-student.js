// Create a test student for debugging the 400 error

const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');

async function createTestStudent() {
    const dbPath = path.join(__dirname, 'server', 'database', 'mcq_system_fixed.db');
    const db = new sqlite3.Database(dbPath);
    
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash('password123', 10);
        
        // Create test student with correct schema
        const testStudent = {
            name: 'Test Student',
            roll_number: 79,
            grade: 6,
            section: 'A',
            password: hashedPassword
        };
        
        // Insert test student
        await new Promise((resolve, reject) => {
            db.run(
                'INSERT OR REPLACE INTO students (name, roll_number, grade, section, password) VALUES (?, ?, ?, ?, ?)',
                [testStudent.name, testStudent.roll_number, testStudent.grade, testStudent.section, testStudent.password],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        console.log('✅ Test student created with ID:', this.lastID);
                        resolve(this.lastID);
                    }
                }
            );
        });
        
        // Verify student exists
        const student = await new Promise((resolve, reject) => {
            db.get(
                'SELECT id, name, roll_number, grade, section FROM students WHERE roll_number = ?',
                [testStudent.roll_number],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });
        
        console.log('✅ Test student verified:', student);
        
        // Check if student has any existing quizzes
        const existingQuiz = await new Promise((resolve, reject) => {
            db.get(
                'SELECT id, status FROM quizzes WHERE student_id = ?',
                [student.id],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });
        
        if (existingQuiz) {
            console.log('⚠️ Student has existing quiz:', existingQuiz);
            
            // Delete existing quiz for testing
            await new Promise((resolve, reject) => {
                db.run('DELETE FROM quizzes WHERE student_id = ?', [student.id], (err) => {
                    if (err) reject(err);
                    else {
                        console.log('✅ Existing quiz deleted for testing');
                        resolve();
                    }
                });
            });
        } else {
            console.log('✅ No existing quiz found');
        }
        
        // Check question count for grade 6
        const questionCount = await new Promise((resolve, reject) => {
            db.get(
                'SELECT COUNT(*) as count FROM questions WHERE grade = ?',
                [6],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                }
            );
        });
        
        console.log(`✅ Questions available for grade 6: ${questionCount}`);
        
        if (questionCount < 50) {
            console.log('⚠️ Warning: Less than 50 questions available for grade 6');
        }
        
    } catch (error) {
        console.error('❌ Error creating test student:', error);
    } finally {
        db.close();
    }
}

if (require.main === module) {
    createTestStudent();
}

module.exports = { createTestStudent };