const database = require('./server/config/database');

async function testQuizGeneration() {
    try {
        console.log('🧪 Testing quiz generation...');
        
        // Connect to database
        await database.connect();
        const db = database.getDb();
        
        // 1. Test question retrieval for grade 6
        console.log('1. Testing question retrieval for grade 6...');
        const questions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.question_text, q.difficulty,
                       GROUP_CONCAT(
                           json_object(
                               'id', o.id,
                               'text', o.option_text,
                               'order', o.option_order
                           )
                       ) as options
                FROM questions q
                LEFT JOIN options o ON q.id = o.question_id
                WHERE q.grade = 6
                GROUP BY q.id
                ORDER BY q.id
                LIMIT 5
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log(`   ✅ Retrieved ${questions.length} sample questions`);
        questions.forEach((q, i) => {
            const options = q.options ? JSON.parse(`[${q.options}]`) : [];
            console.log(`   Question ${i+1}: ${q.question_text.substring(0, 50)}... (${options.length} options)`);
        });
        
        // 2. Test creating a test student
        console.log('2. Creating test student...');
        const bcrypt = require('bcrypt');
        const hashedPassword = await bcrypt.hash('testpass123', 10);
        
        // Delete existing test student if exists
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM students WHERE roll_number = 999 AND grade = 6', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        const studentResult = await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO students (name, roll_number, grade, section, password) VALUES (?, ?, ?, ?, ?)',
                ['Test Student', 999, 6, 'A', hashedPassword],
                function(err) {
                    if (err) reject(err);
                    else resolve({ lastID: this.lastID });
                }
            );
        });
        
        const studentId = studentResult.lastID;
        console.log(`   ✅ Test student created with ID: ${studentId}`);
        
        // 3. Test quiz creation
        console.log('3. Testing quiz creation...');
        const quizResult = await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO quizzes (student_id, grade, total_questions, status) VALUES (?, ?, ?, ?)',
                [studentId, 6, 50, 'in_progress'],
                function(err) {
                    if (err) reject(err);
                    else resolve({ lastID: this.lastID });
                }
            );
        });
        
        const quizId = quizResult.lastID;
        console.log(`   ✅ Quiz created with ID: ${quizId}`);
        
        // 4. Test question selection for quiz
        console.log('4. Testing question selection...');
        const allQuestions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.question_text, q.difficulty
                FROM questions q
                WHERE q.grade = 6
                ORDER BY RANDOM()
                LIMIT 50
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log(`   ✅ Selected ${allQuestions.length} questions for quiz`);
        
        // 5. Clean up test data
        console.log('5. Cleaning up test data...');
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM quizzes WHERE id = ?', [quizId], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM students WHERE id = ?', [studentId], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        console.log('   ✅ Test data cleaned up');
        
        console.log('\n🎉 Quiz generation test completed successfully!');
        console.log('\n📋 Test Results:');
        console.log('   ✅ Question retrieval: Working');
        console.log('   ✅ Student creation: Working');
        console.log('   ✅ Quiz creation: Working');
        console.log('   ✅ Question selection: Working');
        console.log('   ✅ Data cleanup: Working');
        
        await database.close();
        
    } catch (error) {
        console.error('❌ Quiz generation test failed:', error.message);
        console.error('Stack trace:', error.stack);
        process.exit(1);
    }
}

// Run the test
testQuizGeneration();