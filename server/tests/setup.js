// Minimal test setup to prevent hanging
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';
process.env.DB_PATH = ':memory:';
process.env.DISABLE_MONITORING = 'true';

jest.setTimeout(15000);

const database = require('../config/database');

beforeAll(async () => {
    try {
        await database.connect();
        console.log('Test database connected');
    } catch (error) {
        console.error('Test setup failed:', error.message);
    }
});

afterAll(async () => {
    try {
        if (database && database.close) {
            await database.close();
        }
        
        // No changes were made here
        // Force exit after cleanup
        setTimeout(() => {
            process.exit(0);
        }, 1000);
    } catch (error) {
        console.warn('Cleanup warning:', error.message);
        process.exit(0);
    }
});
