const axios = require('axios');

const RAILWAY_URL = 'https://tech-board.up.railway.app';

// Test configuration
const TEST_CONFIG = {
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Tech-Board-Feature-Test/1.0'
  }
};

// Test data
const TEST_STUDENT = {
  rollNumber: 'TEST001',
  name: 'Test Student',
  grade: 6,
  section: 'A'
};

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

class TechBoardTester {
  constructor() {
    this.results = [];
    this.adminToken = null;
    this.studentToken = null;
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️';
    console.log(`${prefix} [${timestamp.split('T')[1].split('.')[0]}] ${message}`);
  }

  addResult(test, status, details = '') {
    this.results.push({ test, status, details, timestamp: new Date().toISOString() });
  }

  async makeRequest(method, endpoint, data = null, token = null) {
    const config = {
      method,
      url: `${RAILWAY_URL}${endpoint}`,
      ...TEST_CONFIG,
      validateStatus: () => true
    };

    if (data) config.data = data;
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return await axios(config);
  }

  // Test 1: Basic Health and Connectivity
  async testHealthAndConnectivity() {
    await this.log('🔍 Testing Health and Connectivity...');
    
    try {
      const response = await this.makeRequest('GET', '/api/health');
      
      if (response.status === 200) {
        const health = response.data;
        const isHealthy = health.status === 'OK' && 
                         health.database?.connected === true &&
                         health.questions?.total >= 1500;
        
        if (isHealthy) {
          this.log(`Health check passed - ${health.questions.total} questions available`, 'success');
          this.addResult('Health Check', 'PASSED', `${health.questions.total} questions, DB connected`);
        } else {
          this.log('Health check failed - system not ready', 'error');
          this.addResult('Health Check', 'FAILED', 'System not healthy');
        }
      } else {
        this.log(`Health endpoint returned ${response.status}`, 'error');
        this.addResult('Health Check', 'FAILED', `HTTP ${response.status}`);
      }
    } catch (error) {
      this.log(`Health check error: ${error.message}`, 'error');
      this.addResult('Health Check', 'ERROR', error.message);
    }
  }

  // Test 2: Frontend Accessibility
  async testFrontendAccess() {
    await this.log('🌐 Testing Frontend Access...');
    
    try {
      const response = await this.makeRequest('GET', '/');
      
      if (response.status === 200 && response.data.includes('<!DOCTYPE html>')) {
        this.log('Frontend is accessible and serving React app', 'success');
        this.addResult('Frontend Access', 'PASSED', 'React app loading correctly');
      } else {
        this.log('Frontend not accessible or not serving correctly', 'error');
        this.addResult('Frontend Access', 'FAILED', `HTTP ${response.status}`);
      }
    } catch (error) {
      this.log(`Frontend access error: ${error.message}`, 'error');
      this.addResult('Frontend Access', 'ERROR', error.message);
    }
  }

  // Test 3: Admin Authentication
  async testAdminAuthentication() {
    await this.log('🔐 Testing Admin Authentication...');
    
    try {
      // Test admin login
      const response = await this.makeRequest('POST', '/api/auth/admin/login', ADMIN_CREDENTIALS);
      
      if (response.status === 200 && response.data.token) {
        this.adminToken = response.data.token;
        this.log('Admin login successful', 'success');
        this.addResult('Admin Login', 'PASSED', 'Token received');
        
        // Test admin dashboard access
        const dashboardResponse = await this.makeRequest('GET', '/api/admin/dashboard', null, this.adminToken);
        
        if (dashboardResponse.status === 200) {
          this.log('Admin dashboard accessible', 'success');
          this.addResult('Admin Dashboard', 'PASSED', 'Dashboard data retrieved');
        } else {
          this.log('Admin dashboard not accessible', 'error');
          this.addResult('Admin Dashboard', 'FAILED', `HTTP ${dashboardResponse.status}`);
        }
      } else {
        this.log(`Admin login failed: ${response.status}`, 'error');
        this.addResult('Admin Login', 'FAILED', response.data?.error || `HTTP ${response.status}`);
      }
    } catch (error) {
      this.log(`Admin authentication error: ${error.message}`, 'error');
      this.addResult('Admin Login', 'ERROR', error.message);
    }
  }

