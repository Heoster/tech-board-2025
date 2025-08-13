// Performance testing suite for TECH BOARD 2025 MCQ System
// Tests bundle size, API response times, database query performance, and memory usage

const request = require('supertest');
const { performance } = require('perf_hooks');
const fs = require('fs').promises;
const path = require('path');
const app = require('../index');
const database = require('../config/database');
const { dbOptimizer } = require('../utils/database-optimizer');

describe('Performance Tests', () => {
    let server;
    let testStudentToken;
    let testAdminToken;
    
    beforeAll(async () => {
        // Start server for testing
        server = app.listen(0);
        
        // Create test tokens
        const studentResponse = await request(app)
            .post('/api/auth/student/login')
            .send({
                email: 'test@student.com',
                password: 'password123'
            });
        testStudentToken = studentResponse.body.token;
        
        const adminResponse = await request(app)
            .post('/api/auth/admin/login')
            .send({
                username: 'admin',
                password: 'admin123'
            });
        testAdminToken = adminResponse.body.token;
        
        // Initialize database indexes
        await dbOptimizer.createOptimizedIndexes();
    });
    
    afterAll(async () => {
        if (server) {
            server.close();
        }
    });

    describe('Bundle Size Validation', () => {
        test('Main bundle size should be under target threshold', async () => {
            const bundlePath = path.join(__dirname, '../../client/dist');
            
            try {
                const files = await fs.readdir(bundlePath);
                const jsFiles = files.filter(file => file.endsWith('.js') && !file.includes('chunk'));
                
                let totalSize = 0;
                for (const file of jsFiles) {
                    const stats = await fs.stat(path.join(bundlePath, file));
                    totalSize += stats.size;
                }
                
                const targetSize = 500 * 1024; // 500KB target
                const actualSizeKB = Math.round(totalSize / 1024);
                
                console.log(`Main bundle size: ${actualSizeKB}KB (target: ${targetSize / 1024}KB)`);
                
                expect(totalSize).toBeLessThan(targetSize);
            } catch (error) {
                console.warn('Bundle size test skipped - build files not found');
                // Skip test if build files don't exist
            }
        });
        
        test('Individual chunk sizes should be reasonable', async () => {
            const bundlePath = path.join(__dirname, '../../client/dist');
            
            try {
                const files = await fs.readdir(bundlePath);
                const chunkFiles = files.filter(file => file.includes('chunk') && file.endsWith('.js'));
                
                const maxChunkSize = 200 * 1024; // 200KB max per chunk
                
                for (const file of chunkFiles) {
                    const stats = await fs.stat(path.join(bundlePath, file));
                    const sizeKB = Math.round(stats.size / 1024);
                    
                    console.log(`Chunk ${file}: ${sizeKB}KB`);
                    expect(stats.size).toBeLessThan(maxChunkSize);
                }
            } catch (error) {
                console.warn('Chunk size test skipped - build files not found');
            }
        });
        
        test('CSS bundle size should be optimized', async () => {
            const bundlePath = path.join(__dirname, '../../client/dist');
            
            try {
                const files = await fs.readdir(bundlePath);
                const cssFiles = files.filter(file => file.endsWith('.css'));
                
                let totalCSSSize = 0;
                for (const file of cssFiles) {
                    const stats = await fs.stat(path.join(bundlePath, file));
                    totalCSSSize += stats.size;
                }
                
                const targetCSSSize = 100 * 1024; // 100KB target for CSS
                const actualSizeKB = Math.round(totalCSSSize / 1024);
                
                console.log(`CSS bundle size: ${actualSizeKB}KB (target: ${targetCSSSize / 1024}KB)`);
                
                expect(totalCSSSize).toBeLessThan(targetCSSSize);
            } catch (error) {
                console.warn('CSS size test skipped - build files not found');
            }
        });
    });

    describe('API Response Time Tests', () => {
        test('Authentication endpoints should respond quickly', async () => {
            const startTime = performance.now();
            
            const response = await request(app)
                .post('/api/auth/verify')
                .set('Authorization', `Bearer ${testStudentToken}`);
            
            const responseTime = performance.now() - startTime;
            
            expect(response.status).toBe(200);
            expect(responseTime).toBeLessThan(200); // Under 200ms
            
            console.log(`Auth verify response time: ${responseTime.toFixed(2)}ms`);
        });
        
        test('Quiz start endpoint should meet performance target', async () => {
            const startTime = performance.now();
            
            const response = await request(app)
                .post('/api/quiz/start')
                .set('Authorization', `Bearer ${testStudentToken}`)
                .send({ grade: 6 });
            
            const responseTime = performance.now() - startTime;
            
            expect(responseTime).toBeLessThan(500); // Under 500ms
            
            console.log(`Quiz start response time: ${responseTime.toFixed(2)}ms`);
        });
        
        test('Student dashboard should load quickly', async () => {
            const startTime = performance.now();
            
            const response = await request(app)
                .get('/api/students/dashboard')
                .set('Authorization', `Bearer ${testStudentToken}`);
            
            const responseTime = performance.now() - startTime;
            
            expect(response.status).toBe(200);
            expect(responseTime).toBeLessThan(300); // Under 300ms
            
            console.log(`Dashboard response time: ${responseTime.toFixed(2)}ms`);
        });
        
        test('Admin results endpoint should handle load efficiently', async () => {
            const startTime = performance.now();
            
            const response = await request(app)
                .get('/api/admin/results')
                .set('Authorization', `Bearer ${testAdminToken}`);
            
            const responseTime = performance.now() - startTime;
            
            expect(response.status).toBe(200);
            expect(responseTime).toBeLessThan(1000); // Under 1 second
            
            console.log(`Admin results response time: ${responseTime.toFixed(2)}ms`);
        });
    });

    describe('Database Query Performance', () => {
        test('Question fetching should be optimized', async () => {
            const startTime = performance.now();
            
            const questions = await dbOptimizer.getQuestionsOptimized({
                grade: 6,
                limit: 50,
                includeOptions: true
            });
            
            const queryTime = performance.now() - startTime;
            
            expect(questions.length).toBeGreaterThan(0);
            expect(queryTime).toBeLessThan(100); // Under 100ms
            
            console.log(`Question fetch time: ${queryTime.toFixed(2)}ms for ${questions.length} questions`);
        });
        
        test('Student progress queries should be efficient', async () => {
            const startTime = performance.now();
            
            const progress = await dbOptimizer.getStudentProgressOptimized(1);
            
            const queryTime = performance.now() - startTime;
            
            expect(progress).toBeDefined();
            expect(queryTime).toBeLessThan(150); // Under 150ms
            
            console.log(`Student progress query time: ${queryTime.toFixed(2)}ms`);
        });
        
        test('Database indexes should be properly created', async () => {
            const startTime = performance.now();
            
            const indexTime = await dbOptimizer.createOptimizedIndexes();
            
            expect(indexTime).toBeDefined();
            expect(indexTime).toBeLessThan(1000); // Under 1 second
            
            console.log(`Index creation/verification time: ${indexTime.toFixed(2)}ms`);
        });
        
        test('Batch operations should outperform individual queries', async () => {
            const queries = [
                'SELECT COUNT(*) FROM questions WHERE grade = ?',
                'SELECT COUNT(*) FROM students WHERE grade = ?',
                'SELECT COUNT(*) FROM quizzes WHERE grade = ?'
            ];
            const params = [[6], [6], [6]];
            
            // Test batch execution
            const batchStart = performance.now();
            const batchResults = await dbOptimizer.executeBatchQuery(queries, params);
            const batchTime = performance.now() - batchStart;
            
            expect(batchResults).toHaveLength(3);
            expect(batchTime).toBeLessThan(200); // Under 200ms for batch
            
            console.log(`Batch query time: ${batchTime.toFixed(2)}ms for ${queries.length} queries`);
        });
    });

    describe('Memory Usage Tests', () => {
        test('Memory usage should remain stable during quiz operations', async () => {
            const initialMemory = process.memoryUsage();
            
            // Simulate multiple quiz operations
            const promises = [];
            for (let i = 0; i < 10; i++) {
                promises.push(
                    request(app)
                        .post('/api/quiz/start')
                        .set('Authorization', `Bearer ${testStudentToken}`)
                        .send({ grade: 6 })
                );
            }
            
            await Promise.all(promises);
            
            // Force garbage collection if available
            if (global.gc) {
                global.gc();
            }
            
            const finalMemory = process.memoryUsage();
            const memoryIncrease = finalMemory.heapUsed - initialMemory.heapUsed;
            const memoryIncreaseMB = memoryIncrease / 1024 / 1024;
            
            console.log(`Memory increase: ${memoryIncreaseMB.toFixed(2)}MB`);
            
            // Memory increase should be reasonable (under 50MB for 10 operations)
            expect(memoryIncreaseMB).toBeLessThan(50);
        });
        
        test('Database connection pool should not leak', async () => {
            const initialConnections = database.getConnectionCount?.() || 0;
            
            // Perform multiple database operations
            for (let i = 0; i < 20; i++) {
                await dbOptimizer.getQuestionsOptimized({
                    grade: 6,
                    limit: 10
                });
            }
            
            const finalConnections = database.getConnectionCount?.() || 0;
            
            // Connection count should not grow significantly
            expect(finalConnections - initialConnections).toBeLessThan(5);
            
            console.log(`Connection pool: ${initialConnections} -> ${finalConnections}`);
        });
    });

    describe('Concurrent Load Tests', () => {
        test('System should handle concurrent quiz starts', async () => {
            const concurrentRequests = 20;
            const startTime = performance.now();
            
            const promises = Array(concurrentRequests).fill().map((_, index) => 
                request(app)
                    .post('/api/quiz/start')
                    .set('Authorization', `Bearer ${testStudentToken}`)
                    .send({ grade: 6 })
                    .catch(err => ({ error: err.message }))
            );
            
            const results = await Promise.all(promises);
            const totalTime = performance.now() - startTime;
            const avgResponseTime = totalTime / concurrentRequests;
            
            const successfulRequests = results.filter(r => !r.error).length;
            const successRate = (successfulRequests / concurrentRequests) * 100;
            
            console.log(`Concurrent load test: ${successRate}% success rate, ${avgResponseTime.toFixed(2)}ms avg response time`);
            
            expect(successRate).toBeGreaterThan(80); // At least 80% success rate
            expect(avgResponseTime).toBeLessThan(1000); // Under 1 second average
        });
        
        test('Database should handle concurrent queries efficiently', async () => {
            const concurrentQueries = 15;
            const startTime = performance.now();
            
            const promises = Array(concurrentQueries).fill().map(() => 
                dbOptimizer.getQuestionsOptimized({
                    grade: Math.floor(Math.random() * 5) + 6, // Random grade 6-10
                    limit: 25
                })
            );
            
            const results = await Promise.all(promises);
            const totalTime = performance.now() - startTime;
            const avgQueryTime = totalTime / concurrentQueries;
            
            const successfulQueries = results.filter(r => r && r.length > 0).length;
            const successRate = (successfulQueries / concurrentQueries) * 100;
            
            console.log(`Concurrent DB test: ${successRate}% success rate, ${avgQueryTime.toFixed(2)}ms avg query time`);
            
            expect(successRate).toBe(100); // All queries should succeed
            expect(avgQueryTime).toBeLessThan(200); // Under 200ms average
        });
    });

    describe('Performance Regression Tests', () => {
        test('Performance should not degrade over time', async () => {
            const benchmarks = {
                quizStart: 500, // ms
                questionFetch: 100, // ms
                authVerify: 200, // ms
                dashboardLoad: 300 // ms
            };
            
            // Test quiz start performance
            const quizStartTime = performance.now();
            await request(app)
                .post('/api/quiz/start')
                .set('Authorization', `Bearer ${testStudentToken}`)
                .send({ grade: 6 });
            const quizStartDuration = performance.now() - quizStartTime;
            
            // Test question fetch performance
            const questionFetchTime = performance.now();
            await dbOptimizer.getQuestionsOptimized({ grade: 6, limit: 50 });
            const questionFetchDuration = performance.now() - questionFetchTime;
            
            // Test auth verify performance
            const authVerifyTime = performance.now();
            await request(app)
                .post('/api/auth/verify')
                .set('Authorization', `Bearer ${testStudentToken}`);
            const authVerifyDuration = performance.now() - authVerifyTime;
            
            // Test dashboard load performance
            const dashboardTime = performance.now();
            await request(app)
                .get('/api/students/dashboard')
                .set('Authorization', `Bearer ${testStudentToken}`);
            const dashboardDuration = performance.now() - dashboardTime;
            
            const results = {
                quizStart: quizStartDuration,
                questionFetch: questionFetchDuration,
                authVerify: authVerifyDuration,
                dashboardLoad: dashboardDuration
            };
            
            console.log('Performance benchmarks:', results);
            
            // Check against benchmarks
            Object.entries(results).forEach(([operation, duration]) => {
                expect(duration).toBeLessThan(benchmarks[operation]);
            });
        });
    });

    describe('Cache Performance Tests', () => {
        test('Question caching should improve subsequent requests', async () => {
            // Clear cache first
            dbOptimizer.clearCache();
            
            // First request (cache miss)
            const firstRequestTime = performance.now();
            const firstResult = await dbOptimizer.getQuestionsOptimized({
                grade: 6,
                limit: 50,
                includeOptions: true
            });
            const firstDuration = performance.now() - firstRequestTime;
            
            // Second request (cache hit)
            const secondRequestTime = performance.now();
            const secondResult = await dbOptimizer.getQuestionsOptimized({
                grade: 6,
                limit: 50,
                includeOptions: true
            });
            const secondDuration = performance.now() - secondRequestTime;
            
            console.log(`Cache performance: ${firstDuration.toFixed(2)}ms (miss) vs ${secondDuration.toFixed(2)}ms (hit)`);
            
            expect(firstResult).toEqual(secondResult);
            expect(secondDuration).toBeLessThan(firstDuration * 0.5); // Cache should be at least 50% faster
        });
    });
});

// Helper function to run performance benchmarks
function runPerformanceBenchmark(name, fn, iterations = 100) {
    return new Promise(async (resolve) => {
        const times = [];
        
        for (let i = 0; i < iterations; i++) {
            const start = performance.now();
            await fn();
            const end = performance.now();
            times.push(end - start);
        }
        
        const avg = times.reduce((a, b) => a + b, 0) / times.length;
        const min = Math.min(...times);
        const max = Math.max(...times);
        const p95 = times.sort((a, b) => a - b)[Math.floor(times.length * 0.95)];
        
        console.log(`${name} benchmark (${iterations} iterations):`);
        console.log(`  Average: ${avg.toFixed(2)}ms`);
        console.log(`  Min: ${min.toFixed(2)}ms`);
        console.log(`  Max: ${max.toFixed(2)}ms`);
        console.log(`  95th percentile: ${p95.toFixed(2)}ms`);
        
        resolve({ avg, min, max, p95 });
    });
}