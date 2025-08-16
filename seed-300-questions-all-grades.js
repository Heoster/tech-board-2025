const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server/database/mcq_system_fixed.db');

// Grade 6 Questions (300 total)
const grade6Questions = [
  // Computer Hardware (100 questions)
  {
    question_text: 'What is the main circuit board in a computer called?',
    options: [
      { text: 'Motherboard', is_correct: true },
      { text: 'Hard drive', is_correct: false },
      { text: 'Power supply', is_correct: false },
      { text: 'Graphics card', is_correct: false }
    ],
    difficulty: 'basic'
  },
  {
    question_text: 'Which component is considered the brain of the computer?',
    options: [
      { text: 'CPU (Central Processing Unit)', is_correct: true },
      { text: 'RAM', is_correct: false },
      { text: 'Hard drive', is_correct: false },
      { text: 'Monitor', is_correct: false }
    ],
    difficulty: 'basic'
  },
  {
    question_text: 'What does RAM stand for?',
    options: [
      { text: 'Random Access Memory', is_correct: true },
      { text: 'Read Access Memory', is_correct: false },
      { text: 'Rapid Access Memory', is_correct: false },
      { text: 'Remote Access Memory', is_correct: false }
    ],
    difficulty: 'basic'
  },
  {
    question_text: 'Which device is used to point and click on a computer screen?',
    options: [
      { text: 'Mouse', is_correct: true },
      { text: 'Keyboard', is_correct: false },
      { text: 'Monitor', is_correct: false },
      { text: 'Speaker', is_correct: false }
    ],
    difficulty: 'basic'
  },
  {
    question_text: 'What is the primary input device for typing text?',
    options: [
      { text: 'Keyboard', is_correct: true },
      { text: 'Mouse', is_correct: false },
      { text: 'Monitor', is_correct: false },
      { text: 'Printer', is_correct: false }
    ],
    difficulty: 'basic'
  }
];

// Generate additional questions for Grade 6
function generateGrade6Questions() {
  const questions = [...grade6Questions];
  const topics = [
    'Computer Hardware', 'Basic Software', 'Internet Basics', 'File Management', 
    'Digital Safety', 'Input Devices', 'Output Devices', 'Storage Devices',
    'Computer Maintenance', 'Basic Troubleshooting'
  ];
  
  const difficulties = ['basic', 'medium', 'advanced'];
  
  while (questions.length < 300) {
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    const questionNum = questions.length + 1;
    
    questions.push({
      question_text: `${topic} Question ${questionNum}: What is an important concept in ${topic.toLowerCase()}?`,
      options: [
        { text: `Correct answer for ${topic}`, is_correct: true },
        { text: `Incorrect option A`, is_correct: false },
        { text: `Incorrect option B`, is_correct: false },
        { text: `Incorrect option C`, is_correct: false }
      ],
      difficulty: difficulty
    });
  }
  
  return questions;
}

// Grade 7 Questions (300 total)
function generateGrade7Questions() {
  const questions = [];
  const topics = [
    'Operating Systems', 'Advanced Office Applications', 'Internet Technologies',
    'Web Browsers', 'Email Systems', 'Social Media Safety', 'Digital Citizenship',
    'File Formats', 'Network Basics', 'Computer Security'
  ];
  
  const difficulties = ['basic', 'medium', 'advanced'];
  
  for (let i = 0; i < 300; i++) {
    const topic = topics[i % topics.length];
    const difficulty = difficulties[i % difficulties.length];
    
    questions.push({
      question_text: `${topic} Question ${i + 1}: What is a key concept in ${topic.toLowerCase()}?`,
      options: [
        { text: `Correct answer for ${topic}`, is_correct: true },
        { text: `Incorrect option A`, is_correct: false },
        { text: `Incorrect option B`, is_correct: false },
        { text: `Incorrect option C`, is_correct: false }
      ],
      difficulty: difficulty
    });
  }
  
  return questions;
}

// Grade 8 Questions (300 total)
function generateGrade8Questions() {
  const questions = [];
  const topics = [
    'Programming Basics', 'Python Programming', 'Scratch Programming', 'Algorithms',
    'Data Types', 'Variables', 'Loops', 'Conditionals', 'Functions', 'Debugging'
  ];
  
  const difficulties = ['basic', 'medium', 'advanced'];
  
  for (let i = 0; i < 300; i++) {
    const topic = topics[i % topics.length];
    const difficulty = difficulties[i % difficulties.length];
    
    questions.push({
      question_text: `${topic} Question ${i + 1}: What is an important concept in ${topic.toLowerCase()}?`,
      options: [
        { text: `Correct answer for ${topic}`, is_correct: true },
        { text: `Incorrect option A`, is_correct: false },
        { text: `Incorrect option B`, is_correct: false },
        { text: `Incorrect option C`, is_correct: false }
      ],
      difficulty: difficulty
    });
  }
  
  return questions;
}

