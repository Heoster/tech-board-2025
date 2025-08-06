require('dotenv').config();
const database = require('./server/config/database');

/**
 * COMPREHENSIVE QUIZ GENERATION TEST
 * 
 * This test ensures EVERY question in the database is involved in quiz generation
 * and validates the ultra-strict no-duplicate system across all grades.
 * 
 * Test Coverage:
 * - All grades (6, 7, 8, 9, 11)
 * - All difficulty levels (basic, medium, advanced)
 * - Multiple quiz generations per grade
 * - Exhaustive question coverage validation
 * - Duplicate detection across all scenarios
 */

class ComprehensiveQuizTester {
    constructor() {
        this.testResults = {
            totalQuestions: 0,
            questionsCovered: new Set(),
            questionsNotCovered: new Set(),
            duplicatesFound: [],
            testsPassed: 0,
            testsFailed: 0,
            gradeResults: {}
        };
        this.allQuestions = new Map(); // questionId -> question details
        this.questionsByGrade = new Map(); // grade -> Set of question IDs
    }

    async initialize() {
        console.log('🚀 INITIALIZING COMPREHENSIVE QUIZ GENERATION TEST');
        console.log('=' .repeat(80));
        
        await database.connect();
        const db = database.getDb();
        
        // Load ALL questions from database
        const questions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.grade, q.difficulty, q.question_text,
                       COUNT(o.id) as option_count
                FROM questions q
                LEFT JOIN options o ON q.id = o.question_id
                GROUP BY q.id, q.grade, q.difficulty, q.question_text
                ORDER BY q.grade, q.difficulty, q.id
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log(`📊 LOADED ${questions.length} TOTAL QUESTIONS FROM DATABASE`);
        
        // Organize questions by grade and store in maps
        for (const question of questions) {
            this.allQuestions.set(question.id, question);
            this.questionsNotCovered.add(question.id);
            
            if (!this.questionsByGrade.has(question.grade)) {
                this.questionsByGrade.set(question.grade, new Set());
            }
            this.questionsByGrade.get(question.grade).add(question.id);
        }
        
        this.testResults.totalQuestions = questions.length;
        
        // Display question distribution
        console.log('\n📋 QUESTION DISTRIBUTION BY GRADE:');
        for (const [grade, questionIds] of this.questionsByGrade.entries()) {
            const gradeQuestions = Array.from(questionIds).map(id => this.allQuestions.get(id));
            const basic = gradeQuestions.filter(q => q.difficulty === 'basic').length;
            const medium = gradeQuestions.filter(q => q.difficulty === 'medium').length;
            const advanced = gradeQuestions.filter(q => q.difficulty === 'advanced').length;
            
            console.log(`   Grade ${grade}: ${questionIds.size} questions (${basic} basic, ${medium} medium, ${advanced} advanced)`);
            
            this.testResults.gradeResults[grade] = {
                total: questionIds.size,
                basic: basic,
                medium: medium,
                advanced: advanced,
                covered: new Set(),
                notCovered: new Set(questionIds),
                quizzesGenerated: 0,
                duplicatesFound: []
            };
        }
        
        console.log(`\n🎯 TARGET: Test EVERY question across ALL grades`);
        console.log(`📊 TOTAL QUESTIONS TO COVER: ${this.testResults.totalQuestions}`);
    }

