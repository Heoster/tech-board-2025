require('dotenv').config();
const axios = require('axios');
const database = require('./server/config/database');

/**
 * API QUIZ GENERATION STRESS TEST
 * 
 * This test validates the actual API endpoints for quiz generation
 * by simulating real student interactions and ensuring the API
 * properly handles the ultra-strict no-duplicate requirements.
 */

class APIQuizGenerationTester {
    constructor() {
        this.baseURL = 'http://localhost:8000/api';
        this.testResults = {
            totalAPITests: 0,
            successfulTests: 0,
            failedTests: 0,
            duplicatesFound: [],
            apiErrors: [],
            studentsCreated: [],
            quizzesGenerated: [],
            coverageByGrade: {}
        };
    }

    async startServer() {
        console.log('🚀 Starting server for API testing...');
        
        // Import and start the server
        const app = require('./server/index');
        
        return new Promise((resolve) => {
            this.server = app.listen(8000, () => {
                console.log('✅ Test server started on port 8000');
                resolve();
            });
        });
    }

    async stopServer() {
        if (this.server) {
            this.server.close();
            console.log('🛑 Test server stopped');
        }
    }

    async createTestStudent(rollNumber, grade, section = 'A') {
        try {
            const studentData = {
                name: `TestStudent${rollNumber}`,
                rollNumber: rollNumber,
                grade: grade,
                section: section,
                password: 'test123'
            };

            const response = await axios.post(`${this.baseURL}/auth/register`, studentData);
            
            if (response.data.success) {
                console.log(`✅ Created test student: Roll ${rollNumber}, Grade ${grade}`);
                this.testResults.studentsCreated.push({
                    rollNumber,
                    grade,
                    section,
                    token: response.data.data.token
                });
                return response.data.data.token;
            } else {
                throw new Error(response.data.error.message);
            }
        } catch (error) {
            console.error(`❌ Failed to create student Roll ${rollNumber}, Grade ${grade}:`, error.message);
            return null;
        }
    }

