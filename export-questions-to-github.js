const database = require('./server/config/database');
const fs = require('fs');
const path = require('path');

async function exportQuestionsToGitHub() {
    console.log('📤 EXPORTING ALL QUESTIONS FROM DATABASE TO GITHUB');
    console.log('==================================================');
    console.log('');

    try {
        // Connect to local database
        await database.connect();
        const db = database.getDb();

        // Get all questions with their options
        console.log('1️⃣ Extracting questions from local database...');
        
        const questions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    q.id,
                    q.grade,
                    q.difficulty,
                    q.question_text,
                    q.created_at,
                    q.updated_at
                FROM questions q
                ORDER BY q.grade, q.difficulty, q.id
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log(`✅ Found ${questions.length} questions`);

        // Get all options for all questions
        console.log('2️⃣ Extracting options for all questions...');
        
        const options = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    o.id,
                    o.question_id,
                    o.option_text,
                    o.is_correct,
                    o.option_order
                FROM options o
                ORDER BY o.question_id, o.option_order
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log(`✅ Found ${options.length} options`);

        // Group options by question
        const optionsByQuestion = {};
        options.forEach(option => {
            if (!optionsByQuestion[option.question_id]) {
                optionsByQuestion[option.question_id] = [];
            }
            optionsByQuestion[option.question_id].push(option);
        });

        // Combine questions with their options
        const completeQuestions = questions.map(question => ({
            ...question,
            options: optionsByQuestion[question.id] || []
        }));

        // Group by grade for better organization
        const questionsByGrade = {};
        completeQuestions.forEach(question => {
            if (!questionsByGrade[question.grade]) {
                questionsByGrade[question.grade] = [];
            }
            questionsByGrade[question.grade].push(question);
        });

        console.log('3️⃣ Creating export files...');

        // Create exports directory
        const exportDir = path.join(__dirname, 'database-exports');
        if (!fs.existsSync(exportDir)) {
            fs.mkdirSync(exportDir, { recursive: true });
        }

        // Export complete dataset as JSON
        const completeExport = {
            metadata: {
                exportDate: new Date().toISOString(),
                totalQuestions: questions.length,
                totalOptions: options.length,
                grades: Object.keys(questionsByGrade).map(g => parseInt(g)).sort(),
                questionsByGrade: Object.keys(questionsByGrade).reduce((acc, grade) => {
                    acc[grade] = questionsByGrade[grade].length;
                    return acc;
                }, {})
            },
            questions: completeQuestions
        };

        fs.writeFileSync(
            path.join(exportDir, 'complete-question-bank.json'),
            JSON.stringify(completeExport, null, 2)
        );

        console.log('✅ Created complete-question-bank.json');

        // Export by grade
        Object.keys(questionsByGrade).forEach(grade => {
            const gradeQuestions = questionsByGrade[grade];
            const gradeExport = {
                grade: parseInt(grade),
                totalQuestions: gradeQuestions.length,
                exportDate: new Date().toISOString(),
                questions: gradeQuestions
            };

            fs.writeFileSync(
                path.join(exportDir, `grade-${grade}-questions.json`),
                JSON.stringify(gradeExport, null, 2)
            );

            console.log(`✅ Created grade-${grade}-questions.json (${gradeQuestions.length} questions)`);
        });

        // Create SQL import script for Railway
        console.log('4️⃣ Creating SQL import script...');
        
        let sqlScript = `-- TECH BOARD 2025 - Complete Question Bank Export
-- Generated on: ${new Date().toISOString()}
-- Total Questions: ${questions.length}
-- Total Options: ${options.length}

-- Clear existing data (optional - uncomment if needed)
-- DELETE FROM responses;
-- DELETE FROM quizzes;
-- DELETE FROM options;
-- DELETE FROM questions;

-- Insert Questions
`;

        completeQuestions.forEach(question => {
            const questionText = question.question_text.replace(/'/g, "''"); // Escape single quotes
            sqlScript += `INSERT INTO questions (id, grade, difficulty, question_text, created_at, updated_at) VALUES (${question.id}, ${question.grade}, '${question.difficulty}', '${questionText}', '${question.created_at}', '${question.updated_at}');\n`;
        });

        sqlScript += '\n-- Insert Options\n';

        options.forEach(option => {
            const optionText = option.option_text.replace(/'/g, "''"); // Escape single quotes
            sqlScript += `INSERT INTO options (id, question_id, option_text, is_correct, option_order) VALUES (${option.id}, ${option.question_id}, '${optionText}', ${option.is_correct}, ${option.option_order});\n`;
        });

        fs.writeFileSync(
            path.join(exportDir, 'railway-import.sql'),
            sqlScript
        );

        console.log('✅ Created railway-import.sql');

        // Create Railway seeding script
        console.log('5️⃣ Creating Railway seeding script...');
        
        const railwayScript = `// Railway Database Seeding Script - TECH BOARD 2025
// Auto-generated from local database export
// Generated on: ${new Date().toISOString()}

const database = require('../config/database');

async function seedRailwayDatabase() {
    console.log('🌱 SEEDING RAILWAY DATABASE WITH COMPLETE QUESTION BANK');
    console.log('====================================================');
    
    try {
        await database.connect();
        const db = database.getDb();
        
        console.log('📊 Seeding ${questions.length} questions with ${options.length} options...');
        
        // Clear existing data (optional)
        console.log('🧹 Clearing existing data...');
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM responses', (err) => err ? reject(err) : resolve());
        });
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM quizzes', (err) => err ? reject(err) : resolve());
        });
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM options', (err) => err ? reject(err) : resolve());
        });
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM questions', (err) => err ? reject(err) : resolve());
        });
        
        console.log('✅ Existing data cleared');
        
        // Insert questions
        console.log('📝 Inserting questions...');
        const questions = ${JSON.stringify(completeQuestions, null, 8)};
        
        for (const question of questions) {
            await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO questions (id, grade, difficulty, question_text, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
                    [question.id, question.grade, question.difficulty, question.question_text, question.created_at, question.updated_at],
                    (err) => err ? reject(err) : resolve()
                );
            });
            
            // Insert options for this question
            for (const option of question.options) {
                await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO options (id, question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?, ?)',
                        [option.id, option.question_id, option.option_text, option.is_correct, option.option_order],
                        (err) => err ? reject(err) : resolve()
                    );
                });
            }
        }
        
        console.log('✅ Database seeding completed successfully!');
        console.log(\`📊 Seeded \${questions.length} questions with options\`);
        
        // Verify seeding
        const questionCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        const optionCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM options', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        console.log(\`✅ Verification: \${questionCount} questions, \${optionCount} options\`);
        
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        throw error;
    }
}

// Run if called directly
if (require.main === module) {
    seedRailwayDatabase()
        .then(() => {
            console.log('🎉 Railway database seeding completed!');
            process.exit(0);
        })
        .catch(error => {
            console.error('❌ Seeding failed:', error);
            process.exit(1);
        });
}

module.exports = { seedRailwayDatabase };
`;

        fs.writeFileSync(
            path.join(exportDir, 'railway-seed-complete.js'),
            railwayScript
        );

        console.log('✅ Created railway-seed-complete.js');

        // Create summary report
        console.log('6️⃣ Creating summary report...');
        
        const summaryReport = `# TECH BOARD 2025 - Question Bank Export Summary

## Export Details
- **Export Date:** ${new Date().toISOString()}
- **Total Questions:** ${questions.length}
- **Total Options:** ${options.length}
- **Grades Covered:** ${Object.keys(questionsByGrade).join(', ')}

## Questions by Grade
${Object.keys(questionsByGrade).map(grade => {
    const gradeQuestions = questionsByGrade[grade];
    const difficulties = gradeQuestions.reduce((acc, q) => {
        acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
        return acc;
    }, {});
    
    return `### Grade ${grade}
- **Total Questions:** ${gradeQuestions.length}
- **Basic:** ${difficulties.basic || 0}
- **Medium:** ${difficulties.medium || 0}
- **Advanced:** ${difficulties.advanced || 0}`;
}).join('\n\n')}

## Export Files Created
1. \`complete-question-bank.json\` - Complete dataset in JSON format
2. \`railway-import.sql\` - SQL script for direct database import
3. \`railway-seed-complete.js\` - Node.js seeding script for Railway
4. Individual grade files: \`grade-X-questions.json\`

## Usage Instructions

### For Railway Deployment:
1. Copy \`railway-seed-complete.js\` to \`server/scripts/\`
2. Run: \`node server/scripts/railway-seed-complete.js\`
3. Or integrate into Railway startup process

### For Direct SQL Import:
1. Use \`railway-import.sql\` with your database client
2. Execute the SQL commands to populate the database

### For Development:
1. Use individual grade JSON files for testing
2. Use \`complete-question-bank.json\` for full dataset analysis

## Next Steps
1. Commit these files to GitHub
2. Deploy to Railway
3. Run the seeding script on Railway
4. Verify question generation works with 50+ questions per grade

---
*Generated by TECH BOARD 2025 Question Export Tool*
`;

        fs.writeFileSync(
            path.join(exportDir, 'README.md'),
            summaryReport
        );

        console.log('✅ Created README.md with summary');

        await database.close();

        console.log('');
        console.log('🎉 EXPORT COMPLETED SUCCESSFULLY!');
        console.log('');
        console.log('📁 Files created in database-exports/:');
        console.log('   • complete-question-bank.json (Complete dataset)');
        console.log('   • railway-import.sql (SQL import script)');
        console.log('   • railway-seed-complete.js (Node.js seeding script)');
        console.log('   • README.md (Documentation)');
        Object.keys(questionsByGrade).forEach(grade => {
            console.log(`   • grade-${grade}-questions.json (${questionsByGrade[grade].length} questions)`);
        });
        console.log('');
        console.log('📊 Export Summary:');
        console.log(`   • Total Questions: ${questions.length}`);
        console.log(`   • Total Options: ${options.length}`);
        console.log(`   • Grades: ${Object.keys(questionsByGrade).join(', ')}`);
        console.log('');
        console.log('🚀 Next Steps:');
        console.log('   1. git add database-exports/');
        console.log('   2. git commit -m "Add complete question bank export"');
        console.log('   3. git push origin main');
        console.log('   4. Deploy railway-seed-complete.js to Railway');

    } catch (error) {
        console.error('❌ Export failed:', error);
        await database.close();
    }
}

// Run the export
exportQuestionsToGitHub().catch(console.error);