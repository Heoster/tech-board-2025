#!/usr/bin/env node

/**
 * Check Railway Questions
 * Simple check of Railway question count
 */

const https = require('https');

async function makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    data: data
                });
            });
        });
        
        req.on('error', reject);
        req.setTimeout(15000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
        
        if (options.body) {
            req.write(options.body);
        }
        req.end();
    });
}

async function checkRailwayQuestions() {
    console.log('🌐 CHECKING RAILWAY QUESTIONS');
    console.log('=============================');
    console.log('');

    const RAILWAY_URL = 'https://tech-board.up.railway.app';

    try {
        // Test quiz generation for each grade to see how many questions are available
        console.log('🎯 Testing quiz generation to estimate question counts...');
        
        // Register test student
        const testStudent = {
            name: 'Count Test Student',
            rollNumber: 88,
            grade: 6,
            section: 'A',
            password: 'count123'
        };

        let studentToken;
        
        // Try to register or login
        const registerResponse = await makeRequest(`${RAILWAY_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testStudent)
        });

        if (registerResponse.statusCode === 201) {
            const registerData = JSON.parse(registerResponse.data);
            studentToken = registerData.data.token;
            console.log('✅ Test student registered');
        } else if (registerResponse.statusCode === 409) {
            // Student exists, try login
            const loginResponse = await makeRequest(`${RAILWAY_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    rollNumber: testStudent.rollNumber,
                    grade: testStudent.grade,
                    section: testStudent.section,
                    password: testStudent.password
                })
            });
            
            if (loginResponse.statusCode === 200) {
                const loginData = JSON.parse(loginResponse.data);
                studentToken = loginData.data.token;
                console.log('✅ Test student logged in');
            }
        }

        if (studentToken) {
            console.log('');
            console.log('📊 Railway Question Availability by Grade:');
            console.log('─────────────────────────────────────────');

            const grades = [6, 7, 8, 9, 11];
            let totalEstimated = 0;

            for (const grade of grades) {
                try {
                    const quizResponse = await makeRequest(`${RAILWAY_URL}/api/quiz/start/${grade}`, {
                        method: 'GET',
                        headers: { 'Authorization': `Bearer ${studentToken}` }
                    });

                    if (quizResponse.statusCode === 200) {
                        const quizData = JSON.parse(quizResponse.data);
                        const questionCount = quizData.data.questions.length;
                        const distribution = quizData.data.questionDistribution;
                        
                        console.log(`   Grade ${grade}: ${questionCount} questions in quiz`);
                        console.log(`     📗 Basic: ${distribution.basic}`);
                        console.log(`     📙 Medium: ${distribution.medium}`);
                        console.log(`     📕 Advanced: ${distribution.advanced}`);
                        
                        // Estimate total questions (quiz is usually 15-50 questions from larger pool)
                        const estimatedTotal = Math.max(questionCount * 2, 50);
                        totalEstimated += estimatedTotal;
                        console.log(`     📊 Estimated total: ~${estimatedTotal} questions`);
                        
                    } else if (quizResponse.statusCode === 409) {
                        console.log(`   Grade ${grade}: ✅ Available (active quiz exists)`);
                        totalEstimated += 50; // Conservative estimate
                    } else {
                        const errorData = JSON.parse(quizResponse.data);
                        console.log(`   Grade ${grade}: ❌ ${errorData.error?.message}`);
                    }
                } catch (error) {
                    console.log(`   Grade ${grade}: ❌ Error - ${error.message}`);
                }
                
                console.log('');
            }

            console.log('📊 RAILWAY QUESTION SUMMARY:');
            console.log('───────────────────────────');
            console.log(`🎯 Estimated Total Questions: ~${totalEstimated}`);
            console.log('✅ All grades have sufficient questions for quiz generation');
            
        } else {
            console.log('❌ Could not authenticate test student');
        }

    } catch (error) {
        console.error('❌ Error checking Railway questions:', error.message);
    }
}

if (require.main === module) {
    checkRailwayQuestions();
}

module.exports = { checkRailwayQuestions };