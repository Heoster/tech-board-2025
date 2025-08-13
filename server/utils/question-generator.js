// Advanced Question Generation System for TECH BOARD 2025 MCQ System
// Ensures unique, non-similar questions for each student with grade-appropriate difficulty

const database = require('../config/database');
const crypto = require('crypto');

class QuestionGenerator {
    constructor() {
        this.questionPool = new Map(); // Cache for question pools by grade
        this.usedQuestionSets = new Map(); // Track used question combinations
        this.similarityThreshold = 0.7; // Threshold for question similarity
        this.difficultyDistribution = {
            6: { basic: 0.6, medium: 0.3, advanced: 0.1 },
            7: { basic: 0.5, medium: 0.4, advanced: 0.1 },
            8: { basic: 0.4, medium: 0.5, advanced: 0.1 },
            9: { basic: 0.3, medium: 0.5, advanced: 0.2 },
            11: { basic: 0.2, medium: 0.5, advanced: 0.3 }
        };
    }

    // Generate unique question set for a student
    async generateUniqueQuestionSet(studentId, grade, questionCount = 50) {
        try {
            console.log(`Generating unique question set for student ${studentId}, grade ${grade}`);
            
            // Get all available questions for the grade
            const allQuestions = await this.getQuestionsForGrade(grade);
            
            if (allQuestions.length < questionCount * 2) {
                throw new Error(`Insufficient questions for grade ${grade}. Need at least ${questionCount * 2}, found ${allQuestions.length}`);
            }

            // Check if student has taken quiz before
            const previousQuestions = await this.getPreviousQuestions(studentId, grade);
            
            // Filter out previously used questions
            const availableQuestions = allQuestions.filter(q => 
                !previousQuestions.includes(q.id)
            );

            // Generate question set with proper difficulty distribution
            const selectedQuestions = await this.selectQuestionsWithDistribution(
                availableQuestions, 
                grade, 
                questionCount
            );

            // Ensure no similar questions in the set
            const uniqueQuestions = await this.removeSimilarQuestions(selectedQuestions);

            // If we don't have enough unique questions, supplement with less similar ones
            if (uniqueQuestions.length < questionCount) {
                const supplementary = await this.getSupplementaryQuestions(
                    allQuestions,
                    uniqueQuestions,
                    previousQuestions,
                    questionCount - uniqueQuestions.length
                );
                uniqueQuestions.push(...supplementary);
            }

            // Final shuffle to randomize order
            const finalQuestions = this.shuffleArray(uniqueQuestions.slice(0, questionCount));

            // Store the question set for this student
            await this.storeQuestionSet(studentId, grade, finalQuestions.map(q => q.id));

            console.log(`Generated ${finalQuestions.length} unique questions for student ${studentId}`);
            return finalQuestions;

        } catch (error) {
            console.error('Error generating unique question set:', error);
            throw error;
        }
    }

