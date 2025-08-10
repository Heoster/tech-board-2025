const sqlite3 = require('sqlite3').verbose();
const path = require('path');

async function removeDuplicateQuestions() {
    console.log('🔍 DETECTING AND REMOVING DUPLICATE QUESTIONS');
    console.log('=============================================');
    console.log('');

    const dbPath = path.join(__dirname, '../../database/mcq_system.db');

    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('❌ Database connection failed:', err.message);
                reject(err);
                return;
            }
            console.log('✅ Connected to database');
        });

        // Get all questions with their options
        db.all(`
            SELECT 
                q.id,
                q.grade,
                q.difficulty,
                q.question_text,
                GROUP_CONCAT(o.option_text ORDER BY o.option_order) as options,
                GROUP_CONCAT(o.is_correct ORDER BY o.option_order) as correct_flags
            FROM questions q
            LEFT JOIN options o ON q.id = o.question_id
            GROUP BY q.id
            ORDER BY q.grade, q.id
        `, (err, questions) => {
            if (err) {
                console.error('❌ Error fetching questions:', err.message);
                db.close();
                reject(err);
                return;
            }

            console.log(`📊 Analyzing ${questions.length} questions for duplicates...`);

            // Find duplicates based on question text similarity
            const duplicates = [];
            const seen = new Map();

            questions.forEach((question, index) => {
                // Normalize question text for comparison
                const normalizedText = question.question_text
                    .toLowerCase()
                    .replace(/[^\w\s]/g, '') // Remove punctuation
                    .replace(/\s+/g, ' ')    // Normalize spaces
                    .trim();

                // Create a key combining normalized text and grade
                const key = `${question.grade}_${normalizedText}`;

                if (seen.has(key)) {
                    // Found a duplicate
                    const original = seen.get(key);
                    duplicates.push({
                        duplicate: question,
                        original: original,
                        reason: 'identical_text'
                    });
                    console.log(`🔄 Duplicate found:`);
                    console.log(`   Original: Q${original.id} (Grade ${original.grade})`);
                    console.log(`   Duplicate: Q${question.id} (Grade ${question.grade})`);
                    console.log(`   Text: "${question.question_text.substring(0, 60)}..."`);
                    console.log('');
                } else {
                    seen.set(key, question);
                }
            });

            // Also check for questions with identical options (different text but same choices)
            console.log('🔍 Checking for questions with identical option sets...');
            const optionGroups = new Map();
            
            questions.forEach(question => {
                if (question.options) {
                    // Create a signature from options and correct answers
                    const optionSignature = `${question.grade}_${question.options}_${question.correct_flags}`;
                    
                    if (optionGroups.has(optionSignature)) {
                        const original = optionGroups.get(optionSignature);
                        // Only flag as duplicate if question text is also very similar (>80% similarity)
                        const similarity = calculateSimilarity(question.question_text, original.question_text);
                        if (similarity > 0.8) {
                            duplicates.push({
                                duplicate: question,
                                original: original,
                                reason: 'similar_text_identical_options',
                                similarity: similarity
                            });
                            console.log(`🔄 Similar question with identical options:`);
                            console.log(`   Original: Q${original.id} - "${original.question_text.substring(0, 50)}..."`);
                            console.log(`   Similar: Q${question.id} - "${question.question_text.substring(0, 50)}..."`);
                            console.log(`   Similarity: ${(similarity * 100).toFixed(1)}%`);
                            console.log('');
                        }
                    } else {
                        optionGroups.set(optionSignature, question);
                    }
                }
            });

            console.log(`📊 Found ${duplicates.length} duplicate questions`);

            if (duplicates.length === 0) {
                console.log('✅ No duplicate questions found!');
                db.close();
                resolve();
                return;
            }

            // Remove duplicates
            const duplicateIds = duplicates.map(d => d.duplicate.id);
            console.log(`🗑️  Removing ${duplicateIds.length} duplicate questions...`);

            // First remove options for duplicate questions
            const placeholders = duplicateIds.map(() => '?').join(',');
            const optionDeleteQuery = `DELETE FROM options WHERE question_id IN (${placeholders})`;
            
            db.run(optionDeleteQuery, duplicateIds, function(err) {
                if (err) {
                    console.error('❌ Error removing duplicate options:', err.message);
                    db.close();
                    reject(err);
                    return;
                }
                console.log(`✅ Removed ${this.changes} options for duplicate questions`);

                // Then remove duplicate questions
                const questionDeleteQuery = `DELETE FROM questions WHERE id IN (${placeholders})`;
                db.run(questionDeleteQuery, duplicateIds, function(err) {
                    if (err) {
                        console.error('❌ Error removing duplicate questions:', err.message);
                        db.close();
                        reject(err);
                        return;
                    }
                    console.log(`✅ Removed ${this.changes} duplicate questions`);

                    // Final verification
                    db.get(`
                        SELECT 
                            COUNT(*) as questions,
                            (SELECT COUNT(*) FROM options) as options
                        FROM questions
                    `, (err, counts) => {
                        if (err) {
                            console.error('❌ Error getting final counts:', err.message);
                        } else {
                            console.log(`\n📊 Final counts:`);
                            console.log(`   Questions: ${counts.questions}`);
                            console.log(`   Options: ${counts.options}`);
                        }

                        console.log('\n✅ Duplicate removal completed successfully!');
                        db.close();
                        resolve();
                    });
                });
            });
        });
    });
}

// Helper function to calculate text similarity
function calculateSimilarity(text1, text2) {
    const normalize = (text) => text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
    const norm1 = normalize(text1);
    const norm2 = normalize(text2);
    
    if (norm1 === norm2) return 1.0;
    
    // Simple similarity based on common words
    const words1 = norm1.split(' ');
    const words2 = norm2.split(' ');
    const commonWords = words1.filter(word => words2.includes(word));
    
    return (2 * commonWords.length) / (words1.length + words2.length);
}

// Run the duplicate removal
removeDuplicateQuestions()
    .then(() => {
        console.log('🎉 Duplicate detection and removal completed!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('💥 Duplicate removal failed:', error);
        process.exit(1);
    });
