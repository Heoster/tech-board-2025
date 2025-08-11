const request = require('supertest');
const app = require('../index');
const database = require('../config/database');
const jwt = require('jsonwebtoken');

describe('Admin Routes', () => {
    let adminToken;

    beforeAll(async () => {
        await database.connect();
        
        // Create admin token
        adminToken = jwt.sign(
            { id: 1, type: 'admin', username: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
    });

    afterAll(async () => {
        await database.close();
    });

    describe('GET /api/admin/dashboard', () => {
        test('should get dashboard data for admin', async () => {
            const response = await request(app)
                .get('/api/admin/dashboard')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('totalStudents');
            expect(response.body).toHaveProperty('totalQuestions');
            expect(response.body).toHaveProperty('totalQuizzes');
            expect(response.body).toHaveProperty('recentQuizzes');
        });

        test('should reject dashboard access without authentication', async () => {
            const response = await request(app)
                .get('/api/admin/dashboard');

            expect(response.status).toBe(401);
        });

        test('should reject dashboard access with student token', async () => {
            const studentToken = jwt.sign(
                { id: 1, type: 'student', grade: 6 },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            const response = await request(app)
                .get('/api/admin/dashboard')
                .set('Authorization', `Bearer ${studentToken}`);

            expect(response.status).toBe(403);
        });
    });

    describe('GET /api/admin/questions', () => {
        beforeEach(async () => {
            // Create test questions
            await database.run(
                'INSERT OR REPLACE INTO questions (id, grade, difficulty, question_text) VALUES (?, ?, ?, ?)',
                [1, 6, 'basic', 'Test question 1']
            );
            await database.run(
                'INSERT OR REPLACE INTO questions (id, grade, difficulty, question_text) VALUES (?, ?, ?, ?)',
                [2, 7, 'medium', 'Test question 2']
            );
        });

        test('should get all questions for admin', async () => {
            const response = await request(app)
                .get('/api/admin/questions')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('questions');
            expect(Array.isArray(response.body.questions)).toBe(true);
        });

        test('should filter questions by grade', async () => {
            const response = await request(app)
                .get('/api/admin/questions?grade=6')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('questions');
            expect(response.body.questions.every(q => q.grade === 6)).toBe(true);
        });

        test('should filter questions by difficulty', async () => {
            const response = await request(app)
                .get('/api/admin/questions?difficulty=basic')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('questions');
            expect(response.body.questions.every(q => q.difficulty === 'basic')).toBe(true);
        });
    });

    describe('POST /api/admin/questions', () => {
        test('should create a new question', async () => {
            const questionData = {
                grade: 6,
                difficulty: 'basic',
                questionText: 'What is a computer?',
                options: [
                    { text: 'Electronic device', isCorrect: true },
                    { text: 'Mechanical device', isCorrect: false },
                    { text: 'Optical device', isCorrect: false },
                    { text: 'Chemical device', isCorrect: false }
                ]
            };

            const response = await request(app)
                .post('/api/admin/questions')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(questionData);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('questionId');
            expect(response.body).toHaveProperty('message');
        });

        test('should reject question creation with invalid data', async () => {
            const invalidData = {
                grade: 6,
                difficulty: 'basic',
                // Missing questionText and options
            };

            const response = await request(app)
                .post('/api/admin/questions')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(invalidData);

            expect(response.status).toBe(400);
        });

        test('should reject question creation without admin auth', async () => {
            const questionData = {
                grade: 6,
                difficulty: 'basic',
                questionText: 'What is a computer?',
                options: [
                    { text: 'Electronic device', isCorrect: true },
                    { text: 'Mechanical device', isCorrect: false }
                ]
            };

            const response = await request(app)
                .post('/api/admin/questions')
                .send(questionData);

            expect(response.status).toBe(401);
        });
    });

    describe('GET /api/admin/students', () => {
        beforeEach(async () => {
            // Create test students
            await database.run(
                'INSERT OR REPLACE INTO students (name, roll_number, grade, section, password_hash) VALUES (?, ?, ?, ?, ?)',
                ['Student 1', 1, 6, 'A', 'password1']
            );
            await database.run(
                'INSERT OR REPLACE INTO students (name, roll_number, grade, section, password_hash) VALUES (?, ?, ?, ?, ?)',
                ['Student 2', 2, 7, 'B', 'password2']
            );
        });

        test('should get all students for admin', async () => {
            const response = await request(app)
                .get('/api/admin/students')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('students');
            expect(Array.isArray(response.body.students)).toBe(true);
        });

        test('should filter students by grade', async () => {
            const response = await request(app)
                .get('/api/admin/students?grade=6')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('students');
            expect(response.body.students.every(s => s.grade === 6)).toBe(true);
        });
    });

    describe('GET /api/admin/quiz-results', () => {
        test('should get quiz results for admin', async () => {
            const response = await request(app)
                .get('/api/admin/quiz-results')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('results');
            expect(Array.isArray(response.body.results)).toBe(true);
        });

        test('should filter quiz results by grade', async () => {
            const response = await request(app)
                .get('/api/admin/quiz-results?grade=6')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('results');
        });
    });
});