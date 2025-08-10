#!/usr/bin/env node

/**
 * Fix Quiz Constraints
 * Updates the database constraints to use flexible question counts
 */

const database = require('./server/config/database');
const fs = require('fs');

async function fixQuizConstraints() {
    console.log('🔧 FIXING QUIZ CONSTRAINTS');
    console.log('==========================');

    try {
        await database.connect();
        const db = database.getDb();

        console.log('1️⃣ Dropping old triggers...');
        
        // Drop the old trigger
        await new Promise((resolve, reject) => {
            db.run('DROP TRIGGER IF EXISTS validate_quiz_completion', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        console.log('✅ Old trigger dropped');

        console.log('2️⃣ Creating new flexible trigger...');

        // Create the new trigger with flexible question count
        const newTrigger = `
        CREATE TRIGGER IF NOT EXISTS validate_quiz_completion
        AFTER UPDATE ON quizzes
        WHEN NEW.status = 'completed'
        BEGIN
            -- Check if quiz has exactly the expected number of responses
            SELECT CASE 
                WHEN (SELECT COUNT(*) FROM responses WHERE quiz_id = NEW.id) != NEW.total_questions
                THEN RAISE(ABORT, 'Quiz must have expected number of responses')
            END;
            
            -- Check for duplicate questions in the quiz
            SELECT CASE 
                WHEN (SELECT COUNT(DISTINCT question_id) FROM responses WHERE quiz_id = NEW.id) != NEW.total_questions
                THEN RAISE(ABORT, 'Quiz contains duplicate questions')
            END;
        END;
        `;

        await new Promise((resolve, reject) => {
            db.run(newTrigger, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        console.log('✅ New flexible trigger created');

        console.log('3️⃣ Updating views...');

        // Drop and recreate the integrity check view
        await new Promise((resolve, reject) => {
            db.run('DROP VIEW IF EXISTS quiz_integrity_check', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        const newView = `
        CREATE VIEW IF NOT EXISTS quiz_integrity_check AS
        SELECT 
            q.id as quiz_id,
            q.student_id,
            q.grade,
            q.status,
            q.total_questions,
            COUNT(r.id) as total_responses,
            COUNT(DISTINCT r.question_id) as unique_questions,
            CASE 
                WHEN COUNT(r.id) != COUNT(DISTINCT r.question_id) THEN 'DUPLICATE_QUESTIONS'
                WHEN COUNT(r.id) != q.total_questions AND q.status = 'completed' THEN 'WRONG_QUESTION_COUNT'
                ELSE 'OK'
            END as integrity_status
        FROM quizzes q
        LEFT JOIN responses r ON q.id = r.quiz_id
        GROUP BY q.id, q.student_id, q.grade, q.status, q.total_questions;
        `;

        await new Promise((resolve, reject) => {
            db.run(newView, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        console.log('✅ Views updated');

        console.log('4️⃣ Testing the fix...');

        // Test with a sample quiz
        const testQuizId = await new Promise((resolve, reject) => {
            db.run(`
                INSERT INTO quizzes (student_id, grade, total_questions, status)
                VALUES (1, 9, 10, 'in_progress')
            `, function(err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });

        console.log(`✅ Test quiz created with ID: ${testQuizId}`);

        // Add 10 test responses
        for (let i = 1; i <= 10; i++) {
            await new Promise((resolve, reject) => {
                db.run(`
                    INSERT INTO responses (quiz_id, question_id, selected_option_id, is_correct)
                    VALUES (?, ?, ?, ?)
                `, [testQuizId, i, 1, false], (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        }

        console.log('✅ Added 10 test responses');

        // Try to complete the quiz
        await new Promise((resolve, reject) => {
            db.run(`
                UPDATE quizzes 
                SET status = 'completed', score = 5, end_time = CURRENT_TIMESTAMP
                WHERE id = ?
            `, [testQuizId], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        console.log('✅ Quiz completed successfully with 10 responses');

        // Clean up test data
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM responses WHERE quiz_id = ?', [testQuizId], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        await new Promise((resolve, reject) => {
            db.run('DELETE FROM quizzes WHERE id = ?', [testQuizId], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        console.log('✅ Test data cleaned up');

        console.log('5️⃣ Checking system integrity...');

        const integrityCheck = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM quiz_integrity_check WHERE integrity_status != "OK"', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        if (integrityCheck.length === 0) {
            console.log('✅ System integrity check passed');
        } else {
            console.log(`⚠️  Found ${integrityCheck.length} integrity issues:`);
            integrityCheck.forEach(issue => {
                console.log(`   Quiz ${issue.quiz_id}: ${issue.integrity_status}`);
            });
        }

        await database.close();

        console.log('');
        console.log('🎉 QUIZ CONSTRAINTS FIXED!');
        console.log('==========================');
        console.log('✅ Triggers now use flexible question counts');
        console.log('✅ Views updated to handle variable quiz sizes');
        console.log('✅ System tested with 10-question quiz');
        console.log('✅ Ready for production with any quiz size');

    } catch (error) {
        console.error('❌ Error fixing quiz constraints:', error);
        await database.close();
        process.exit(1);
    }
}

if (require.main === module) {
    fixQuizConstraints();
}

module.exports = { fixQuizConstraints };