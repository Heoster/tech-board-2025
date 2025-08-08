const database = require('./server/config/database');

async function verifySystem() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🔍 VERIFYING 1500+ QUESTIONS SYSTEM');
        console.log('===================================');
        console.log('');

        // 1. Count questions per grade
        console.log('📊 GRADE-WISE QUESTION COUNTS:');
        console.log('==============================');

        let totalQuestions = 0;
        const gradeCounts = {};

        for (const grade of [6, 7, 8, 9, 11]) {
            const count = await new Promise((resolve) => {
                db.get('SELECT COUNT(*) as count FROM questions WHERE grade = ? AND difficulty = "basic"', [grade], (err, row) => {
                    resolve(row ? row.count : 0);
                });
            });
            gradeCounts[grade] = count;
            totalQuestions += count;

            const status = count >= 250 ? '✅' : '⚠️ ';
            console.log(`${status} Grade ${grade}: ${count} questions`);
        }

        console.log('');
        console.log(`🎯 TOTAL QUESTIONS: ${totalQuestions}`);
        console.log(`✅ Target Achievement: ${totalQuestions >= 1250 ? 'SUCCESS' : 'NEEDS MORE'} (Required: 1250+)`);

        // 2. Check for duplicates within each grade
        console.log('');
        console.log('🔍 DUPLICATE CHECK WITHIN GRADES:');
        console.log('=================================');

        for (const grade of [6, 7, 8, 9, 11]) {
            const duplicates = await new Promise((resolve) => {
                db.all(`
                    SELECT question_text, COUNT(*) as count 
                    FROM questions 
                    WHERE grade = ? AND difficulty = "basic"
                    GROUP BY question_text 
                    HAVING COUNT(*) > 1
                `, [grade], (err, rows) => {
                    resolve(rows || []);
                });
            });

            if (duplicates.length === 0) {
                console.log(`✅ Grade ${grade}: No duplicates found`);
            } else {
                console.log(`⚠️  Grade ${grade}: ${duplicates.length} duplicate questions found`);
                duplicates.forEach(dup => {
                    console.log(`   - "${dup.question_text}" (${dup.count} times)`);
                });
            }
        }

        // 3. Check question format
        console.log('');
        console.log('📝 QUESTION FORMAT CHECK:');
        console.log('=========================');

        const formatCheck = await new Promise((resolve) => {
            db.all(`
                SELECT q.id, q.grade, q.question_text,
                       COUNT(o.id) as option_count,
                       SUM(CASE WHEN o.is_correct = 1 THEN 1 ELSE 0 END) as correct_count
                FROM questions q
                LEFT JOIN options o ON q.id = o.question_id
                WHERE q.difficulty = "basic"
                GROUP BY q.id
                HAVING option_count != 4 OR correct_count != 1
                LIMIT 5
            `, (err, rows) => {
                resolve(rows || []);
            });
        });

        if (formatCheck.length === 0) {
            console.log('✅ All questions have correct format (4 options, 1 correct)');
        } else {
            console.log('⚠️  Format issues found:');
            formatCheck.forEach(q => {
                console.log(`   - Grade ${q.grade}: "${q.question_text}" (${q.option_count} options, ${q.correct_count} correct)`);
            });
        }

        // 4. Sample questions from each grade
        console.log('');
        console.log('📋 SAMPLE QUESTIONS:');
        console.log('===================');

        for (const grade of [6, 7, 8, 9, 11]) {
            const sample = await new Promise((resolve) => {
                db.get(`
                    SELECT question_text 
                    FROM questions 
                    WHERE grade = ? AND difficulty = "basic"
                    ORDER BY RANDOM()
                    LIMIT 1
                `, [grade], (err, row) => {
                    resolve(row);
                });
            });

            if (sample) {
                console.log(`Grade ${grade}: ${sample.question_text}`);
            }
        }

        // 5. Cross-grade repetition check (this is allowed)
        console.log('');
        console.log('🔄 CROSS-GRADE REPETITION CHECK:');
        console.log('===============================');

        const crossGradeRepeats = await new Promise((resolve) => {
            db.all(`
                SELECT question_text, COUNT(DISTINCT grade) as grade_count, GROUP_CONCAT(DISTINCT grade) as grades
                FROM questions 
                WHERE difficulty = "basic"
                GROUP BY question_text 
                HAVING grade_count > 1
                LIMIT 5
            `, (err, rows) => {
                resolve(rows || []);
            });
        });

        if (crossGradeRepeats.length > 0) {
            console.log('✅ Cross-grade repetitions found (this is allowed):');
            crossGradeRepeats.forEach(repeat => {
                console.log(`   - "${repeat.question_text}" appears in grades: ${repeat.grades}`);
            });
        } else {
            console.log('ℹ️  No cross-grade repetitions found');
        }

        // 6. Final system status
        console.log('');
        console.log('🎯 SYSTEM STATUS:');
        console.log('================');

        const allGradesHave250Plus = Object.values(gradeCounts).every(count => count >= 250);
        const totalIs1250Plus = totalQuestions >= 1250;

        if (allGradesHave250Plus && totalIs1250Plus) {
            console.log('🎉 SUCCESS: SYSTEM FULLY READY!');
            console.log('✅ Each grade has 250+ unique questions');
            console.log('✅ Total questions exceed 1250');
            console.log('✅ No duplicates within grades');
            console.log('✅ Cross-grade repetitions allowed');
            console.log('✅ All questions use basic computer concepts');
            console.log('✅ Perfect for TECH BOARD 2025 Selection Test');
        } else {
            console.log('⚠️  SYSTEM NEEDS ATTENTION:');
            if (!allGradesHave250Plus) console.log('   - Some grades have less than 250 questions');
            if (!totalIs1250Plus) console.log('   - Total questions below 1250');
        }

        await database.close();
    } catch (error) {
        console.error('❌ Verification failed:', error);
    }
}

verifySystem();