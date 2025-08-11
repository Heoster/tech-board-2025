const database = require('../config/database');

class QuizService {
    // Get random questions for a specific grade
    async getRandomQuestions(grade, limit = 50) {
        try {
            const questions = await database.query(`
                SELECT q.id, q.question_text, q.difficulty,
                       json_group_array(
                           json_object('id', o.id, 'text', o.option_text, 'is_correct', o.is_correct)
                       ) as options
                FROM questions q
                LEFT JOIN options o ON q.id = o.question_id
                WHERE q.grade = ?
                GROUP BY q.id
                ORDER BY RANDOM()
                LIMIT ?
            `, [grade, limit]);

            return questions.map(q => ({
                ...q,
                options: q.options ? JSON.parse(q.options) : []
            }));
        } catch (error) {
            console.error('Error getting random questions:', error);
            return [];
        }
    }

    // Calculate score from answers
    calculateScore(answers) {
        if (!Array.isArray(answers) || answers.length === 0) {
            return 0;
        }

        let score = 0;
        for (const answer of answers) {
            if (answer.is_correct || answer.isCorrect) {
                score++;
            }
        }

        return score;
    }

    // Submit quiz answers and calculate score
    async submitQuiz(quizId, answers) {
        try {
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
            
            return {
                score,
                totalQuestions: answers.length,
                passed: score >= (answers.length * 0.6)
            };
        } catch (error) {
            console.error('Error submitting quiz:', error);
            throw error;
        }
    }

    // Get quiz results
    async getQuizResults(quizId) {
        try {
            const quiz = await database.get('SELECT * FROM quizzes WHERE id = ?', [quizId]);
            
            if (!quiz) {
                return null;
            }
            
            const responses = await database.query(`
                SELECT qa.*, q.question_text, o.option_text, o.is_correct
                FROM quiz_answers qa
                JOIN questions q ON qa.question_id = q.id
                JOIN options o ON qa.selected_option_id = o.id
                WHERE qa.quiz_id = ?
            `, [quizId]);
            
            return { quiz, responses };
        } catch (error) {
            console.error('Error getting quiz results:', error);
            throw error;
        }
    }
}

module.exports = new QuizService();