  // Test 4: Student Registration and Authentication
  async testStudentAuthentication() {
    await this.log('👥 Testing Student Registration and Authentication...');
    
    try {
      // Test student registration
      const regResponse = await this.makeRequest('POST', '/api/auth/register', TEST_STUDENT);
      
      if (regResponse.status === 201 || regResponse.status === 200) {
        await this.log('Student registration successful', 'success');
        await this.addResult('Student Registration', 'PASSED', 'Student registered successfully');
        
        // Test student login
        const loginResponse = await this.makeRequest('POST', '/api/auth/login', {
          rollNumber: TEST_STUDENT.rollNumber,
          grade: TEST_STUDENT.grade
        });
        
        if (loginResponse.status === 200 && loginResponse.data.token) {
          this.studentToken = loginResponse.data.token;
          await this.log('Student login successful', 'success');
          await this.addResult('Student Login', 'PASSED', 'Token received');
        } else {
          await this.log(`Student login failed: ${loginResponse.status}`, 'error');
          await this.addResult('Student Login', 'FAILED', loginResponse.data?.error || `HTTP ${loginResponse.status}`);
        }
      } else if (regResponse.status === 409) {
        await this.log('Student already exists, testing login directly', 'warning');
        await this.addResult('Student Registration', 'SKIPPED', 'Student already exists');
        
        // Test login with existing student
        const loginResponse = await this.makeRequest('POST', '/api/auth/login', {
          rollNumber: TEST_STUDENT.rollNumber,
          grade: TEST_STUDENT.grade
        });
        
        if (loginResponse.status === 200 && loginResponse.data.token) {
          this.studentToken = loginResponse.data.token;
          await this.log('Student login successful', 'success');
          await this.addResult('Student Login', 'PASSED', 'Token received');
        } else {
          await this.log(`Student login failed: ${loginResponse.status}`, 'error');
          await this.addResult('Student Login', 'FAILED', loginResponse.data?.error || `HTTP ${loginResponse.status}`);
        }
      } else {
        await this.log(`Student registration failed: ${regResponse.status}`, 'error');
        await this.addResult('Student Registration', 'FAILED', regResponse.data?.error || `HTTP ${regResponse.status}`);
      }
    } catch (error) {
      await this.log(`Student authentication error: ${error.message}`, 'error');
      await this.addResult('Student Authentication', 'ERROR', error.message);
    }
  }

  // Test 5: Quiz Generation and Management
  async testQuizGeneration() {
    await this.log('🎯 Testing Quiz Generation...');
    
    if (!this.studentToken) {
      await this.log('No student token available, skipping quiz tests', 'warning');
      await this.addResult('Quiz Generation', 'SKIPPED', 'No student authentication');
      return;
    }
    
    try {
      // Test quiz start
      const quizResponse = await this.makeRequest('POST', '/api/quiz/start', 
        { grade: TEST_STUDENT.grade }, this.studentToken);
      
      if (quizResponse.status === 200 && quizResponse.data.questions) {
        const questions = quizResponse.data.questions;
        await this.log(`Quiz generated successfully with ${questions.length} questions`, 'success');
        await this.addResult('Quiz Generation', 'PASSED', `${questions.length} questions generated`);
        
        // Validate quiz structure
        const validQuestions = questions.every(q => 
          q.id && q.question && q.options && q.options.length === 4
        );
        
        if (validQuestions) {
          await this.log('Quiz questions have valid structure', 'success');
          await this.addResult('Quiz Structure', 'PASSED', 'All questions properly formatted');
        } else {
          await this.log('Some quiz questions have invalid structure', 'error');
          await this.addResult('Quiz Structure', 'FAILED', 'Invalid question format detected');
        }
        
        // Test quiz submission (with dummy answers)
        const answers = questions.reduce((acc, q, index) => {
          acc[q.id] = 0; // Always select first option
          return acc;
        }, {});
        
        const submitResponse = await this.makeRequest('POST', '/api/quiz/submit', 
          { answers }, this.studentToken);
        
        if (submitResponse.status === 200) {
          await this.log('Quiz submission successful', 'success');
          await this.addResult('Quiz Submission', 'PASSED', 'Quiz submitted and scored');
        } else {
          await this.log(`Quiz submission failed: ${submitResponse.status}`, 'error');
          await this.addResult('Quiz Submission', 'FAILED', `HTTP ${submitResponse.status}`);
        }
      } else {
        await this.log(`Quiz generation failed: ${quizResponse.status}`, 'error');
        await this.addResult('Quiz Generation', 'FAILED', quizResponse.data?.error || `HTTP ${quizResponse.status}`);
      }
    } catch (error) {
      await this.log(`Quiz generation error: ${error.message}`, 'error');
      await this.addResult('Quiz Generation', 'ERROR', error.message);
    }
  }

