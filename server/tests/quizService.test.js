const quizService = require('../services/quizService');
const database = require('../config/database');

describe('Quiz Service', () => {
    beforeAll(async () => {
        await database.connect();

        // Create test questions
        const db = database.getDb();
        const questionResult = await database.run(
            'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
            [6, 'basic', 'What is a computer?']
        );
        const questionId = questionResult.lastID;

        // Create test options
        await database.run(
            'INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
            [questionId, 'Electronic device', 1, 1]
        );
        await database.run(
            'INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
            [questionId, 'Mechanical device', 0, 2]
        );
    });

    afterAll(async () => {
        await database.close();
    });

    describe('getRandomQuestions', () => {
        test('should return random questions for grade', async () => {
            const questions = await quizService.getRandomQuestions(6, 5);

            expect(Array.isArray(questions)).toBe(true);
            expect(questions.length).toBeGreaterThan(0);
            expect(questions[0]).toHaveProperty('id');
            expect(questions[0]).toHaveProperty('question_text');
            expect(questions[0]).toHaveProperty('options');
        });

        test('should return empty array for invalid grade', async () => {
            const questions = await quizService.getRandomQuestions(99, 5);

            expect(Array.isArray(questions)).toBe(true);
            expect(questions.length).toBe(0);
        });
    });

    describe('calculateScore', () => {
        test('should calculate correct score', () => {
            const answers = [
                { questionId: 1, selectedOptionId: 1, isCorrect: true },
                { questionId: 2, selectedOptionId: 3, isCorrect: false }
            ];

            const score = quizService.calculateScore(answers);

            expect(score).toBe(1);
        });

        test('should handle empty answers', () => {
            const score = quizService.calculateScore([]);

            expect(score).toBe(0);
        });
    });
});