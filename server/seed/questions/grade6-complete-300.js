// Grade 6 Complete 300 Questions

const grade6Base = require('./grade6-300-complete');
const grade6Additional = require('./grade6-additional-250');
const grade6Final = require('./grade6-final-200');

// Combine all questions (50 + 50 + 200 = 300)
const allGrade6Questions = [
  ...grade6Base,
  ...grade6Additional,
  ...grade6Final
];

module.exports = allGrade6Questions;