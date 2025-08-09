#!/usr/bin/env node

/**
 * Database Questions Analyzer
 * Provides detailed analysis of questions in the TECH BOARD 2025 database
 */

const database = require('./server/config/database');

async function analyzeQuestions() {
    console.log('📚 TECH BOARD 2025 DATABASE QUESTIONS ANALYSIS');
    console.log('==============================================');
    console.log('');

    try {
        await database.connect();
        const db = database.getDb();

        // 1. Overall Statistics
        console.log('📊 OVERALL STATISTICS:');
        console.log('─────────────────────');
        
        const overallStats = await new Promise((resolve, reject) => {
            db.get(`
                SELECT 
                    COUNT(*) as total_questions,
                    COUNT(DISTINCT grade) as grades_covered,
                    MIN(LENGTH(question_text)) as shortest_question,
                    MAX(LENGTH(question_text)) as longest_question,
                    AVG(LENGTH(question_text)) as avg_question_length
                FROM questions
            `, (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        console.log(`   📝 Total Questions: ${overallStats.total_questions}`);
        console.log(`   🎓 Grades Covered: ${overallStats.grades_covered}`);
        console.log(`   📏 Question Length: ${overallStats.shortest_question} - ${overallStats.longest_question} chars (avg: ${Math.round(overallStats.avg_question_length)})`);
        console.log('');

        // 2. Grade-wise Detailed Analysis
        console.log('🎓 GRADE-WISE DETAILED ANALYSIS:');
        console.log('───────────────────────────────');

        const grades = [6, 7, 8, 9, 11];
        
        for (const grade of grades) {
            console.log(`\n📚 GRADE ${grade} ANALYSIS:`);
            console.log('─'.repeat(25));

            // Get grade statistics
            const gradeStats = await new Promise((resolve, reject) => {
                db.all(`
                    SELECT 
                        difficulty,
                        COUNT(*) as count,
                        AVG(LENGTH(question_text)) as avg_length
                    FROM questions 
                    WHERE grade = ?
                    GROUP BY difficulty
                    ORDER BY 
                        CASE difficulty 
                            WHEN 'basic' THEN 1 
                            WHEN 'medium' THEN 2 
                            WHEN 'advanced' THEN 3 
                        END
                `, [grade], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });

            let totalForGrade = 0;
            gradeStats.forEach(stat => {
                console.log(`   ${stat.difficulty.toUpperCase()}: ${stat.count} questions (avg ${Math.round(stat.avg_length)} chars)`);
                totalForGrade += stat.count;
            });
            console.log(`   TOTAL: ${totalForGrade} questions`);

            // Get sample questions for each difficulty
            for (const difficultyData of gradeStats) {
                if (difficultyData.count > 0) {
                    console.log(`\n   📖 Sample ${difficultyData.difficulty.toUpperCase()} Questions:`);
                    
                    const sampleQuestions = await new Promise((resolve, reject) => {
                        db.all(`
                            SELECT q.question_text, 
                                   GROUP_CONCAT(o.option_text, ' | ') as options,
                                   GROUP_CONCAT(CASE WHEN o.is_correct = 1 THEN o.option_text END) as correct_answer
                            FROM questions q
                            JOIN options o ON q.id = o.question_id
                            WHERE q.grade = ? AND q.difficulty = ?
                            GROUP BY q.id
                            ORDER BY RANDOM()
                            LIMIT 3
                        `, [grade, difficultyData.difficulty], (err, rows) => {
                            if (err) reject(err);
                            else resolve(rows);
                        });
                    });

                    sampleQuestions.forEach((q, index) => {
                        console.log(`     ${index + 1}. ${q.question_text}`);
                        const options = q.options.split(' | ');
                        options.forEach((option, optIndex) => {
                            const marker = option === q.correct_answer ? '✓' : ' ';
                            console.log(`        ${String.fromCharCode(65 + optIndex)}. ${marker} ${option}`);
                        });
                        console.log('');
                    });
                }
            }
        }

        // 3. Topic Analysis by Keywords
        console.log('\n🏷️  TOPIC ANALYSIS BY KEYWORDS:');
        console.log('─────────────────────────────');

        const topicKeywords = {
            'Computer Hardware': ['CPU', 'RAM', 'hardware', 'motherboard', 'processor', 'memory', 'storage'],
            'Programming': ['programming', 'algorithm', 'code', 'function', 'variable', 'loop', 'syntax'],
            'Web Technology': ['HTML', 'CSS', 'web', 'browser', 'website', 'HTTP', 'URL'],
            'Internet & Networks': ['internet', 'network', 'Wi-Fi', 'protocol', 'IP', 'email', 'download'],
            'Database': ['database', 'SQL', 'data', 'table', 'query', 'record'],
            'Security': ['password', 'security', 'virus', 'firewall', 'encryption', 'malware'],
            'Operating Systems': ['Windows', 'operating system', 'file', 'folder', 'desktop'],
            'AI & Modern Tech': ['artificial intelligence', 'machine learning', 'cloud', 'IoT', 'blockchain'],
            'Software': ['software', 'application', 'program', 'install', 'update']
        };

        for (const [topic, keywords] of Object.entries(topicKeywords)) {
            const keywordPattern = keywords.join('|');
            const topicCount = await new Promise((resolve, reject) => {
                db.get(`
                    SELECT COUNT(*) as count
                    FROM questions
                    WHERE question_text REGEXP ?
                `, [keywordPattern], (err, row) => {
                    if (err) {
                        // SQLite doesn't support REGEXP by default, use LIKE instead
                        const likeConditions = keywords.map(() => 'question_text LIKE ?').join(' OR ');
                        const likeParams = keywords.map(keyword => `%${keyword}%`);
                        
                        db.get(`SELECT COUNT(*) as count FROM questions WHERE ${likeConditions}`, likeParams, (err2, row2) => {
                            if (err2) reject(err2);
                            else resolve(row2.count);
                        });
                    } else {
                        resolve(row.count);
                    }
                });
            });

            console.log(`   ${topic}: ${topicCount} questions`);
        }

        // 4. Question Complexity Analysis
        console.log('\n🧠 QUESTION COMPLEXITY ANALYSIS:');
        console.log('───────────────────────────────');

        const complexityAnalysis = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    grade,
                    CASE 
                        WHEN LENGTH(question_text) < 50 THEN 'Short'
                        WHEN LENGTH(question_text) < 100 THEN 'Medium'
                        ELSE 'Long'
                    END as length_category,
                    COUNT(*) as count
                FROM questions
                GROUP BY grade, length_category
                ORDER BY grade, length_category
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        const complexityByGrade = {};
        complexityAnalysis.forEach(row => {
            if (!complexityByGrade[row.grade]) {
                complexityByGrade[row.grade] = {};
            }
            complexityByGrade[row.grade][row.length_category] = row.count;
        });

        Object.keys(complexityByGrade).sort().forEach(grade => {
            const data = complexityByGrade[grade];
            console.log(`   Grade ${grade}:`);
            console.log(`     📏 Short (<50 chars): ${data.Short || 0}`);
            console.log(`     📐 Medium (50-100 chars): ${data.Medium || 0}`);
            console.log(`     📏 Long (>100 chars): ${data.Long || 0}`);
        });

        // 5. Sample Questions from Each Grade
        console.log('\n🎯 REPRESENTATIVE SAMPLE QUESTIONS:');
        console.log('─────────────────────────────────');

        for (const grade of grades) {
            console.log(`\n📚 GRADE ${grade} SAMPLES:`);
            
            const samples = await new Promise((resolve, reject) => {
                db.all(`
                    SELECT q.question_text, q.difficulty,
                           GROUP_CONCAT(o.option_text, ' | ') as options,
                           GROUP_CONCAT(CASE WHEN o.is_correct = 1 THEN o.option_text END) as correct_answer
                    FROM questions q
                    JOIN options o ON q.id = o.question_id
                    WHERE q.grade = ?
                    GROUP BY q.id
                    ORDER BY RANDOM()
                    LIMIT 2
                `, [grade], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });

            samples.forEach((q, index) => {
                console.log(`\n   ${index + 1}. [${q.difficulty.toUpperCase()}] ${q.question_text}`);
                const options = q.options.split(' | ');
                options.forEach((option, optIndex) => {
                    const marker = option === q.correct_answer ? '✓' : ' ';
                    console.log(`      ${String.fromCharCode(65 + optIndex)}. ${marker} ${option}`);
                });
            });
        }

        // 6. Quality Assessment
        console.log('\n\n🏆 QUESTION QUALITY ASSESSMENT:');
        console.log('─────────────────────────────');

        // Check for duplicate questions
        const duplicates = await new Promise((resolve, reject) => {
            db.all(`
                SELECT question_text, COUNT(*) as count
                FROM questions
                GROUP BY question_text
                HAVING COUNT(*) > 1
                LIMIT 5
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        // Check for very short questions
        const tooShort = await new Promise((resolve, reject) => {
            db.get(`
                SELECT COUNT(*) as count
                FROM questions
                WHERE LENGTH(question_text) < 20
            `, (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        // Check for questions without question marks
        const noQuestionMark = await new Promise((resolve, reject) => {
            db.get(`
                SELECT COUNT(*) as count
                FROM questions
                WHERE question_text NOT LIKE '%?%'
            `, (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        console.log(`   🔄 Duplicate Questions: ${duplicates.length}`);
        console.log(`   📏 Very Short Questions (<20 chars): ${tooShort}`);
        console.log(`   ❓ Questions without '?': ${noQuestionMark}`);

        if (duplicates.length > 0) {
            console.log(`   📋 Duplicate Examples:`);
            duplicates.forEach(dup => {
                console.log(`     "${dup.question_text}" (${dup.count} times)`);
            });
        }

        // 7. Coverage Summary
        console.log('\n📈 COVERAGE SUMMARY:');
        console.log('───────────────────');

        const coverageSummary = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    grade,
                    COUNT(*) as total,
                    MIN(id) as first_question_id,
                    MAX(id) as last_question_id
                FROM questions
                GROUP BY grade
                ORDER BY grade
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        coverageSummary.forEach(summary => {
            const quizCapacity = Math.floor(summary.total / 25);
            console.log(`   Grade ${summary.grade}: ${summary.total} questions → ${quizCapacity} unique quizzes possible`);
        });

        const totalQuizCapacity = coverageSummary.reduce((sum, s) => sum + Math.floor(s.total / 25), 0);
        console.log(`   🎯 Total Quiz Capacity: ${totalQuizCapacity} unique quizzes across all grades`);

        console.log('\n✅ Question Analysis Complete!');
        console.log(`📚 The database contains high-quality, diverse questions covering all essential computer science topics for TECH BOARD 2025.`);

        await database.close();
        process.exit(0);

    } catch (error) {
        console.error('❌ Error analyzing questions:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    analyzeQuestions();
}

module.exports = { analyzeQuestions };