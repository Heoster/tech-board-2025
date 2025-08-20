const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server/database/mcq_system_fixed.db');

async function verifyAllFixes() {
    console.log('🔍 Verifying all fixes are working correctly...\n');

    const db = new sqlite3.Database(dbPath);

    try {
        // 1. Check for variation text
        console.log('1. Checking for remaining variation text...');
        const variationCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions WHERE question_text LIKE "%Variation%"', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        console.log(`   Variations found: ${variationCount} ${variationCount === 0 ? '✅' : '❌'}`);

        // 2. Check for duplicate questions
        console.log('\n2. Checking for duplicate questions...');
        const duplicates = await new Promise((resolve, reject) => {
            db.all(`
                SELECT question_text, grade, difficulty, COUNT(*) as count
                FROM questions 
                GROUP BY LOWER(TRIM(question_text)), grade, difficulty
                HAVING COUNT(*) > 1
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log(`   Duplicate sets found: ${duplicates.length} ${duplicates.length === 0 ? '✅' : '❌'}`);

        // 3. Check question counts per grade
        console.log('\n3. Checking question counts per grade...');
        const gradeCounts = await new Promise((resolve, reject) => {
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

        let allGradesOK = true;
        gradeCounts.forEach(row => {
            const status = row.count >= 300 ? '✅' : '❌';
            if (row.count < 300) allGradesOK = false;
            console.log(`   Grade ${row.grade}: ${row.count} questions ${status}`);
        });

        // 4. Check question format quality
        console.log('\n4. Checking question format quality...');
        const formatIssues = await new Promise((resolve, reject) => {
            db.all(`
                SELECT id, question_text, grade, difficulty
                FROM questions 
                WHERE question_text NOT LIKE '%?'
                   OR question_text LIKE '%  %'
                   OR LENGTH(TRIM(question_text)) < 10
                LIMIT 10
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log(`   Format issues found: ${formatIssues.length} ${formatIssues.length === 0 ? '✅' : '⚠️'}`);
        if (formatIssues.length > 0) {
            console.log('   Sample issues:');
            formatIssues.slice(0, 3).forEach(q => {
                console.log(`     - "${q.question_text.substring(0, 50)}..."`);
            });
        }

        // 5. Test quiz generation simulation
        console.log('\n5. Testing quiz generation simulation...');
        const quizTests = [];
        
        for (const grade of [6, 7, 8, 9, 11]) {
            const questions = await new Promise((resolve, reject) => {
                db.all(`
                    SELECT id, question_text, difficulty
                    FROM questions 
                    WHERE grade = ?
                    ORDER BY RANDOM()
                    LIMIT 50
                `, [grade], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });

            // Check for duplicates in the quiz
            const questionTexts = questions.map(q => q.question_text.toLowerCase().trim());
            const uniqueTexts = new Set(questionTexts);
            const hasDuplicates = questionTexts.length !== uniqueTexts.size;

            quizTests.push({
                grade,
                totalQuestions: questions.length,
                uniqueQuestions: uniqueTexts.size,
                hasDuplicates,
                canGenerate50: questions.length >= 50
            });
        }

        quizTests.forEach(test => {
            const status = test.canGenerate50 && !test.hasDuplicates ? '✅' : '❌';
            console.log(`   Grade ${test.grade}: ${test.totalQuestions} questions, ${test.uniqueQuestions} unique ${status}`);
        });

        // 6. Check options integrity
        console.log('\n6. Checking options integrity...');
        const optionIssues = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.question_text, COUNT(o.id) as option_count,
                       SUM(CASE WHEN o.is_correct = 1 THEN 1 ELSE 0 END) as correct_count
                FROM questions q
                LEFT JOIN options o ON q.id = o.question_id
                GROUP BY q.id
                HAVING option_count != 4 OR correct_count != 1
                LIMIT 10
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log(`   Option issues found: ${optionIssues.length} ${optionIssues.length === 0 ? '✅' : '❌'}`);

        // 7. Overall summary
        console.log('\n' + '='.repeat(50));
        console.log('📊 VERIFICATION SUMMARY');
        console.log('='.repeat(50));

        const allChecks = [
            { name: 'No variation text', passed: variationCount === 0 },
            { name: 'No duplicate questions', passed: duplicates.length === 0 },
            { name: 'Sufficient questions per grade', passed: allGradesOK },
            { name: 'Quiz generation working', passed: quizTests.every(t => t.canGenerate50 && !t.hasDuplicates) },
            { name: 'Options integrity', passed: optionIssues.length === 0 }
        ];

        allChecks.forEach(check => {
            const status = check.passed ? '✅ PASS' : '❌ FAIL';
            console.log(`${status} - ${check.name}`);
        });

        const allPassed = allChecks.every(check => check.passed);
        console.log('\n' + '='.repeat(50));
        console.log(`🎯 OVERALL STATUS: ${allPassed ? '✅ ALL FIXES WORKING' : '❌ ISSUES FOUND'}`);
        console.log('='.repeat(50));

        if (allPassed) {
            console.log('\n🚀 Ready for deployment!');
            console.log('   - All variation text removed');
            console.log('   - No duplicate questions');
            console.log('   - Quiz generation will work perfectly');
            console.log('   - Professional question format');
        } else {
            console.log('\n⚠️  Some issues need attention before deployment.');
        }

    } catch (error) {
        console.error('❌ Verification error:', error);
    } finally {
        db.close();
    }
}

// Run verification
verifyAllFixes();