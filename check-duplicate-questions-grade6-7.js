// Script to check for duplicate questions between Grade 6 and Grade 7 seed files

const fs = require('fs');
const path = require('path');

// Read both seed files
const grade6Content = fs.readFileSync('seed-grade6.js', 'utf8');
const grade7Content = fs.readFileSync('seed-grade7.js', 'utf8');

// Extract questions from Grade 6
const grade6Questions = [];
const grade6Matches = grade6Content.match(/question:\s*['"`](.*?)['"`]/g);
if (grade6Matches) {
    grade6Matches.forEach(match => {
        const question = match.replace(/question:\s*['"`]/, '').replace(/['"`]$/, '');
        grade6Questions.push(question.toLowerCase().trim());
    });
}

// Extract questions from Grade 7
const grade7Questions = [];
const grade7Matches = grade7Content.match(/question:\s*['"`](.*?)['"`]/g);
if (grade7Matches) {
    grade7Matches.forEach(match => {
        const question = match.replace(/question:\s*['"`]/, '').replace(/['"`]$/, '');
        grade7Questions.push(question.toLowerCase().trim());
    });
}

console.log('🔍 Checking for duplicate questions between Grade 6 and Grade 7...\n');

console.log(`📊 Statistics:`);
console.log(`   Grade 6 questions: ${grade6Questions.length}`);
console.log(`   Grade 7 questions: ${grade7Questions.length}`);
console.log(`   Total questions: ${grade6Questions.length + grade7Questions.length}\n`);

// Find duplicates
const duplicates = [];
const similarQuestions = [];

grade6Questions.forEach((q6, index6) => {
    grade7Questions.forEach((q7, index7) => {
        // Exact match
        if (q6 === q7) {
            duplicates.push({
                question: q6,
                grade6Index: index6 + 1,
                grade7Index: index7 + 1
            });
        }
        // Similar questions (check for high similarity)
        else if (calculateSimilarity(q6, q7) > 0.8) {
            similarQuestions.push({
                grade6Question: q6,
                grade7Question: q7,
                grade6Index: index6 + 1,
                grade7Index: index7 + 1,
                similarity: calculateSimilarity(q6, q7)
            });
        }
    });
});

// Function to calculate similarity between two strings
function calculateSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
}

// Levenshtein distance algorithm
function levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    
    return matrix[str2.length][str1.length];
}

// Report results
console.log('🎯 DUPLICATE ANALYSIS RESULTS:\n');

if (duplicates.length === 0) {
    console.log('✅ NO EXACT DUPLICATES FOUND!');
    console.log('   All questions between Grade 6 and Grade 7 are unique.\n');
} else {
    console.log(`❌ EXACT DUPLICATES FOUND: ${duplicates.length}`);
    duplicates.forEach((dup, index) => {
        console.log(`   ${index + 1}. "${dup.question}"`);
        console.log(`      - Grade 6 Question #${dup.grade6Index}`);
        console.log(`      - Grade 7 Question #${dup.grade7Index}\n`);
    });
}

if (similarQuestions.length === 0) {
    console.log('✅ NO HIGHLY SIMILAR QUESTIONS FOUND!');
    console.log('   All questions are sufficiently different.\n');
} else {
    console.log(`⚠️  SIMILAR QUESTIONS FOUND: ${similarQuestions.length}`);
    console.log('   (Questions with >80% similarity)\n');
    
    similarQuestions.forEach((sim, index) => {
        console.log(`   ${index + 1}. Similarity: ${(sim.similarity * 100).toFixed(1)}%`);
        console.log(`      Grade 6 #${sim.grade6Index}: "${sim.grade6Question}"`);
        console.log(`      Grade 7 #${sim.grade7Index}: "${sim.grade7Question}"\n`);
    });
}

// Topic analysis
console.log('📚 TOPIC COVERAGE ANALYSIS:\n');

// Extract topics from comments in Grade 6
const grade6Topics = [];
const grade6TopicMatches = grade6Content.match(/\/\/\s*(.*?)\s*-\s*(Basic|Medium|Advanced)/g);
if (grade6TopicMatches) {
    grade6TopicMatches.forEach(match => {
        const topic = match.replace(/\/\/\s*/, '').replace(/\s*-\s*(Basic|Medium|Advanced).*/, '').trim();
        if (topic && !grade6Topics.includes(topic)) {
            grade6Topics.push(topic);
        }
    });
}

// Extract topics from comments in Grade 7
const grade7Topics = [];
const grade7TopicMatches = grade7Content.match(/\/\/\s*(.*?)\s*-\s*(Basic|Medium|Advanced)/g);
if (grade7TopicMatches) {
    grade7TopicMatches.forEach(match => {
        const topic = match.replace(/\/\/\s*/, '').replace(/\s*-\s*(Basic|Medium|Advanced).*/, '').trim();
        if (topic && !grade7Topics.includes(topic)) {
            grade7Topics.push(topic);
        }
    });
}

console.log('Grade 6 Topics:');
grade6Topics.forEach((topic, index) => {
    console.log(`   ${index + 1}. ${topic}`);
});

console.log('\nGrade 7 Topics:');
grade7Topics.forEach((topic, index) => {
    console.log(`   ${index + 1}. ${topic}`);
});

// Find overlapping topics
const overlappingTopics = grade6Topics.filter(topic => 
    grade7Topics.some(g7Topic => 
        topic.toLowerCase().includes(g7Topic.toLowerCase()) || 
        g7Topic.toLowerCase().includes(topic.toLowerCase())
    )
);

console.log('\n🔄 OVERLAPPING TOPICS:');
if (overlappingTopics.length === 0) {
    console.log('   ✅ No overlapping topics found - good grade progression!');
} else {
    overlappingTopics.forEach((topic, index) => {
        console.log(`   ${index + 1}. ${topic}`);
    });
}

console.log('\n🏁 FINAL SUMMARY:');
console.log(`   • Total questions analyzed: ${grade6Questions.length + grade7Questions.length}`);
console.log(`   • Exact duplicates: ${duplicates.length}`);
console.log(`   • Similar questions (>80%): ${similarQuestions.length}`);
console.log(`   • Grade 6 topics: ${grade6Topics.length}`);
console.log(`   • Grade 7 topics: ${grade7Topics.length}`);
console.log(`   • Overlapping topics: ${overlappingTopics.length}`);

if (duplicates.length === 0 && similarQuestions.length === 0) {
    console.log('\n🎉 EXCELLENT! No duplicate questions found between Grade 6 and Grade 7.');
    console.log('   The question sets are properly differentiated by grade level.');
} else {
    console.log('\n⚠️  ATTENTION NEEDED: Some duplicates or similar questions found.');
    console.log('   Consider reviewing and modifying similar questions for better grade differentiation.');
}