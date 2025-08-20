const express = require('express');
const database = require('./simple-database');

const router = express.Router();

// Simple middleware to check student token
const requireStudent = (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        if (decoded.type !== 'student') {
            return res.status(403).json({ error: 'Student access required' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Start quiz
router.post('/start', requireStudent, async (req, res) => {
    try {
        // Check if student already has a quiz
        const existingQuiz = await database.get(
            'SELECT id FROM quizzes WHERE student_id = ?',
            [req.user.id]
        );

        if (existingQuiz) {
            return res.status(400).json({
                success: false,
                error: 'Quiz already completed'
            });
        }

        // Get random questions for the student's grade
        const questionRows = await database.all(`
            SELECT id, question_text, difficulty
            FROM questions 
            WHERE grade = ? 
            ORDER BY RANDOM() 
            LIMIT 50
        `, [req.user.grade]);

        // Get options for each question
        const questions = [];
        for (const question of questionRows) {
            const options = await database.all(`
                SELECT id, option_text, option_order
                FROM options 
                WHERE question_id = ?
                ORDER BY option_order
            `, [question.id]);

            questions.push({
                id: question.id,
                question_text: question.question_text,
                difficulty: question.difficulty,
                options: options.map(opt => ({
                    id: opt.id,
                    text: opt.option_text,
                    order: opt.option_order
                }))
            });
        }

        if (questions.length < 50) {
            return res.status(400).json({
                success: false,
                error: 'Not enough questions available for your grade'
            });
        }

        res.json({
            success: true,
            data: {
                questions,
                timeLimit: 50 * 60 * 1000, // 50 minutes in milliseconds
                startTime: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Quiz start error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to start quiz'
        });
    }
});

// Submit quiz
router.post('/submit', requireStudent, async (req, res) => {
    try {
        const { answers } = req.body;

        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid answers format'
            });
        }

        // Calculate score
        let score = 0;
        const totalQuestions = answers.length;

        for (const answer of answers) {
            const correctOption = await database.get(
                'SELECT is_correct FROM options WHERE id = ?',
                [answer.selectedOptionId]
            );

            if (correctOption && correctOption.is_correct) {
                score++;
            }
        }

        // Save quiz result
        const quizResult = await database.run(`
            INSERT INTO quizzes (student_id, grade, score, total_questions, status, completed_at)
            VALUES (?, ?, ?, ?, 'completed', datetime('now'))
        `, [req.user.id, req.user.grade, score, totalQuestions]);

        // Save individual answers
        for (const answer of answers) {
            const isCorrect = await database.get(
                'SELECT is_correct FROM options WHERE id = ?',
                [answer.selectedOptionId]
            );
            
            await database.run(`
                INSERT INTO quiz_answers (quiz_id, question_id, selected_option_id, is_correct)
                VALUES (?, ?, ?, ?)
            `, [quizResult.lastID, answer.questionId, answer.selectedOptionId, isCorrect?.is_correct || 0]);
        }

        const percentage = (score / totalQuestions) * 100;
        const qualified = percentage >= 60; // 60% pass mark

        res.json({
            success: true,
            data: {
                score,
                totalQuestions,
                percentage: Math.round(percentage * 100) / 100,
                qualified,
                message: qualified ? 'Congratulations! You have qualified.' : 'Better luck next time.'
            }
        });
    } catch (error) {
        console.error('Quiz submit error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to submit quiz'
        });
    }
});

module.exports = router;