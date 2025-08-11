const request = require('supertest');
const app = require('../index');
const database = require('../config/database');

describe('Authentication Routes', () => {
    beforeAll(async () => {
        await database.connect();
    });

    afterAll(async () => {
        await database.close();
    });

    describe('POST /api/auth/admin/login', () => {
        test('should login admin with correct credentials', async () => {
            const response = await request(app)
                .post('/api/auth/admin/login')
                .send({
                    username: 'admin',
                    password: 'admin123'
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
            expect(response.body).toHaveProperty('user');
            expect(response.body.user.username).toBe('admin');
        });

        test('should reject admin login with incorrect credentials', async () => {
            const response = await request(app)
                .post('/api/auth/admin/login')
                .send({
                    username: 'admin',
                    password: 'wrongpassword'
                });

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('error');
        });

        test('should reject admin login with missing credentials', async () => {
            const response = await request(app)
                .post('/api/auth/admin/login')
                .send({});

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe('POST /api/auth/student/login', () => {
        beforeEach(async () => {
            // Create a test student
            const bcrypt = require('bcrypt');
            const passwordHash = await bcrypt.hash('admin123', 10);
            await database.run(
                'INSERT OR REPLACE INTO students (name, roll_number, grade, section, password_hash) VALUES (?, ?, ?, ?, ?)',
                ['Test Student', 79, 6, 'A', passwordHash]
            );
        });

        test('should login student with correct credentials', async () => {
            const response = await request(app)
                .post('/api/auth/student/login')
                .send({
                    rollNumber: 79,
                    grade: 6,
                    section: 'A',
                    password: 'admin123'
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
            expect(response.body).toHaveProperty('user');
            expect(response.body.user.roll_number).toBe(79);
        });

        test('should reject student login with incorrect credentials', async () => {
            const response = await request(app)
                .post('/api/auth/student/login')
                .send({
                    rollNumber: 79,
                    grade: 6,
                    section: 'A',
                    password: 'wrongpassword'
                });

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('error');
        });

        test('should reject student login with non-existent student', async () => {
            const response = await request(app)
                .post('/api/auth/student/login')
                .send({
                    rollNumber: 99,
                    grade: 6,
                    section: 'A',
                    password: 'admin123'
                });

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('error');
        });
    });
});