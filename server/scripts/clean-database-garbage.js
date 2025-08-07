require('dotenv').config();
const database = require('../config/database');
const authUtils = require('../utils/auth');

/**
 * CLEAN DATABASE GARBAGE SCRIPT
 * 
 * This script completely removes all garbage auto-generated questions
 * and replaces them with professional, meaningful questions.
 */

async function cleanDatabaseGarbage() {
    console.log('🔥 CLEANING DATABASE OF GARBAGE QUESTIONS');
    console.log('='.repeat(60));
    
    try {
        await database.connect();
        const db = database.getDb();
        
        // Step 1: Identify garbage questions
        console.log('\n1. IDENTIFYING GARBAGE QUESTIONS...');
        
        const garbageQuestions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT id, question_text, grade
                FROM questions
                WHERE question_text LIKE '%Grade %'
                   OR question_text LIKE '%Basic Question%'
                   OR question_text LIKE '%Medium Question%'
                   OR question_text LIKE '%Advanced Question%'
                   OR question_text LIKE '%fundamental concept%'
                   OR question_text LIKE '%intermediate concept%'
                   OR question_text LIKE '%advanced concept%'
                   OR question_text LIKE '%Question %:%'
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log(`   Found ${garbageQuestions.length} garbage questions to remove`);
        
        if (garbageQuestions.length > 0) {
            console.log('   Sample garbage questions:');
            for (let i = 0; i < Math.min(3, garbageQuestions.length); i++) {
                const q = garbageQuestions[i];
                console.log(`      "${q.question_text.substring(0, 80)}..."`);
            }
        }
        
        // Step 2: Check garbage options
        console.log('\n2. IDENTIFYING GARBAGE OPTIONS...');
        
        const garbageOptions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT o.id, o.option_text, q.question_text
                FROM options o
                JOIN questions q ON o.question_id = q.id
                WHERE o.option_text LIKE '%- Option %'
                   OR o.option_text LIKE '%- Correct %'
                   OR o.option_text LIKE '%Basics - %'
                   OR o.option_text LIKE '%Programming - %'
                   OR o.option_text LIKE '%Database - %'
                LIMIT 10
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log(`   Found ${garbageOptions.length} garbage options`);
        
        if (garbageOptions.length > 0) {
            console.log('   Sample garbage options:');
            for (let i = 0; i < Math.min(3, garbageOptions.length); i++) {
                const o = garbageOptions[i];
                console.log(`      "${o.option_text}"`);
            }
        }
        
        // Step 3: Complete database cleanup
        console.log('\n3. PERFORMING COMPLETE DATABASE CLEANUP...');
        
        // Delete all responses first (foreign key constraint)
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM responses', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        console.log('   ✅ Cleared all quiz responses');
        
        // Delete all quizzes
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM quizzes', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        console.log('   ✅ Cleared all quizzes');
        
        // Delete all options
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM options', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        console.log('   ✅ Cleared all question options');
        
        // Delete all questions
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM questions', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        console.log('   ✅ Cleared all questions');
        
        console.log('\n🎉 DATABASE COMPLETELY CLEANED!');
        console.log('   All garbage questions and options removed');
        
    } catch (error) {
        console.error('❌ Error cleaning database:', error);
    } finally {
        await database.close();
    }
}

// Run cleanup if this file is executed directly
if (require.main === module) {
    cleanDatabaseGarbage();
}

module.exports = cleanDatabaseGarbage;