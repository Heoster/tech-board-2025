const request = require('supertest');
const app = require('../index'); // Make sure index.js exports the express app

describe('Healthcheck', () => {
  it('responds with 200 OK for health endpoint', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('OK');
  });
});