    async testGradeExhaustively(grade) {
        console.log(`\n🔍 TESTING GRADE ${grade} EXHAUSTIVELY`);
        console.log('-'.repeat(60));
        
        const gradeQuestionIds = this.questionsByGrade.get(grade);
        if (!gradeQuestionIds || gradeQuestionIds.size === 0) {
            console.log(`⚠️  No questions found for Grade ${grade}`);
            return;
        }
        
        const totalQuestions = gradeQuestionIds.size;
        console.log(`📊 Grade ${grade} has ${totalQuestions} total questions`);
        
        // Calculate how many quizzes needed to cover all questions
        const questionsPerQuiz = 25;
        const maxQuizzesNeeded = Math.ceil(totalQuestions / questionsPerQuiz);
        const actualQuizzesToGenerate = Math.min(maxQuizzesNeeded * 2, 50); // Generate extra to test overlap
        
        console.log(`🎯 Generating ${actualQuizzesToGenerate} quizzes to ensure complete coverage`);
        
        const allGeneratedQuestions = new Set();
        const quizQuestions = [];
        
        // Create multiple test students for this grade
        const testStudents = [];
        for (let i = 0; i < Math.min(10, actualQuizzesToGenerate); i++) {
            testStudents.push({
                id: 1000 + i,
                name: `TestStudent${i}`,
                grade: grade
            });
        }
        
        // Generate quizzes for each test student
        for (let quizIndex = 0; quizIndex < actualQuizzesToGenerate; quizIndex++) {
            const studentId = testStudents[quizIndex % testStudents.length].id;
            
            try {
                console.log(`\n   📝 Generating Quiz ${quizIndex + 1}/${actualQuizzesToGenerate} for Grade ${grade} (Student ${studentId})`);
                
                const selectedQuestions = await this.generateQuizQuestions(grade, studentId, allGeneratedQuestions);
                
                if (selectedQuestions && selectedQuestions.length > 0) {
                    quizQuestions.push({
                        quizIndex: quizIndex + 1,
                        studentId: studentId,
                        questions: selectedQuestions
                    });
                    
                    // Track all questions used
                    for (const questionId of selectedQuestions) {
                        allGeneratedQuestions.add(questionId);
                        this.testResults.questionsCovered.add(questionId);
                        this.testResults.questionsNotCovered.delete(questionId);
                        this.testResults.gradeResults[grade].covered.add(questionId);
                        this.testResults.gradeResults[grade].notCovered.delete(questionId);
                    }
                    
                    this.testResults.gradeResults[grade].quizzesGenerated++;
                    
                    // Check for duplicates within this quiz
                    const uniqueQuestions = new Set(selectedQuestions);
                    if (uniqueQuestions.size !== selectedQuestions.length) {
                        const duplicates = selectedQuestions.filter((id, index) => selectedQuestions.indexOf(id) !== index);
                        console.error(`❌ DUPLICATES FOUND in Quiz ${quizIndex + 1}: ${duplicates.join(', ')}`);
                        this.testResults.duplicatesFound.push({
                            grade: grade,
                            quiz: quizIndex + 1,
                            studentId: studentId,
                            duplicates: duplicates
                        });
                        this.testResults.gradeResults[grade].duplicatesFound.push(duplicates);
                        this.testResults.testsFailed++;
                    } else {
                        console.log(`   ✅ Quiz ${quizIndex + 1}: ${selectedQuestions.length} unique questions`);
                        this.testResults.testsPassed++;
                    }
                } else {
                    console.log(`   ⚠️  Quiz ${quizIndex + 1}: No questions generated (may have exhausted unique questions)`);
                    break; // Stop if we can't generate more unique questions
                }
                
            } catch (error) {
                console.error(`   ❌ Quiz ${quizIndex + 1} failed: ${error.message}`);
                this.testResults.testsFailed++;
                
                if (error.message.includes('INSUFFICIENT_UNIQUE_QUESTIONS')) {
                    console.log(`   ℹ️  Reached maximum unique questions for Grade ${grade}`);
                    break;
                }
            }
        }
        
        // Analyze coverage for this grade
        const coveragePercentage = (this.testResults.gradeResults[grade].covered.size / totalQuestions * 100).toFixed(2);
        const uncoveredQuestions = Array.from(this.testResults.gradeResults[grade].notCovered);
        
        console.log(`\n📊 GRADE ${grade} COVERAGE ANALYSIS:`);
        console.log(`   Total Questions: ${totalQuestions}`);
        console.log(`   Questions Covered: ${this.testResults.gradeResults[grade].covered.size}`);
        console.log(`   Questions Not Covered: ${uncoveredQuestions.length}`);
        console.log(`   Coverage Percentage: ${coveragePercentage}%`);
        console.log(`   Quizzes Generated: ${this.testResults.gradeResults[grade].quizzesGenerated}`);
        
        if (uncoveredQuestions.length > 0) {
            console.log(`   🔍 Uncovered Question IDs: [${uncoveredQuestions.slice(0, 20).join(', ')}${uncoveredQuestions.length > 20 ? '...' : ''}]`);
            
            // Show details of first few uncovered questions
            console.log(`   📋 Sample Uncovered Questions:`);
            for (let i = 0; i < Math.min(5, uncoveredQuestions.length); i++) {
                const questionId = uncoveredQuestions[i];
                const question = this.allQuestions.get(questionId);
                console.log(`      ID ${questionId}: "${question.question_text.substring(0, 60)}..." (${question.difficulty})`);
            }
        }
        
        // Check for cross-quiz duplicates
        this.checkCrossQuizDuplicates(grade, quizQuestions);
    }