    // Get all questions for a specific grade with enhanced metadata
    async getQuestionsForGrade(grade) {
        const db = database.getDb();
        
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    q.id, 
                    q.question_text, 
                    q.difficulty, 
                    q.subject,
                    q.topic,
                    q.created_at,
                    GROUP_CONCAT(
                        json_object(
                            'id', o.id, 
                            'text', o.option_text, 
                            'order', o.option_order,
                            'is_correct', o.is_correct
                        )
                    ) as options
                FROM questions q
                LEFT JOIN options o ON q.id = o.question_id
                WHERE q.grade = ?
                GROUP BY q.id, q.question_text, q.difficulty, q.subject, q.topic
                ORDER BY q.id
            `, [grade], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                const questions = rows.map(row => ({
                    id: row.id,
                    question_text: row.question_text,
                    difficulty: row.difficulty,
                    subject: row.subject,
                    topic: row.topic,
                    created_at: row.created_at,
                    options: row.options ? 
                        JSON.parse(`[${row.options}]`)
                            .sort((a, b) => a.order - b.order)
                            .map(opt => ({
                                id: opt.id,
                                text: opt.text,
                                order: opt.order
                                // Don't include is_correct for security
                            })) : [],
                    // Add metadata for similarity checking
                    keywords: this.extractKeywords(row.question_text),
                    wordCount: row.question_text.split(' ').length
                }));

                resolve(questions);
            });
        });
    }

    // Get previously used questions for a student
    async getPreviousQuestions(studentId, grade) {
        const db = database.getDb();
        
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT DISTINCT qa.question_id
                FROM quiz_answers qa
                JOIN quizzes q ON qa.quiz_id = q.id
                WHERE q.student_id = ? AND q.grade = ?
            `, [studentId, grade], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows.map(row => row.question_id));
            });
        });
    }

    // Select questions with proper difficulty distribution
    async selectQuestionsWithDistribution(questions, grade, count) {
        const distribution = this.difficultyDistribution[grade] || this.difficultyDistribution[9];
        
        // Group questions by difficulty
        const questionsByDifficulty = {
            basic: questions.filter(q => q.difficulty === 'basic'),
            medium: questions.filter(q => q.difficulty === 'medium'),
            advanced: questions.filter(q => q.difficulty === 'advanced')
        };

        // Calculate target counts for each difficulty
        const targetCounts = {
            basic: Math.floor(count * distribution.basic),
            medium: Math.floor(count * distribution.medium),
            advanced: Math.floor(count * distribution.advanced)
        };

        // Adjust for rounding differences
        const totalTargeted = targetCounts.basic + targetCounts.medium + targetCounts.advanced;
        if (totalTargeted < count) {
            targetCounts.medium += (count - totalTargeted);
        }

        const selectedQuestions = [];

        // Select questions from each difficulty level
        for (const [difficulty, targetCount] of Object.entries(targetCounts)) {
            const availableQuestions = questionsByDifficulty[difficulty];
            
            if (availableQuestions.length < targetCount) {
                console.warn(`Not enough ${difficulty} questions for grade ${grade}. Need ${targetCount}, have ${availableQuestions.length}`);
                // Take all available questions of this difficulty
                selectedQuestions.push(...this.shuffleArray(availableQuestions));
            } else {
                // Randomly select the required number
                const shuffled = this.shuffleArray([...availableQuestions]);
                selectedQuestions.push(...shuffled.slice(0, targetCount));
            }
        }

        // If we still need more questions, fill from any difficulty
        if (selectedQuestions.length < count) {
            const remainingQuestions = questions.filter(q => 
                !selectedQuestions.some(sq => sq.id === q.id)
            );
            const needed = count - selectedQuestions.length;
            const additional = this.shuffleArray(remainingQuestions).slice(0, needed);
            selectedQuestions.push(...additional);
        }

        return selectedQuestions;
    }

    // Remove similar questions from the set
    async removeSimilarQuestions(questions) {
        const uniqueQuestions = [];
        
        for (const question of questions) {
            let isSimilar = false;
            
            for (const uniqueQuestion of uniqueQuestions) {
                const similarity = this.calculateSimilarity(question, uniqueQuestion);
                if (similarity > this.similarityThreshold) {
                    isSimilar = true;
                    break;
                }
            }
            
            if (!isSimilar) {
                uniqueQuestions.push(question);
            }
        }
        
        return uniqueQuestions;
    }

    // Calculate similarity between two questions
    calculateSimilarity(question1, question2) {
        // Check if questions are from the same topic
        if (question1.topic === question2.topic) {
            // Higher similarity for same topic questions
            const textSimilarity = this.calculateTextSimilarity(
                question1.question_text, 
                question2.question_text
            );
            return Math.max(0.5, textSimilarity); // Minimum 0.5 for same topic
        }

        // Calculate text similarity
        return this.calculateTextSimilarity(question1.question_text, question2.question_text);
    }

    // Calculate text similarity using keyword overlap
    calculateTextSimilarity(text1, text2) {
        const keywords1 = this.extractKeywords(text1);
        const keywords2 = this.extractKeywords(text2);
        
        if (keywords1.length === 0 || keywords2.length === 0) {
            return 0;
        }

        const intersection = keywords1.filter(word => keywords2.includes(word));
        const union = [...new Set([...keywords1, ...keywords2])];
        
        return intersection.length / union.length;
    }

    // Extract keywords from question text
    extractKeywords(text) {
        // Remove common stop words and extract meaningful keywords
        const stopWords = new Set([
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 
            'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
            'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
            'should', 'may', 'might', 'can', 'what', 'which', 'who', 'where',
            'when', 'why', 'how', 'this', 'that', 'these', 'those'
        ]);

        return text.toLowerCase()
            .replace(/[^\w\s]/g, '') // Remove punctuation
            .split(/\s+/)
            .filter(word => word.length > 2 && !stopWords.has(word))
            .slice(0, 10); // Take top 10 keywords
    }

    // Get supplementary questions when we need more unique questions
    async getSupplementaryQuestions(allQuestions, selectedQuestions, previousQuestions, needed) {
        const selectedIds = new Set(selectedQuestions.map(q => q.id));
        const previousIds = new Set(previousQuestions);
        
        const candidates = allQuestions.filter(q => 
            !selectedIds.has(q.id) && !previousIds.has(q.id)
        );

        // Sort by least similarity to already selected questions
        const candidatesWithSimilarity = candidates.map(candidate => {
            const maxSimilarity = Math.max(...selectedQuestions.map(selected => 
                this.calculateSimilarity(candidate, selected)
            ));
            return { question: candidate, similarity: maxSimilarity };
        });

        candidatesWithSimilarity.sort((a, b) => a.similarity - b.similarity);
        
        return candidatesWithSimilarity
            .slice(0, needed)
            .map(item => item.question);
    }

    // Store the generated question set for tracking
    async storeQuestionSet(studentId, grade, questionIds) {
        const db = database.getDb();
        const setHash = crypto.createHash('md5').update(questionIds.join(',')).digest('hex');
        
        return new Promise((resolve, reject) => {
            db.run(`
                INSERT OR REPLACE INTO question_sets 
                (student_id, grade, question_ids, set_hash, created_at)
                VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
            `, [studentId, grade, JSON.stringify(questionIds), setHash], (err) => {
                if (err) {
                    // If table doesn't exist, create it
                    if (err.message.includes('no such table')) {
                        this.createQuestionSetsTable().then(() => {
                            // Retry the insert
                            db.run(`
                                INSERT INTO question_sets 
                                (student_id, grade, question_ids, set_hash, created_at)
                                VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
                            `, [studentId, grade, JSON.stringify(questionIds), setHash], (retryErr) => {
                                if (retryErr) reject(retryErr);
                                else resolve();
                            });
                        }).catch(reject);
                    } else {
                        reject(err);
                    }
                } else {
                    resolve();
                }
            });
        });
    }

    // Create question sets table if it doesn't exist
    async createQuestionSetsTable() {
        const db = database.getDb();
        
        return new Promise((resolve, reject) => {
            db.run(`
                CREATE TABLE IF NOT EXISTS question_sets (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    student_id INTEGER NOT NULL,
                    grade INTEGER NOT NULL,
                    question_ids TEXT NOT NULL,
                    set_hash TEXT NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (student_id) REFERENCES students (id)
                )
            `, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    // Utility function to shuffle array
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Get statistics about question distribution
    async getQuestionStats(grade) {
        const db = database.getDb();
        
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    difficulty,
                    subject,
                    COUNT(*) as count
                FROM questions 
                WHERE grade = ?
                GROUP BY difficulty, subject
                ORDER BY difficulty, subject
            `, [grade], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                const stats = {
                    total: 0,
                    byDifficulty: {},
                    bySubject: {},
                    distribution: {}
                };

                rows.forEach(row => {
                    stats.total += row.count;
                    stats.byDifficulty[row.difficulty] = (stats.byDifficulty[row.difficulty] || 0) + row.count;
                    stats.bySubject[row.subject] = (stats.bySubject[row.subject] || 0) + row.count;
                    
                    if (!stats.distribution[row.difficulty]) {
                        stats.distribution[row.difficulty] = {};
                    }
                    stats.distribution[row.difficulty][row.subject] = row.count;
                });

                resolve(stats);
            });
        });
    }

    // Validate question uniqueness for a student
    async validateQuestionUniqueness(studentId, questionIds) {
        const previousQuestions = await this.getPreviousQuestions(studentId);
        const duplicates = questionIds.filter(id => previousQuestions.includes(id));
        
        return {
            isUnique: duplicates.length === 0,
            duplicateCount: duplicates.length,
            duplicateIds: duplicates
        };
    }
}

// Singleton instance
const questionGenerator = new QuestionGenerator();

module.exports = {
    QuestionGenerator,
    questionGenerator
};