  // Test 6: Admin Features
  async testAdminFeatures() {
    await this.log('⚙️ Testing Admin Features...');
    
    if (!this.adminToken) {
      await this.log('No admin token available, skipping admin tests', 'warning');
      await this.addResult('Admin Features', 'SKIPPED', 'No admin authentication');
      return;
    }
    
    try {
      // Test results viewing
      const resultsResponse = await this.makeRequest('GET', '/api/admin/results', null, this.adminToken);
      
      if (resultsResponse.status === 200) {
        await this.log('Admin can view results', 'success');
        await this.addResult('Admin Results', 'PASSED', `${resultsResponse.data.length || 0} results found`);
      } else {
        await this.log(`Admin results access failed: ${resultsResponse.status}`, 'error');
        await this.addResult('Admin Results', 'FAILED', `HTTP ${resultsResponse.status}`);
      }
      
      // Test question management
      const questionsResponse = await this.makeRequest('GET', '/api/admin/questions?grade=6&limit=10', null, this.adminToken);
      
      if (questionsResponse.status === 200) {
        await this.log('Admin can access question management', 'success');
        await this.addResult('Question Management', 'PASSED', 'Questions retrieved successfully');
      } else {
        await this.log(`Question management access failed: ${questionsResponse.status}`, 'error');
        await this.addResult('Question Management', 'FAILED', `HTTP ${questionsResponse.status}`);
      }
      
      // Test student management
      const studentsResponse = await this.makeRequest('GET', '/api/admin/students', null, this.adminToken);
      
      if (studentsResponse.status === 200) {
        await this.log('Admin can access student management', 'success');
        await this.addResult('Student Management', 'PASSED', 'Students data retrieved');
      } else {
        await this.log(`Student management access failed: ${studentsResponse.status}`, 'error');
        await this.addResult('Student Management', 'FAILED', `HTTP ${studentsResponse.status}`);
      }
    } catch (error) {
      await this.log(`Admin features error: ${error.message}`, 'error');
      await this.addResult('Admin Features', 'ERROR', error.message);
    }
  }

  // Test 7: Performance and Load
  async testPerformance() {
    await this.log('⚡ Testing Performance...');
    
    try {
      const startTime = Date.now();
      const response = await this.makeRequest('GET', '/api/health');
      const responseTime = Date.now() - startTime;
      
      if (responseTime < 2000) {
        await this.log(`API response time: ${responseTime}ms (Good)`, 'success');
        await this.addResult('Performance', 'PASSED', `${responseTime}ms response time`);
      } else {
        await this.log(`API response time: ${responseTime}ms (Slow)`, 'warning');
        await this.addResult('Performance', 'WARNING', `${responseTime}ms response time`);
      }
    } catch (error) {
      await this.log(`Performance test error: ${error.message}`, 'error');
      await this.addResult('Performance', 'ERROR', error.message);
    }
  }

