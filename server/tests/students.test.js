const request = require('supertest');
const app = require('../index');
const database = require('../config/database');
const jwt = require('jsonwebtoken');

describe('Students Routes', () => {
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

    describe('POST /api/students', () => {
        test('should create a new student', async () => {
            const studentData = {
                name: 'John Doe',
                rollNumber: 101,
                grade: 6,
                section: 'A',
                password: 'student123'
            };

            const response = await request(app)
                .post('/api/students')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(studentData);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('studentId');
            expect(response.body).toHaveProperty('message');
        });

        test('should reject duplicate student creation', async () => {
            const studentData = {
                name: 'Jane Doe',
                rollNumber: 101, // Same roll number
                grade: 6,
                section: 'A',
                password: 'student123'
            };

            const response = await request(app)
                .post('/api/students')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(studentData);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });

        test('should reject student creation without admin auth', async () => {
            const studentData = {
                name: 'Unauthorized Student',
                rollNumber: 102,
                grade: 6,
                section: 'A',
                password: 'student123'
            };

            const response = await request(app)
                .post('/api/students')
                .send(studentData);

            expect(response.status).toBe(401);
        });
    });

    describe('GET /api/students/:id', () => {
        let studentId;

        beforeEach(async () => {
            // Create a test student
            const result = await database.run(
                'INSERT INTO students (name, roll_number, grade, section, password_hash) VALUES (?, ?, ?, ?, ?)',
                ['Test Student', 201, 7, 'B', 'password123']
            );
            studentId = result.lastID;
        });

        test('should get student details for admin', async () => {
            const response = await request(app)
                .get(`/api/students/${studentId}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('student');
            expect(response.body.student.id).toBe(studentId);
            expect(response.body.student.name).toBe('Test Student');
        });

        test('should return 404 for non-existent student', async () => {
            const response = await request(app)
                .get('/api/students/99999')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(404);
        });

        test('should reject access without admin auth', async () => {
            const response = await request(app)
                .get(`/api/students/${studentId}`);

            expect(response.status).toBe(401);
        });
    });
});