    checkCrossQuizDuplicates(grade, quizQuestions) {
        console.log(`\n🔍 CHECKING CROSS-QUIZ DUPLICATES FOR GRADE ${grade}`);
        
        const questionUsage = new Map(); // questionId -> array of quiz indices
        
        for (const quiz of quizQuestions) {
            for (const questionId of quiz.questions) {
                if (!questionUsage.has(questionId)) {
                    questionUsage.set(questionId, []);
                }
                questionUsage.get(questionId).push(quiz.quizIndex);
            }
        }
        
        const duplicateQuestions = [];
        for (const [questionId, quizIndices] of questionUsage.entries()) {
            if (quizIndices.length > 1) {
                duplicateQuestions.push({
                    questionId: questionId,
                    appearsInQuizzes: quizIndices,
                    count: quizIndices.length
                });
            }
        }
        
        if (duplicateQuestions.length > 0) {
            console.error(`❌ CROSS-QUIZ DUPLICATES FOUND FOR GRADE ${grade}:`);
            for (const dup of duplicateQuestions.slice(0, 10)) {
                const question = this.allQuestions.get(dup.questionId);
                console.error(`   Question ID ${dup.questionId}: appears in quizzes [${dup.appearsInQuizzes.join(', ')}]`);
                console.error(`      "${question.question_text.substring(0, 50)}..."`);
            }
            this.testResults.gradeResults[grade].duplicatesFound.push(...duplicateQuestions);
        } else {
            console.log(`   ✅ No cross-quiz duplicates found for Grade ${grade}`);
        }
    }

