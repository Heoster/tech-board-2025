const database = require('../config/database');

async function checkQuestionUsage() {
    try {
        console.log('🔄 Connecting to database...');
        await database.connect();
        const db = database.getDb();
        
        console.log('📊 Checking question usage statistics...\n');
        
        // Get total COMPUTER questions by grade
        const totalQuestionsByGrade = await new Promise((resolve, reject) => {
            db.all(`
                SELECT grade, COUNT(*) as total
                FROM questions 
                WHERE topic = 'computer'
                GROUP BY grade
                ORDER BY grade
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        // Get used questions by grade
        const usedQuestionsByGrade = await new Promise((resolve, reject) => {
            db.all(`
                SELECT grade, COUNT(*) as used
                FROM used_questions 
                GROUP BY grade
                ORDER BY grade
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        // Create a map for easy lookup
        const usedMap = {};
        usedQuestionsByGrade.forEach(row => {
            usedMap[row.grade] = row.used;
        });
        
        console.log('💻 Computer Question Usage by Grade:');
        console.log('=====================================');
        totalQuestionsByGrade.forEach(row => {
            const used = usedMap[row.grade] || 0;
            const remaining = row.total - used;
            const usagePercent = ((used / row.total) * 100).toFixed(1);
            
            console.log(`Grade ${row.grade}:`);
            console.log(`  Total Computer Questions: ${row.total}`);
            console.log(`  Used Questions:           ${used} (${usagePercent}%)`);
            console.log(`  Remaining:                ${remaining}`);
            console.log(`  Can create:               ${Math.floor(remaining / 25)} more tests`);
            console.log('');
        });
        
        // Get usage by difficulty for each grade
        console.log('📊 Usage by Difficulty:');
        console.log('========================');
        
        for (const gradeRow of totalQuestionsByGrade) {
            const grade = gradeRow.grade;
            console.log(`\nGrade ${grade}:`);
            
            const difficultyStats = await new Promise((resolve, reject) => {
                db.all(`
                    SELECT 
                        q.difficulty,
                        COUNT(*) as total,
                        COALESCE(used_count.used, 0) as used,
                        (COUNT(*) - COALESCE(used_count.used, 0)) as remaining
                    FROM questions q
                    LEFT JOIN (
                        SELECT 
                            q2.difficulty,
                            COUNT(*) as used
                        FROM used_questions uq
                        JOIN questions q2 ON uq.question_id = q2.id
                        WHERE uq.grade = ?
                        GROUP BY q2.difficulty
                    ) used_count ON q.difficulty = used_count.difficulty
                    WHERE q.grade = ?
                    GROUP BY q.difficulty
                    ORDER BY q.difficulty
                `, [grade, grade], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });
            
            difficultyStats.forEach(stat => {
                const usagePercent = stat.total > 0 ? ((stat.used / stat.total) * 100).toFixed(1) : '0.0';
                console.log(`  ${stat.difficulty.padEnd(8)}: ${stat.used}/${stat.total} used (${usagePercent}%), ${stat.remaining} remaining`);
            });
        }
        
        // Get recent quiz activity
        console.log('\n🕒 Recent Quiz Activity:');
        console.log('=========================');
        
        const recentQuizzes = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    q.id,
                    s.name as student_name,
                    s.roll_number,
                    q.grade,
                    q.start_time,
                    q.status,
                    COUNT(uq.question_id) as questions_used
                FROM quizzes q
                JOIN students s ON q.student_id = s.id
                LEFT JOIN used_questions uq ON q.id = uq.quiz_id
                GROUP BY q.id, s.name, s.roll_number, q.grade, q.start_time, q.status
                ORDER BY q.start_time DESC
                LIMIT 10
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        if (recentQuizzes.length > 0) {
            recentQuizzes.forEach(quiz => {
                const date = new Date(quiz.start_time).toLocaleString();
                console.log(`  Quiz ${quiz.id}: ${quiz.student_name} (Roll ${quiz.roll_number}) - Grade ${quiz.grade}`);
                console.log(`    Date: ${date}, Status: ${quiz.status}, Questions Used: ${quiz.questions_used}`);
            });
        } else {
            console.log('  No quizzes found');
        }
        
        // Warning for grades running low on questions
        console.log('\n⚠️  Warnings:');
        console.log('==============');
        
        let hasWarnings = false;
        totalQuestionsByGrade.forEach(row => {
            const used = usedMap[row.grade] || 0;
            const remaining = row.total - used;
            const testsRemaining = Math.floor(remaining / 25);
            
            if (testsRemaining < 5) {
                hasWarnings = true;
                console.log(`  Grade ${row.grade}: Only ${testsRemaining} tests remaining! Consider adding more questions.`);
            }
        });
        
        if (!hasWarnings) {
            console.log('  No warnings - all grades have sufficient questions remaining');
        }
        
    } catch (error) {
        console.error('❌ Error checking question usage:', error);
        throw error;
    } finally {
        console.log('\n🔒 Closing database connection...');
        await database.close();
    }
}

// Run the check
if (require.main === module) {
    checkQuestionUsage()
        .then(() => {
            console.log('\n🎉 Question usage check completed!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Failed to check question usage:', error);
            process.exit(1);
        });
}

module.exports = checkQuestionUsage;