const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken, requireStudent, validateStudent } = require('../middleware/auth');
const database = require('../config/database');

const router = express.Router();

// ULTRA-STRICT: Zero tolerance duplicate prevention system
const selectUniqueQuizQuestions = async (grade, totalQuestions = 50, studentId = null) => {
    const db = database.getDb();

    console.log(`🔒 ULTRA-STRICT: Selecting ${totalQuestions} ABSOLUTELY UNIQUE questions for Grade ${grade} (Student ID: ${studentId})`);

    // LAYER 1: Get ALL previously used questions by this student
    let usedQuestionIds = [];
    try {
        const usedQuestions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT DISTINCT r.question_id 
                FROM responses r
                JOIN quizzes q ON r.quiz_id = q.id
                WHERE q.student_id = ? AND q.grade = ?
            `, [studentId, grade], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        usedQuestionIds = usedQuestions.map(q => q.question_id);
        console.log(`🚫 LAYER 1: Found ${usedQuestionIds.length} previously used questions for this student`);
    } catch (error) {
        console.log('⚠️  LAYER 1: No previously used questions found:', error.message);
    }

    // LAYER 2: Get questions from any active/incomplete quizzes
    try {
        const activeQuizQuestions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT DISTINCT q.id as question_id
                FROM questions q
                JOIN responses r ON q.id = r.question_id
                JOIN quizzes qz ON r.quiz_id = qz.id
                WHERE qz.student_id = ? AND qz.grade = ? AND qz.status = 'in_progress'
            `, [studentId, grade], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        const activeQuestionIds = activeQuizQuestions.map(q => q.question_id);
        usedQuestionIds = [...new Set([...usedQuestionIds, ...activeQuestionIds])];
        console.log(`🚫 LAYER 2: Added ${activeQuestionIds.length} questions from active quizzes. Total excluded: ${usedQuestionIds.length}`);
    } catch (error) {
        console.log('⚠️  LAYER 2: No active quiz questions found:', error.message);
    }

    // LAYER 3: Check total available questions after exclusions
    const availableCount = await new Promise((resolve, reject) => {
        const excludeClause = usedQuestionIds.length > 0 ?
            `AND id NOT IN (${usedQuestionIds.map(() => '?').join(',')})` : '';
        
        db.get(
            `SELECT COUNT(*) as count FROM questions WHERE grade = ? ${excludeClause}`,
            [grade, ...usedQuestionIds],
            (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            }
        );
    });

    console.log(`📊 LAYER 3: Available questions after exclusions: ${availableCount}`);

    if (availableCount < totalQuestions) {
        throw new Error(`INSUFFICIENT_UNIQUE_QUESTIONS: Only ${availableCount} unique questions available, need ${totalQuestions}. Student may have exhausted question bank.`);
    }

    // Target distribution: 60% basic, 30% medium, 10% advanced
    const basicCount = Math.floor(totalQuestions * 0.6); // 15 questions
    const mediumCount = Math.floor(totalQuestions * 0.3); // 7 questions  
    const advancedCount = totalQuestions - basicCount - mediumCount; // 3 questions

    console.log(`📊 LAYER 4: Target distribution: ${basicCount} basic, ${mediumCount} medium, ${advancedCount} advanced`);

    // LAYER 4: Multi-level duplicate checking during selection
    const selectedQuestions = [];
    const selectedQuestionIds = new Set();
    const duplicateCheckMap = new Map(); // Extra safety net

    // ULTRA-STRICT helper function with multiple duplicate checks
    const selectByDifficultyUltraStrict = async (difficulty, targetCount) => {
        const excludeClause = usedQuestionIds.length > 0 ?
            `AND id NOT IN (${usedQuestionIds.map(() => '?').join(',')})` : '';

        // Get available questions with extra randomization
        const availableQuestions = await new Promise((resolve, reject) => {
            db.all(
                `SELECT id, question_text FROM questions 
                 WHERE grade = ? AND difficulty = ? ${excludeClause}
                 ORDER BY RANDOM()`,
                [grade, difficulty, ...usedQuestionIds],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });

        console.log(`📋 LAYER 4: Available ${difficulty} questions: ${availableQuestions.length}`);

        const selected = [];
        for (const question of availableQuestions) {
            if (selected.length >= targetCount) break;
            
            // MULTIPLE DUPLICATE CHECKS
            // Check 1: Set-based check
            if (selectedQuestionIds.has(question.id)) {
                console.warn(`⚠️  DUPLICATE CHECK 1 FAILED: Question ID ${question.id} already in set`);
                continue;
            }
            
            // Check 2: Map-based check
            if (duplicateCheckMap.has(question.id)) {
                console.warn(`⚠️  DUPLICATE CHECK 2 FAILED: Question ID ${question.id} already in map`);
                continue;
            }
            
            // Check 3: Array-based check
            if (selected.find(q => q.id === question.id)) {
                console.warn(`⚠️  DUPLICATE CHECK 3 FAILED: Question ID ${question.id} already in array`);
                continue;
            }
            
            // Check 4: Previously used check
            if (usedQuestionIds.includes(question.id)) {
                console.warn(`⚠️  DUPLICATE CHECK 4 FAILED: Question ID ${question.id} was previously used`);
                continue;
            }
            
            // Check 5: Global selected questions check
            if (selectedQuestions.find(q => q.id === question.id)) {
                console.warn(`⚠️  DUPLICATE CHECK 5 FAILED: Question ID ${question.id} already in global selection`);
                continue;
            }

            // ALL CHECKS PASSED - Add question
            selected.push(question);
            selectedQuestionIds.add(question.id);
            duplicateCheckMap.set(question.id, { difficulty, timestamp: Date.now() });
            
            console.log(`✅ ULTRA-STRICT: Added question ID ${question.id} (${difficulty})`);
        }

        console.log(`✅ LAYER 4: Selected ${selected.length}/${targetCount} ${difficulty} questions with ZERO duplicates`);
        return selected;
    };

    try {
        // Check available questions by difficulty first
        const difficultyCounts = {};
        for (const difficulty of ['basic', 'medium', 'advanced']) {
            const excludeClause = usedQuestionIds.length > 0 ?
                `AND id NOT IN (${usedQuestionIds.map(() => '?').join(',')})` : '';
            
            const count = await new Promise((resolve, reject) => {
                db.get(
                    `SELECT COUNT(*) as count FROM questions WHERE grade = ? AND difficulty = ? ${excludeClause}`,
                    [grade, difficulty, ...usedQuestionIds],
                    (err, row) => {
                        if (err) reject(err);
                        else resolve(row.count);
                    }
                );
            });
            difficultyCounts[difficulty] = count;
        }

        console.log(`📊 Available questions by difficulty: Basic=${difficultyCounts.basic}, Medium=${difficultyCounts.medium}, Advanced=${difficultyCounts.advanced}`);

        // Select questions by difficulty with ultra-strict checking, but be flexible with counts
        const basicQuestions = await selectByDifficultyUltraStrict('basic', Math.min(basicCount, difficultyCounts.basic));
        const mediumQuestions = await selectByDifficultyUltraStrict('medium', Math.min(mediumCount, difficultyCounts.medium));
        const advancedQuestions = await selectByDifficultyUltraStrict('advanced', Math.min(advancedCount, difficultyCounts.advanced));

        selectedQuestions.push(...basicQuestions, ...mediumQuestions, ...advancedQuestions);

        // LAYER 5: Fill remaining slots if needed (with same ultra-strict checking)
        const currentTotal = selectedQuestions.length;
        if (currentTotal < totalQuestions) {
            const remaining = totalQuestions - currentTotal;
            console.log(`📝 LAYER 5: Need ${remaining} more questions, filling with ultra-strict checking...`);

            const allExcluded = [...usedQuestionIds, ...Array.from(selectedQuestionIds)];
            const excludeClause = allExcluded.length > 0 ?
                `AND id NOT IN (${allExcluded.map(() => '?').join(',')})` : '';

            const additionalQuestions = await new Promise((resolve, reject) => {
                db.all(
                    `SELECT id, question_text FROM questions 
                     WHERE grade = ? ${excludeClause}
                     ORDER BY RANDOM()
                     LIMIT ?`,
                    [grade, ...allExcluded, remaining * 2], // Get extra to ensure we have enough after filtering
                    (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    }
                );
            });

            let added = 0;
            for (const question of additionalQuestions) {
                if (added >= remaining) break;
                
                // Apply same ultra-strict duplicate checking
                if (!selectedQuestionIds.has(question.id) && 
                    !duplicateCheckMap.has(question.id) &&
                    !selectedQuestions.find(q => q.id === question.id) &&
                    !usedQuestionIds.includes(question.id)) {
                    
                    selectedQuestions.push(question);
                    selectedQuestionIds.add(question.id);
                    duplicateCheckMap.set(question.id, { difficulty: 'fill', timestamp: Date.now() });
                    added++;
                    
                    console.log(`✅ LAYER 5: Added fill question ID ${question.id}`);
                }
            }
            
            console.log(`✅ LAYER 5: Added ${added} additional questions`);
        }

    } catch (error) {
        console.error('❌ LAYER 4-5 ERROR:', error);
        throw error;
    }

    // LAYER 6: FINAL ULTRA-STRICT VALIDATION
    const finalQuestionIds = selectedQuestions.map(q => q.id);
    const uniqueFinalIds = [...new Set(finalQuestionIds)];

    console.log(`🔍 LAYER 6: FINAL VALIDATION`);
    console.log(`   Selected questions: ${finalQuestionIds.length}`);
    console.log(`   Unique questions: ${uniqueFinalIds.length}`);
    console.log(`   Target questions: ${totalQuestions}`);

    // CRITICAL VALIDATION CHECKS
    if (uniqueFinalIds.length !== finalQuestionIds.length) {
        const duplicates = finalQuestionIds.filter((id, index) => finalQuestionIds.indexOf(id) !== index);
        console.error(`❌ CRITICAL FAILURE: Found ${finalQuestionIds.length - uniqueFinalIds.length} duplicates!`);
        console.error(`❌ Duplicate IDs: ${duplicates.join(', ')}`);
        console.error(`❌ Full selection: [${finalQuestionIds.join(', ')}]`);
        throw new Error(`ULTRA-STRICT VALIDATION FAILED: Duplicate questions detected: ${duplicates.join(', ')}`);
    }

    if (uniqueFinalIds.length !== totalQuestions) {
        console.error(`❌ CRITICAL FAILURE: Expected ${totalQuestions} questions, got ${uniqueFinalIds.length}`);
        throw new Error(`ULTRA-STRICT VALIDATION FAILED: Expected ${totalQuestions} questions, got ${uniqueFinalIds.length}`);
    }

    // Check for any overlap with previously used questions
    const overlapWithUsed = uniqueFinalIds.filter(id => usedQuestionIds.includes(id));
    if (overlapWithUsed.length > 0) {
        console.error(`❌ CRITICAL FAILURE: Found overlap with previously used questions!`);
        console.error(`❌ Overlapping IDs: ${overlapWithUsed.join(', ')}`);
        throw new Error(`ULTRA-STRICT VALIDATION FAILED: Questions overlap with previously used: ${overlapWithUsed.join(', ')}`);
    }

    // LAYER 7: Final shuffle with duplicate check
    const shuffledQuestions = [...uniqueFinalIds].sort(() => Math.random() - 0.5);
    const shuffledSet = new Set(shuffledQuestions);
    
    if (shuffledSet.size !== shuffledQuestions.length) {
        console.error(`❌ CRITICAL FAILURE: Duplicates found after shuffling!`);
        throw new Error(`ULTRA-STRICT VALIDATION FAILED: Duplicates detected after randomization`);
    }

    console.log(`✅ ULTRA-STRICT SUCCESS: ${shuffledQuestions.length} ABSOLUTELY UNIQUE questions selected`);
    console.log(`🔒 GUARANTEE: ZERO duplicates, ZERO overlap with previous tests`);
    console.log(`📋 Final question IDs: [${shuffledQuestions.join(', ')}]`);

    return shuffledQuestions;
};

// Start quiz with ultra-strict duplicate prevention
router.get('/start/:grade', authenticateToken, requireStudent, validateStudent, async (req, res) => {
    try {
        const grade = parseInt(req.params.grade);
        const studentId = req.user.id;
        const db = database.getDb();

        // Validate grade
        if (grade < 6 || grade > 12) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'INVALID_GRADE',
                    message: 'Grade must be between 6 and 12'
                }
            });
        }

        // Check if student has already taken the test
        const existingQuiz = await new Promise((resolve, reject) => {
            db.get(
                'SELECT id, status FROM quizzes WHERE student_id = ? ORDER BY id DESC LIMIT 1',
                [studentId],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });

        // Development mode: Allow multiple attempts for testing
        const isDevelopment = process.env.NODE_ENV !== 'production';

        if (existingQuiz && !isDevelopment) {
            if (existingQuiz.status === 'in_progress') {
                return res.status(409).json({
                    success: false,
                    error: {
                        code: 'QUIZ_IN_PROGRESS',
                        message: 'You already have an active quiz. Please complete it first.'
                    }
                });
            } else if (existingQuiz.status === 'completed') {
                return res.status(409).json({
                    success: false,
                    error: {
                        code: 'QUIZ_ALREADY_TAKEN',
                        message: 'You have already completed the TECH BOARD 2025 selection test. Only one attempt is allowed per student.'
                    }
                });
            }
        } else if (existingQuiz && isDevelopment) {
            // In development mode, clean up in-progress quiz
            if (existingQuiz.status === 'in_progress') {
                console.log(`🔄 Development mode: Cleaning up in-progress quiz ${existingQuiz.id}`);

                await new Promise((resolve, reject) => {
                    db.run('DELETE FROM responses WHERE quiz_id = ?', [existingQuiz.id], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });

                await new Promise((resolve, reject) => {
                    db.run('DELETE FROM quizzes WHERE id = ?', [existingQuiz.id], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            }
        }

        // Check if enough questions are available (only count questions with options)
        const questionCount = await new Promise((resolve, reject) => {
            db.get(
                `SELECT COUNT(DISTINCT q.id) as count 
                 FROM questions q 
                 INNER JOIN options o ON q.id = o.question_id 
                 WHERE q.grade = ?`,
                [grade],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                }
            );
        });

        // Use available questions (minimum 15, maximum 50)
        const targetQuestions = Math.min(50, Math.max(15, questionCount));
        
        if (questionCount < 15) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'INSUFFICIENT_QUESTIONS',
                    message: `Not enough questions available for Grade ${grade}. Need at least 15 questions, but only ${questionCount} available.`
                }
            });
        }

        // Select questions using ultra-strict algorithm
        const selectedQuestionIds = await selectUniqueQuizQuestions(grade, targetQuestions, studentId);

        // Create quiz record
        const quizId = await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO quizzes (student_id, grade, total_questions, status) VALUES (?, ?, ?, ?)',
                [studentId, grade, targetQuestions, 'in_progress'],
                function (err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                }
            );
        });

        console.log(`✅ Quiz ${quizId} created with ${selectedQuestionIds.length} ABSOLUTELY UNIQUE questions`);

        // Get full question details with options
        const questions = await new Promise((resolve, reject) => {
            const placeholders = selectedQuestionIds.map(() => '?').join(',');
            db.all(`
                SELECT q.id, q.question_text, q.difficulty
                FROM questions q
                WHERE q.id IN (${placeholders})
            `, selectedQuestionIds, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        // Get options for each question
        for (let question of questions) {
            const options = await new Promise((resolve, reject) => {
                db.all(`
                    SELECT id, option_text, option_order, is_correct
                    FROM options 
                    WHERE question_id = ?
                    ORDER BY option_order
                `, [question.id], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });
            question.options = options;
        }

        // Format questions for frontend (hide correct answers)
        const formattedQuestions = questions.map((q, index) => {
            // Randomize option order
            const randomizedOptions = q.options.sort(() => Math.random() - 0.5);

            return {
                id: q.id,
                questionNumber: index + 1,
                question_text: q.question_text,
                difficulty: q.difficulty,
                options: randomizedOptions.map(opt => ({
                    id: opt.id,
                    option_text: opt.option_text,
                    is_correct: false // Hide correct answers from students
                }))
            };
        });

        // Ensure questions are in the same order as selected
        const orderedQuestions = selectedQuestionIds.map(id =>
            formattedQuestions.find(q => q.id === id)
        ).filter(Boolean);

        res.json({
            success: true,
            data: {
                quizId,
                grade,
                totalQuestions: targetQuestions,
                questions: orderedQuestions.map((q, index) => ({
                    ...q,
                    questionNumber: index + 1
                })),
                timeLimit: Math.ceil(targetQuestions * 1.0), // 1 minute per question
                questionDistribution: {
                    basic: Math.floor(targetQuestions * 0.6),
                    medium: Math.floor(targetQuestions * 0.3),
                    advanced: targetQuestions - Math.floor(targetQuestions * 0.6) - Math.floor(targetQuestions * 0.3)
                },
                guarantees: {
                    noDuplicates: true,
                    noRepeatFromPreviousTests: true,
                    ultraStrictValidation: true
                }
            }
        });

    } catch (error) {
        console.error('Error starting quiz:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'QUIZ_START_FAILED',
                message: 'Failed to start quiz',
                details: process.env.NODE_ENV !== 'production' ? error.message : undefined
            }
        });
    }
});

