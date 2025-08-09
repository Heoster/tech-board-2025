#!/usr/bin/env node

/**
 * Comprehensive Quiz Generation Test
 * Tests quiz generation for all grades and validates question quality
 */

const database = require('./server/config/database');

async function testQuizGeneration() {
    console.log('🧪 COMPREHENSIVE QUIZ GENERATION TEST');
    console.log('====================================');
    console.log('');

    try {
        await database.connect();
        const db = database.getDb();

        const grades = [6, 7, 8, 9, 11];
        const testResults = {};

        // 1. Test quiz generation for each grade
        console.log('📚 TESTING QUIZ GENERATION FOR ALL GRADES:');
        console.log('─────────────────────────────────────────');

        for (const grade of grades) {
            console.log(`\n🎓 Testing Grade ${grade}:`);
            
            try {
                // Get available questions count
                const questionCount = await new Promise((resolve, reject) => {
                    db.get(
                        'SELECT COUNT(*) as count FROM questions WHERE grade = ?',
                        [grade],
                        (err, row) => {
                            if (err) reject(err);
                            else resolve(row.count);
                        }
                    );
                });

                console.log(`   📊 Available questions: ${questionCount}`);

                if (questionCount < 25) {
                    console.log(`   ❌ INSUFFICIENT QUESTIONS: Need 25, have ${questionCount}`);
                    testResults[grade] = { status: 'FAILED', reason: 'Insufficient questions' };
                    continue;
                }

                // Generate multiple test quizzes to check for duplicates
                const quizTests = [];
                for (let i = 0; i < 3; i++) {
                    const quiz = await new Promise((resolve, reject) => {
                        db.all(`
                            SELECT q.id, q.question_text, q.difficulty,
                                   GROUP_CONCAT(o.option_text || '|' || o.is_correct || '|' || o.option_order) as options_data
                            FROM questions q
                            JOIN options o ON q.id = o.question_id
                            WHERE q.grade = ?
                            GROUP BY q.id
                            ORDER BY RANDOM()
                            LIMIT 25
                        `, [grade], (err, rows) => {
                            if (err) reject(err);
                            else resolve(rows);
                        });
                    });

                    quizTests.push(quiz);
                }

                // Analyze quiz quality
                let totalQuestions = 0;
                let validQuestions = 0;
                let questionsWithIssues = [];
                const allQuestionIds = new Set();

                for (let quizIndex = 0; quizIndex < quizTests.length; quizIndex++) {
                    const quiz = quizTests[quizIndex];
                    console.log(`\n   📝 Quiz ${quizIndex + 1} Analysis:`);
                    console.log(`     Questions generated: ${quiz.length}`);

                    for (const question of quiz) {
                        totalQuestions++;
                        allQuestionIds.add(question.id);
                        
                        // Parse options
                        const optionsData = question.options_data.split(',');
                        const options = [];
                        let correctCount = 0;

                        for (const optionData of optionsData) {
                            const [text, isCorrect, order] = optionData.split('|');
                            options.push({
                                text: text,
                                isCorrect: isCorrect === '1',
                                order: parseInt(order)
                            });
                            if (isCorrect === '1') correctCount++;
                        }

                        // Validate question
                        let isValid = true;
                        const issues = [];

                        // Check if has exactly 4 options
                        if (options.length !== 4) {
                            isValid = false;
                            issues.push(`Has ${options.length} options instead of 4`);
                        }

                        // Check if has exactly 1 correct answer
                        if (correctCount !== 1) {
                            isValid = false;
                            issues.push(`Has ${correctCount} correct answers instead of 1`);
                        }

                        // Check question text quality
                        if (question.question_text.length < 10) {
                            isValid = false;
                            issues.push('Question text too short');
                        }

                        // Check for placeholder text
                        if (question.question_text.includes('question number') || 
                            question.question_text.includes('Option A')) {
                            isValid = false;
                            issues.push('Contains placeholder text');
                        }

                        // Check options quality
                        const optionTexts = options.map(o => o.text);
                        if (optionTexts.some(text => text === 'Option A' || text === 'Option B')) {
                            isValid = false;
                            issues.push('Contains placeholder options');
                        }

                        if (isValid) {
                            validQuestions++;
                        } else {
                            questionsWithIssues.push({
                                id: question.id,
                                text: question.question_text.substring(0, 50) + '...',
                                issues: issues
                            });
                        }
                    }
                }

                // Check for duplicate questions across quizzes
                const duplicateCheck = new Set();
                let duplicatesFound = 0;
                for (const quiz of quizTests) {
                    for (const question of quiz) {
                        if (duplicateCheck.has(question.id)) {
                            duplicatesFound++;
                        } else {
                            duplicateCheck.add(question.id);
                        }
                    }
                }

                console.log(`\n   📊 Grade ${grade} Summary:`);
                console.log(`     Total questions tested: ${totalQuestions}`);
                console.log(`     Valid questions: ${validQuestions}`);
                console.log(`     Questions with issues: ${questionsWithIssues.length}`);
                console.log(`     Unique questions used: ${allQuestionIds.size}`);
                console.log(`     Duplicate questions found: ${duplicatesFound}`);

                // Show sample questions
                if (quizTests[0].length > 0) {
                    console.log(`\n   📖 Sample Questions from Grade ${grade}:`);
                    for (let i = 0; i < Math.min(3, quizTests[0].length); i++) {
                        const q = quizTests[0][i];
                        const optionsData = q.options_data.split(',');
                        
                        console.log(`\n     ${i + 1}. [${q.difficulty.toUpperCase()}] ${q.question_text}`);
                        
                        for (let j = 0; j < optionsData.length; j++) {
                            const [text, isCorrect] = optionsData[j].split('|');
                            const marker = isCorrect === '1' ? '✓' : ' ';
                            console.log(`        ${String.fromCharCode(65 + j)}. ${marker} ${text}`);
                        }
                    }
                }

                // Show issues if any
                if (questionsWithIssues.length > 0) {
                    console.log(`\n   ⚠️  Questions with Issues:`);
                    questionsWithIssues.slice(0, 5).forEach((q, index) => {
                        console.log(`     ${index + 1}. ${q.text}`);
                        q.issues.forEach(issue => {
                            console.log(`        - ${issue}`);
                        });
                    });
                }

                // Determine test result
                const successRate = (validQuestions / totalQuestions) * 100;
                if (successRate >= 90 && duplicatesFound === 0) {
                    testResults[grade] = { 
                        status: 'PASSED', 
                        successRate: successRate.toFixed(1),
                        issues: questionsWithIssues.length,
                        duplicates: duplicatesFound
                    };
                    console.log(`   ✅ Grade ${grade}: PASSED (${successRate.toFixed(1)}% success rate)`);
                } else {
                    testResults[grade] = { 
                        status: 'NEEDS_ATTENTION', 
                        successRate: successRate.toFixed(1),
                        issues: questionsWithIssues.length,
                        duplicates: duplicatesFound
                    };
                    console.log(`   ⚠️  Grade ${grade}: NEEDS ATTENTION (${successRate.toFixed(1)}% success rate)`);
                }

            } catch (error) {
                console.log(`   ❌ Error testing Grade ${grade}: ${error.message}`);
                testResults[grade] = { status: 'ERROR', error: error.message };
            }
        }

        // 2. Overall Database Quality Check
        console.log('\n\n🔍 OVERALL DATABASE QUALITY CHECK:');
        console.log('─────────────────────────────────');

        // Check for questions without proper options
        const orphanedQuestions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.question_text, q.grade
                FROM questions q
                LEFT JOIN options o ON q.id = o.question_id
                WHERE o.question_id IS NULL
                LIMIT 10
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        // Check for questions with wrong option count
        const wrongOptionCount = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.question_text, q.grade, COUNT(o.id) as option_count
                FROM questions q
                LEFT JOIN options o ON q.id = o.question_id
                GROUP BY q.id
                HAVING COUNT(o.id) != 4
                LIMIT 10
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        // Check for questions with no correct answer
        const noCorrectAnswer = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.question_text, q.grade
                FROM questions q
                WHERE q.id NOT IN (
                    SELECT DISTINCT question_id 
                    FROM options 
                    WHERE is_correct = 1
                )
                LIMIT 10
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        // Check for questions with multiple correct answers
        const multipleCorrect = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.question_text, q.grade, COUNT(*) as correct_count
                FROM questions q
                JOIN options o ON q.id = o.question_id
                WHERE o.is_correct = 1
                GROUP BY q.id
                HAVING COUNT(*) > 1
                LIMIT 10
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log(`   🔗 Questions without options: ${orphanedQuestions.length}`);
        console.log(`   🔢 Questions with wrong option count: ${wrongOptionCount.length}`);
        console.log(`   ❌ Questions with no correct answer: ${noCorrectAnswer.length}`);
        console.log(`   ⚠️  Questions with multiple correct answers: ${multipleCorrect.length}`);

        if (wrongOptionCount.length > 0) {
            console.log(`\n   📋 Questions with wrong option count:`);
            wrongOptionCount.forEach(q => {
                console.log(`     Grade ${q.grade}: ${q.question_text.substring(0, 50)}... (${q.option_count} options)`);
            });
        }

        if (noCorrectAnswer.length > 0) {
            console.log(`\n   📋 Questions with no correct answer:`);
            noCorrectAnswer.forEach(q => {
                console.log(`     Grade ${q.grade}: ${q.question_text.substring(0, 50)}...`);
            });
        }

        if (multipleCorrect.length > 0) {
            console.log(`\n   📋 Questions with multiple correct answers:`);
            multipleCorrect.forEach(q => {
                console.log(`     Grade ${q.grade}: ${q.question_text.substring(0, 50)}... (${q.correct_count} correct)`);
            });
        }

        // 3. Final Test Summary
        console.log('\n\n📊 FINAL TEST SUMMARY:');
        console.log('─────────────────────');

        let overallStatus = 'PASSED';
        let totalIssues = 0;

        Object.keys(testResults).forEach(grade => {
            const result = testResults[grade];
            console.log(`   Grade ${grade}: ${result.status}`);
            
            if (result.status === 'PASSED') {
                console.log(`     ✅ Success Rate: ${result.successRate}%`);
                console.log(`     📊 Issues: ${result.issues}, Duplicates: ${result.duplicates}`);
            } else if (result.status === 'NEEDS_ATTENTION') {
                console.log(`     ⚠️  Success Rate: ${result.successRate}%`);
                console.log(`     📊 Issues: ${result.issues}, Duplicates: ${result.duplicates}`);
                overallStatus = 'NEEDS_ATTENTION';
                totalIssues += result.issues;
            } else {
                console.log(`     ❌ Error: ${result.error || result.reason}`);
                overallStatus = 'FAILED';
            }
        });

        const databaseIssues = orphanedQuestions.length + wrongOptionCount.length + 
                              noCorrectAnswer.length + multipleCorrect.length;

        console.log(`\n🎯 OVERALL SYSTEM STATUS: ${overallStatus}`);
        console.log(`📊 Total Question Issues: ${totalIssues}`);
        console.log(`📊 Database Integrity Issues: ${databaseIssues}`);

        if (overallStatus === 'PASSED' && databaseIssues === 0) {
            console.log('\n🎉 EXCELLENT! Quiz generation system is working perfectly!');
            console.log('✅ All grades can generate high-quality quizzes');
            console.log('✅ No database integrity issues found');
            console.log('✅ System ready for TECH BOARD 2025 deployment');
        } else if (overallStatus === 'NEEDS_ATTENTION') {
            console.log('\n⚠️  ATTENTION NEEDED: Some issues found but system is functional');
            console.log('🔧 Consider cleaning up placeholder questions');
            console.log('🔧 System can still be used for testing');
        } else {
            console.log('\n❌ CRITICAL ISSUES: System needs immediate attention');
            console.log('🚨 Fix database issues before deployment');
        }

        await database.close();
        console.log('\n✅ Quiz generation test complete!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error during quiz generation test:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    testQuizGeneration();
}

module.exports = { testQuizGeneration };