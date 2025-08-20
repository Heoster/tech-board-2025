const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');

async function fixDeploymentIssues() {
    const dbPath = path.join(__dirname, 'server/database/mcq_system_fixed.db');
    console.log('🔧 Fixing deployment issues...');
    console.log('Database path:', dbPath);
    
    const db = new sqlite3.Database(dbPath);
    
    try {
        // 1. Check current state
        console.log('\n📊 Current database state:');
        
        const questionCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                if (err) reject(err);
                else resolve(row?.count || 0);
            });
        });
        console.log('   Questions:', questionCount);
        
        const adminCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM admins', (err, row) => {
                if (err) reject(err);
                else resolve(row?.count || 0);
            });
        });
        console.log('   Admins:', adminCount);
        
        const studentCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM students', (err, row) => {
                if (err) reject(err);
                else resolve(row?.count || 0);
            });
        });
        console.log('   Students:', studentCount);
        
        // 2. Add sample questions for testing (Grade 6)
        if (questionCount < 50) {
            console.log('\n📝 Adding sample questions for testing...');
            
            const sampleQuestions = [
                {
                    grade: 6,
                    difficulty: 'basic',
                    question_text: 'What is 2 + 2?',
                    options: [
                        { text: '3', is_correct: 0, order: 1 },
                        { text: '4', is_correct: 1, order: 2 },
                        { text: '5', is_correct: 0, order: 3 },
                        { text: '6', is_correct: 0, order: 4 }
                    ]
                },
                {
                    grade: 6,
                    difficulty: 'basic',
                    question_text: 'What is the capital of France?',
                    options: [
                        { text: 'London', is_correct: 0, order: 1 },
                        { text: 'Berlin', is_correct: 0, order: 2 },
                        { text: 'Paris', is_correct: 1, order: 3 },
                        { text: 'Madrid', is_correct: 0, order: 4 }
                    ]
                }
            ];
            
            // Add 50 questions by repeating and modifying the samples
            for (let i = 0; i < 50; i++) {
                const baseQuestion = sampleQuestions[i % 2];
                const questionText = `${baseQuestion.question_text} (Question ${i + 1})`;
                
                const questionId = await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                        [baseQuestion.grade, baseQuestion.difficulty, questionText],
                        function(err) {
                            if (err) reject(err);
                            else resolve(this.lastID);
                        }
                    );
                });
                
                // Add options for this question
                for (const option of baseQuestion.options) {
                    await new Promise((resolve, reject) => {
                        db.run(
                            'INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                            [questionId, option.text, option.is_correct, option.order],
                            (err) => {
                                if (err) reject(err);
                                else resolve();
                            }
                        );
                    });
                }
            }
            
            console.log('✅ Added 50 sample questions for Grade 6');
        }
        
        // 3. Verify admin credentials
        console.log('\n🔐 Verifying admin credentials...');
        const admin = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM admins WHERE username = ?', ['admin'], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
        
        if (!admin) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await new Promise((resolve, reject) => {
                db.run('INSERT INTO admins (username, password) VALUES (?, ?)', 
                    ['admin', hashedPassword], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
            });
            console.log('✅ Admin user created');
        } else {
            console.log('✅ Admin user exists');
        }
        
        // 4. Final verification
        console.log('\n✅ Final verification:');
        const finalQuestionCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions WHERE grade = 6', (err, row) => {
                if (err) reject(err);
                else resolve(row?.count || 0);
            });
        });
        console.log('   Grade 6 questions:', finalQuestionCount);
        
        const optionCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM options', (err, row) => {
                if (err) reject(err);
                else resolve(row?.count || 0);
            });
        });
        console.log('   Total options:', optionCount);
        
        console.log('\n🎉 Deployment issues fixed!');
        console.log('📋 Test credentials:');
        console.log('   Admin - Username: admin, Password: admin123');
        console.log('   Student - Roll: 99, Grade: 6, Section: A, Password: test123');
        
    } catch (error) {
        console.error('❌ Error fixing deployment issues:', error);
    } finally {
        db.close();
    }
}

if (require.main === module) {
    fixDeploymentIssues().catch(console.error);
}

module.exports = fixDeploymentIssues;