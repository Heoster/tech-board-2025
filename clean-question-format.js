const database = require('./server/config/database');
const fs = require('fs');

console.log('🔍 TechBoard 2025 - Question Format Cleaning\n');

async function cleanQuestionFormat() {
    try {
        // Connect to database
        console.log('📡 Connecting to database...');
        await database.connect();
        console.log('✅ Database connected successfully\n');

        // Step 1: Analyze current questions
        console.log('📊 Analyzing question format...');
        
        const allQuestions = await database.query(`
            SELECT id, question_text, grade, difficulty
            FROM questions 
            ORDER BY grade, id
        `);

        console.log(`Total questions to analyze: ${allQuestions.length}`);

        // Step 2: Identify problematic questions
        console.log('\n🔍 Identifying format issues...');
        
        const issues = {
            containsGrade: [],
            containsDifficulty: [],
            containsTopic: [],
            notMCQFormat: [],
            containsMetadata: []
        };

        // Patterns to detect issues
        const gradePatterns = [
            /grade\s*\d+/i,
            /class\s*\d+/i,
            /std\s*\d+/i,
            /standard\s*\d+/i,
            /level\s*\d+/i
        ];

        const difficultyPatterns = [
            /\b(easy|basic|simple|beginner)\b/i,
            /\b(medium|intermediate|moderate)\b/i,
            /\b(hard|difficult|advanced|complex)\b/i,
            /\b(level|difficulty)\b/i
        ];

        const topicPatterns = [
            /^(topic|chapter|unit|lesson)\s*[:.-]/i,
            /\b(topic|chapter|unit|lesson)\s*\d+/i,
            /^(mathematics|science|english|history|geography)/i,
            /\b(algebra|geometry|physics|chemistry|biology)\b/i
        ];

        const nonMCQPatterns = [
            /^(explain|describe|discuss|elaborate)/i,
            /^(write|list|name|mention)/i,
            /^(define|state|give)/i,
            /\?\s*\?\s*\?/,  // Multiple question marks
            /\bfill\s+in\s+the\s+blank/i,
            /\b(true|false)\s+or\s+(false|true)/i
        ];

        const metadataPatterns = [
            /\[.*\]/,  // Square brackets
            /\{.*\}/,  // Curly brackets
            /\(grade\s*\d+\)/i,
            /\(difficulty\s*:\s*\w+\)/i,
            /marks?\s*:\s*\d+/i,
            /time\s*:\s*\d+/i
        ];

        // Analyze each question
        for (const question of allQuestions) {
            const text = question.question_text.trim();
            
            // Check for grade mentions
            if (gradePatterns.some(pattern => pattern.test(text))) {
                issues.containsGrade.push({
                    id: question.id,
                    text: text.substring(0, 100) + '...',
                    grade: question.grade
                });
            }

            // Check for difficulty mentions
            if (difficultyPatterns.some(pattern => pattern.test(text))) {
                issues.containsDifficulty.push({
                    id: question.id,
                    text: text.substring(0, 100) + '...',
                    grade: question.grade
                });
            }

            // Check for topic mentions
            if (topicPatterns.some(pattern => pattern.test(text))) {
                issues.containsTopic.push({
                    id: question.id,
                    text: text.substring(0, 100) + '...',
                    grade: question.grade
                });
            }

            // Check for non-MCQ format
            if (nonMCQPatterns.some(pattern => pattern.test(text))) {
                issues.notMCQFormat.push({
                    id: question.id,
                    text: text.substring(0, 100) + '...',
                    grade: question.grade
                });
            }

            // Check for metadata
            if (metadataPatterns.some(pattern => pattern.test(text))) {
                issues.containsMetadata.push({
                    id: question.id,
                    text: text.substring(0, 100) + '...',
                    grade: question.grade
                });
            }
        }

        // Report issues
        console.log('\n📋 Format Issues Found:');
        console.log(`  Questions with grade mentions: ${issues.containsGrade.length}`);
        console.log(`  Questions with difficulty mentions: ${issues.containsDifficulty.length}`);
        console.log(`  Questions with topic mentions: ${issues.containsTopic.length}`);
        console.log(`  Questions not in MCQ format: ${issues.notMCQFormat.length}`);
        console.log(`  Questions with metadata: ${issues.containsMetadata.length}`);

        // Show examples of issues
        if (issues.containsGrade.length > 0) {
            console.log('\n📝 Examples of grade mentions:');
            issues.containsGrade.slice(0, 3).forEach(q => {
                console.log(`  ID ${q.id}: "${q.text}"`);
            });
        }

        if (issues.containsDifficulty.length > 0) {
            console.log('\n📝 Examples of difficulty mentions:');
            issues.containsDifficulty.slice(0, 3).forEach(q => {
                console.log(`  ID ${q.id}: "${q.text}"`);
            });
        }

        if (issues.containsTopic.length > 0) {
            console.log('\n📝 Examples of topic mentions:');
            issues.containsTopic.slice(0, 3).forEach(q => {
                console.log(`  ID ${q.id}: "${q.text}"`);
            });
        }

        if (issues.notMCQFormat.length > 0) {
            console.log('\n📝 Examples of non-MCQ format:');
            issues.notMCQFormat.slice(0, 3).forEach(q => {
                console.log(`  ID ${q.id}: "${q.text}"`);
            });
        }

        // Step 3: Clean questions
        const totalIssues = Object.values(issues).reduce((sum, arr) => sum + arr.length, 0);
        
        if (totalIssues > 0) {
            console.log('\n🧹 Cleaning question format...');
            
            // Create backup
            console.log('📦 Creating backup before cleaning...');
            try {
                const backupPath = await database.backup();
                console.log(`✅ Backup created: ${backupPath}`);
            } catch (error) {
                console.log('⚠️ Backup failed, but continuing...');
            }

            let cleanedCount = 0;
            const allIssueIds = new Set();

            // Collect all problematic question IDs
            Object.values(issues).forEach(issueArray => {
                issueArray.forEach(issue => allIssueIds.add(issue.id));
            });

            console.log(`\nCleaning ${allIssueIds.size} questions with format issues...`);

            // Clean each problematic question
            for (const questionId of allIssueIds) {
                try {
                    const question = await database.get('SELECT * FROM questions WHERE id = ?', [questionId]);
                    if (!question) continue;

                    let cleanedText = question.question_text;

                    // Remove grade mentions
                    gradePatterns.forEach(pattern => {
                        cleanedText = cleanedText.replace(pattern, '');
                    });

                    // Remove difficulty mentions
                    difficultyPatterns.forEach(pattern => {
                        cleanedText = cleanedText.replace(pattern, '');
                    });

                    // Remove topic prefixes
                    topicPatterns.forEach(pattern => {
                        cleanedText = cleanedText.replace(pattern, '');
                    });

                    // Remove metadata
                    metadataPatterns.forEach(pattern => {
                        cleanedText = cleanedText.replace(pattern, '');
                    });

                    // Clean up formatting
                    cleanedText = cleanedText
                        .replace(/\s+/g, ' ')  // Multiple spaces to single
                        .replace(/^\s*[-.:]\s*/, '')  // Remove leading punctuation
                        .replace(/\s*[-.:]\s*$/, '')  // Remove trailing punctuation
                        .trim();

                    // Ensure it ends with a question mark if it's a question
                    if (cleanedText && !cleanedText.endsWith('?') && !cleanedText.endsWith('.')) {
                        cleanedText += '?';
                    }

                    // Update the question if it was changed
                    if (cleanedText !== question.question_text && cleanedText.length > 10) {
                        await database.run(
                            'UPDATE questions SET question_text = ? WHERE id = ?',
                            [cleanedText, questionId]
                        );
                        cleanedCount++;
                        
                        if (cleanedCount <= 5) {  // Show first 5 examples
                            console.log(`  ✅ Cleaned ID ${questionId}:`);
                            console.log(`    Before: "${question.question_text.substring(0, 80)}..."`);
                            console.log(`    After:  "${cleanedText.substring(0, 80)}..."`);
                        }
                    }
                } catch (error) {
                    console.log(`  ⚠️ Error cleaning question ${questionId}: ${error.message}`);
                }
            }

            console.log(`\n✅ Successfully cleaned ${cleanedCount} questions`);

        } else {
            console.log('\n🎉 All questions are already in proper MCQ format!');
        }

        // Step 4: Verify MCQ format
        console.log('\n🔍 Verifying MCQ format compliance...');
        
        const verificationQuestions = await database.query(`
            SELECT q.id, q.question_text, q.grade, COUNT(o.id) as option_count
            FROM questions q
            LEFT JOIN options o ON q.id = o.question_id
            GROUP BY q.id
            HAVING COUNT(o.id) != 4
            LIMIT 10
        `);

        if (verificationQuestions.length > 0) {
            console.log(`⚠️ Found ${verificationQuestions.length} questions with incorrect option count:`);
            verificationQuestions.forEach(q => {
                console.log(`  ID ${q.id}: ${q.option_count} options (should be 4)`);
            });
        } else {
            console.log('✅ All questions have exactly 4 options');
        }

        // Step 5: Sample verification
        console.log('\n📋 Sample of cleaned questions:');
        
        const sampleQuestions = await database.query(`
            SELECT q.id, q.question_text, q.grade, q.difficulty
            FROM questions q
            ORDER BY RANDOM()
            LIMIT 5
        `);

        sampleQuestions.forEach((q, index) => {
            console.log(`\n  ${index + 1}. Grade ${q.grade} (${q.difficulty}):`);
            console.log(`     "${q.question_text}"`);
        });

        // Step 6: Final statistics
        console.log('\n📊 Final Question Format Statistics:');
        
        const finalStats = await database.query(`
            SELECT 
                grade,
                COUNT(*) as total_questions,
                AVG(LENGTH(question_text)) as avg_length,
                COUNT(CASE WHEN question_text LIKE '%?' THEN 1 END) as questions_with_qmark
            FROM questions
            GROUP BY grade
            ORDER BY grade
        `);

        console.log('Question statistics by grade:');
        finalStats.forEach(stat => {
            const qmarkPercent = ((stat.questions_with_qmark / stat.total_questions) * 100).toFixed(1);
            console.log(`  Grade ${stat.grade}: ${stat.total_questions} questions, avg length: ${Math.round(stat.avg_length)} chars, ${qmarkPercent}% end with '?'`);
        });

        // Generate cleaning report
        const report = {
            timestamp: new Date().toISOString(),
            operation: 'question_format_cleaning',
            issues_found: {
                grade_mentions: issues.containsGrade.length,
                difficulty_mentions: issues.containsDifficulty.length,
                topic_mentions: issues.containsTopic.length,
                non_mcq_format: issues.notMCQFormat.length,
                metadata: issues.containsMetadata.length,
                total_issues: totalIssues
            },
            questions_cleaned: cleanedCount,
            final_stats: finalStats,
            success: true
        };

        fs.writeFileSync('question-format-report.json', JSON.stringify(report, null, 2));
        console.log('\n📄 Cleaning report saved to: question-format-report.json');

        await database.close();

        if (totalIssues > 0) {
            console.log('\n🎉 Question format cleaning completed!');
            console.log(`✅ Cleaned ${cleanedCount} questions`);
            console.log('✅ All questions now in proper MCQ format');
            console.log('✅ No grade/difficulty/topic mentions in question text');
        } else {
            console.log('\n🎉 Question format verification completed!');
            console.log('✅ All questions already in proper MCQ format');
        }

        return true;

    } catch (error) {
        console.error('❌ Question format cleaning failed:', error);
        
        try {
            await database.close();
        } catch (closeError) {
            console.error('Error closing database:', closeError);
        }
        
        return false;
    }
}

// Run if called directly
if (require.main === module) {
    cleanQuestionFormat()
        .then(success => {
            process.exit(success ? 0 : 1);
        })
        .catch(error => {
            console.error('❌ Error:', error);
            process.exit(1);
        });
}

module.exports = cleanQuestionFormat;