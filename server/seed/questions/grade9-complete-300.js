// Grade 9 Complete 300 Questions

const grade9Base = require('./grade9');
const { grade9CompleteQuestions } = require('./grade9-complete');
const grade9Additional = require('./grade9-additional-200');

// Combine all questions (50 + 50 + 200 = 300)
const allGrade9Questions = [
  ...grade9Base,
  ...grade9CompleteQuestions,
  ...grade9Additional
];

module.exports = allGrade9Questions;