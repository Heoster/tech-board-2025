// Set test environment first
process.env.NODE_ENV = 'test';
process.env.PORT = '0'; // Use random port for tests
process.env.JWT_SECRET = 'test-secret';
process.env.DB_PATH = ':memory:'; // Use in-memory database for tests

// Set test timeout
jest.setTimeout(10000);

const database = require('../config/database');
const { performanceMonitor } = require('../middleware/performance');

// Global test setup
beforeAll(async () => {
    // Initialize test database
    await database.connect();
});

afterAll(async () => {
    // Clean up performance monitoring timers
    if (performanceMonitor && performanceMonitor.cleanup) {
        performanceMonitor.cleanup();
    }
    
    // Close database connections
    await database.close();
});

// Clean up after each test
afterEach(async () => {
    // Clear test data if needed
    const db = database.getDb();
    if (db && database.isConnected()) {
        try {
            // Simple sequential cleanup without timeout
            await new Promise((resolve) => {
                db.serialize(() => {
                    db.run('DELETE FROM quiz_answers');
                    db.run('DELETE FROM quizzes');
                    db.run('DELETE FROM options');
                    db.run('DELETE FROM questions');
                    db.run('DELETE FROM students WHERE id > 1', () => resolve());
                });
            });
        } catch (error) {
            // Ignore cleanup errors in tests
        }
    }
});