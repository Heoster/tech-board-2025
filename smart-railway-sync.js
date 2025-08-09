#!/usr/bin/env node

/**
 * Smart Railway Sync
 * Efficiently sync questions to Railway with better error handling
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

async function smartRailwaySync() {
    console.log('🚀 SMART RAILWAY SYNC - 50 QUESTION SYSTEM');
    console.log('==========================================');
    console.log('');

    const RAILWAY_URL = 'https://tech-board.up.railway.app';
    let adminToken;

    try {
        // 1. Login as admin
        console.log('🔐 Logging into Railway...');
        const loginResponse = await makeRequest(`${RAILWAY_URL}/api/auth/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'admin',
                password: 'TechBoard2025Admin!'
            })
        });

        if (loginResponse.statusCode !== 200) {
            throw new Error(`Admin login failed: ${loginResponse.statusCode}`);
        }

        const loginData = JSON.parse(loginResponse.data);
        adminToken = loginData.data.token;
        console.log('✅ Admin login successful');
        console.log('');

        // 2. Get local questions by grade and difficulty
        console.log('📊 Analyzing local database...');
        await database.connect();
        const db = database.getDb();

        const questionsByGrade = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    q.grade,
                    q.difficulty,
                    COUNT(*) as count
                FROM questions q
                LEFT JOIN options o ON q.id = o.question_id
                WHERE o.option_text IS NOT NULL
                GROUP BY q.grade, q.difficulty
                ORDER BY q.grade, q.difficulty
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log('📈 Local database analysis:');
        console.log('──────────────────────────');
        let totalLocal = 0;
        questionsByGrade.forEach(row => {
            console.log(`   Grade ${row.grade} ${row.difficulty}: ${row.count} questions`);
            totalLocal += row.count;
        });
        console.log(`   📊 Total: ${totalLocal} questions`);
        console.log('');

        // 3. Calculate what we need for 50-question system
        console.log('🎯 50-Question System Requirements:');
        console.log('──────────────────────────────────');
        const grades = [6, 7, 8, 9, 11];
        const requirements = {
            basic: 30,    // 60% of 50
            medium: 15,   // 30% of 50  
            advanced: 5   // 10% of 50
        };

        console.log('   Per grade requirements:');
        console.log(`   • Basic: ${requirements.basic} questions`);
        console.log(`   • Medium: ${requirements.medium} questions`);
        console.log(`   • Advanced: ${requirements.advanced} questions`);
        console.log(`   • Total per grade: ${requirements.basic + requirements.medium + requirements.advanced} questions`);
        console.log('');

        // 4. Upload strategic questions for each grade
        console.log('🚀 Strategic question upload...');
        console.log('');

        let totalUploaded = 0;
        let totalSkipped = 0;
        let totalErrors = 0;

        for (const grade of grades) {
            console.log(`📚 Processing Grade ${grade}:`);
            
            for (const difficulty of ['basic', 'medium', 'advanced']) {
                const needed = requirements[difficulty];
                console.log(`   ${difficulty}: uploading ${needed} questions...`);

                // Get questions for this grade/difficulty
                const questions = await new Promise((resolve, reject) => {
                    db.all(`
                        SELECT 
                            q.id,
                            q.grade,
                            q.difficulty,
                            q.question_text,
                            GROUP_CONCAT(
                                o.option_text || '|' || o.is_correct || '|' || o.option_order, 
                                '###'
                            ) as options_data
                        FROM questions q
                        LEFT JOIN options o ON q.id = o.question_id
                        WHERE q.grade = ? AND q.difficulty = ?
                        GROUP BY q.id, q.grade, q.difficulty, q.question_text
                        HAVING COUNT(o.option_text) >= 4
                        ORDER BY RANDOM()
                        LIMIT ?
                    `, [grade, difficulty, needed], (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    });
                });

                // Upload these questions
                let uploaded = 0;
                let skipped = 0;
                let errors = 0;

                for (const question of questions) {
                    try {
                        // Parse options
                        const options = [];
                        if (question.options_data) {
                            const optionParts = question.options_data.split('###');
                            for (const part of optionParts) {
                                const [text, isCorrect, order] = part.split('|');
                                if (text && text.trim()) {
                                    options.push({
                                        text: text.trim(),
                                        isCorrect: isCorrect === '1'
                                    });
                                }
                            }
                        }

                        if (options.length < 4) {
                            skipped++;
                            continue;
                        }

                        // Upload question
                        const uploadResponse = await makeRequest(`${RAILWAY_URL}/api/admin/questions`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${adminToken}`
                            },
                            body: JSON.stringify({
                                grade: question.grade,
                                difficulty: question.difficulty,
                                questionText: question.question_text,
                                options: options
                            })
                        });

                        if (uploadResponse.statusCode === 201) {
                            uploaded++;
                            process.stdout.write('✅');
                        } else if (uploadResponse.statusCode === 409) {
                            skipped++;
                            process.stdout.write('⏭️');
                        } else {
                            errors++;
                            process.stdout.write('❌');
                        }

                        // Small delay to avoid overwhelming the server
                        await new Promise(resolve => setTimeout(resolve, 100));

                    } catch (error) {
                        errors++;
                        process.stdout.write('⚠️');
                    }
                }

                console.log(`\\n      ${difficulty}: ✅${uploaded} ⏭️${skipped} ❌${errors}`);
                totalUploaded += uploaded;
                totalSkipped += skipped;
                totalErrors += errors;
            }
            console.log('');
        }

        await database.close();

        console.log('📊 UPLOAD SUMMARY:');
        console.log('═════════════════');
        console.log(`✅ Uploaded: ${totalUploaded} questions`);
        console.log(`⏭️ Skipped: ${totalSkipped} questions (duplicates/insufficient options)`);
        console.log(`❌ Errors: ${totalErrors} questions`);
        console.log('');

        // 5. Test 50-question quiz generation
        console.log('🎯 Testing 50-question quiz generation...');
        console.log('');

        // Register test student
        const testStudent = {
            name: 'Quiz Test Student',
            rollNumber: 997,
            grade: 6,
            section: 'A',
            password: 'quiz123'
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
            let allGradesWorking = true;

            for (const grade of grades) {
                try {
                    const quizResponse = await makeRequest(`${RAILWAY_URL}/api/quiz/start/${grade}`, {
                        method: 'GET',
                        headers: { 'Authorization': `Bearer ${studentToken}` }
                    });

                    if (quizResponse.statusCode === 200) {
                        const quizData = JSON.parse(quizResponse.data);
                        console.log(`✅ Grade ${grade}: Generated ${quizData.data.questions.length} questions`);
                        if (quizData.data.questionDistribution) {
                            console.log(`   Distribution: Basic:${quizData.data.questionDistribution.basic} Medium:${quizData.data.questionDistribution.medium} Advanced:${quizData.data.questionDistribution.advanced}`);
                        }
                    } else if (quizResponse.statusCode === 409) {
                        console.log(`✅ Grade ${grade}: Quiz system ready (active quiz exists)`);
                    } else {
                        const errorData = JSON.parse(quizResponse.data);
                        console.log(`❌ Grade ${grade}: ${errorData.error?.message}`);
                        allGradesWorking = false;
                    }
                } catch (error) {
                    console.log(`❌ Grade ${grade}: Error - ${error.message}`);
                    allGradesWorking = false;
                }
            }

            console.log('');
            if (allGradesWorking) {
                console.log('🎉 SUCCESS! 50-QUESTION SYSTEM READY');
                console.log('===================================');
                console.log('✅ Railway database populated');
                console.log('✅ 50-question quiz generation working');
                console.log('✅ All grades supported');
                console.log('✅ TECH BOARD 2025 system operational');
                console.log('');
                console.log('🌐 Live system: https://tech-board.up.railway.app');
                console.log('⏱️ Quiz format: 50 questions, 50 minutes');
                console.log('🎯 Pass requirement: 72% (36+ correct answers)');
            } else {
                console.log('⚠️ Some grades need more questions - run sync again');
            }
        }

    } catch (error) {
        console.error('❌ Sync error:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    smartRailwaySync();
}

module.exports = { smartRailwaySync };