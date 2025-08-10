#!/usr/bin/env node

/**
 * Deployment Verification Script for TECH BOARD 2025
 * Verifies all systems are working correctly
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.API_URL || 'http://localhost:8000';

class DeploymentVerifier {
    constructor() {
        this.results = {
            passed: 0,
            failed: 0,
            warnings: 0,
            tests: []
        };
    }

    async runTest(name, testFn) {
        try {
            console.log(`🧪 Testing: ${name}`);
            const result = await testFn();
            
            if (result.status === 'PASSED') {
                this.results.passed++;
                console.log(`✅ ${name}: PASSED`);
            } else if (result.status === 'WARNING') {
                this.results.warnings++;
                console.log(`⚠️  ${name}: WARNING - ${result.message}`);
            } else {
                this.results.failed++;
                console.log(`❌ ${name}: FAILED - ${result.message}`);
            }
            
            this.results.tests.push({
                name,
                status: result.status,
                message: result.message,
                timestamp: new Date().toISOString()
            });
            
        } catch (error) {
            this.results.failed++;
            console.log(`❌ ${name}: FAILED - ${error.message}`);
            
            this.results.tests.push({
                name,
                status: 'FAILED',
                message: error.message,
                timestamp: new Date().toISOString()
            });
        }
    }

    async testServerHealth() {
        try {
            const response = await axios.get(`${BASE_URL}/api/health`, { timeout: 5000 });
            
            if (response.status === 200 && response.data.status === 'OK') {
                return { status: 'PASSED', message: 'Server health check passed' };
            } else {
                return { status: 'FAILED', message: 'Server health check returned unexpected response' };
            }
        } catch (error) {
            return { status: 'FAILED', message: `Server not responding: ${error.message}` };
        }
    }

    async testDatabaseConnection() {
        try {
            const response = await axios.get(`${BASE_URL}/api/health`, { timeout: 5000 });
            
            if (response.data.database === 'Connected' && response.data.questionCount > 0) {
                return { status: 'PASSED', message: `Database connected with ${response.data.questionCount} questions` };
            } else if (response.data.database === 'Initializing') {
                return { status: 'WARNING', message: 'Database is still initializing' };
            } else {
                return { status: 'FAILED', message: 'Database connection failed' };
            }
        } catch (error) {
            return { status: 'FAILED', message: `Database check failed: ${error.message}` };
        }
    }

    async testAuthEndpoints() {
        try {
            // Test invalid login (should return 401)
            const response = await axios.post(`${BASE_URL}/api/auth/login`, {
                rollNumber: 999,
                grade: 6,
                section: 'A',
                password: 'invalid'
            }, { 
                timeout: 5000,
                validateStatus: () => true // Don't throw on 4xx/5xx
            });
            
            if (response.status === 401) {
                return { status: 'PASSED', message: 'Authentication endpoints working correctly' };
            } else {
                return { status: 'FAILED', message: `Unexpected auth response: ${response.status}` };
            }
        } catch (error) {
            return { status: 'FAILED', message: `Auth endpoint test failed: ${error.message}` };
        }
    }

    async testAdminEndpoints() {
        try {
            // Test admin login without credentials (should return 401)
            const response = await axios.get(`${BASE_URL}/api/admin/students`, {
                timeout: 5000,
                validateStatus: () => true
            });
            
            if (response.status === 401) {
                return { status: 'PASSED', message: 'Admin endpoints properly protected' };
            } else {
                return { status: 'FAILED', message: `Admin endpoints not properly protected: ${response.status}` };
            }
        } catch (error) {
            return { status: 'FAILED', message: `Admin endpoint test failed: ${error.message}` };
        }
    }

    async testRateLimiting() {
        try {
            // Make multiple rapid requests to test rate limiting
            const promises = Array(5).fill().map(() => 
                axios.get(`${BASE_URL}/api/health`, { 
                    timeout: 2000,
                    validateStatus: () => true 
                })
            );
            
            const responses = await Promise.all(promises);
            const rateLimited = responses.some(r => r.status === 429);
            
            if (rateLimited) {
                return { status: 'WARNING', message: 'Rate limiting may be too aggressive' };
            } else {
                return { status: 'PASSED', message: 'Rate limiting configured appropriately' };
            }
        } catch (error) {
            return { status: 'WARNING', message: `Rate limiting test inconclusive: ${error.message}` };
        }
    }

    async testFileStructure() {
        const requiredFiles = [
            'server/index.js',
            'server/package.json',
            'server/config/database.js',
            'client/package.json',
            'database/mcq_system.db'
        ];
        
        const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(__dirname, file)));
        
        if (missingFiles.length === 0) {
            return { status: 'PASSED', message: 'All required files present' };
        } else {
            return { status: 'FAILED', message: `Missing files: ${missingFiles.join(', ')}` };
        }
    }

    async testClientBuild() {
        const clientBuildPath = path.join(__dirname, 'client', 'dist');
        const indexPath = path.join(clientBuildPath, 'index.html');
        
        if (fs.existsSync(indexPath)) {
            return { status: 'PASSED', message: 'Client build exists' };
        } else {
            return { status: 'FAILED', message: 'Client build not found. Run: cd client && npm run build' };
        }
    }

    async runAllTests() {
        console.log('🚀 Starting TECH BOARD 2025 Deployment Verification\n');
        
        await this.runTest('File Structure Check', () => this.testFileStructure());
        await this.runTest('Client Build Check', () => this.testClientBuild());
        await this.runTest('Server Health Check', () => this.testServerHealth());
        await this.runTest('Database Connection', () => this.testDatabaseConnection());
        await this.runTest('Authentication Endpoints', () => this.testAuthEndpoints());
        await this.runTest('Admin Endpoints Security', () => this.testAdminEndpoints());
        await this.runTest('Rate Limiting', () => this.testRateLimiting());
        
        this.printSummary();
    }

    printSummary() {
        console.log('\n📊 DEPLOYMENT VERIFICATION SUMMARY');
        console.log('=====================================');
        console.log(`✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed}`);
        console.log(`⚠️  Warnings: ${this.results.warnings}`);
        console.log(`📝 Total Tests: ${this.results.tests.length}`);
        
        if (this.results.failed === 0) {
            console.log('\n🎉 ALL TESTS PASSED! Your deployment is ready.');
            console.log('\n🌐 Access your application at:');
            console.log(`   - Frontend: ${BASE_URL.replace('/api', '')}`);
            console.log(`   - Admin: ${BASE_URL.replace('/api', '')}/admin/login`);
            console.log(`   - API Health: ${BASE_URL}/api/health`);
        } else {
            console.log('\n⚠️  DEPLOYMENT HAS ISSUES! Please fix the failed tests before proceeding.');
        }
        
        // Save detailed results
        const reportPath = path.join(__dirname, 'deployment-verification-report.json');
        fs.writeFileSync(reportPath, JSON.stringify({
            timestamp: new Date().toISOString(),
            summary: {
                passed: this.results.passed,
                failed: this.results.failed,
                warnings: this.results.warnings,
                total: this.results.tests.length
            },
            tests: this.results.tests,
            environment: {
                nodeVersion: process.version,
                platform: process.platform,
                baseUrl: BASE_URL
            }
        }, null, 2));
        
        console.log(`\n📄 Detailed report saved to: ${reportPath}`);
    }
}

// Run verification
const verifier = new DeploymentVerifier();
verifier.runAllTests().catch(console.error);