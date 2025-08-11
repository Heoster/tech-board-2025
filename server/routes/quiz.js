const express = require('express');
const { authenticateToken } = require('../middleware/auth');
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

        // Get 50 random questions for the grade
        const questions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.question_text, q.difficulty,
                       GROUP_CONCAT(
                           json_object('id', o.id, 'text', o.option_text)
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
                    options: q.options ? JSON.parse(`[${q.options}]`) : []
                })));
            });
        });

        // Create quiz session
        const quizId = await new Promise((resolve, reject) => {
            db.run('INSERT INTO quizzes (student_id, grade, total_questions) VALUES (?, ?, ?)',
                [studentId, grade, 50], function (err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                });
        });

        res.json({ quizId, questions });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to start quiz' });
    }
});

// Submit quiz
router.post('/submit', authenticateToken, async (req, res) => {
    try {
        const { quizId, answers } = req.body;

        if (!quizId || !answers || !Array.isArray(answers)) {
            return res.status(400).json({ error: 'Invalid quiz submission data' });
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

        const totalQuestions = answers.length;
        const passed = score >= (totalQuestions * 0.6); // 60% pass rate

        res.json({
            score,
            totalQuestions,
            passed,
            message: 'Quiz submitted successfully'
        });
    } catch (error) {
        console.error('Quiz submit error:', error);
        res.status(500).json({ error: 'Failed to submit quiz' });
    }
});

// Get quiz results
router.get('/results/:quizId', authenticateToken, async (req, res) => {
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

        // Check if user has access (student can only see their own, admin can see all)
        if (req.user.type === 'student' && quiz.student_id !== req.user.id) {
            return res.status(403).json({ error: 'Access denied' });
        }

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