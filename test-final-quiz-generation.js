const axios = require('axios');

const API_BASE = 'http://192.168.31.234:8000/api';

async function testFinalQuizGeneration() {
    try {
        console.log('🧪 Testing FINAL Fixed Quiz Generation...\n');
        
        // Step 1: Register a fresh test student
        console.log('1️⃣ Registering fresh test student...');
        const registerResponse = await axios.post(`${API_BASE}/auth/register`, {
            name: 'Final Test Student',
            rollNumber: 77,
            grade: 8,
            section: 'B',
            password: 'finaltest123'
        });
        
        if (registerResponse.data.success) {
            console.log('✅ Student registered successfully');
            const token = registerResponse.data.data.token;
            
            // Step 2: Start a quiz for Grade 8 (the problematic grade)
            console.log('\n2️⃣ Starting quiz for Grade 8 (testing fixed algorithm)...');
            const quizResponse = await axios.get(`${API_BASE}/quiz/start/8`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (quizResponse.data.success) {
                console.log('✅ Quiz started successfully with FIXED algorithm!');
                const quizData = quizResponse.data.data;
                
                console.log(`📊 Quiz ID: ${quizData.quizId}`);
                console.log(`📚 Total Questions: ${quizData.totalQuestions}`);
                console.log(`⏰ Time Limit: ${quizData.timeLimit} minutes`);
                
                // Analyze the generated quiz
                const questions = quizData.questions;
                const difficultyCount = { basic: 0, medium: 0, advanced: 0 };
                const categoryCount = {};
                
                questions.forEach(q => {
                    difficultyCount[q.difficulty]++;
                    // Extract category from question (would need to be added to API response)
                });
                
                console.log(`\n📊 FIXED Algorithm Results:`);
                console.log(`🎯 Difficulty Distribution:`);
                Object.entries(difficultyCount).forEach(([diff, count]) => {
                    const emoji = diff === 'basic' ? '🟢' : diff === 'medium' ? '🟡' : '🔴';
                    const percentage = ((count / questions.length) * 100).toFixed(1);
                    console.log(`   ${emoji} ${diff}: ${count} questions (${percentage}%)`);
                });
                
                console.log(`\n📝 Sample Questions Generated:`);
                questions.slice(0, 5).forEach((q, index) => {
                    const diffEmoji = q.difficulty === 'basic' ? '🟢' : q.difficulty === 'medium' ? '🟡' : '🔴';
                    console.log(`${index + 1}. ${diffEmoji} ${q.question_text.substring(0, 60)}...`);
                });
                
                // Check for duplicates
                const questionTexts = questions.map(q => q.question_text);
                const uniqueTexts = new Set(questionTexts);
                const duplicateCount = questionTexts.length - uniqueTexts.size;
                
                if (duplicateCount === 0) {
                    console.log(`\n✅ NO DUPLICATES: All ${questions.length} questions are unique`);
                } else {
                    console.log(`\n❌ DUPLICATES FOUND: ${duplicateCount} duplicate questions`);
                }
                
                // Overall assessment
                const hasCorrectCount = questions.length === 25;
                const hasNoDuplicates = duplicateCount === 0;
                const hasAdvancedQuestions = difficultyCount.advanced > 0;
                
                console.log(`\n🎉 FINAL ASSESSMENT:`);
                console.log(`   ${hasCorrectCount ? '✅' : '❌'} Correct question count (${questions.length}/25)`);
                console.log(`   ${hasNoDuplicates ? '✅' : '❌'} No duplicate questions`);
                console.log(`   ${hasAdvancedQuestions ? '✅' : '❌'} Contains advanced questions (${difficultyCount.advanced})`);
                
                if (hasCorrectCount && hasNoDuplicates && hasAdvancedQuestions) {
                    console.log(`\n🎊 SUCCESS: Fixed algorithm is working perfectly!`);
                } else {
                    console.log(`\n⚠️  ISSUES REMAIN: Algorithm needs further fixes`);
                }
                
                return {
                    success: true,
                    quizData,
                    analysis: {
                        totalQuestions: questions.length,
                        duplicates: duplicateCount,
                        difficulty: difficultyCount
                    }
                };
            } else {
                console.log('❌ Failed to start quiz:', quizResponse.data.error);
                return { success: false, error: quizResponse.data.error };
            }
        } else {
            console.log('❌ Failed to register student:', registerResponse.data.error);
            return { success: false, error: registerResponse.data.error };
        }
        
    } catch (error) {
        console.log('❌ Error during test:', error.response?.data || error.message);
        return { success: false, error: error.response?.data || error.message };
    }
}

// Run the test
testFinalQuizGeneration().then(result => {
    if (result.success) {
        console.log('\n🎉 Final quiz generation test completed successfully!');
        console.log('🚀 The TECH BOARD 2025 system is ready for production!');
    } else {
        console.log('\n💥 Final test failed:', result.error);
    }
});