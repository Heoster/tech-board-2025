const database = require('../config/database');

async function implementPracticalFocus() {
    try {
        console.log('🔄 Connecting to database...');
        await database.connect();
        const db = database.getDb();
        
        console.log('📚 Implementing 70% practical focus for grades 6-8...\n');
        
        // Define practical categories based on your requirements
        const practicalCategories = [
            'computer_fundamentals',
            'digital_literacy', 
            'internet_networking',
            'productivity_tools',
            'intro_programming',
            'creative_computing',
            'computer_maintenance',
            'cyber_safety',
            'career_awareness'
        ];
        
        const theoreticalCategories = [
            'advanced_concepts',
            'theoretical_knowledge',
            'complex_algorithms',
            'advanced_networking',
            'system_administration'
        ];
        
        // Add new columns for practical/theoretical classification
        console.log('🔧 Adding practical focus classification...');
        
        try {
            await new Promise((resolve, reject) => {
                db.run('ALTER TABLE questions ADD COLUMN focus_type VARCHAR(20) DEFAULT NULL', (err) => {
                    if (err && !err.message.includes('duplicate column')) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            
            await new Promise((resolve, reject) => {
                db.run('ALTER TABLE questions ADD COLUMN practical_category VARCHAR(50) DEFAULT NULL', (err) => {
                    if (err && !err.message.includes('duplicate column')) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            
            console.log('✅ Added focus_type and practical_category columns');
        } catch (error) {
            console.log('ℹ️  Columns may already exist, continuing...');
        }
        
        // Categorize questions for grades 6-8 based on content analysis
        console.log('🏷️  Categorizing questions for practical focus...');
        
        const practicalKeywords = {
            'computer_fundamentals': [
                'computer', 'hardware', 'cpu', 'ram', 'hard drive', 'motherboard', 
                'input device', 'output device', 'desktop', 'laptop', 'tablet',
                'operating system', 'windows', 'macos', 'linux', 'software', 'application'
            ],
            'digital_literacy': [
                'file management', 'folder', 'save', 'rename', 'organize', 'keyboard shortcut',
                'copy', 'paste', 'undo', 'redo', 'digital footprint', 'online etiquette'
            ],
            'internet_networking': [
                'internet', 'web browser', 'chrome', 'firefox', 'search engine', 'google',
                'email', 'attachment', 'wifi', 'network', 'ip address', 'server',
                'website', 'url', 'bookmark', 'tab'
            ],
            'productivity_tools': [
                'word processor', 'microsoft word', 'google docs', 'spreadsheet', 'excel',
                'google sheets', 'formula', 'chart', 'presentation', 'powerpoint',
                'google slides', 'cloud storage', 'google drive', 'onedrive'
            ],
            'intro_programming': [
                'coding', 'programming', 'scratch', 'blockly', 'python', 'html', 'css',
                'algorithm', 'loop', 'condition', 'debugging', 'block-based', 'logic'
            ],
            'creative_computing': [
                'digital art', 'paint', 'canva', 'animation', 'game design', 'web design',
                'html tag', 'creative', 'design', 'multimedia'
            ],
            'computer_maintenance': [
                'maintenance', 'troubleshooting', 'update', 'cleaning', 'overheating',
                'shutdown', 'frozen', 'slow performance', 'fix', 'care'
            ],
            'cyber_safety': [
                'password', 'privacy', 'security', 'cyberbullying', 'safe browsing',
                'scam', 'copyright', 'plagiarism', 'responsible sharing', 'ethics'
            ],
            'career_awareness': [
                'programmer', 'designer', 'data analyst', 'cybersecurity', 'tech career',
                'developer', 'it professional', 'computer scientist'
            ]
        };
        
        // Update questions for grades 6, 7, 8
        const targetGrades = [6, 7, 8];
        
        for (const grade of targetGrades) {
            console.log(`\n📖 Processing Grade ${grade} questions...`);
            
            // Get all questions for this grade
            const questions = await new Promise((resolve, reject) => {
                db.all(
                    'SELECT id, question_text, difficulty FROM questions WHERE grade = ?',
                    [grade],
                    (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    }
                );
            });
            
            let practicalCount = 0;
            let theoreticalCount = 0;
            
            for (const question of questions) {
                const questionText = question.question_text.toLowerCase();
                let isPractical = false;
                let matchedCategory = 'general_computer';
                
                // Check if question matches practical keywords
                for (const [category, keywords] of Object.entries(practicalKeywords)) {
                    if (keywords.some(keyword => questionText.includes(keyword.toLowerCase()))) {
                        isPractical = true;
                        matchedCategory = category;
                        break;
                    }
                }
                
                // For grades 6-8, prioritize practical questions
                const focusType = isPractical ? 'practical' : 'theoretical';
                
                if (isPractical) {
                    practicalCount++;
                } else {
                    theoreticalCount++;
                }
                
                // Update the question
                await new Promise((resolve, reject) => {
                    db.run(
                        'UPDATE questions SET focus_type = ?, practical_category = ? WHERE id = ?',
                        [focusType, matchedCategory, question.id],
                        (err) => {
                            if (err) reject(err);
                            else resolve();
                        }
                    );
                });
            }
            
            const totalQuestions = questions.length;
            const practicalPercentage = ((practicalCount / totalQuestions) * 100).toFixed(1);
            
            console.log(`  📊 Grade ${grade} Analysis:`);
            console.log(`    Total Questions: ${totalQuestions}`);
            console.log(`    Practical: ${practicalCount} (${practicalPercentage}%)`);
            console.log(`    Theoretical: ${theoreticalCount} (${(100 - practicalPercentage).toFixed(1)}%)`);
            
            if (practicalPercentage < 70) {
                console.log(`    ⚠️  Warning: Only ${practicalPercentage}% practical questions (target: 70%)`);
            } else {
                console.log(`    ✅ Meets 70% practical requirement`);
            }
        }
        
        // Show category distribution
        console.log('\n📋 Practical Category Distribution for Grades 6-8:');
        console.log('====================================================');
        
        const categoryStats = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    grade,
                    practical_category,
                    focus_type,
                    COUNT(*) as count
                FROM questions 
                WHERE grade IN (6, 7, 8)
                GROUP BY grade, practical_category, focus_type
                ORDER BY grade, focus_type, practical_category
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        let currentGrade = null;
        let currentFocusType = null;
        
        categoryStats.forEach(stat => {
            if (stat.grade !== currentGrade) {
                if (currentGrade !== null) console.log('');
                console.log(`Grade ${stat.grade}:`);
                currentGrade = stat.grade;
                currentFocusType = null;
            }
            
            if (stat.focus_type !== currentFocusType) {
                console.log(`  ${stat.focus_type.toUpperCase()} Questions:`);
                currentFocusType = stat.focus_type;
            }
            
            console.log(`    ${stat.practical_category.padEnd(25)}: ${stat.count} questions`);
        });
        
        // Create indexes for better performance
        console.log('\n🔧 Creating performance indexes...');
        
        try {
            await new Promise((resolve, reject) => {
                db.run('CREATE INDEX IF NOT EXISTS idx_questions_focus_type ON questions(focus_type)', (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            
            await new Promise((resolve, reject) => {
                db.run('CREATE INDEX IF NOT EXISTS idx_questions_practical_category ON questions(practical_category)', (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            
            console.log('✅ Performance indexes created');
        } catch (error) {
            console.log('ℹ️  Indexes may already exist');
        }
        
    } catch (error) {
        console.error('❌ Error implementing practical focus:', error);
        throw error;
    } finally {
        console.log('\n🔒 Closing database connection...');
        await database.close();
    }
}

// Run the implementation
if (require.main === module) {
    implementPracticalFocus()
        .then(() => {
            console.log('\n🎉 Practical focus implementation completed!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Failed to implement practical focus:', error);
            process.exit(1);
        });
}

module.exports = implementPracticalFocus;