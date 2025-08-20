// Verify 300 Questions Per Grade

const grade6Questions = require('./server/seed/questions/grade6-complete-300');
const grade7Questions = require('./server/seed/questions/grade7-complete-300');
const grade8Questions = require('./server/seed/questions/grade8-complete-300');
const grade9Questions = require('./server/seed/questions/grade9-complete-300');
const grade11Questions = require('./server/seed/questions/grade11-complete-300');

console.log('=== QUESTION COUNT VERIFICATION ===\n');

const grades = [
  { name: 'Grade 6', questions: grade6Questions, expected: 300 },
  { name: 'Grade 7', questions: grade7Questions, expected: 300 },
  { name: 'Grade 8', questions: grade8Questions, expected: 300 },
  { name: 'Grade 9', questions: grade9Questions, expected: 300 },
  { name: 'Grade 11', questions: grade11Questions, expected: 300 }
];

let allCorrect = true;
let totalQuestions = 0;

grades.forEach(grade => {
  const count = grade.questions.length;
  const status = count === grade.expected ? '✅' : '❌';
  
  console.log(`${status} ${grade.name}: ${count} questions (Expected: ${grade.expected})`);
  
  if (count !== grade.expected) {
    allCorrect = false;
    console.log(`   Missing: ${grade.expected - count} questions`);
  }
  
  totalQuestions += count;
});

console.log(`\n=== SUMMARY ===`);
console.log(`Total questions across all grades: ${totalQuestions}`);
console.log(`Expected total: ${grades.length * 300} (${grades.length} grades × 300 questions)`);

if (allCorrect && totalQuestions === 1500) {
  console.log('\n🎉 SUCCESS: All grades have exactly 300 unique questions!');
  console.log('✅ Ready for deployment with 1,500 total questions');
} else {
  console.log('\n❌ ISSUE: Some grades do not have exactly 300 questions');
  console.log('Please check the question files and ensure each grade has 300 questions');
}

// Check for duplicate questions within each grade
console.log('\n=== DUPLICATE CHECK ===');
grades.forEach(grade => {
  const questions = grade.questions;
  const questionTexts = questions.map(q => q.question_text.toLowerCase().trim());
  const uniqueTexts = new Set(questionTexts);
  
  if (questionTexts.length === uniqueTexts.size) {
    console.log(`✅ ${grade.name}: No duplicate questions found`);
  } else {
    console.log(`❌ ${grade.name}: Found ${questionTexts.length - uniqueTexts.size} duplicate questions`);
    allCorrect = false;
  }
});

if (allCorrect) {
  console.log('\n🎉 FINAL STATUS: All checks passed! Ready for production deployment.');
} else {
  console.log('\n❌ FINAL STATUS: Issues found. Please fix before deployment.');
}