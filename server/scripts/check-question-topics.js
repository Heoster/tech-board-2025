const database = require('../config/database');

async function checkQuestionTopics() {
    try {
        console.log('🔄 Connecting to database...');
        await database.connect();
        const db = database.getDb();
        
        console.log('📊 Analyzing question topics...\n');
        
        // Get sample questions to analyze topics
        const sampleQuestions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT id, grade, difficulty, question_text
                FROM questions 
                ORDER BY grade, difficulty
                LIMIT 50
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log('📝 Sample Questions Analysis:');
        console.log('==============================');
        
        // Analyze question content for computer-related topics
        const computerKeywords = [
            'computer', 'software', 'hardware', 'programming', 'code', 'algorithm',
            'database', 'network', 'internet', 'cpu', 'ram', 'memory', 'storage',
            'operating system', 'windows', 'linux', 'application', 'website',
            'digital', 'binary', 'byte', 'bit', 'data', 'file', 'folder',
            'keyboard', 'mouse', 'monitor', 'printer', 'scanner', 'technology',
            'tech', 'IT', 'information technology', 'cyber', 'online', 'offline',
            'server', 'client', 'protocol', 'html', 'css', 'javascript', 'python',
            'java', 'c++', 'programming language', 'syntax', 'variable', 'function'
        ];
        
        let computerRelated = 0;
        let nonComputerRelated = 0;
        const nonComputerQuestions = [];
        
        sampleQuestions.forEach((question, index) => {
            const questionText = question.question_text.toLowerCase();
            const isComputerRelated = computerKeywords.some(keyword => 
                questionText.includes(keyword.toLowerCase())
            );
            
            if (isComputerRelated) {
                computerRelated++;
                if (index < 10) { // Show first 10 computer questions
                    console.log(`✅ Grade ${question.grade} (${question.difficulty}): ${question.question_text.substring(0, 80)}...`);
                }
            } else {
                nonComputerRelated++;
                nonComputerQuestions.push(question);
                if (nonComputerQuestions.length <= 10) { // Show first 10 non-computer questions
                    console.log(`❌ Grade ${question.grade} (${question.difficulty}): ${question.question_text.substring(0, 80)}...`);
                }
            }
        });
        
        console.log('\n📈 Topic Analysis Summary:');
        console.log('===========================');
        console.log(`✅ Computer-related questions: ${computerRelated} (${((computerRelated/sampleQuestions.length)*100).toFixed(1)}%)`);
        console.log(`❌ Non-computer questions: ${nonComputerRelated} (${((nonComputerRelated/sampleQuestions.length)*100).toFixed(1)}%)`);
        
        // Get total count by grade
        console.log('\n📊 Total Questions by Grade:');
        console.log('=============================');
        
        const totalByGrade = await new Promise((resolve, reject) => {
            db.all(`
                SELECT grade, COUNT(*) as total
                FROM questions 
                GROUP BY grade
                ORDER BY grade
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        totalByGrade.forEach(row => {
            console.log(`Grade ${row.grade}: ${row.total} questions`);
        });
        
        // Check if we need to add computer topic filtering
        if (nonComputerRelated > 0) {
            console.log('\n⚠️  RECOMMENDATION:');
            console.log('====================');
            console.log('Some questions may not be computer-related.');
            console.log('Consider implementing topic filtering to ensure only computer questions are selected.');
        } else {
            console.log('\n✅ GOOD NEWS:');
            console.log('==============');
            console.log('All sampled questions appear to be computer-related!');
        }
        
    } catch (error) {
        console.error('❌ Error checking question topics:', error);
        throw error;
    } finally {
        console.log('\n🔒 Closing database connection...');
        await database.close();
    }
}

// Run the check
if (require.main === module) {
    checkQuestionTopics()
        .then(() => {
            console.log('\n🎉 Question topic analysis completed!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Failed to analyze question topics:', error);
            process.exit(1);
        });
}

module.exports = checkQuestionTopics;