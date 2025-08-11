const request = require('supertest');
const app = require('../index');

describe('Health Check', () => {
    describe('GET /api/health', () => {
        test('should return health status', async () => {
            const response = await request(app)
                .get('/api/health');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('status', 'OK');
            expect(response.body).toHaveProperty('message', 'Server is running');
            expect(response.body).toHaveProperty('timestamp');
            expect(response.body).toHaveProperty('environment');
        });
    });

    describe('404 Handler', () => {
        test('should return 404 for non-existent routes', async () => {
            const response = await request(app)
                .get('/api/non-existent-route');

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error', 'Route not found');
        });
    });
});