    async generateQuizViaAPI(token, grade) {
        try {
            const response = await axios.get(`${this.baseURL}/quiz/start/${grade}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.success) {
                const quiz = response.data.data;
                console.log(`✅ Generated quiz for Grade ${grade}: ${quiz.questions.length} questions`);
                
                // Validate no duplicates in the quiz
                const questionIds = quiz.questions.map(q => q.id);
                const uniqueIds = [...new Set(questionIds)];
                
                if (uniqueIds.length !== questionIds.length) {
                    const duplicates = questionIds.filter((id, index) => questionIds.indexOf(id) !== index);
                    console.error(`❌ DUPLICATES FOUND in API response: [${duplicates.join(', ')}]`);
                    this.testResults.duplicatesFound.push({
                        grade: grade,
                        quizId: quiz.quizId,
                        duplicates: duplicates
                    });
                    this.testResults.failedTests++;
                } else {
                    this.testResults.successfulTests++;
                }

                this.testResults.quizzesGenerated.push({
                    grade: grade,
                    quizId: quiz.quizId,
                    questionIds: questionIds,
                    questionCount: questionIds.length
                });

                return quiz;
            } else {
                throw new Error(response.data.error.message);
            }
        } catch (error) {
            console.error(`❌ Failed to generate quiz for Grade ${grade}:`, error.message);
            this.testResults.apiErrors.push({
                grade: grade,
                error: error.message
            });
            this.testResults.failedTests++;
            return null;
        }
    }

    async testGradeAPIExhaustively(grade, numStudents = 10, quizzesPerStudent = 5) {
        console.log(`\n🔍 TESTING GRADE ${grade} API EXHAUSTIVELY`);
        console.log(`   Creating ${numStudents} students, ${quizzesPerStudent} quizzes each`);
        console.log('-'.repeat(60));

        const gradeQuestions = new Set();
        const studentTokens = [];

        // Create test students for this grade
        for (let i = 1; i <= numStudents; i++) {
            const rollNumber = 1000 + (grade * 100) + i; // Unique roll numbers
            const token = await this.createTestStudent(rollNumber, grade);
            if (token) {
                studentTokens.push({ rollNumber, token });
            }
        }

        console.log(`✅ Created ${studentTokens.length}/${numStudents} test students for Grade ${grade}`);

        // Generate multiple quizzes for each student
        for (let studentIndex = 0; studentIndex < studentTokens.length; studentIndex++) {
            const { rollNumber, token } = studentTokens[studentIndex];
            
            console.log(`\n   👤 Testing Student ${rollNumber} (${studentIndex + 1}/${studentTokens.length})`);
            
            for (let quizIndex = 1; quizIndex <= quizzesPerStudent; quizIndex++) {
                console.log(`      📝 Generating Quiz ${quizIndex}/${quizzesPerStudent}...`);
                
                const quiz = await this.generateQuizViaAPI(token, grade);
                this.testResults.totalAPITests++;
                
                if (quiz) {
                    // Track questions used
                    for (const questionId of quiz.questions.map(q => q.id)) {
                        gradeQuestions.add(questionId);
                    }
                    
                    // Small delay to avoid overwhelming the server
                    await new Promise(resolve => setTimeout(resolve, 100));
                } else {
                    console.log(`      ⚠️  Quiz ${quizIndex} failed - may have exhausted unique questions`);
                    break; // Stop generating quizzes for this student
                }
            }
        }

        // Store coverage results for this grade
        this.testResults.coverageByGrade[grade] = {
            studentsCreated: studentTokens.length,
            uniqueQuestionsUsed: gradeQuestions.size,
            totalQuizzesAttempted: numStudents * quizzesPerStudent,
            successfulQuizzes: this.testResults.quizzesGenerated.filter(q => q.grade === grade).length
        };

        console.log(`\n📊 Grade ${grade} API Test Results:`);
        console.log(`   Students Created: ${studentTokens.length}`);
        console.log(`   Unique Questions Used: ${gradeQuestions.size}`);
        console.log(`   Successful Quizzes: ${this.testResults.coverageByGrade[grade].successfulQuizzes}`);
    }

    async validateDatabaseIntegrity() {
        console.log('\n🔍 VALIDATING DATABASE INTEGRITY AFTER API TESTS');
        console.log('-'.repeat(60));

        await database.connect();
        const db = database.getDb();

        // Check for duplicate responses in database
        const duplicateResponses = await new Promise((resolve, reject) => {
            db.all(`
                SELECT quiz_id, question_id, COUNT(*) as count
                FROM responses
                GROUP BY quiz_id, question_id
                HAVING COUNT(*) > 1
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        if (duplicateResponses.length > 0) {
            console.error(`❌ DATABASE INTEGRITY VIOLATION: Found ${duplicateResponses.length} duplicate responses`);
            for (const dup of duplicateResponses.slice(0, 5)) {
                console.error(`   Quiz ${dup.quiz_id}, Question ${dup.question_id}: ${dup.count} responses`);
            }
        } else {
            console.log(`✅ Database integrity maintained - no duplicate responses found`);
        }

        // Check quiz completion status
        const quizStats = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    grade,
                    status,
                    COUNT(*) as count,
                    AVG(score) as avg_score
                FROM quizzes
                GROUP BY grade, status
                ORDER BY grade, status
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log(`\n📊 Quiz Statistics by Grade and Status:`);
        for (const stat of quizStats) {
            console.log(`   Grade ${stat.grade}, ${stat.status}: ${stat.count} quizzes, avg score: ${stat.avg_score ? stat.avg_score.toFixed(1) : 'N/A'}`);
        }

        await database.close();
    }

    async runAPIStressTest() {
        console.log('\n🎯 STARTING API QUIZ GENERATION STRESS TEST');
        console.log('='.repeat(80));

        const startTime = Date.now();

        try {
            // Start the server
            await this.startServer();
            
            // Wait for server to be ready
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Test each grade
            const grades = [6, 7, 8, 9, 11];
            
            for (const grade of grades) {
                await this.testGradeAPIExhaustively(grade, 5, 3); // 5 students, 3 quizzes each
            }

            // Validate database integrity
            await this.validateDatabaseIntegrity();

        } catch (error) {
            console.error('❌ API stress test failed:', error);
        } finally {
            await this.stopServer();
        }

        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);

        this.generateAPITestReport(duration);
    }

    generateAPITestReport(duration) {
        console.log('\n' + '='.repeat(80));
        console.log('📊 API QUIZ GENERATION STRESS TEST RESULTS');
        console.log('='.repeat(80));

        const successRate = this.testResults.totalAPITests > 0 ? 
            (this.testResults.successfulTests / this.testResults.totalAPITests * 100).toFixed(2) : 0;

        console.log(`\n🎯 OVERALL API TEST RESULTS:`);
        console.log(`   Total API Tests: ${this.testResults.totalAPITests}`);
        console.log(`   Successful Tests: ${this.testResults.successfulTests}`);
        console.log(`   Failed Tests: ${this.testResults.failedTests}`);
        console.log(`   Success Rate: ${successRate}%`);
        console.log(`   Test Duration: ${duration} seconds`);

        console.log(`\n👥 STUDENT CREATION:`);
        console.log(`   Students Created: ${this.testResults.studentsCreated.length}`);
        console.log(`   Quizzes Generated: ${this.testResults.quizzesGenerated.length}`);

        console.log(`\n📋 COVERAGE BY GRADE:`);
        for (const [grade, coverage] of Object.entries(this.testResults.coverageByGrade)) {
            console.log(`   Grade ${grade}:`);
            console.log(`      Students: ${coverage.studentsCreated}`);
            console.log(`      Unique Questions Used: ${coverage.uniqueQuestionsUsed}`);
            console.log(`      Successful Quizzes: ${coverage.successfulQuizzes}/${coverage.totalQuizzesAttempted}`);
        }

        if (this.testResults.duplicatesFound.length > 0) {
            console.log(`\n❌ API DUPLICATE VIOLATIONS:`);
            for (const dup of this.testResults.duplicatesFound) {
                console.log(`   Grade ${dup.grade}, Quiz ${dup.quizId}: [${dup.duplicates.join(', ')}]`);
            }
        } else {
            console.log(`\n✅ NO DUPLICATES FOUND IN API RESPONSES`);
        }

        if (this.testResults.apiErrors.length > 0) {
            console.log(`\n⚠️  API ERRORS ENCOUNTERED:`);
            const errorCounts = {};
            for (const error of this.testResults.apiErrors) {
                errorCounts[error.error] = (errorCounts[error.error] || 0) + 1;
            }
            for (const [error, count] of Object.entries(errorCounts)) {
                console.log(`   "${error}": ${count} occurrences`);
            }
        }

        console.log(`\n🏆 FINAL API ASSESSMENT:`);
        if (successRate >= 95 && this.testResults.duplicatesFound.length === 0) {
            console.log(`   ✅ EXCELLENT: ${successRate}% success rate with no duplicates`);
        } else if (successRate >= 90 && this.testResults.duplicatesFound.length === 0) {
            console.log(`   ✅ GOOD: ${successRate}% success rate with no duplicates`);
        } else if (successRate >= 80) {
            console.log(`   ⚠️  ACCEPTABLE: ${successRate}% success rate, ${this.testResults.duplicatesFound.length} duplicates found`);
        } else {
            console.log(`   ❌ NEEDS IMPROVEMENT: ${successRate}% success rate, ${this.testResults.duplicatesFound.length} duplicates found`);
        }

        console.log('\n' + '='.repeat(80));
        console.log('🎓 API QUIZ GENERATION STRESS TEST COMPLETED');
        console.log('='.repeat(80));
    }
}

// Main execution
async function runAPIStressTest() {
    const tester = new APIQuizGenerationTester();
    await tester.runAPIStressTest();
}

// Run the test if this file is executed directly
if (require.main === module) {
    runAPIStressTest();
}

module.exports = { APIQuizGenerationTester, runAPIStressTest };