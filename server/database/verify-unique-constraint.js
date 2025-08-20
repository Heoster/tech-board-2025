const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('✅ UNIQUE CONSTRAINT VERIFICATION');
console.log('=' .repeat(50));

async function testUniqueConstraint() {
    return new Promise((resolve) => {
        const testQuestion = {
            grade: 6,
            difficulty: 'basic',
            question_text: 'UNIQUE TEST: This question should only exist once in the database'
        };
        
        console.log('🧪 Testing unique constraint...');
        console.log('1. Inserting first test question...');
        
        // Insert first question
        db.run(
            'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
            [testQuestion.grade, testQuestion.difficulty, testQuestion.question_text],
            function(err) {
                if (err) {
                    console.error('❌ Failed to insert first question:', err);
                    resolve(false);
                    return;
                }
                
                const firstQuestionId = this.lastID;
                console.log(`✅ First question inserted successfully (ID: ${firstQuestionId})`);
                
                console.log('2. Attempting to insert duplicate question...');
                
                // Try to insert duplicate
                db.run(
                    'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                    [testQuestion.grade, testQuestion.difficulty, testQuestion.question_text],
                    function(duplicateErr) {
                        if (duplicateErr && duplicateErr.code === 'SQLITE_CONSTRAINT') {
                            console.log('✅ SUCCESS: Duplicate rejected by unique constraint!');
                            console.log(`   Constraint error: ${duplicateErr.message}`);
                            
                            // Clean up test question
                            db.run('DELETE FROM questions WHERE id = ?', [firstQuestionId], (cleanupErr) => {
                                if (!cleanupErr) {
                                    console.log('✅ Test question cleaned up');
                                }
                                resolve(true);
                            });
                        } else if (!duplicateErr) {
                            console.log('❌ FAILURE: Duplicate was allowed - constraint not working!');
                            
                            // Clean up both questions
                            db.run('DELETE FROM questions WHERE question_text = ?', [testQuestion.question_text], () => {
                                resolve(false);
                            });
                        } else {
                            console.error('❌ Unexpected error:', duplicateErr);
                            resolve(false);
                        }
                    }
                );
            }
        );
    });
}

async function showConstraintInfo() {
    return new Promise((resolve) => {
        console.log('\n📋 Database Schema Information:');
        
        db.get("SELECT sql FROM sqlite_master WHERE type='table' AND name='questions'", (err, row) => {
            if (err) {
                console.error('Error getting schema:', err);
                resolve();
                return;
            }
            
            console.log('Questions table schema:');
            console.log(row.sql);
            
            // Check for the unique constraint
            if (row.sql.includes('UNIQUE(grade, question_text, difficulty)')) {
                console.log('✅ Unique constraint found: UNIQUE(grade, question_text, difficulty)');
            } else {
                console.log('❌ Unique constraint not found in schema');
            }
            
            resolve();
        });
    });
}

async function showQuestionStats() {
    return new Promise((resolve) => {
        const query = `
            SELECT 
                grade,
                COUNT(*) as total_questions,
                COUNT(DISTINCT question_text) as unique_questions
            FROM questions 
            GROUP BY grade 
            ORDER BY grade
        `;
        
        db.all(query, (err, rows) => {
            if (err) {
                console.error('Error getting stats:', err);
                resolve();
                return;
            }
            
            console.log('\n📊 Current Question Statistics:');
            let totalQuestions = 0;
            let allUnique = true;
            
            rows.forEach(stat => {
                const isUnique = stat.total_questions === stat.unique_questions;
                const status = isUnique ? '✅' : '❌';
                console.log(`   ${status} Grade ${stat.grade}: ${stat.total_questions} total, ${stat.unique_questions} unique`);
                totalQuestions += stat.total_questions;
                if (!isUnique) allUnique = false;
            });
            
            console.log(`   📈 Total: ${totalQuestions} questions`);
            
            if (allUnique) {
                console.log('✅ All questions are unique within their grade/difficulty');
            } else {
                console.log('⚠️ Some duplicates may exist');
            }
            
            resolve();
        });
    });
}

async function runVerification() {
    try {
        await showConstraintInfo();
        await showQuestionStats();
        
        const constraintWorking = await testUniqueConstraint();
        
        console.log('\n' + '=' .repeat(50));
        console.log('🎯 FINAL RESULT:');
        
        if (constraintWorking) {
            console.log('✅ SUCCESS: Database unique constraint is ACTIVE and WORKING');
            console.log('🔒 Duplicate questions cannot be inserted');
            console.log('📋 Constraint: UNIQUE(grade, question_text, difficulty)');
            console.log('🛡️ Database integrity is protected');
        } else {
            console.log('❌ FAILURE: Unique constraint is not working properly');
        }
        
        console.log('=' .repeat(50));
        
    } catch (error) {
        console.error('❌ Verification failed:', error);
    } finally {
        db.close();
    }
}

runVerification();