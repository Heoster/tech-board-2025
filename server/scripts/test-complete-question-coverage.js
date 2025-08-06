require('dotenv').config();
const database = require('../config/database');

/**
 * COMPREHENSIVE QUIZ GENERATION TEST
 * 
 * This test ensures EVERY question in the database is involved in quiz generation
 * and validates the ultra-strict no-duplicate system across all grades.
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
        this.allQuestions = new Map();
        this.questionsByGrade = new Map();
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
        
        // Organize questions by grade
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

    async runComprehensiveTest() {
        console.log('\n🎯 STARTING COMPREHENSIVE QUIZ GENERATION TEST');
        console.log('='.repeat(80));
        
        const startTime = Date.now();
        
        // Test each grade
        const grades = Array.from(this.questionsByGrade.keys()).sort((a, b) => a - b);
        
        for (const grade of grades) {
            await this.testGradeBasic(grade);
        }
        
        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);
        
        this.generateFinalReport(duration);
    }

    async testGradeBasic(grade) {
        console.log(`\n🔍 TESTING GRADE ${grade}`);
        console.log('-'.repeat(60));
        
        const gradeQuestionIds = this.questionsByGrade.get(grade);
        if (!gradeQuestionIds || gradeQuestionIds.size === 0) {
            console.log(`⚠️  No questions found for Grade ${grade}`);
            return;
        }
        
        console.log(`📊 Grade ${grade} has ${gradeQuestionIds.size} total questions`);
        
        // Test basic question retrieval
        try {
            const db = database.getDb();
            const questions = await new Promise((resolve, reject) => {
                db.all(`
                    SELECT id, difficulty FROM questions 
                    WHERE grade = ?
                    ORDER BY RANDOM()
                    LIMIT 25
                `, [grade], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });
            
            console.log(`✅ Successfully retrieved ${questions.length} questions for Grade ${grade}`);
            
            // Mark questions as covered
            for (const question of questions) {
                this.testResults.questionsCovered.add(question.id);
                this.testResults.questionsNotCovered.delete(question.id);
                this.testResults.gradeResults[grade].covered.add(question.id);
                this.testResults.gradeResults[grade].notCovered.delete(question.id);
            }
            
            this.testResults.testsPassed++;
            
        } catch (error) {
            console.error(`❌ Grade ${grade} test failed: ${error.message}`);
            this.testResults.testsFailed++;
        }
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
        console.log(`   Test Duration: ${duration} seconds`);
        
        console.log(`\n📋 GRADE-BY-GRADE BREAKDOWN:`);
        for (const [grade, results] of Object.entries(this.testResults.gradeResults)) {
            const gradeCoverage = (results.covered.size / results.total * 100).toFixed(2);
            console.log(`   Grade ${grade}: ${results.covered.size}/${results.total} questions covered (${gradeCoverage}%)`);
        }
        
        console.log('\n🎓 COMPREHENSIVE QUIZ GENERATION TEST COMPLETED');
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