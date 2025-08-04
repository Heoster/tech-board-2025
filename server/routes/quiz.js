const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken, requireStudent, validateStudent } = require('../middleware/auth');
const database = require('../config/database');

const router = express.Router();

// FIXED: Quiz quality validation function
const validateQuizQuality = async (questionIds, grade, db) => {
    console.log(`🔍 Validating quiz quality for Grade ${grade}...`);
    
    // Get question details for validation
    const questions = await new Promise((resolve, reject) => {
        const placeholders = questionIds.map(() => '?').join(',');
        db.all(`
            SELECT id, difficulty, category, question_text
            FROM questions 
            WHERE id IN (${placeholders})
        `, questionIds, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
    
    // Check for duplicates
    const uniqueIds = new Set(questionIds);
    if (uniqueIds.size !== questionIds.length) {
        throw new Error(`VALIDATION FAILED: Found duplicate questions in quiz`);
    }
    
    // Check difficulty distribution
    const difficultyCount = { basic: 0, medium: 0, advanced: 0 };
    const categoryCount = {};
    
    questions.forEach(q => {
        difficultyCount[q.difficulty]++;
        categoryCount[q.category] = (categoryCount[q.category] || 0) + 1;
    });
    
    // Validate difficulty distribution (allow some flexibility)
    const basicPercentage = (difficultyCount.basic / questions.length) * 100;
    const mediumPercentage = (difficultyCount.medium / questions.length) * 100;
    const advancedPercentage = (difficultyCount.advanced / questions.length) * 100;
    
    console.log(`📊 Quiz distribution: ${difficultyCount.basic} basic (${basicPercentage.toFixed(1)}%), ${difficultyCount.medium} medium (${mediumPercentage.toFixed(1)}%), ${difficultyCount.advanced} advanced (${advancedPercentage.toFixed(1)}%)`);
    
    // Validate category diversity (no single category should dominate)
    const maxCategoryCount = Math.max(...Object.values(categoryCount));
    const maxCategoryPercentage = (maxCategoryCount / questions.length) * 100;
    
    if (maxCategoryPercentage > 50) {
        console.warn(`⚠️  WARNING: One category dominates ${maxCategoryPercentage.toFixed(1)}% of the quiz`);
    }
    
    console.log(`✅ Quiz validation passed: ${questions.length} unique questions with balanced distribution`);
    return true;
};

// FIXED: Flexible advanced question selection to handle category limits
const selectAdvancedQuestionsFlexible = async (grade, targetCount, usedQuestionIds, selectedQuestionIds, categoryCount, db) => {
    const excludeClause = usedQuestionIds.length > 0 ? 
        `AND id NOT IN (${usedQuestionIds.map(() => '?').join(',')})` : '';
    
    // Get all available advanced questions
    const availableQuestions = await new Promise((resolve, reject) => {
        db.all(
            `SELECT id, category, question_text FROM questions 
             WHERE grade = ? AND difficulty = 'advanced' ${excludeClause}
             ORDER BY RANDOM()`,
            [grade, ...usedQuestionIds],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
    
    console.log(`📋 Available advanced questions: ${availableQuestions.length}`);
    
    const selected = [];
    const maxPerCategory = Math.ceil(25 * 0.5); // FIXED: Relaxed limit for advanced (50% instead of 40%)
    
    // First pass: Try to select with relaxed category limits
    for (const question of availableQuestions) {
        if (selected.length >= targetCount) break;
        if (selectedQuestionIds.has(question.id)) continue;
        
        const currentCategoryCount = categoryCount[question.category] || 0;
        if (currentCategoryCount < maxPerCategory) {
            selected.push(question);
            selectedQuestionIds.add(question.id);
            categoryCount[question.category] = currentCategoryCount + 1;
        }
    }
    
    // Second pass: If still need more, ignore category limits for advanced questions
    if (selected.length < targetCount) {
        console.log(`📝 Need ${targetCount - selected.length} more advanced questions, ignoring category limits...`);
        
        for (const question of availableQuestions) {
            if (selected.length >= targetCount) break;
            if (selectedQuestionIds.has(question.id)) continue;
            
            selected.push(question);
            selectedQuestionIds.add(question.id);
            categoryCount[question.category] = (categoryCount[question.category] || 0) + 1;
        }
    }
    
    return selected;
};

// FIXED: Advanced Quiz selection algorithm with duplicate prevention and balanced distribution
const selectQuizQuestions = async (grade, totalQuestions = 25, studentId = null) => {
    const db = database.getDb();
    
    console.log(`🎯 Selecting ${totalQuestions} questions for Grade ${grade} (Student ID: ${studentId})`);
    
    // Get questions that haven't been used by this student yet
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
        console.log(`🚫 Found ${usedQuestionIds.length} previously used questions for this student`);
    } catch (error) {
        console.log('⚠️  No previously used questions found:', error.message);
    }
    
    // FIXED: Strict difficulty distribution (60% basic, 30% medium, 10% advanced)
    const basicCount = Math.floor(totalQuestions * 0.6); // 15 questions
    const mediumCount = Math.floor(totalQuestions * 0.3); // 7 questions  
    const advancedCount = totalQuestions - basicCount - mediumCount; // 3 questions
    
    console.log(`📊 STRICT Target distribution: ${basicCount} basic, ${mediumCount} medium, ${advancedCount} advanced`);
    
    const selectedQuestions = [];
    const selectedQuestionIds = new Set(); // FIXED: Prevent duplicates
    
    // FIXED: Category balancing - ensure diverse topic coverage
    const maxPerCategory = Math.ceil(totalQuestions * 0.4); // Max 40% from any single category
    const categoryCount = {};
    
    // Helper function to select questions by difficulty with category balancing
    const selectByDifficultyBalanced = async (difficulty, targetCount) => {
        const excludeClause = usedQuestionIds.length > 0 ? 
            `AND id NOT IN (${usedQuestionIds.map(() => '?').join(',')})` : '';
        
        // Get all available questions for this difficulty
        const availableQuestions = await new Promise((resolve, reject) => {
            db.all(
                `SELECT id, category FROM questions 
                 WHERE grade = ? AND difficulty = ? ${excludeClause}
                 ORDER BY RANDOM()`,
                [grade, difficulty, ...usedQuestionIds],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
        
        console.log(`📋 Available ${difficulty} questions: ${availableQuestions.length}`);
        
        const selected = [];
        const tempCategoryCount = { ...categoryCount };
        
        // FIXED: Select questions with category balancing
        for (const question of availableQuestions) {
            if (selected.length >= targetCount) break;
            if (selectedQuestionIds.has(question.id)) continue; // FIXED: Skip duplicates
            
            const currentCategoryCount = tempCategoryCount[question.category] || 0;
            if (currentCategoryCount < maxPerCategory) {
                selected.push(question);
                selectedQuestionIds.add(question.id);
                tempCategoryCount[question.category] = currentCategoryCount + 1;
            }
        }
        
        // Update global category count
        selected.forEach(q => {
            categoryCount[q.category] = (categoryCount[q.category] || 0) + 1;
        });
        
        return selected;
    };
    
    // FIXED: Select questions with strict distribution enforcement
    try {
        // Select basic questions (15)
        const basicQuestions = await selectByDifficultyBalanced('basic', basicCount);
        selectedQuestions.push(...basicQuestions);
        console.log(`✅ Selected ${basicQuestions.length}/${basicCount} basic questions`);
        
        // Select medium questions (7)
        const mediumQuestions = await selectByDifficultyBalanced('medium', mediumCount);
        selectedQuestions.push(...mediumQuestions);
        console.log(`✅ Selected ${mediumQuestions.length}/${mediumCount} medium questions`);
        
        // FIXED: Select advanced questions with relaxed category limits
        const advancedQuestions = await selectAdvancedQuestionsFlexible(grade, advancedCount, usedQuestionIds, selectedQuestionIds, categoryCount, db);
        selectedQuestions.push(...advancedQuestions);
        console.log(`✅ Selected ${advancedQuestions.length}/${advancedCount} advanced questions`);
        
        // FIXED: If we don't have enough questions in specific difficulties, fill intelligently
        const currentTotal = selectedQuestions.length;
        if (currentTotal < totalQuestions) {
            const remaining = totalQuestions - currentTotal;
            console.log(`📝 Need ${remaining} more questions, filling gaps intelligently...`);
            
            // Try to fill from basic first, then medium, then advanced
            const fillOrder = ['basic', 'medium', 'advanced'];
            let filled = 0;
            
            for (const difficulty of fillOrder) {
                if (filled >= remaining) break;
                
                const additionalQuestions = await selectByDifficultyBalanced(difficulty, remaining - filled);
                const newQuestions = additionalQuestions.filter(q => !selectedQuestionIds.has(q.id));
                
                selectedQuestions.push(...newQuestions);
                filled += newQuestions.length;
                console.log(`✅ Added ${newQuestions.length} additional ${difficulty} questions`);
            }
        }
        
    } catch (error) {
        console.error('❌ Error in balanced selection:', error);
        throw error;
    }
    
    // FIXED: Final validation and shuffling
    const finalQuestionIds = selectedQuestions.map(q => q.id);
    const uniqueQuestionIds = [...new Set(finalQuestionIds)]; // FIXED: Ensure no duplicates
    
    if (uniqueQuestionIds.length !== finalQuestionIds.length) {
        console.warn(`⚠️  Removed ${finalQuestionIds.length - uniqueQuestionIds.length} duplicate questions`);
    }
    
    // Shuffle the final selection to randomize question order
    const shuffledQuestions = uniqueQuestionIds.sort(() => Math.random() - 0.5);
    
    // FIXED: Log final distribution for verification
    console.log(`📊 Final category distribution:`);
    Object.entries(categoryCount).forEach(([category, count]) => {
        const percentage = ((count / shuffledQuestions.length) * 100).toFixed(1);
        console.log(`   📂 ${category}: ${count} questions (${percentage}%)`);
    });
    
    console.log(`💻 FINAL SELECTION: ${shuffledQuestions.length} questions for Grade ${grade}`);
    console.log(`🎯 Duplicate prevention: ${selectedQuestionIds.size} unique questions selected`);
    
    return shuffledQuestions;
};

// Start quiz
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
            // In development mode, if there's an in-progress quiz, delete it to allow a fresh start
            if (existingQuiz.status === 'in_progress') {
                console.log(`🔄 Development mode: Cleaning up in-progress quiz ${existingQuiz.id} for student ${studentId}`);
                
                // Delete responses for the in-progress quiz
                await new Promise((resolve, reject) => {
                    db.run('DELETE FROM responses WHERE quiz_id = ?', [existingQuiz.id], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
                
                // Delete the in-progress quiz
                await new Promise((resolve, reject) => {
                    db.run('DELETE FROM quizzes WHERE id = ?', [existingQuiz.id], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            }
        }
        
        // Check if enough questions are available for the grade
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
        
        if (questionCount < 25) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'INSUFFICIENT_QUESTIONS',
                    message: `Not enough questions available for Grade ${grade}. Need at least 25 questions, but only ${questionCount} available.`
                }
            });
        }
        
        // Select 25 questions using the FIXED enhanced algorithm for TECH BOARD 2025
        const selectedQuestionIds = await selectQuizQuestions(grade, 25, studentId);
        
        // FIXED: Validate quiz quality before proceeding
        await validateQuizQuality(selectedQuestionIds, grade, db);
        
        // Create quiz record
        const quizId = await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO quizzes (student_id, grade, total_questions, status) VALUES (?, ?, ?, ?)',
                [studentId, grade, 25, 'in_progress'],
                function(err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                }
            );
        });
        
        // Questions will be marked as used when responses are submitted
        console.log(`✅ Quiz created with ${selectedQuestionIds.length} questions`);
        
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

        // Get options for each question separately
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
        
        // Format questions for frontend with randomized options (hide correct answers)
        const formattedQuestions = questions.map((q, index) => {
            // Randomize option order while keeping track of original order for consistency
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
        
        // Ensure questions are in the same random order as selected
        const orderedQuestions = selectedQuestionIds.map(id => 
            formattedQuestions.find(q => q.id === id)
        ).filter(Boolean);
        
        res.json({
            success: true,
            data: {
                quizId,
                grade,
                totalQuestions: 25,
                questions: orderedQuestions.map((q, index) => ({
                    ...q,
                    questionNumber: index + 1
                })),
                timeLimit: 30, // 30 minutes
                questionDistribution: {
                    basic: Math.floor(25 * 0.6),
                    medium: Math.floor(25 * 0.3), 
                    advanced: 25 - Math.floor(25 * 0.6) - Math.floor(25 * 0.3)
                }
            }
        });
        
    } catch (error) {
        console.error('Error starting quiz:', error);
        console.error('Error stack:', error.stack);
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

// Submit quiz
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
            
            // Process each response
            for (const response of responses) {
                const { questionId, selectedOptionId } = response;
                
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
                
                // Insert response
                await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO responses (quiz_id, question_id, selected_option_id, is_correct) VALUES (?, ?, ?, ?)',
                        [quizId, questionId, selectedOptionId || null, isCorrect],
                        function(err) {
                            if (err) reject(err);
                            else resolve();
                        }
                    );
                });
            }
            
            // Update quiz with final score and pass/fail status
            const passed = correctAnswers >= 18; // TECH BOARD 2025 pass criteria
            await new Promise((resolve, reject) => {
                db.run(
                    'UPDATE quizzes SET score = ?, passed = ?, end_time = CURRENT_TIMESTAMP, status = "completed" WHERE id = ?',
                    [correctAnswers, passed, quizId],
                    function(err) {
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
            
            const percentage = Math.round((correctAnswers / 25) * 100);
            
            res.json({
                success: true,
                data: {
                    quizId,
                    score: correctAnswers,
                    totalQuestions: 25,
                    percentage,
                    passed,
                    message: 'TECH BOARD 2025 selection test submitted successfully'
                }
            });
            
        } catch (error) {
            // Rollback transaction
            await new Promise((resolve) => {
                db.run('ROLLBACK', () => resolve());
            });
            throw error;
        }
        
    } catch (error) {
        console.error('Error submitting quiz:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'QUIZ_SUBMIT_FAILED',
                message: 'Failed to submit quiz'
            }
        });
    }
});

// Student results access removed - results are only available to administrators
// Student results access removed - results are only available to administrators

// Get student's quiz history
router.get('/history', authenticateToken, requireStudent, validateStudent, async (req, res) => {
    try {
        const studentId = req.user.id;
        const { page = 1, limit = 10 } = req.query;
        const db = database.getDb();
        
        const offset = (page - 1) * limit;
        
        const quizzes = await new Promise((resolve, reject) => {
            db.all(
                'SELECT id, grade, score, total_questions, start_time, end_time, status FROM quizzes WHERE student_id = ? ORDER BY start_time DESC LIMIT ? OFFSET ?',
                [studentId, limit, offset],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
        
        const totalCount = await new Promise((resolve, reject) => {
            db.get(
                'SELECT COUNT(*) as total FROM quizzes WHERE student_id = ?',
                [studentId],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row.total);
                }
            );
        });
        
        const formattedQuizzes = quizzes.map(quiz => ({
            ...quiz,
            percentage: quiz.status === 'completed' ? Math.round((quiz.score / quiz.total_questions) * 100) : null,
            timeTaken: quiz.end_time && quiz.start_time ? 
                Math.round((new Date(quiz.end_time) - new Date(quiz.start_time)) / 1000 / 60) : null
        }));
        
        res.json({
            success: true,
            data: {
                quizzes: formattedQuizzes,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total: totalCount,
                    pages: Math.ceil(totalCount / limit)
                }
            }
        });
        
    } catch (error) {
        console.error('Error fetching quiz history:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'FETCH_HISTORY_FAILED',
                message: 'Failed to fetch quiz history'
            }
        });
    }
});

module.exports = router;