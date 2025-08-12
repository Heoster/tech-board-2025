const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const database = require('../config/database');

const router = express.Router();

// Start quiz
router.post('/start', authenticateToken, async (req, res) => {
    try {
        const { grade } = req.body;
        const studentId = req.user.id;

        // Validate grade
        const validGrades = [6, 7, 8, 9, 11];
        if (!grade || !validGrades.includes(parseInt(grade))) {
            return res.status(400).json({ error: 'Invalid grade' });
        }
        
        const db = database.getDb();

        // Check if student already has a quiz
        const existingQuiz = await new Promise((resolve, reject) => {
            db.get('SELECT id, status FROM quizzes WHERE student_id = ?', [studentId], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        if (existingQuiz) {
            if (existingQuiz.status === 'completed') {
                return res.status(400).json({ error: 'You have already completed the test' });
            } else {
                return res.status(400).json({ error: 'You already have a test in progress' });
            }
        }

        // Get exactly 50 random questions for the grade
        const questions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.question_text, q.difficulty,
                       GROUP_CONCAT(
                           json_object('id', o.id, 'text', o.option_text, 'order', o.option_order)
                       ) as options
                FROM questions q
                LEFT JOIN options o ON q.id = o.question_id
                WHERE q.grade = ?
                GROUP BY q.id
                ORDER BY RANDOM()
                LIMIT 50
            `, [grade], (err, rows) => {
                if (err) reject(err);
                else resolve(rows.map(q => ({
                    ...q,
                    options: q.options ? JSON.parse(`[${q.options}]`).sort((a, b) => a.order - b.order) : []
                })));
            });
        });

        if (questions.length < 50) {
            return res.status(400).json({ error: 'Insufficient questions available for this grade' });
        }

        // Create quiz session with 50-minute time limit
        const quizId = await new Promise((resolve, reject) => {
            db.run('INSERT INTO quizzes (student_id, grade, total_questions, status) VALUES (?, ?, ?, ?)',
                [studentId, grade, 50, 'in_progress'], function (err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                });
        });

        res.json({ 
            success: true,
            data: {
                quizId, 
                questions,
                timeLimit: 50 * 60 * 1000, // 50 minutes in milliseconds
                startTime: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Quiz start error:', error);
        res.status(500).json({ success: false, error: 'Failed to start quiz' });
    }
});

// Submit quiz
router.post('/submit', authenticateToken, async (req, res) => {
    try {
        const { quizId, answers, startTime } = req.body;
        const studentId = req.user.id;

        if (!quizId || !answers || !Array.isArray(answers)) {
            return res.status(400).json({ error: 'Invalid quiz submission data' });
        }

        // Verify quiz belongs to student
        const quiz = await database.get(
            'SELECT * FROM quizzes WHERE id = ? AND student_id = ?',
            [quizId, studentId]
        );

        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        if (quiz.status === 'completed') {
            return res.status(400).json({ error: 'Quiz already completed' });
        }

        // Check time limit (50 minutes)
        const quizStartTime = new Date(startTime || quiz.started_at);
        const currentTime = new Date();
        const timeDiff = (currentTime - quizStartTime) / 1000 / 60; // in minutes

        if (timeDiff > 50) {
            return res.status(400).json({ error: 'Time limit exceeded. Quiz automatically submitted.' });
        }

        // Enforce exactly 50 questions
        if (answers.length !== 50) {
            return res.status(400).json({ error: 'Must answer exactly 50 questions' });
        }

        let score = 0;

        // Process each answer
        for (const answer of answers) {
            const option = await database.get(
                'SELECT is_correct FROM options WHERE id = ?',
                [answer.selectedOptionId]
            );

            const isCorrect = option?.is_correct || 0;
            if (isCorrect) score++;

            // Save answer
            await database.run(
                'INSERT INTO quiz_answers (quiz_id, question_id, selected_option_id, is_correct) VALUES (?, ?, ?, ?)',
                [quizId, answer.questionId, answer.selectedOptionId, isCorrect]
            );
        }

        // Update quiz with final score
        await database.run(
            'UPDATE quizzes SET score = ?, status = "completed", completed_at = CURRENT_TIMESTAMP WHERE id = ?',
            [score, quizId]
        );

        // Calculate pass/fail (72% = 36/50)
        const passed = score >= 36;
        
        // Students only see pass/fail status - NO detailed results
        res.json({
            success: true,
            message: 'Test submitted successfully. Results will be reviewed by administration.',
            status: passed ? 'qualified' : 'not_qualified',
            quizId: quizId
        });
    } catch (error) {
        console.error('Quiz submit error:', error);
        res.status(500).json({ error: 'Failed to submit quiz' });
    }
});

// Get quiz results (Admin only)
router.get('/results/:quizId', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const { quizId } = req.params;

        // Get quiz details
        const quiz = await database.get(
            'SELECT * FROM quizzes WHERE id = ?',
            [quizId]
        );

        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        // Admin access is already verified by middleware

        // Get quiz responses
        const responses = await database.query(`
            SELECT qa.*, q.question_text, o.option_text, o.is_correct
            FROM quiz_answers qa
            JOIN questions q ON qa.question_id = q.id
            JOIN options o ON qa.selected_option_id = o.id
            WHERE qa.quiz_id = ?
        `, [quizId]);

        res.json({ quiz, responses });
    } catch (error) {
        console.error('Get quiz results error:', error);
        res.status(500).json({ error: 'Failed to get quiz results' });
    }
});

module.exports = router;