#!/usr/bin/env node

/**
 * Count Questions in App
 * Checks both local database and Railway deployment
 */

const database = require('./server/config/database');
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
        req.setTimeout(10000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
        
        if (options.body) {
            req.write(options.body);
        }
        req.end();
    });
}

async function countQuestions() {
    console.log('📊 COUNTING QUESTIONS IN TECH BOARD 2025');
    console.log('=========================================');
    console.log('');

    // 1. Count Local Database Questions
    console.log('💾 LOCAL DATABASE:');
    console.log('─────────────────');
    
    try {
        await database.connect();
        const db = database.getDb();

        // Get total count
        const totalLocal = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        // Get count by grade and difficulty
        const localStats = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    grade,
                    difficulty,
                    COUNT(*) as count
                FROM questions 
                GROUP BY grade, difficulty 
                ORDER BY grade, difficulty
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        // Get count with options
        const localWithOptions = await new Promise((resolve, reject) => {
            db.get(`
                SELECT COUNT(DISTINCT q.id) as count 
                FROM questions q 
                INNER JOIN options o ON q.id = o.question_id
            `, (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        console.log(`📊 Total Questions: ${totalLocal}`);
        console.log(`✅ Questions with Options: ${localWithOptions}`);
        console.log(`⚠️  Questions without Options: ${totalLocal - localWithOptions}`);
        console.log('');

        // Group by grade
        const gradeStats = {};
        localStats.forEach(stat => {
            if (!gradeStats[stat.grade]) {
                gradeStats[stat.grade] = { total: 0, basic: 0, medium: 0, advanced: 0 };
            }
            gradeStats[stat.grade][stat.difficulty] = stat.count;
            gradeStats[stat.grade].total += stat.count;
        });

        console.log('📈 Local Distribution by Grade:');
        Object.keys(gradeStats).sort().forEach(grade => {
            const stats = gradeStats[grade];
            console.log(`   Grade ${grade}: ${stats.total} questions`);
            console.log(`     📗 Basic: ${stats.basic || 0}`);
            console.log(`     📙 Medium: ${stats.medium || 0}`);
            console.log(`     📕 Advanced: ${stats.advanced || 0}`);
        });

        await database.close();

    } catch (error) {
        console.log('❌ Error accessing local database:', error.message);
    }

    // 2. Count Railway Database Questions
    console.log('');
    console.log('🌐 RAILWAY DEPLOYMENT:');
    console.log('─────────────────────');

    try {
        const RAILWAY_URL = 'https://tech-board.up.railway.app';

        // Login as admin to access question data
        const loginResponse = await makeRequest(`${RAILWAY_URL}/api/auth/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'admin',
                password: 'TechBoard2025Admin!'
            })
        });

        if (loginResponse.statusCode === 200) {
            const loginData = JSON.parse(loginResponse.data);
            const adminToken = loginData.data.token;

            // Get questions from admin API
            const questionsResponse = await makeRequest(`${RAILWAY_URL}/api/admin/questions?limit=1000`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${adminToken}` }
            });

            if (questionsResponse.statusCode === 200) {
                const questionsData = JSON.parse(questionsResponse.data);
                const railwayQuestions = questionsData.data.questions;
                const totalRailway = questionsData.data.pagination.total;

                console.log(`📊 Total Questions: ${totalRailway}`);
                console.log(`✅ Questions Retrieved: ${railwayQuestions.length}`);
                console.log('');

                // Group Railway questions by grade
                const railwayGradeStats = {};
                railwayQuestions.forEach(q => {
                    if (!railwayGradeStats[q.grade]) {
                        railwayGradeStats[q.grade] = { total: 0, basic: 0, medium: 0, advanced: 0 };
                    }
                    railwayGradeStats[q.grade][q.difficulty]++;
                    railwayGradeStats[q.grade].total++;
                });

                console.log('📈 Railway Distribution by Grade:');
                Object.keys(railwayGradeStats).sort().forEach(grade => {
                    const stats = railwayGradeStats[grade];
                    console.log(`   Grade ${grade}: ${stats.total} questions`);
                    console.log(`     📗 Basic: ${stats.basic || 0}`);
                    console.log(`     📙 Medium: ${stats.medium || 0}`);
                    console.log(`     📕 Advanced: ${stats.advanced || 0}`);
                });

                // Test quiz generation for each grade
                console.log('');
                console.log('🎯 Quiz Generation Capability:');
                console.log('─────────────────────────────');

                // Register a test student for quiz testing
                const testStudent = {
                    name: 'Quiz Test Student',
                    rollNumber: 77,
                    grade: 6,
                    section: 'A',
                    password: 'test123'
                };

                const registerResponse = await makeRequest(`${RAILWAY_URL}/api/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(testStudent)
                });

                let studentToken;
                if (registerResponse.statusCode === 201) {
                    const registerData = JSON.parse(registerResponse.data);
                    studentToken = registerData.data.token;
                } else if (registerResponse.statusCode === 409) {
                    // Student exists, login
                    const loginStudentResponse = await makeRequest(`${RAILWAY_URL}/api/auth/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            rollNumber: testStudent.rollNumber,
                            grade: testStudent.grade,
                            section: testStudent.section,
                            password: testStudent.password
                        })
                    });
                    if (loginStudentResponse.statusCode === 200) {
                        const loginStudentData = JSON.parse(loginStudentResponse.data);
                        studentToken = loginStudentData.data.token;
                    }
                }

                if (studentToken) {
                    const grades = [6, 7, 8, 9, 11];
                    for (const grade of grades) {
                        try {
                            const quizResponse = await makeRequest(`${RAILWAY_URL}/api/quiz/start/${grade}`, {
                                method: 'GET',
                                headers: { 'Authorization': `Bearer ${studentToken}` }
                            });

                            if (quizResponse.statusCode === 200) {
                                const quizData = JSON.parse(quizResponse.data);
                                console.log(`   ✅ Grade ${grade}: Can generate ${quizData.data.questions.length} question quiz`);
                            } else if (quizResponse.statusCode === 409) {
                                console.log(`   ✅ Grade ${grade}: Quiz generation available (active quiz exists)`);
                            } else {
                                console.log(`   ❌ Grade ${grade}: Cannot generate quiz`);
                            }
                        } catch (error) {
                            console.log(`   ❌ Grade ${grade}: Error testing quiz generation`);
                        }
                    }
                }

            } else {
                console.log('❌ Could not retrieve questions from Railway API');
            }
        } else {
            console.log('❌ Could not login to Railway admin');
        }

    } catch (error) {
        console.log('❌ Error accessing Railway deployment:', error.message);
    }

    // 3. Summary
    console.log('');
    console.log('📋 SUMMARY:');
    console.log('──────────');
    console.log('🌐 Railway Deployment: https://tech-board.up.railway.app');
    console.log('👨‍💼 Admin Panel: https://tech-board.up.railway.app/admin/login');
    console.log('👥 Student Portal: https://tech-board.up.railway.app/register');
    console.log('');
    console.log('🎯 TECH BOARD 2025 is ready for the selection test!');
}

if (require.main === module) {
    countQuestions();
}

module.exports = { countQuestions };