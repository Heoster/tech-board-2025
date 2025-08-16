// Grade 11 Complete 300 Questions

const grade11Base = require('./grade11');
const { grade11CompleteQuestions } = require('./grade11-complete');
const grade11Additional = require('./grade11-additional-195');

// Combine all questions (50 + 55 + 195 = 300)
const allGrade11Questions = [
  ...grade11Base,
  ...grade11CompleteQuestions,
  ...grade11Additional
];

module.exports = allGrade11Questions;