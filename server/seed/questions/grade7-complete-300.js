// Grade 7 Complete 300 Questions

const grade7Base = require('./grade7');
const { grade7CompleteQuestions } = require('./grade7-complete');
const grade7Additional = require('./grade7-additional-170');
const grade7Final = require('./grade7-final-120');

// Combine all questions (55 + 75 + 50 + 120 = 300)
const allGrade7Questions = [
  ...grade7Base,
  ...grade7CompleteQuestions,
  ...grade7Additional,
  ...grade7Final
];

module.exports = allGrade7Questions;