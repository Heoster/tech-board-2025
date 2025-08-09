#!/usr/bin/env node

/**
 * Verify No Duplicate Questions
 * Final verification that all duplicate questions have been removed
 */

const database = require('./server/config/database');

async function verifyNoDuplicates() {
    console.log('🔍 VERIFYING NO DUPLICATE QUESTIONS REMAIN');
    console.log('==========================================');
    console.log('');

    try {
        await database.connect();
        const db = database.getDb();

        // Check for exact duplicate questions (same text, grade, difficulty)
        console.log('📋 Checking for exact duplicate questions...');
        const exactDuplicates = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    question_text,
                    grade,
                    difficulty,
                    COUNT(*) as duplicate_count,
                    GROUP_CONCAT(id) as question_ids
                FROM questions 
                GROUP BY LOWER(TRIM(question_text)), grade, difficulty
                HAVING COUNT(*) > 1
                ORDER BY duplicate_count DESC
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        if (exactDuplicates.length === 0) {
            console.log('✅ PASS: No exact duplicate questions found');
        } else {
            console.log(`❌ FAIL: Found ${exactDuplicates.length} sets of exact duplicates:`);
            exactDuplicates.forEach(dup => {
                console.log(`   - Grade ${dup.grade} (${dup.difficulty}): "${dup.question_text.substring(0, 60)}..." (${dup.duplicate_count} copies)`);
            });
        }

        // Check for similar questions (same text but different grade/difficulty)
        console.log('');
        console.log('📋 Checking for similar questions across grades...');
        const similarQuestions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    question_text,
                    COUNT(*) as occurrence_count,
                    GROUP_CONCAT(DISTINCT grade || '-' || difficulty) as grade_difficulty_combinations,
                    GROUP_CONCAT(id) as question_ids
                FROM questions 
                GROUP BY LOWER(TRIM(question_text))
                HAVING COUNT(*) > 1
                ORDER BY occurrence_count DESC
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        if (similarQuestions.length === 0) {
            console.log('✅ INFO: No similar questions found across different grades/difficulties');
        } else {
            console.log(`📊 INFO: Found ${similarQuestions.length} questions that appear in multiple grades/difficulties:`);
            similarQuestions.forEach(sim => {
                console.log(`   - "${sim.question_text.substring(0, 60)}..." appears ${sim.occurrence_count} times`);
                console.log(`     Grades/Difficulties: ${sim.grade_difficulty_combinations}`);
            });
        }

        // Check database statistics
        console.log('');
        console.log('📊 Database Statistics:');
        console.log('─────────────────────');

        const totalQuestions = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        const questionsWithOptions = await new Promise((resolve, reject) => {
            db.get(`
                SELECT COUNT(DISTINCT question_id) as count 
                FROM options
            `, (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        const questionsWithoutOptions = totalQuestions - questionsWithOptions;

        console.log(`   📊 Total Questions: ${totalQuestions}`);
        console.log(`   ✅ Questions with Options: ${questionsWithOptions}`);
        console.log(`   ⚠️  Questions without Options: ${questionsWithoutOptions}`);

        // Grade distribution
        const gradeDistribution = await new Promise((resolve, reject) => {
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

        console.log('');
        console.log('📈 Grade Distribution:');
        gradeDistribution.forEach(grade => {
            console.log(`   Grade ${grade.grade}: ${grade.count} questions`);
        });

        // Final verdict
        console.log('');
        console.log('🎯 FINAL VERIFICATION RESULT:');
        console.log('────────────────────────────');

        const isClean = exactDuplicates.length === 0;
        const hasEnoughQuestions = totalQuestions >= 125; // 25 per grade minimum
        const hasGoodCoverage = gradeDistribution.length >= 5;

        if (isClean) {
            console.log('✅ DUPLICATE CHECK: PASSED - No duplicate questions found');
        } else {
            console.log('❌ DUPLICATE CHECK: FAILED - Duplicates still exist');
        }

        if (hasEnoughQuestions) {
            console.log('✅ QUANTITY CHECK: PASSED - Sufficient questions for quiz generation');
        } else {
            console.log('❌ QUANTITY CHECK: FAILED - Not enough questions');
        }

        if (hasGoodCoverage) {
            console.log('✅ COVERAGE CHECK: PASSED - All grades have questions');
        } else {
            console.log('❌ COVERAGE CHECK: FAILED - Missing questions for some grades');
        }

        console.log('');
        if (isClean && hasEnoughQuestions && hasGoodCoverage) {
            console.log('🎉 OVERALL STATUS: ✅ DATABASE IS CLEAN AND READY');
            console.log('   • No duplicate questions remain');
            console.log('   • Sufficient questions for quiz generation');
            console.log('   • All grades are covered');
        } else {
            console.log('⚠️  OVERALL STATUS: ❌ DATABASE NEEDS ATTENTION');
            if (!isClean) console.log('   • Duplicate questions still exist');
            if (!hasEnoughQuestions) console.log('   • Need more questions');
            if (!hasGoodCoverage) console.log('   • Some grades missing questions');
        }

        await database.close();
        process.exit(0);

    } catch (error) {
        console.error('❌ Error verifying duplicates:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    verifyNoDuplicates();
}

module.exports = { verifyNoDuplicates };