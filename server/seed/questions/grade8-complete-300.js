// Grade 8 Complete 300 Questions

const grade8Base = require('./grade8');
const grade8Additional = require('./grade8-additional-250');

// Combine all questions (50 + 250 = 300)
const allGrade8Questions = [
  ...grade8Base,
  ...grade8Additional
];

module.exports = allGrade8Questions;