  // Generate comprehensive report
  async generateReport() {
    await this.log('\n📊 COMPREHENSIVE TEST REPORT', 'info');
    await this.log('=' * 50, 'info');
    
    const passed = this.results.filter(r => r.status === 'PASSED').length;
    const failed = this.results.filter(r => r.status === 'FAILED').length;
    const errors = this.results.filter(r => r.status === 'ERROR').length;
    const skipped = this.results.filter(r => r.status === 'SKIPPED').length;
    const warnings = this.results.filter(r => r.status === 'WARNING').length;
    
    await this.log(`\n📈 Summary:`, 'info');
    await this.log(`  ✅ Passed: ${passed}`, 'success');
    await this.log(`  ❌ Failed: ${failed}`, failed > 0 ? 'error' : 'info');
    await this.log(`  🚫 Errors: ${errors}`, errors > 0 ? 'error' : 'info');
    await this.log(`  ⚠️  Warnings: ${warnings}`, warnings > 0 ? 'warning' : 'info');
    await this.log(`  ⏭️  Skipped: ${skipped}`, 'info');
    
    const total = passed + failed + errors;
    const successRate = total > 0 ? Math.round((passed / total) * 100) : 0;
    await this.log(`  📊 Success Rate: ${successRate}%`, successRate >= 80 ? 'success' : 'error');
    
    await this.log(`\n🔍 Detailed Results:`, 'info');
    this.results.forEach(result => {
      const status = result.status === 'PASSED' ? '✅' : 
                    result.status === 'FAILED' ? '❌' : 
                    result.status === 'ERROR' ? '🚫' : 
                    result.status === 'WARNING' ? '⚠️' : '⏭️';
     await this.log(`  ${status} ${result.test}: ${result.details}`, 'info');
    });
    
    if (successRate >= 80) {
      await this.log('\n🎉 TECH BOARD IS READY FOR PRODUCTION!', 'success');
      await this.log('\n🚀 Access Points:', 'info');
      await this.log(`  🌐 Frontend: ${RAILWAY_URL}`, 'info');
      await this.log(`  👥 Student Registration: ${RAILWAY_URL}/register`, 'info');
      await this.log(`  🔐 Admin Panel: ${RAILWAY_URL}/admin`, 'info');
      await this.log(`  📊 Health Check: ${RAILWAY_URL}/api/health`, 'info');
      
      await this.log('\n🔑 Admin Credentials:', 'info');
      await this.log(`  Username: admin`, 'info');
      await this.log(`  Password: admin123`, 'info');
      await this.log(`  ⚠️  CHANGE PASSWORD AFTER FIRST LOGIN!`, 'warning');
    } else {
      await this.log('\n❌ SYSTEM NOT READY - ISSUES DETECTED', 'error');
      await this.log('\n🔧 Failed Tests:', 'error');
      this.results.filter(r => r.status === 'FAILED' || r.status === 'ERROR').forEach(result => {
      await this.log(`  - ${result.test}: ${result.details}`, 'error');
      });
    }
    
    return successRate >= 80;
  }

  // Run all tests
  async runAllTests() {
    await this.log('🚀 Starting Comprehensive Tech Board Testing...', 'info');
    await this.log(`🎯 Target: ${RAILWAY_URL}`, 'info');
    await this.log('=' * 60, 'info');
    
    await this.testHealthAndConnectivity();
    await this.testFrontendAccess();
    await this.testAdminAuthentication();
    await this.testStudentAuthentication();
    await this.testQuizGeneration();
    await this.testAdminFeatures();
    await this.testPerformance();
    
    return await this.generateReport();
  }
}

// Run the comprehensive test
async function main() {
  const tester = new TechBoardTester();
  
  try {
    const success = await tester.runAllTests();
    process.exit(success ? 0 : 1);
  } catch (error) {
    console.error('❌ Test suite failed:', error.message);
    process.exit(1);
  }
}

// Execute if run directly
if (require.main === module) {
  main();
}

module.exports = TechBoardTester;