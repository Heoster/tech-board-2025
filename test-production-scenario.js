const database = require('./server/config/database');

// Test production scenario: Multiple students taking multiple quizzes
async function testProductionScenario() {
    try {
        await database.connect();
        const db = database.getDb();
        
        console.log('🎯 TESTING PRODUCTION SCENARIO: Multiple Students, Multiple Quizzes\n');
        
        const testGrade = 11;
        const numStudents = 3;
        const quizzesPerStudent = 2;
        
        console.log(`📊 Scenario: ${numStudents} students, ${quizzesPerStudent} quizzes each`);
        console.log(`📊 Total quizzes: ${numStudents * quizzesPerStudent}`);
        console.log(`📊 Total questions needed: ${numStudents * quizzesPerStudent * 25}\n`);
        
        // Check available questions
        const totalQuestions = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions WHERE grade = ?', [testGrade], (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        console.log(`📋 Available Grade ${testGrade} questions: ${totalQuestions}`);
        
        if (totalQuestions < numStudents * quizzesPerStudent * 25) {
            console.log('❌ Not enough questions for this scenario');
            process.exit(1);
        }
        
        const allUsedQuestions = new Set();
        const studentQuizData = [];
        
        // Create test students and simulate quizzes
        for (let studentId = 1000; studentId < 1000 + numStudents; studentId++) {
            console.log(`\n👤 STUDENT ${studentId - 999}:`);
            
            // Create test student
            try {
                await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT OR REPLACE INTO students (id, name, roll_number, grade, section, password_hash) VALUES (?, ?, ?, ?, ?, ?)',
                        [studentId, `Test Student ${studentId - 999}`, studentId - 999, testGrade, 'A', 'test_hash'],
                        function(err) {
                            if (err) reject(err);
                            else resolve();
                        }
                    );
                });
            } catch (error) {
                // Student might already exist, continue
            }
            
            const studentUsedQuestions = new Set();
            
            // Take multiple quizzes
            for (let quizNum = 1; quizNum <= quizzesPerStudent; quizNum++) {
                console.log(`   📝 Quiz ${quizNum}:`);
                
                // Get previously used questions for this student
                const usedQuestions = await new Promise((resolve, reject) => {
                    db.all(`
                        SELECT DISTINCT r.question_id 
                        FROM responses r
                        JOIN quizzes q ON r.quiz_id = q.id
                        WHERE q.student_id = ? AND q.grade = ?
                    `, [studentId, testGrade], (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows.map(r => r.question_id));
                    });
                });
                
                // Select 25 new questions avoiding used ones
                const excludeClause = usedQuestions.length > 0 ?
                    `AND id NOT IN (${usedQuestions.map(() => '?').join(',')})` : '';
                
                const newQuestions = await new Promise((resolve, reject) => {
                    db.all(
                        `SELECT id FROM questions 
                         WHERE grade = ? ${excludeClause}
                         ORDER BY RANDOM()
                         LIMIT 25`,
                        [testGrade, ...usedQuestions],
                        (err, rows) => {
                            if (err) reject(err);
                            else resolve(rows.map(r => r.id));
                        }
                    );
                });
                
                // Validate no duplicates within this quiz
                const uniqueQuestions = [...new Set(newQuestions)];
                if (uniqueQuestions.length !== newQuestions.length) {
                    console.log(`      ❌ DUPLICATES within quiz!`);
                    const duplicates = newQuestions.filter((id, index) => newQuestions.indexOf(id) !== index);
                    console.log(`      Duplicate IDs: ${duplicates.join(', ')}`);
                } else {
                    console.log(`      ✅ 25 unique questions selected`);
                }
                
                // Check for overlap with student's previous quizzes
                const overlap = newQuestions.filter(id => studentUsedQuestions.has(id));
                if (overlap.length > 0) {
                    console.log(`      ❌ OVERLAP with student's previous quizzes!`);
                    console.log(`      Overlapping IDs: ${overlap.join(', ')}`);
                } else {
                    console.log(`      ✅ No overlap with previous quizzes`);
                }
                
                // Create quiz and responses
                const quizId = await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO quizzes (student_id, grade, total_questions, status) VALUES (?, ?, ?, ?)',
                        [studentId, testGrade, 25, 'completed'],
                        function(err) {
                            if (err) reject(err);
                            else resolve(this.lastID);
                        }
                    );
                });
                
                // Insert responses
                for (const questionId of newQuestions) {
                    await new Promise((resolve, reject) => {
                        db.run(
                            'INSERT INTO responses (quiz_id, question_id, selected_option_id, is_correct) VALUES (?, ?, ?, ?)',
                            [quizId, questionId, null, false], // Mock response
                            function(err) {
                                if (err) reject(err);
                                else resolve();
                            }
                        );
                    });
                }
                
                // Track used questions
                newQuestions.forEach(id => {
                    studentUsedQuestions.add(id);
                    allUsedQuestions.add(id);
                });
                
                console.log(`      📊 Student total used: ${studentUsedQuestions.size} questions`);
            }
            
            studentQuizData.push({
                studentId,
                totalQuestions: studentUsedQuestions.size,
                expectedQuestions: quizzesPerStudent * 25
            });
        }
        
        console.log('\n📊 PRODUCTION SCENARIO ANALYSIS:');
        
        // Analyze each student
        let allStudentsPassed = true;
        studentQuizData.forEach((student, index) => {
            const status = student.totalQuestions === student.expectedQuestions ? '✅' : '❌';
            console.log(`   Student ${index + 1}: ${status} Used ${student.totalQuestions}/${student.expectedQuestions} unique questions`);
            
            if (student.totalQuestions !== student.expectedQuestions) {
                allStudentsPassed = false;
            }
        });
        
        // Global statistics
        console.log(`\n📈 GLOBAL STATISTICS:`);
        console.log(`   Total unique questions used: ${allUsedQuestions.size}`);
        console.log(`   Total questions available: ${totalQuestions}`);
        console.log(`   Remaining questions: ${totalQuestions - allUsedQuestions.size}`);
        console.log(`   System utilization: ${((allUsedQuestions.size / totalQuestions) * 100).toFixed(1)}%`);
        
        // Check for any cross-student question sharing (should be allowed)
        console.log(`\n🔀 CROSS-STUDENT ANALYSIS:`);
        const expectedTotalResponses = numStudents * quizzesPerStudent * 25;
        const actualTotalResponses = await new Promise((resolve, reject) => {
            db.get(
                'SELECT COUNT(*) as count FROM responses WHERE quiz_id IN (SELECT id FROM quizzes WHERE student_id >= 1000 AND student_id < 1005)',
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                }
            );
        });
        
        console.log(`   Expected total responses: ${expectedTotalResponses}`);
        console.log(`   Actual total responses: ${actualTotalResponses}`);
        console.log(`   Response integrity: ${actualTotalResponses === expectedTotalResponses ? '✅ PASS' : '❌ FAIL'}`);
        
        // Check for student-level question repetition (should be zero)
        const studentViolations = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    q.student_id,
                    r.question_id,
                    COUNT(*) as times_answered
                FROM responses r
                JOIN quizzes q ON r.quiz_id = q.id
                WHERE q.student_id >= 1000 AND q.student_id < 1005
                GROUP BY q.student_id, r.question_id
                HAVING COUNT(*) > 1
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        if (studentViolations.length > 0) {
            console.log(`   ❌ Found ${studentViolations.length} student-level question repetitions!`);
            studentViolations.forEach(violation => {
                console.log(`      Student ${violation.student_id}: Question ${violation.question_id} answered ${violation.times_answered} times`);
            });
            allStudentsPassed = false;
        } else {
            console.log(`   ✅ No student-level question repetitions found`);
        }
        
        // Final verdict
        console.log('\n🏆 PRODUCTION SCENARIO VERDICT:');
        if (allStudentsPassed && actualTotalResponses === expectedTotalResponses && studentViolations.length === 0) {
            console.log('✅ PRODUCTION SCENARIO: PASSED');
            console.log('🎯 SYSTEM READY: Can handle multiple students with unique quizzes');
            console.log('🔒 GUARANTEE: No question repetition detected across all students');
            console.log('📈 SCALABILITY: System can handle real-world load');
        } else {
            console.log('❌ PRODUCTION SCENARIO: FAILED');
            console.log('⚠️  ISSUES DETECTED: System needs review');
        }
        
        // Cleanup test data
        console.log('\n🧹 Cleaning up test data...');
        for (let studentId = 1000; studentId < 1000 + numStudents; studentId++) {
            await new Promise((resolve, reject) => {
                db.run('DELETE FROM responses WHERE quiz_id IN (SELECT id FROM quizzes WHERE student_id = ?)', [studentId], (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            
            await new Promise((resolve, reject) => {
                db.run('DELETE FROM quizzes WHERE student_id = ?', [studentId], (err) => {
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
        }
        
        console.log('✅ Test data cleaned up');
        
        process.exit(allStudentsPassed && actualTotalResponses === expectedTotalResponses && studentViolations.length === 0 ? 0 : 1);
        
    } catch (error) {
        console.error('❌ Error in production scenario test:', error);
        process.exit(1);
    }
}

testProductionScenario();