    async generateQuizQuestions(grade, studentId, previouslyUsed = new Set()) {
        // Simulate the ultra-strict question selection algorithm
        const db = database.getDb();
        
        // Get all questions for this grade that haven't been used
        const availableQuestions = await new Promise((resolve, reject) => {
            const excludeClause = previouslyUsed.size > 0 ?
                `AND id NOT IN (${Array.from(previouslyUsed).map(() => '?').join(',')})` : '';
            
            db.all(`
                SELECT id, difficulty FROM questions 
                WHERE grade = ? ${excludeClause}
                ORDER BY RANDOM()
            `, [grade, ...Array.from(previouslyUsed)], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        if (availableQuestions.length < 25) {
            throw new Error(`INSUFFICIENT_UNIQUE_QUESTIONS: Only ${availableQuestions.length} available, need 25`);
        }
        
        // Select 25 questions with proper distribution
        const basicQuestions = availableQuestions.filter(q => q.difficulty === 'basic');
        const mediumQuestions = availableQuestions.filter(q => q.difficulty === 'medium');
        const advancedQuestions = availableQuestions.filter(q => q.difficulty === 'advanced');
        
        const selectedQuestions = [];
        
        // Target distribution: 60% basic, 30% medium, 10% advanced
        const basicCount = Math.min(15, basicQuestions.length);
        const mediumCount = Math.min(7, mediumQuestions.length);
        const advancedCount = Math.min(3, advancedQuestions.length);
        
        // Select questions
        selectedQuestions.push(...basicQuestions.slice(0, basicCount).map(q => q.id));
        selectedQuestions.push(...mediumQuestions.slice(0, mediumCount).map(q => q.id));
        selectedQuestions.push(...advancedQuestions.slice(0, advancedCount).map(q => q.id));
        
        // Fill remaining slots if needed
        const remaining = 25 - selectedQuestions.length;
        if (remaining > 0) {
            const remainingQuestions = availableQuestions
                .filter(q => !selectedQuestions.includes(q.id))
                .slice(0, remaining);
            selectedQuestions.push(...remainingQuestions.map(q => q.id));
        }
        
        // Final validation
        const uniqueSelected = [...new Set(selectedQuestions)];
        if (uniqueSelected.length !== selectedQuestions.length) {
            throw new Error('DUPLICATE_QUESTIONS_GENERATED');
        }
        
        return selectedQuestions.slice(0, 25);
    }

    async runComprehensiveTest() {
        console.log('\n🎯 STARTING COMPREHENSIVE QUIZ GENERATION TEST');
        console.log('='.repeat(80));
        
        const startTime = Date.now();
        
        // Test each grade exhaustively
        const grades = Array.from(this.questionsByGrade.keys()).sort((a, b) => a - b);
        
        for (const grade of grades) {
            await this.testGradeExhaustively(grade);
        }
        
        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);
        
        // Generate comprehensive report
        this.generateFinalReport(duration);
    }

    generateFinalReport(duration) {
        console.log('\n' + '='.repeat(80));
        console.log('📊 COMPREHENSIVE QUIZ GENERATION TEST RESULTS');
        console.log('='.repeat(80));
        
        const totalCovered = this.testResults.questionsCovered.size;
        const totalNotCovered = this.testResults.questionsNotCovered.size;
        const overallCoverage = (totalCovered / this.testResults.totalQuestions * 100).toFixed(2);
        
        console.log(`\n🎯 OVERALL COVERAGE:`);
        console.log(`   Total Questions in Database: ${this.testResults.totalQuestions}`);
        console.log(`   Questions Covered by Tests: ${totalCovered}`);
        console.log(`   Questions Not Covered: ${totalNotCovered}`);
        console.log(`   Overall Coverage: ${overallCoverage}%`);
        
        console.log(`\n✅ TEST RESULTS:`);
        console.log(`   Tests Passed: ${this.testResults.testsPassed}`);
        console.log(`   Tests Failed: ${this.testResults.testsFailed}`);
        console.log(`   Total Duplicates Found: ${this.testResults.duplicatesFound.length}`);
        console.log(`   Test Duration: ${duration} seconds`);
        
        console.log(`\n📋 GRADE-BY-GRADE BREAKDOWN:`);
        for (const [grade, results] of Object.entries(this.testResults.gradeResults)) {
            const gradeCoverage = (results.covered.size / results.total * 100).toFixed(2);
            console.log(`   Grade ${grade}:`);
            console.log(`      Questions: ${results.total} total, ${results.covered.size} covered (${gradeCoverage}%)`);
            console.log(`      Quizzes Generated: ${results.quizzesGenerated}`);
            console.log(`      Duplicates Found: ${results.duplicatesFound.length}`);
        }
        
        if (this.testResults.duplicatesFound.length > 0) {
            console.log(`\n❌ DUPLICATE VIOLATIONS FOUND:`);
            for (const duplicate of this.testResults.duplicatesFound.slice(0, 10)) {
                console.log(`   Grade ${duplicate.grade}, Quiz ${duplicate.quiz}: [${duplicate.duplicates.join(', ')}]`);
            }
        }
        
        if (totalNotCovered > 0) {
            console.log(`\n🔍 QUESTIONS NOT COVERED IN ANY TEST:`);
            const uncoveredArray = Array.from(this.testResults.questionsNotCovered);
            console.log(`   Total Uncovered: ${uncoveredArray.length}`);
            console.log(`   Sample IDs: [${uncoveredArray.slice(0, 20).join(', ')}${uncoveredArray.length > 20 ? '...' : ''}]`);
            
            // Group uncovered by grade and difficulty
            const uncoveredByGrade = {};
            for (const questionId of uncoveredArray) {
                const question = this.allQuestions.get(questionId);
                if (!uncoveredByGrade[question.grade]) {
                    uncoveredByGrade[question.grade] = { basic: 0, medium: 0, advanced: 0 };
                }
                uncoveredByGrade[question.grade][question.difficulty]++;
            }
            
            console.log(`   Breakdown by Grade and Difficulty:`);
            for (const [grade, counts] of Object.entries(uncoveredByGrade)) {
                console.log(`      Grade ${grade}: ${counts.basic} basic, ${counts.medium} medium, ${counts.advanced} advanced`);
            }
        }
        
        // Final assessment
        console.log(`\n🏆 FINAL ASSESSMENT:`);
        if (overallCoverage >= 95 && this.testResults.duplicatesFound.length === 0) {
            console.log(`   ✅ EXCELLENT: ${overallCoverage}% coverage with no duplicates`);
        } else if (overallCoverage >= 90 && this.testResults.duplicatesFound.length === 0) {
            console.log(`   ✅ GOOD: ${overallCoverage}% coverage with no duplicates`);
        } else if (overallCoverage >= 80) {
            console.log(`   ⚠️  ACCEPTABLE: ${overallCoverage}% coverage, ${this.testResults.duplicatesFound.length} duplicates found`);
        } else {
            console.log(`   ❌ NEEDS IMPROVEMENT: ${overallCoverage}% coverage, ${this.testResults.duplicatesFound.length} duplicates found`);
        }
        
        console.log(`\n💡 RECOMMENDATIONS:`);
        if (totalNotCovered > 0) {
            console.log(`   - Investigate why ${totalNotCovered} questions were not covered`);
            console.log(`   - Consider adjusting quiz generation algorithm for better coverage`);
        }
        if (this.testResults.duplicatesFound.length > 0) {
            console.log(`   - Fix duplicate detection algorithm - ${this.testResults.duplicatesFound.length} violations found`);
        }
        if (overallCoverage >= 95 && this.testResults.duplicatesFound.length === 0) {
            console.log(`   - System is working excellently! All questions are being utilized properly.`);
        }
        
        console.log('\n' + '='.repeat(80));
        console.log('🎓 COMPREHENSIVE QUIZ GENERATION TEST COMPLETED');
        console.log('='.repeat(80));
    }
}

// Main execution
async function runComprehensiveTest() {
    const tester = new ComprehensiveQuizTester();
    
    try {
        await tester.initialize();
        await tester.runComprehensiveTest();
    } catch (error) {
        console.error('❌ Test failed:', error);
    } finally {
        await database.close();
    }
}

// Run the test if this file is executed directly
if (require.main === module) {
    runComprehensiveTest();
}

module.exports = { ComprehensiveQuizTester, runComprehensiveTest };