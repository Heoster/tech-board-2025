#!/usr/bin/env node

/**
 * Check Question Data Types
 * This script checks the actual data types of questions and options in the database
 */

const database = require('./server/config/database');

async function checkQuestionDataTypes() {
    console.log('🔍 CHECKING QUESTION DATA TYPES');
    console.log('===============================');

    try {
        await database.connect();
        const db = database.getDb();

        // Get a sample question with options
        const sampleQuestion = await new Promise((resolve, reject) => {
            db.get(`
                SELECT q.id, q.grade, q.difficulty, q.question_text
                FROM questions q
                WHERE q.grade = 8
                LIMIT 1
            `, (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        if (!sampleQuestion) {
            console.log('❌ No questions found');
            return;
        }

        console.log('📋 Sample Question:');
        console.log(`   ID: ${sampleQuestion.id} (type: ${typeof sampleQuestion.id})`);
        console.log(`   Grade: ${sampleQuestion.grade} (type: ${typeof sampleQuestion.grade})`);
        console.log(`   Text: "${sampleQuestion.question_text.substring(0, 50)}..."`);

        // Get options for this question
        const options = await new Promise((resolve, reject) => {
            db.all(`
                SELECT id, option_text, is_correct, option_order
                FROM options
                WHERE question_id = ?
                ORDER BY option_order
            `, [sampleQuestion.id], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log('\n📝 Sample Options:');
        options.forEach((option, index) => {
            console.log(`   Option ${index + 1}:`);
            console.log(`     ID: ${option.id} (type: ${typeof option.id})`);
            console.log(`     Text: "${option.option_text}"`);
            console.log(`     Is Correct: ${option.is_correct} (type: ${typeof option.is_correct})`);
            console.log(`     Order: ${option.option_order} (type: ${typeof option.option_order})`);
        });

        // Test the quiz start endpoint data format
        console.log('\n🎯 Testing Quiz Start Data Format:');
        
        // Simulate what the quiz start endpoint returns
        const formattedQuestion = {
            id: sampleQuestion.id,
            questionNumber: 1,
            question_text: sampleQuestion.question_text,
            difficulty: sampleQuestion.difficulty,
            options: options.map(opt => ({
                id: opt.id,
                option_text: opt.option_text,
                is_correct: false // Hidden from students
            }))
        };

        console.log('📤 Frontend receives:');
        console.log(`   Question ID: ${formattedQuestion.id} (type: ${typeof formattedQuestion.id})`);
        console.log(`   Options:`);
        formattedQuestion.options.forEach((opt, index) => {
            console.log(`     Option ${index + 1} ID: ${opt.id} (type: ${typeof opt.id})`);
        });

        // Test submission data format
        console.log('\n📥 Submission Data Format Test:');
        
        const submissionResponse = {
            questionId: formattedQuestion.id,
            selectedOptionId: formattedQuestion.options[0].id
        };

        console.log('Before parseInt():');
        console.log(`   questionId: ${submissionResponse.questionId} (type: ${typeof submissionResponse.questionId})`);
        console.log(`   selectedOptionId: ${submissionResponse.selectedOptionId} (type: ${typeof submissionResponse.selectedOptionId})`);

        const parsedResponse = {
            questionId: parseInt(submissionResponse.questionId),
            selectedOptionId: parseInt(submissionResponse.selectedOptionId)
        };

        console.log('After parseInt():');
        console.log(`   questionId: ${parsedResponse.questionId} (type: ${typeof parsedResponse.questionId})`);
        console.log(`   selectedOptionId: ${parsedResponse.selectedOptionId} (type: ${typeof parsedResponse.selectedOptionId})`);

        // Validation check
        console.log('\n✅ Validation Check:');
        console.log(`   questionId is integer: ${Number.isInteger(parsedResponse.questionId)}`);
        console.log(`   selectedOptionId is integer: ${Number.isInteger(parsedResponse.selectedOptionId)}`);

        await database.close();

    } catch (error) {
        console.error('❌ Error:', error);
        await database.close();
    }
}

if (require.main === module) {
    checkQuestionDataTypes();
}

module.exports = { checkQuestionDataTypes };