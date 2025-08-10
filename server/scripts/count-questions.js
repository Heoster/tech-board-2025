#!/usr/bin/env node

/**
 * Count Questions in Database
 * Simple script to count the total number of questions in the database
 */

const database = require('../config/database');

async function countQuestions() {
    console.log('🔍 Counting questions in database...');
    
    try {
        await database.connect();
        const db = database.getDb();
        
        // Count total questions
        const totalQuestions = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        // Count questions by grade
        const questionsByGrade = await new Promise((resolve, reject) => {
            db.all(`
                SELECT grade, COUNT(*) as count
                FROM questions
                GROUP BY grade
                ORDER BY grade
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        // Count questions by difficulty
        const questionsByDifficulty = await new Promise((resolve, reject) => {
            db.all(`
                SELECT difficulty, COUNT(*) as count
                FROM questions
                GROUP BY difficulty
                ORDER BY difficulty
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log('\n📊 DATABASE QUESTION COUNT SUMMARY');
        console.log('====================================');
        console.log(`📈 Total Questions: ${totalQuestions}`);
        
        console.log('\n📚 Questions by Grade:');
        questionsByGrade.forEach(row => {
            console.log(`   Grade ${row.grade}: ${row.count} questions`);
        });
        
        console.log('\n🎯 Questions by Difficulty:');
        questionsByDifficulty.forEach(row => {
            console.log(`   ${row.difficulty.charAt(0).toUpperCase() + row.difficulty.slice(1)}: ${row.count} questions`);
        });
        
        await database.close();
        console.log('\n✅ Database connection closed');
        
    } catch (error) {
        console.error('❌ Error counting questions:', error.message);
        process.exit(1);
    }
}

// Run the script if executed directly
if (require.main === module) {
    countQuestions();
}

module.exports = countQuestions;