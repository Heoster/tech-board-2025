const grade8Questions = [
  // Computer Programming Basics - Basic (20 questions)
  {
    grade: 8,
    difficulty: 'basic',
    question_text: 'What is a programming language?',
    options: [
      { text: 'A set of instructions and syntax used to create computer programs', is_correct: true },
      { text: 'A spoken language used by programmers', is_correct: false },
      { text: 'A type of computer hardware', is_correct: false },
      { text: 'A web browser', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'basic',
    question_text: 'Which is a popular programming language?',
    options: [
      { text: 'Python', is_correct: true },
      { text: 'Microsoft Word', is_correct: false },
      { text: 'Google Chrome', is_correct: false },
      { text: 'Adobe Photoshop', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'basic',
    question_text: 'What does the print() function do in Python?',
    options: [
      { text: 'Displays text or values on the screen', is_correct: true },
      { text: 'Prints documents on paper', is_correct: false },
      { text: 'Saves files to computer', is_correct: false },
      { text: 'Deletes text from program', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'basic',
    question_text: 'What does the input() function do in Python?',
    options: [
      { text: 'Gets information from the user', is_correct: true },
      { text: 'Displays information to the user', is_correct: false },
      { text: 'Calculates mathematical operations', is_correct: false },
      { text: 'Saves data to a file', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'basic',
    question_text: 'What is a variable in programming?',
    options: [
      { text: 'A container that stores data values', is_correct: true },
      { text: 'A type of computer virus', is_correct: false },
      { text: 'A programming error', is_correct: false },
      { text: 'A computer component', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'basic',
    question_text: 'What is Scratch?',
    options: [
      { text: 'A visual programming language using blocks', is_correct: true },
      { text: 'A way to damage computer screens', is_correct: false },
      { text: 'A type of computer virus', is_correct: false },
      { text: 'A web browser', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'basic',
    question_text: 'What is visual programming?',
    options: [
      { text: 'Programming using graphical elements instead of text', is_correct: true },
      { text: 'Programming that creates visual art', is_correct: false },
      { text: 'Programming for graphics only', is_correct: false },
      { text: 'Programming that cannot be seen', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'basic',
    question_text: 'What is logic in programming?',
    options: [
      { text: 'The reasoning and decision-making process in programs', is_correct: true },
      { text: 'A type of computer hardware', is_correct: false },
      { text: 'A programming error', is_correct: false },
      { text: 'A file format', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'basic',
    question_text: 'What is a conditional statement?',
    options: [
      { text: 'Code that executes different actions based on conditions', is_correct: true },
      { text: 'A statement that is always true', is_correct: false },
      { text: 'A statement that is always false', is_correct: false },
      { text: 'A type of variable', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'basic',
    question_text: 'What does "if" do in programming?',
    options: [
      { text: 'Checks a condition and executes code if the condition is true', is_correct: true },
      { text: 'Always executes code', is_correct: false },
      { text: 'Never executes code', is_correct: false },
      { text: 'Deletes code', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'basic',
    question_text: 'What is debugging?',
    options: [
      { text: 'Finding and fixing errors in computer programs', is_correct: true },
      { text: 'Removing insects from computers', is_correct: false },
      { text: 'Installing new software', is_correct: false },
      { text: 'Cleaning computer screens', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'basic',
    question_text: 'What is a bug in programming?',
    options: [
      { text: 'An error or mistake in the code', is_correct: true },
      { text: 'An insect inside the computer', is_correct: false },
      { text: 'A feature of the program', is_correct: false },
      { text: 'A type of virus', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'basic',
    question_text: 'Why is it important to test programs?',
    options: [
      { text: 'To make sure they work correctly and find any errors', is_correct: true },
      { text: 'Testing is not necessary', is_correct: false },
      { text: 'To make programs slower', is_correct: false },
      { text: 'To delete the program', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'basic',
    question_text: 'What is an algorithm in programming?',
    options: [
      { text: 'A step-by-step procedure to solve a problem', is_correct: true },
      { text: 'A type of computer', is_correct: false },
      { text: 'A programming language', is_correct: false },
      { text: 'A computer virus', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'basic',
    question_text: 'What is the purpose of comments in code?',
    options: [
      { text: 'To explain what the code does for humans reading it', is_correct: true },
      { text: 'To make the program run faster', is_correct: false },
      { text: 'To create errors in the program', is_correct: false },
      { text: 'To delete parts of the program', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'basic',
    question_text: 'What is syntax in programming?',
    options: [
      { text: 'The rules for writing code in a programming language', is_correct: true },
      { text: 'The meaning of the program', is_correct: false },
      { text: 'The speed of the program', is_correct: false },
      { text: 'The size of the program', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'basic',
    question_text: 'What happens when there is a syntax error?',
    options: [
      { text: 'The program cannot run because the code is written incorrectly', is_correct: true },
      { text: 'The program runs faster', is_correct: false },
      { text: 'The program works perfectly', is_correct: false },
      { text: 'Nothing happens', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'basic',
    question_text: 'What is a string in programming?',
    options: [
      { text: 'A sequence of characters or text', is_correct: true },
      { text: 'A piece of rope', is_correct: false },
      { text: 'A number', is_correct: false },
      { text: 'A programming error', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'basic',
    question_text: 'What is an integer in programming?',
    options: [
      { text: 'A whole number without decimal points', is_correct: true },
      { text: 'A text value', is_correct: false },
      { text: 'A programming language', is_correct: false },
      { text: 'A type of error', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'basic',
    question_text: 'Why do programmers use indentation in Python?',
    options: [
      { text: 'To show which code belongs together in blocks', is_correct: true },
      { text: 'To make the code look pretty', is_correct: false },
      { text: 'Indentation is not important', is_correct: false },
      { text: 'To make the program run slower', is_correct: false }
    ]
  },

  // Computer Programming Basics - Medium (20 questions)
  {
    grade: 8,
    difficulty: 'medium',
    question_text: 'How do different programming languages serve different purposes?',
    options: [
      { text: 'Each language is optimized for specific types of applications and tasks', is_correct: true },
      { text: 'All programming languages are identical', is_correct: false },
      { text: 'Programming languages have no specific purposes', is_correct: false },
      { text: 'Only one programming language should exist', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'medium',
    question_text: 'What is the advantage of using variables instead of fixed values?',
    options: [
      { text: 'Variables make programs flexible and reusable', is_correct: true },
      { text: 'Fixed values are always better than variables', is_correct: false },
      { text: 'Variables make programs slower', is_correct: false },
      { text: 'Variables and fixed values are the same', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'medium',
    question_text: 'How does visual programming help beginners learn coding concepts?',
    options: [
      { text: 'It makes abstract programming concepts more concrete and easier to understand', is_correct: true },
      { text: 'Visual programming is harder than text-based programming', is_correct: false },
      { text: 'Visual programming is only for experts', is_correct: false },
      { text: 'Visual programming teaches no useful skills', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'medium',
    question_text: 'What is the relationship between algorithms and programs?',
    options: [
      { text: 'Algorithms are the logical steps that programs implement in code', is_correct: true },
      { text: 'Algorithms and programs are completely different', is_correct: false },
      { text: 'Programs are not based on algorithms', is_correct: false },
      { text: 'Algorithms are only used after programming', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'medium',
    question_text: 'Why is logical thinking important in programming?',
    options: [
      { text: 'Programs must follow logical steps to solve problems correctly', is_correct: true },
      { text: 'Logic is not important in programming', is_correct: false },
      { text: 'Programs work better with illogical thinking', is_correct: false },
      { text: 'Computers can think logically by themselves', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'medium',
    question_text: 'How do conditional statements make programs more intelligent?',
    options: [
      { text: 'They allow programs to make decisions based on different situations', is_correct: true },
      { text: 'Conditional statements make programs confused', is_correct: false },
      { text: 'Programs should never make decisions', is_correct: false },
      { text: 'Conditional statements slow down programs', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'medium',
    question_text: 'What is the importance of systematic debugging?',
    options: [
      { text: 'It helps identify the root cause of problems efficiently', is_correct: true },
      { text: 'Random debugging is more effective', is_correct: false },
      { text: 'Debugging should be avoided', is_correct: false },
      { text: 'Programs never have bugs', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'medium',
    question_text: 'How does testing improve program quality?',
    options: [
      { text: 'Testing reveals errors and ensures programs work as intended', is_correct: true },
      { text: 'Testing makes programs worse', is_correct: false },
      { text: 'Programs do not need testing', is_correct: false },
      { text: 'Testing only slows down development', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'medium',
    question_text: 'What role do data types play in programming?',
    options: [
      { text: 'They define what kind of data can be stored and what operations are possible', is_correct: true },
      { text: 'Data types are not important', is_correct: false },
      { text: 'All data is the same type', is_correct: false },
      { text: 'Data types only affect program appearance', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'medium',
    question_text: 'How does proper code organization improve program maintenance?',
    options: [
      { text: 'Organized code is easier to understand, modify, and debug', is_correct: true },
      { text: 'Disorganized code is easier to maintain', is_correct: false },
      { text: 'Code organization has no impact on maintenance', is_correct: false },
      { text: 'Programs never need maintenance', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'medium',
    question_text: 'What is the benefit of using meaningful variable names?',
    options: [
      { text: 'They make code self-documenting and easier to understand', is_correct: true },
      { text: 'Variable names do not matter', is_correct: false },
      { text: 'Short, cryptic names are always better', is_correct: false },
      { text: 'Meaningful names slow down programs', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'medium',
    question_text: 'How do programming concepts apply to problem-solving in other subjects?',
    options: [
      { text: 'Logical thinking and step-by-step approaches are useful in many areas', is_correct: true },
      { text: 'Programming concepts only apply to computers', is_correct: false },
      { text: 'Other subjects do not involve problem-solving', is_correct: false },
      { text: 'Programming and other subjects are completely separate', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'medium',
    question_text: 'What is the importance of user input in interactive programs?',
    options: [
      { text: 'It allows programs to respond to user needs and preferences', is_correct: true },
      { text: 'User input makes programs more complicated', is_correct: false },
      { text: 'Programs should never accept user input', is_correct: false },
      { text: 'User input is only for games', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'medium',
    question_text: 'How does understanding syntax help in learning programming?',
    options: [
      { text: 'Proper syntax is required for programs to run correctly', is_correct: true },
      { text: 'Syntax is not important for programming', is_correct: false },
      { text: 'Programs work without following syntax rules', is_correct: false },
      { text: 'Syntax only affects program appearance', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'medium',
    question_text: 'What is the relationship between creativity and programming?',
    options: [
      { text: 'Programming involves creative problem-solving and innovative solutions', is_correct: true },
      { text: 'Programming has no creative aspects', is_correct: false },
      { text: 'Creativity interferes with programming', is_correct: false },
      { text: 'Only artistic people can be creative in programming', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'medium',
    question_text: 'How do programming errors help in the learning process?',
    options: [
      { text: 'Errors provide feedback and learning opportunities', is_correct: true },
      { text: 'Errors should be avoided at all costs', is_correct: false },
      { text: 'Errors mean someone is bad at programming', is_correct: false },
      { text: 'Errors have no educational value', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'medium',
    question_text: 'What is the importance of planning before writing code?',
    options: [
      { text: 'Planning helps organize thoughts and reduces errors', is_correct: true },
      { text: 'Planning wastes time in programming', is_correct: false },
      { text: 'Good programmers never need to plan', is_correct: false },
      { text: 'Code should be written randomly', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'medium',
    question_text: 'How does pair programming benefit learning?',
    options: [
      { text: 'Two people can share knowledge and catch each other\'s mistakes', is_correct: true },
      { text: 'Programming should always be done alone', is_correct: false },
      { text: 'Pair programming slows down development', is_correct: false },
      { text: 'Only one person should touch the keyboard', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'medium',
    question_text: 'What role does practice play in developing programming skills?',
    options: [
      { text: 'Regular practice builds familiarity with concepts and improves problem-solving', is_correct: true },
      { text: 'Practice is not necessary for programming', is_correct: false },
      { text: 'Programming skills cannot be improved with practice', is_correct: false },
      { text: 'One programming session is enough to master the skill', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'medium',
    question_text: 'How do programming fundamentals prepare students for advanced concepts?',
    options: [
      { text: 'Strong fundamentals provide the foundation for learning complex topics', is_correct: true },
      { text: 'Fundamentals are not important for advanced programming', is_correct: false },
      { text: 'Advanced concepts are completely separate from fundamentals', is_correct: false },
      { text: 'Students should skip fundamentals and go straight to advanced topics', is_correct: false }
    ]
  },

  // Computer Programming Basics - Advanced (10 questions)
  {
    grade: 8,
    difficulty: 'advanced',
    question_text: 'How does understanding programming paradigms influence problem-solving approaches?',
    options: [
      { text: 'Different paradigms provide different ways to structure and think about solutions', is_correct: true },
      { text: 'All programming paradigms are identical', is_correct: false },
      { text: 'Paradigms do not affect problem-solving', is_correct: false },
      { text: 'Only one paradigm should be used for all problems', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'advanced',
    question_text: 'What is the significance of abstraction in programming?',
    options: [
      { text: 'It allows focusing on essential features while hiding complex implementation details', is_correct: true },
      { text: 'Abstraction makes programs more complicated', is_correct: false },
      { text: 'All details should always be visible in programs', is_correct: false },
      { text: 'Abstraction is not useful in programming', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'advanced',
    question_text: 'How does computational thinking extend beyond programming?',
    options: [
      { text: 'It provides problem-solving strategies applicable to many disciplines', is_correct: true },
      { text: 'Computational thinking only applies to computer programming', is_correct: false },
      { text: 'It has no relevance outside of computing', is_correct: false },
      { text: 'Computational thinking is too narrow for other fields', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'advanced',
    question_text: 'What role does pattern recognition play in algorithm development?',
    options: [
      { text: 'Identifying patterns helps create efficient and reusable solutions', is_correct: true },
      { text: 'Patterns should be avoided in algorithm development', is_correct: false },
      { text: 'Each problem requires a completely unique solution', is_correct: false },
      { text: 'Pattern recognition is not relevant to algorithms', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'advanced',
    question_text: 'How does the concept of modularity improve program design?',
    options: [
      { text: 'Breaking programs into modules makes them easier to develop, test, and maintain', is_correct: true },
      { text: 'Programs should be written as single large blocks', is_correct: false },
      { text: 'Modularity makes programs more complex', is_correct: false },
      { text: 'Modules are not useful in programming', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'advanced',
    question_text: 'What is the relationship between programming and mathematical thinking?',
    options: [
      { text: 'Both involve logical reasoning, pattern recognition, and systematic problem-solving', is_correct: true },
      { text: 'Programming and mathematics are completely unrelated', is_correct: false },
      { text: 'Programming requires no mathematical thinking', is_correct: false },
      { text: 'Mathematics is not useful for programming', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'advanced',
    question_text: 'How does understanding program flow control enhance problem-solving skills?',
    options: [
      { text: 'It teaches how to structure logical sequences and decision-making processes', is_correct: true },
      { text: 'Flow control is only relevant to programming', is_correct: false },
      { text: 'Problem-solving does not involve flow control', is_correct: false },
      { text: 'Flow control makes problem-solving more difficult', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'advanced',
    question_text: 'What impact does learning programming have on digital literacy?',
    options: [
      { text: 'It develops deeper understanding of how digital systems work and can be controlled', is_correct: true },
      { text: 'Programming knowledge is not part of digital literacy', is_correct: false },
      { text: 'Digital literacy only involves using existing software', is_correct: false },
      { text: 'Programming makes people less digitally literate', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'advanced',
    question_text: 'How does the debugging process develop critical thinking skills?',
    options: [
      { text: 'It requires systematic analysis, hypothesis formation, and testing', is_correct: true },
      { text: 'Debugging is purely mechanical and requires no thinking', is_correct: false },
      { text: 'Critical thinking is not involved in debugging', is_correct: false },
      { text: 'Debugging skills do not transfer to other areas', is_correct: false }
    ]
  },
  {
    grade: 8,
    difficulty: 'advanced',
    question_text: 'What is the long-term value of learning programming fundamentals?',
    options: [
      { text: 'They provide a foundation for understanding and adapting to future technologies', is_correct: true },
      { text: 'Programming fundamentals become obsolete quickly', is_correct: false },
      { text: 'Only current programming languages matter', is_correct: false },
      { text: 'Fundamentals have no long-term value', is_correct: false }
    ]
  }
];

module.exports = grade8Questions;