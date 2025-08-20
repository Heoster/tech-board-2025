const database = require('./server/config/database');

async function scanDatabase() {
    try {
        await database.connect();
        const db = database.getDb();
        
        console.log('🔍 Scanning Database...\n');
        
        // 1. Check database tables
        console.log('📊 Database Tables:');
        const tables = await new Promise((resolve, reject) => {
            db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        tables.forEach(table => {
            console.log(`  ✅ ${table.name}`);
        });
        
        // 2. Question counts by grade
        console.log('\n📚 Questions by Grade:');
        const questionCounts = await new Promise((resolve, reject) => {
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
        
        const gradeStats = {};
        questionCounts.forEach(row => {
            if (!gradeStats[row.grade]) gradeStats[row.grade] = {};
            gradeStats[row.grade][row.difficulty] = row.count;
        });
        
        Object.keys(gradeStats).forEach(grade => {
            const stats = gradeStats[grade];
            const total = Object.values(stats).reduce((sum, count) => sum + count, 0);
            console.log(`  Grade ${grade}: ${total} total`);
            Object.keys(stats).forEach(difficulty => {
                console.log(`    ${difficulty}: ${stats[difficulty]}`);
            });
        });
        
        // 3. Check for problematic questions
        console.log('\n🔍 Checking for Issues:');
        
        // Check for placeholder content
        const placeholderQuestions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT COUNT(*) as count
                FROM questions q
                LEFT JOIN options o ON q.id = o.question_id
                WHERE q.question_text LIKE '%placeholder%' 
                   OR q.question_text LIKE '%Alternative option%'
                   OR q.question_text LIKE '%Option A for%'
                   OR o.option_text LIKE '%Alternative option%'
                   OR o.option_text LIKE '%Option A for%'
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows[0].count);
            });
        });
        
        if (placeholderQuestions > 0) {
            console.log(`  ⚠️  ${placeholderQuestions} questions with placeholder content`);
        } else {
            console.log('  ✅ No placeholder content found');
        }
        
        // Check for questions without options
        const questionsWithoutOptions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT COUNT(*) as count
                FROM questions q
                LEFT JOIN options o ON q.id = o.question_id
                WHERE o.id IS NULL
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows[0].count);
            });
        });
        
        if (questionsWithoutOptions > 0) {
            console.log(`  ⚠️  ${questionsWithoutOptions} questions without options`);
        } else {
            console.log('  ✅ All questions have options');
        }
        
        // Check for questions with wrong number of options
        const questionsWithWrongOptions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, COUNT(o.id) as option_count
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
        
        if (questionsWithWrongOptions.length > 0) {
            console.log(`  ⚠️  ${questionsWithWrongOptions.length} questions with wrong number of options`);
            questionsWithWrongOptions.forEach(q => {
                console.log(`    Question ${q.id}: ${q.option_count} options`);
            });
        } else {
            console.log('  ✅ All questions have exactly 4 options');
        }
        
        // Check for questions without correct answers
        const questionsWithoutCorrect = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id
                FROM questions q
                LEFT JOIN options o ON q.id = o.question_id AND o.is_correct = 1
                WHERE o.id IS NULL
                LIMIT 10
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        if (questionsWithoutCorrect.length > 0) {
            console.log(`  ⚠️  ${questionsWithoutCorrect.length} questions without correct answers`);
            questionsWithoutCorrect.forEach(q => {
                console.log(`    Question ${q.id}`);
            });
        } else {
            console.log('  ✅ All questions have correct answers');
        }
        
        // 4. Sample questions from each grade
        console.log('\n📝 Sample Questions:');
        for (const grade of [6, 7, 8, 9, 11]) {
            const sampleQuestion = await new Promise((resolve, reject) => {
                db.get(`
                    SELECT q.id, q.question_text, q.difficulty,
                           GROUP_CONCAT(o.option_text, ' | ') as options
                    FROM questions q
                    LEFT JOIN options o ON q.id = o.question_id
                    WHERE q.grade = ?
                    GROUP BY q.id
                    ORDER BY RANDOM()
                    LIMIT 1
                `, [grade], (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                });
            });
            
            if (sampleQuestion) {
                console.log(`\n  Grade ${grade} Sample (ID: ${sampleQuestion.id}):`);
                console.log(`    Q: ${sampleQuestion.question_text}`);
                console.log(`    Difficulty: ${sampleQuestion.difficulty}`);
                console.log(`    Options: ${sampleQuestion.options}`);
            }
        }
        
        // 5. Check students and quizzes
        console.log('\n👥 Students and Quizzes:');
        const studentCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM students', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        const quizCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM quizzes', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        const completedQuizzes = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM quizzes WHERE status = "completed"', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        console.log(`  Students: ${studentCount}`);
        console.log(`  Total Quizzes: ${quizCount}`);
        console.log(`  Completed Quizzes: ${completedQuizzes}`);
        
        // 6. Database size and performance
        console.log('\n💾 Database Info:');
        const dbStats = await new Promise((resolve, reject) => {
            db.get('PRAGMA page_count', (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
        
        console.log(`  Page Count: ${dbStats.page_count}`);
        console.log(`  Estimated Size: ~${Math.round(dbStats.page_count * 4096 / 1024 / 1024 * 100) / 100} MB`);
        
        console.log('\n✅ Database scan completed!');
        await database.close();
        
    } catch (error) {
        console.error('❌ Error scanning database:', error);
    }
}

scanDatabase();