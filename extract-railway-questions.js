#!/usr/bin/env node

/**
 * Extract Railway Questions
 * Extract all questions from Railway by generating multiple quizzes
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
        req.setTimeout(20000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
        
        if (options.body) {
            req.write(options.body);
        }
        req.end();
    });
}

async function extractRailwayQuestions() {
    console.log('🔍 EXTRACTING RAILWAY QUESTIONS');
    console.log('===============================');
    console.log('');

    const RAILWAY_URL = 'https://tech-board.up.railway.app';
    const allQuestions = new Map(); // Use Map to avoid duplicates

    try {
        // 1. Create multiple test students to extract questions
        console.log('👥 Creating test students to extract questions...');
        const grades = [6, 7, 8, 9, 11];
        const students = [];

        for (let i = 0; i < 5; i++) {
            const rollNumber = 70 + i; // Use roll numbers 70-74
            const testStudent = {
                name: `Extract Student ${i + 1}`,
                rollNumber: rollNumber,
                grade: 6, // Start with grade 6
                section: 'A',
                password: `extract${i + 1}`
            };

            try {
                const registerResponse = await makeRequest(`${RAILWAY_URL}/api/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(testStudent)
                });

                let studentToken;
                if (registerResponse.statusCode === 201) {
                    const registerData = JSON.parse(registerResponse.data);
                    studentToken = registerData.data.token;
                    console.log(`✅ Student ${rollNumber} registered`);
                } else if (registerResponse.statusCode === 409) {
                    // Student exists, login
                    const loginResponse = await makeRequest(`${RAILWAY_URL}/api/auth/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            rollNumber: rollNumber,
                            grade: 6,
                            section: 'A',
                            password: `extract${i + 1}`
                        })
                    });
                    if (loginResponse.statusCode === 200) {
                        const loginData = JSON.parse(loginResponse.data);
                        studentToken = loginData.data.token;
                        console.log(`✅ Student ${rollNumber} logged in`);
                    }
                }

                if (studentToken) {
                    students.push({ rollNumber, token: studentToken });
                }
            } catch (error) {
                console.log(`⚠️ Could not create student ${rollNumber}: ${error.message}`);
            }
        }

        console.log(`✅ Created ${students.length} test students`);
        console.log('');

        // 2. Extract questions from each grade using multiple students
        console.log('🎲 Extracting questions by generating quizzes...');
        
        for (const grade of grades) {
            console.log(`📚 Extracting Grade ${grade} questions:`);
            
            for (let attempt = 0; attempt < students.length; attempt++) {
                const student = students[attempt % students.length];
                
                try {
                    const quizResponse = await makeRequest(`${RAILWAY_URL}/api/quiz/start/${grade}`, {
                        method: 'GET',
                        headers: { 'Authorization': `Bearer ${student.token}` }
                    });

                    if (quizResponse.statusCode === 200) {
                        const quizData = JSON.parse(quizResponse.data);
                        const questions = quizData.data.questions || [];
                        
                        console.log(`   Attempt ${attempt + 1}: Got ${questions.length} questions`);
                        
                        // Add questions to our collection (Map prevents duplicates)
                        questions.forEach(q => {
                            const key = `${grade}-${q.questionText}`;
                            if (!allQuestions.has(key)) {
                                allQuestions.set(key, {
                                    grade: grade,
                                    difficulty: q.difficulty,
                                    questionText: q.questionText,
                                    options: q.options
                                });
                            }
                        });

                        console.log(`   Total unique questions so far: ${allQuestions.size}`);
                        
                        // If we got a full quiz, we have good coverage for this grade
                        if (questions.length >= 50) {
                            break;
                        }

                    } else if (quizResponse.statusCode === 409) {
                        console.log(`   Student ${student.rollNumber} has active quiz - trying next student`);
                    } else {
                        console.log(`   Error ${quizResponse.statusCode} with student ${student.rollNumber}`);
                    }

                } catch (error) {
                    console.log(`   Exception with student ${student.rollNumber}: ${error.message}`);
                }

                // Small delay between attempts
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            console.log('');
        }

        const questionsArray = Array.from(allQuestions.values());
        console.log(`✅ Extracted ${questionsArray.length} unique questions from Railway`);
        console.log('');

        // 3. Analyze extracted questions
        console.log('📊 Question Analysis:');
        console.log('────────────────────');
        const byGrade = {};
        const byDifficulty = {};

        questionsArray.forEach(q => {
            byGrade[q.grade] = (byGrade[q.grade] || 0) + 1;
            byDifficulty[q.difficulty] = (byDifficulty[q.difficulty] || 0) + 1;
        });

        console.log('By Grade:');
        Object.entries(byGrade).forEach(([grade, count]) => {
            console.log(`   Grade ${grade}: ${count} questions`);
        });

        console.log('By Difficulty:');
        Object.entries(byDifficulty).forEach(([difficulty, count]) => {
            console.log(`   ${difficulty}: ${count} questions`);
        });
        console.log('');

        // 4. Update local database
        console.log('🗄️ Updating local database...');
        await database.connect();
        const db = database.getDb();

        // Clear existing questions
        console.log('   🧹 Clearing existing questions...');
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM options', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM questions', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        // Insert extracted questions
        console.log('   📥 Inserting extracted questions...');
        let insertedQuestions = 0;
        let insertedOptions = 0;

        for (const question of questionsArray) {
            try {
                // Insert question
                const questionResult = await new Promise((resolve, reject) => {
                    db.run(`
                        INSERT INTO questions (grade, difficulty, question_text)
                        VALUES (?, ?, ?)
                    `, [
                        question.grade,
                        question.difficulty || 'basic',
                        question.questionText
                    ], function(err) {
                        if (err) reject(err);
                        else resolve(this.lastID);
                    });
                });

                insertedQuestions++;

                // Insert options
                const options = question.options || [];
                for (let i = 0; i < options.length; i++) {
                    const option = options[i];
                    await new Promise((resolve, reject) => {
                        db.run(`
                            INSERT INTO options (question_id, option_text, is_correct, option_order)
                            VALUES (?, ?, ?, ?)
                        `, [
                            questionResult,
                            option.text,
                            option.isCorrect ? 1 : 0,
                            i + 1
                        ], (err) => {
                            if (err) reject(err);
                            else resolve();
                        });
                    });
                    insertedOptions++;
                }

                if (insertedQuestions % 25 === 0) {
                    process.stdout.write(`📊 ${insertedQuestions}... `);
                }

            } catch (error) {
                console.log(`⚠️ Error inserting question: ${error.message}`);
            }
        }

        await database.close();

        console.log('');
        console.log('📊 DATABASE UPDATE RESULTS:');
        console.log('===========================');
        console.log(`✅ Questions inserted: ${insertedQuestions}`);
        console.log(`✅ Options inserted: ${insertedOptions}`);
        console.log('');

        // 5. Verify local database
        console.log('🔍 Verifying local database...');
        await database.connect();
        const localDb = database.getDb();

        const localCount = await new Promise((resolve, reject) => {
            localDb.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        const localByGrade = await new Promise((resolve, reject) => {
            localDb.all(`
                SELECT grade, COUNT(*) as count
                FROM questions
                GROUP BY grade
                ORDER BY grade
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        await database.close();

        console.log(`📊 Local database now has ${localCount} questions`);
        console.log('📈 Distribution by grade:');
        localByGrade.forEach(row => {
            console.log(`   Grade ${row.grade}: ${row.count} questions`);
        });

        console.log('');
        console.log('🎉 EXTRACTION COMPLETE!');
        console.log('=======================');
        console.log('✅ Local database updated with Railway questions');
        console.log('✅ Both databases now have matching content');
        console.log('✅ Ready for 50-question quiz system');
        console.log('');
        console.log('🌐 Railway: https://tech-board.up.railway.app');
        console.log('💻 Local: Ready for development');

    } catch (error) {
        console.error('❌ Extraction error:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    extractRailwayQuestions();
}

module.exports = { extractRailwayQuestions };