// Submit quiz (keeping the existing submit logic with additional duplicate validation)
router.post('/submit', authenticateToken, requireStudent, validateStudent, [
    body('quizId').isInt().withMessage('Quiz ID must be an integer'),
    body('responses').isArray().withMessage('Responses must be an array'),
    body('responses.*.questionId').isInt().withMessage('Question ID must be an integer'),
    body('responses.*.selectedOptionId').optional().isInt().withMessage('Selected option ID must be an integer')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid input data',
                    details: errors.array()
                }
            });
        }

        const { quizId, responses } = req.body;
        const studentId = req.user.id;
        const db = database.getDb();

        // Verify quiz belongs to student and is in progress
        const quiz = await new Promise((resolve, reject) => {
            db.get(
                'SELECT id, student_id, status FROM quizzes WHERE id = ? AND student_id = ?',
                [quizId, studentId],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });

        if (!quiz) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 'QUIZ_NOT_FOUND',
                    message: 'Quiz not found or does not belong to you'
                }
            });
        }

        if (quiz.status !== 'in_progress') {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'QUIZ_ALREADY_COMPLETED',
                    message: 'Quiz has already been completed'
                }
            });
        }

        // Start transaction
        await new Promise((resolve, reject) => {
            db.run('BEGIN TRANSACTION', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        try {
            let correctAnswers = 0;

            // ULTRA-STRICT: Validate no duplicate questions in submission
            const submittedQuestionIds = responses.map(r => r.questionId);
            const uniqueSubmittedIds = new Set(submittedQuestionIds);

            if (uniqueSubmittedIds.size !== submittedQuestionIds.length) {
                const duplicates = submittedQuestionIds.filter((id, index) => submittedQuestionIds.indexOf(id) !== index);
                console.error(`❌ SUBMISSION ERROR: Duplicate questions in submission!`);
                console.error(`❌ Duplicate question IDs: ${duplicates.join(', ')}`);
                throw new Error(`ULTRA-STRICT SUBMISSION VALIDATION FAILED: Duplicate questions in submission. IDs: ${duplicates.join(', ')}`);
            }

            console.log(`✅ SUBMISSION VALIDATION: ${uniqueSubmittedIds.size} unique questions submitted`);

            // Process each response with duplicate checking
            const processedQuestionIds = new Set();
            
            for (const response of responses) {
                const { questionId, selectedOptionId } = response;

                // Additional duplicate check during processing
                if (processedQuestionIds.has(questionId)) {
                    console.error(`❌ PROCESSING ERROR: Question ${questionId} already processed!`);
                    throw new Error(`ULTRA-STRICT PROCESSING FAILED: Question ${questionId} processed multiple times`);
                }
                processedQuestionIds.add(questionId);

                // Get correct answer for the question
                const correctOption = await new Promise((resolve, reject) => {
                    db.get(
                        'SELECT id FROM options WHERE question_id = ? AND is_correct = 1',
                        [questionId],
                        (err, row) => {
                            if (err) reject(err);
                            else resolve(row);
                        }
                    );
                });

                const isCorrect = selectedOptionId && correctOption && selectedOptionId === correctOption.id;
                if (isCorrect) correctAnswers++;

                // Insert response with ultra-strict duplicate protection
                await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO responses (quiz_id, question_id, selected_option_id, is_correct) VALUES (?, ?, ?, ?)',
                        [quizId, questionId, selectedOptionId || null, isCorrect],
                        function (err) {
                            if (err) {
                                if (err.message && err.message.includes('UNIQUE constraint failed')) {
                                    console.error(`❌ DUPLICATE CONSTRAINT: Question ${questionId} already answered`);
                                    reject(new Error(`ULTRA-STRICT CONSTRAINT VIOLATION: Question ${questionId} has already been answered in this quiz`));
                                } else {
                                    reject(err);
                                }
                            } else {
                                resolve();
                            }
                        }
                    );
                });
            }

            // Update quiz with final score
            const passed = correctAnswers >= 36; // TECH BOARD 2025 pass criteria (72% for 50 questions)
            await new Promise((resolve, reject) => {
                db.run(
                    'UPDATE quizzes SET score = ?, passed = ?, end_time = CURRENT_TIMESTAMP, status = "completed" WHERE id = ?',
                    [correctAnswers, passed, quizId],
                    function (err) {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });

            // Commit transaction
            await new Promise((resolve, reject) => {
                db.run('COMMIT', (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });

            const percentage = Math.round((correctAnswers / 50) * 100);

            res.json({
                success: true,
                data: {
                    quizId,
                    score: correctAnswers,
                    totalQuestions: 50,
                    percentage,
                    passed,
                    message: 'TECH BOARD 2025 selection test submitted successfully',
                    validation: {
                        noDuplicatesInSubmission: true,
                        ultraStrictProcessing: true,
                        uniqueQuestionsProcessed: processedQuestionIds.size
                    }
                }
            });

        } catch (error) {
            // Rollback transaction
            await new Promise((resolve, reject) => {
                db.run('ROLLBACK', (err) => {
                    if (err) console.error('Rollback error:', err);
                    resolve();
                });
            });
            throw error;
        }

    } catch (error) {
        console.error('Error submitting quiz:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'QUIZ_SUBMIT_FAILED',
                message: 'Failed to submit quiz',
                details: process.env.NODE_ENV !== 'production' ? error.message : undefined
            }
        });
    }
});

module.exports = router;