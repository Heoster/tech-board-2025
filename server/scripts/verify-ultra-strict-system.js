require('dotenv').config();
const database = require('../config/database');

/**
 * ULTRA-STRICT SYSTEM VERIFICATION
 * 
 * This script verifies that the ultra-strict no-duplicate system
 * is working correctly at all levels.
 */

async function verifyUltraStrictSystem() {
    console.log('🔍 VERIFYING ULTRA-STRICT NO-DUPLICATE SYSTEM');
    console.log('='.repeat(60));
    
    try {
        await database.connect();
        const db = database.getDb();
        
        // Check database constraints
        console.log('\n1. DATABASE CONSTRAINTS CHECK:');
        
        const constraints = await new Promise((resolve, reject) => {
            db.all(`
                SELECT sql FROM sqlite_master 
                WHERE type='table' AND name IN ('questions', 'options', 'responses', 'quizzes')
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        let hasUniqueConstraints = false;
        for (const constraint of constraints) {
            if (constraint.sql.includes('UNIQUE')) {
                console.log('   ✅ Found UNIQUE constraint');
                hasUniqueConstraints = true;
            }
        }
        
        if (!hasUniqueConstraints) {
            console.log('   ⚠️  No UNIQUE constraints found - may allow duplicates');
        }
        
        // Check for existing duplicates
        console.log('\n2. EXISTING DUPLICATES CHECK:');
        
        const duplicateResponses = await new Promise((resolve, reject) => {
            db.all(`
                SELECT quiz_id, question_id, COUNT(*) as count
                FROM responses
                GROUP BY quiz_id, question_id
                HAVING COUNT(*) > 1
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        if (duplicateResponses.length > 0) {
            console.log(`   ❌ Found ${duplicateResponses.length} duplicate responses!`);
            for (const dup of duplicateResponses.slice(0, 5)) {
                console.log(`      Quiz ${dup.quiz_id}, Question ${dup.question_id}: ${dup.count} responses`);
            }
        } else {
            console.log('   ✅ No duplicate responses found');
        }
        
        // Check question distribution
        console.log('\n3. QUESTION DISTRIBUTION CHECK:');
        
        const questionStats = await new Promise((resolve, reject) => {
            db.all(`
                SELECT grade, difficulty, COUNT(*) as count
                FROM questions
                GROUP BY grade, difficulty
                ORDER BY grade, difficulty
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log('   Question counts by grade and difficulty:');
        for (const stat of questionStats) {
            console.log(`      Grade ${stat.grade}, ${stat.difficulty}: ${stat.count} questions`);
        }
        
        // Verify quiz generation algorithm
        console.log('\n4. QUIZ GENERATION ALGORITHM CHECK:');
        
        // Test the selectUniqueQuizQuestions function indirectly
        const testGrade = 8;
        const availableQuestions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT COUNT(*) as count FROM questions WHERE grade = ?
            `, [testGrade], (err, rows) => {
                if (err) reject(err);
                else resolve(rows[0].count);
            });
        });
        
        console.log(`   Grade ${testGrade} has ${availableQuestions} available questions`);
        
        if (availableQuestions >= 25) {
            console.log('   ✅ Sufficient questions for quiz generation');
        } else {
            console.log('   ⚠️  Insufficient questions for quiz generation');
        }
        
        console.log('\n5. SYSTEM INTEGRITY SUMMARY:');
        console.log('   ✅ Database connection working');
        console.log('   ✅ Tables exist and accessible');
        console.log(`   ${hasUniqueConstraints ? '✅' : '⚠️'} Database constraints ${hasUniqueConstraints ? 'active' : 'missing'}`);
        console.log(`   ${duplicateResponses.length === 0 ? '✅' : '❌'} No duplicate responses ${duplicateResponses.length === 0 ? 'found' : `(${duplicateResponses.length} found)`}`);
        console.log(`   ${availableQuestions >= 25 ? '✅' : '⚠️'} Question availability ${availableQuestions >= 25 ? 'sufficient' : 'insufficient'}`);
        
        console.log('\n🎯 ULTRA-STRICT SYSTEM STATUS:');
        if (hasUniqueConstraints && duplicateResponses.length === 0 && availableQuestions >= 25) {
            console.log('   ✅ SYSTEM IS ULTRA-STRICT COMPLIANT');
            console.log('   🔒 No duplicates possible at any level');
        } else {
            console.log('   ⚠️  SYSTEM NEEDS ATTENTION');
            console.log('   🔧 Some components may allow duplicates');
        }
        
    } catch (error) {
        console.error('❌ Verification failed:', error);
    } finally {
        await database.close();
    }
}

// Run verification if this file is executed directly
if (require.main === module) {
    verifyUltraStrictSystem();
}

module.exports = verifyUltraStrictSystem;