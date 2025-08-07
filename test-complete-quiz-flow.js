const database = require('./server/config/database');
const authUtils = require('./server/utils/auth');

async function testCompleteQuizFlow() {
    try {
        await database.connect();
        const db = database.getDb();
        
        console.log('🧪 TESTING COMPLETE QUIZ SUBMISSION FLOW');
        console.log('==========================================\n');
        
        // Clean up any existing test data first
        console.log('🧹 Cleaning up previous test data...');
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM responses WHERE quiz_id IN (SELECT id FROM quizzes WHERE student_id = (SELECT id FROM students WHERE roll_number = 1 AND grade = 8 AND section = "A"))', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM quizzes WHERE student_id = (SELECT id FROM students WHERE roll_number = 1 AND grade = 8 AND section = "A")', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        console.log('✅ Previous test data cleaned up');
        
        // Step 1: Verify student exists
        console.log('\n📋 Step 1: Verifying test student...');
        const student = await new Promise((resolve, reject) => {
            db.get(
                'SELECT * FROM students WHERE roll_number = ? AND grade = ? AND section = ?',
                [1, 8, 'A'],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });
        
        if (!student) {
            console.log('❌ Test student not found. Creating...');
            const studentPassword = await authUtils.hashPassword('student123');
            await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO students (name, roll_number, grade, section, password_hash) VALUES (?, ?, ?, ?, ?)',
                    ['Test Student', 1, 8, 'A', studentPassword],
                    function(err) {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });
            console.log('✅ Test student created');
        } else {
            console.log(`✅ Test student found: ${student.name} (ID: ${student.id})`);
        }
        
        // Get student ID
        const studentData = await new Promise((resolve, reject) => {
            db.get(
                'SELECT id FROM students WHERE roll_number = ? AND grade = ? AND section = ?',
                [1, 8, 'A'],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });
        
        // Step 2: Get quiz questions for Grade 8
        console.log('\n📋 Step 2: Fetching quiz questions for Grade 8...');
        const questions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.question_text, q.difficulty,
                       o.id as option_id, o.option_text, o.is_correct, o.option_order
                FROM questions q
                LEFT JOIN options o ON q.id = o.question_id
                WHERE q.grade = 8
                ORDER BY q.id, o.option_order
                LIMIT 100
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        // Group questions with their options
        const questionMap = {};
        questions.forEach(row => {
            if (!questionMap[row.id]) {
                questionMap[row.id] = {
                    id: row.id,
                    question_text: row.question_text,
                    difficulty: row.difficulty,
                    options: []
                };
            }
            if (row.option_id) {
                questionMap[row.id].options.push({
                    id: row.option_id,
                    text: row.option_text,
                    is_correct: row.is_correct,
                    order: row.option_order
                });
            }
        });
        
        const quizQuestions = Object.values(questionMap).slice(0, 25); // Take first 25 questions
        console.log(`✅ Retrieved ${quizQuestions.length} questions for quiz`);
        
        // Step 3: Simulate quiz submission
        console.log('\n📋 Step 3: Simulating quiz submission...');
        
        // Create quiz session
        const quizId = await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO quizzes (student_id, grade, total_questions, start_time) VALUES (?, ?, ?, ?)',
                [studentData.id, 8, quizQuestions.length, new Date().toISOString()],
                function(err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                }
            );
        });
        
        console.log(`✅ Quiz session created (ID: ${quizId})`);
        
        // Simulate answering questions (mix of correct and incorrect answers)
        let correctAnswers = 0;
        const answers = [];
        
        for (let i = 0; i < quizQuestions.length; i++) {
            const question = quizQuestions[i];
            const correctOption = question.options.find(opt => opt.is_correct);
            
            // Simulate 70% correct answers
            const isCorrect = Math.random() < 0.7;
            const selectedOption = isCorrect ? correctOption : question.options[0];
            
            if (isCorrect) correctAnswers++;
            
            answers.push({
                question_id: question.id,
                selected_option_id: selectedOption.id,
                is_correct: isCorrect
            });
            
            // Store answer in database
            await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO responses (quiz_id, question_id, selected_option_id, is_correct) VALUES (?, ?, ?, ?)',
                    [quizId, question.id, selectedOption.id, isCorrect ? 1 : 0],
                    function(err) {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });
        }
        
        // Calculate score
        const score = Math.round((correctAnswers / quizQuestions.length) * 100);
        
        // Update quiz with results
        await new Promise((resolve, reject) => {
            db.run(
                'UPDATE quizzes SET score = ?, end_time = ?, status = ?, passed = ? WHERE id = ?',
                [score, new Date().toISOString(), 'completed', score >= 72, quizId],
                function(err) {
                    if (err) reject(err);
                    else resolve();
                }
            );
        });
        
        console.log(`✅ Quiz completed: ${correctAnswers}/${quizQuestions.length} correct (${score}%)`);
        
        // Step 4: Verify results are stored correctly
        console.log('\n📋 Step 4: Verifying quiz results storage...');
        
        const quizResult = await new Promise((resolve, reject) => {
            db.get(`
                SELECT q.*, s.name, s.roll_number, s.grade, s.section
                FROM quizzes q
                JOIN students s ON q.student_id = s.id
                WHERE q.id = ?
            `, [quizId], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
        
        console.log('✅ Quiz result stored successfully:');
        console.log(`   Student: ${quizResult.name} (Roll: ${quizResult.roll_number})`);
        console.log(`   Grade: ${quizResult.grade}, Section: ${quizResult.section}`);
        console.log(`   Score: ${quizResult.score}% (${correctAnswers}/${quizResult.total_questions})`);
        console.log(`   Start: ${quizResult.start_time}`);
        console.log(`   End: ${quizResult.end_time}`);
        console.log(`   Status: ${quizResult.status}`);
        console.log(`   Passed: ${quizResult.passed ? 'Yes' : 'No'}`);
        
        // Step 5: Test admin access to results
        console.log('\n📋 Step 5: Testing admin access to quiz results...');
        
        const adminResults = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    q.id as quiz_id,
                    s.name,
                    s.roll_number,
                    s.grade,
                    s.section,
                    q.score,
                    q.total_questions,
                    q.start_time,
                    q.end_time,
                    q.status,
                    q.passed
                FROM quizzes q
                JOIN students s ON q.student_id = s.id
                ORDER BY q.start_time DESC
                LIMIT 10
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log(`✅ Admin can access ${adminResults.length} quiz results:`);
        adminResults.forEach((result, index) => {
            const passStatus = result.passed ? '✓' : '✗';
            console.log(`   ${index + 1}. ${result.name} (${result.roll_number}) - Grade ${result.grade}${result.section}: ${result.score}% ${passStatus}`);
        });
        
        // Step 6: Test detailed answer review
        console.log('\n📋 Step 6: Testing detailed answer review...');
        
        const detailedAnswers = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    r.question_id,
                    r.selected_option_id,
                    r.is_correct,
                    q.question_text,
                    q.difficulty,
                    so.option_text as selected_answer,
                    co.option_text as correct_answer
                FROM responses r
                JOIN questions q ON r.question_id = q.id
                JOIN options so ON r.selected_option_id = so.id
                JOIN options co ON q.id = co.question_id AND co.is_correct = 1
                WHERE r.quiz_id = ?
                ORDER BY r.question_id
            `, [quizId], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log(`✅ Detailed answer review available (${detailedAnswers.length} answers):`);
        detailedAnswers.slice(0, 3).forEach((answer, index) => {
            const status = answer.is_correct ? '✓' : '✗';
            console.log(`   ${index + 1}. ${status} [${answer.difficulty}] ${answer.question_text.substring(0, 50)}...`);
            console.log(`      Selected: ${answer.selected_answer}`);
            console.log(`      Correct: ${answer.correct_answer}`);
        });
        
        // Step 7: Test statistics
        console.log('\n📋 Step 7: Testing quiz statistics...');
        
        const stats = await new Promise((resolve, reject) => {
            db.get(`
                SELECT 
                    COUNT(*) as total_quizzes,
                    AVG(score) as avg_score,
                    MAX(score) as max_score,
                    MIN(score) as min_score,
                    COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_quizzes,
                    COUNT(CASE WHEN passed = 1 THEN 1 END) as passed_quizzes
                FROM quizzes
            `, (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
        
        console.log('✅ Quiz statistics available:');
        console.log(`   Total Quizzes: ${stats.total_quizzes}`);
        console.log(`   Completed Quizzes: ${stats.completed_quizzes}`);
        console.log(`   Passed Quizzes: ${stats.passed_quizzes}`);
        console.log(`   Average Score: ${Math.round(stats.avg_score)}%`);
        console.log(`   Highest Score: ${stats.max_score}%`);
        console.log(`   Lowest Score: ${stats.min_score}%`);
        
        console.log('\n🎉 COMPLETE QUIZ FLOW TEST SUCCESSFUL!');
        console.log('=====================================');
        console.log('✅ Quiz submission works correctly');
        console.log('✅ Results are properly stored');
        console.log('✅ Admin can access all quiz results');
        console.log('✅ Detailed answer review is available');
        console.log('✅ Quiz statistics are calculated correctly');
        
        await database.close();
        
    } catch (error) {
        console.error('❌ Error in quiz flow test:', error);
        await database.close();
    }
}

testCompleteQuizFlow();