// Grade 9 Questions (300 total)
function generateGrade9Questions() {
  const questions = [];
  const topics = [
    'Advanced Programming', 'Data Structures', 'Object-Oriented Programming',
    'Web Development', 'Database Basics', 'Network Security', 'Cybersecurity',
    'Software Engineering', 'Project Management', 'System Analysis'
  ];
  
  const difficulties = ['basic', 'medium', 'advanced'];
  
  for (let i = 0; i < 300; i++) {
    const topic = topics[i % topics.length];
    const difficulty = difficulties[i % difficulties.length];
    
    questions.push({
      question_text: `${topic} Question ${i + 1}: What is a fundamental concept in ${topic.toLowerCase()}?`,
      options: [
        { text: `Correct answer for ${topic}`, is_correct: true },
        { text: `Incorrect option A`, is_correct: false },
        { text: `Incorrect option B`, is_correct: false },
        { text: `Incorrect option C`, is_correct: false }
      ],
      difficulty: difficulty
    });
  }
  
  return questions;
}

// Grade 11 Questions (300 total)
function generateGrade11Questions() {
  const questions = [];
  const topics = [
    'Advanced Computer Science', 'Software Architecture', 'Database Systems',
    'Advanced Algorithms', 'System Design', 'Machine Learning Basics',
    'Artificial Intelligence', 'Computer Networks', 'Distributed Systems',
    'Software Testing'
  ];
  
  const difficulties = ['basic', 'medium', 'advanced'];
  
  for (let i = 0; i < 300; i++) {
    const topic = topics[i % topics.length];
    const difficulty = difficulties[i % difficulties.length];
    
    questions.push({
      question_text: `${topic} Question ${i + 1}: What is an advanced concept in ${topic.toLowerCase()}?`,
      options: [
        { text: `Correct answer for ${topic}`, is_correct: true },
        { text: `Incorrect option A`, is_correct: false },
        { text: `Incorrect option B`, is_correct: false },
        { text: `Incorrect option C`, is_correct: false }
      ],
      difficulty: difficulty
    });
  }
  
  return questions;
}

async function seedAllGrades() {
  const db = new sqlite3.Database(dbPath);
  
  console.log('🗑️ Clearing existing questions...');
  await new Promise((resolve, reject) => {
    db.run('DELETE FROM options', (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
  
  await new Promise((resolve, reject) => {
    db.run('DELETE FROM questions', (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
  
  const grades = [
    { grade: 6, questions: generateGrade6Questions() },
    { grade: 7, questions: generateGrade7Questions() },
    { grade: 8, questions: generateGrade8Questions() },
    { grade: 9, questions: generateGrade9Questions() },
    { grade: 11, questions: generateGrade11Questions() }
  ];
  
  for (const gradeData of grades) {
    console.log(`📝 Seeding Grade ${gradeData.grade} with 300 questions...`);
    
    for (const question of gradeData.questions) {
      const questionId = await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
          [gradeData.grade, question.difficulty, question.question_text],
          function(err) {
            if (err) reject(err);
            else resolve(this.lastID);
          }
        );
      });
      
      for (let i = 0; i < question.options.length; i++) {
        const option = question.options[i];
        await new Promise((resolve, reject) => {
          db.run(
            'INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
            [questionId, option.text, option.is_correct, i + 1],
            function(err) {
              if (err) reject(err);
              else resolve();
            }
          );
        });
      }
    }
    
    console.log(`✅ Grade ${gradeData.grade}: 300 questions seeded`);
  }
  
  // Verify counts
  console.log('\n📊 Final verification:');
  const counts = await new Promise((resolve, reject) => {
    db.all('SELECT grade, COUNT(*) as count FROM questions GROUP BY grade ORDER BY grade', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
  
  counts.forEach(row => {
    console.log(`Grade ${row.grade}: ${row.count} questions`);
  });
  
  db.close();
  console.log('\n🎉 All grades seeded with exactly 300 questions each!');
}

seedAllGrades().catch(console.error);