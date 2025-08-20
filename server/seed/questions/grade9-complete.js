// Grade 9 Complete Questions (remaining 250 questions)

const grade9CompleteQuestions = [
  // Advanced Programming - Advanced (25 questions)
  {
    grade: 9,
    difficulty: 'advanced',
    question_text: 'How does understanding computational complexity help in algorithm selection?',
    options: [
      { text: 'It helps choose algorithms that scale well with increasing data size', is_correct: true },
      { text: 'Computational complexity is not relevant to algorithm choice', is_correct: false },
      { text: 'All algorithms have the same complexity', is_correct: false },
      { text: 'Complexity only matters for mathematical problems', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'advanced',
    question_text: 'What is the significance of recursion in programming?',
    options: [
      { text: 'Recursion provides elegant solutions for problems with self-similar structure', is_correct: true },
      { text: 'Recursion should always be avoided', is_correct: false },
      { text: 'Iterative solutions are always better than recursive ones', is_correct: false },
      { text: 'Recursion only works with mathematical functions', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'advanced',
    question_text: 'How does functional programming differ from procedural programming?',
    options: [
      { text: 'Functional programming emphasizes functions as first-class objects and immutability', is_correct: true },
      { text: 'Functional and procedural programming are identical', is_correct: false },
      { text: 'Procedural programming is always better than functional', is_correct: false },
      { text: 'Functional programming cannot solve real problems', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'advanced',
    question_text: 'What role does abstraction play in managing program complexity?',
    options: [
      { text: 'Abstraction hides implementation details and focuses on essential features', is_correct: true },
      { text: 'Abstraction makes programs more complex', is_correct: false },
      { text: 'All implementation details should always be visible', is_correct: false },
      { text: 'Abstraction is not useful in programming', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'advanced',
    question_text: 'How does understanding memory management improve programming skills?',
    options: [
      { text: 'It helps write more efficient programs and avoid memory-related bugs', is_correct: true },
      { text: 'Memory management is handled automatically and never needs consideration', is_correct: false },
      { text: 'Memory management only matters for system programming', is_correct: false },
      { text: 'Modern computers have unlimited memory', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'advanced',
    question_text: 'What is the impact of design patterns on software development?',
    options: [
      { text: 'Design patterns provide proven solutions to common programming problems', is_correct: true },
      { text: 'Every problem requires a unique solution', is_correct: false },
      { text: 'Design patterns limit creativity', is_correct: false },
      { text: 'Patterns are only useful for large applications', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'advanced',
    question_text: 'How does concurrent programming address modern computing challenges?',
    options: [
      { text: 'It enables programs to utilize multiple processors and handle simultaneous tasks', is_correct: true },
      { text: 'Concurrent programming is not relevant to modern computing', is_correct: false },
      { text: 'Sequential programming is always better than concurrent', is_correct: false },
      { text: 'Concurrency only applies to web applications', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'advanced',
    question_text: 'What is the relationship between data structures and algorithm efficiency?',
    options: [
      { text: 'Appropriate data structures can significantly improve algorithm performance', is_correct: true },
      { text: 'Data structures have no impact on algorithm efficiency', is_correct: false },
      { text: 'All data structures provide identical performance', is_correct: false },
      { text: 'Algorithm efficiency is independent of data organization', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'advanced',
    question_text: 'How does understanding program optimization benefit software development?',
    options: [
      { text: 'Optimization techniques improve program performance and resource utilization', is_correct: true },
      { text: 'Program optimization is never necessary', is_correct: false },
      { text: 'Optimization always makes programs harder to understand', is_correct: false },
      { text: 'Modern computers eliminate the need for optimization', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'advanced',
    question_text: 'What role does software architecture play in large program development?',
    options: [
      { text: 'Architecture provides the overall structure and organization for complex systems', is_correct: true },
      { text: 'Large programs do not need architectural planning', is_correct: false },
      { text: 'Architecture is only important for building construction', is_correct: false },
      { text: 'Good code automatically creates good architecture', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'advanced',
    question_text: 'How does version control support collaborative programming?',
    options: [
      { text: 'It tracks changes and enables multiple developers to work on the same codebase', is_correct: true },
      { text: 'Version control is only useful for individual developers', is_correct: false },
      { text: 'Collaboration is not possible in programming', is_correct: false },
      { text: 'Version control makes collaboration more difficult', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'advanced',
    question_text: 'What is the significance of code review in software development?',
    options: [
      { text: 'Code review improves quality, shares knowledge, and catches errors', is_correct: true },
      { text: 'Code review is a waste of time', is_correct: false },
      { text: 'Only junior developers need code review', is_correct: false },
      { text: 'Code review slows down development unnecessarily', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'advanced',
    question_text: 'How does understanding different programming paradigms enhance problem-solving?',
    options: [
      { text: 'Different paradigms provide various approaches to structuring solutions', is_correct: true },
      { text: 'Only one programming paradigm should be learned', is_correct: false },
      { text: 'All paradigms solve problems in identical ways', is_correct: false },
      { text: 'Programming paradigms are not relevant to problem-solving', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'advanced',
    question_text: 'What impact does automated testing have on software reliability?',
    options: [
      { text: 'Automated tests catch regressions and ensure consistent behavior', is_correct: true },
      { text: 'Manual testing is always better than automated testing', is_correct: false },
      { text: 'Automated testing is not reliable', is_correct: false },
      { text: 'Testing automation is only for large companies', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'advanced',
    question_text: 'How does profiling help in program optimization?',
    options: [
      { text: 'Profiling identifies performance bottlenecks and resource usage patterns', is_correct: true },
      { text: 'Profiling is not useful for optimization', is_correct: false },
      { text: 'Optimization should be done without measuring performance', is_correct: false },
      { text: 'Profiling only works for certain types of programs', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'advanced',
    question_text: 'What is the role of documentation in software maintenance?',
    options: [
      { text: 'Documentation helps developers understand and modify code over time', is_correct: true },
      { text: 'Good code never needs documentation', is_correct: false },
      { text: 'Documentation is only for end users', is_correct: false },
      { text: 'Documentation makes code harder to maintain', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'advanced',
    question_text: 'How does understanding compiler optimization affect programming practices?',
    options: [
      { text: 'It helps write code that compilers can optimize effectively', is_correct: true },
      { text: 'Compiler optimization is not relevant to programming', is_correct: false },
      { text: 'Programmers should never consider compiler behavior', is_correct: false },
      { text: 'All code is optimized equally by compilers', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'advanced',
    question_text: 'What is the significance of API design in software development?',
    options: [
      { text: 'Good API design enables effective communication between software components', is_correct: true },
      { text: 'APIs are not important in modern software', is_correct: false },
      { text: 'API design is only relevant for web services', is_correct: false },
      { text: 'All APIs should be designed identically', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'advanced',
    question_text: 'How does understanding software licensing impact development decisions?',
    options: [
      { text: 'Licensing affects how code can be used, modified, and distributed', is_correct: true },
      { text: 'Software licensing is not relevant to developers', is_correct: false },
      { text: 'All software should use the same license', is_correct: false },
      { text: 'Licensing only matters for commercial software', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'advanced',
    question_text: 'What role does continuous integration play in modern development?',
    options: [
      { text: 'It automates building, testing, and integration of code changes', is_correct: true },
      { text: 'Continuous integration is only for large teams', is_correct: false },
      { text: 'Manual integration is always better than automated', is_correct: false },
      { text: 'Integration is not important in software development', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'advanced',
    question_text: 'How does understanding security principles affect programming practices?',
    options: [
      { text: 'Security awareness leads to writing more robust and secure code', is_correct: true },
      { text: 'Security is only the responsibility of security specialists', is_correct: false },
      { text: 'Security considerations slow down development unnecessarily', is_correct: false },
      { text: 'Modern systems are automatically secure', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'advanced',
    question_text: 'What is the impact of open source development on programming skills?',
    options: [
      { text: 'Open source projects provide learning opportunities and expose developers to diverse codebases', is_correct: true },
      { text: 'Open source development is not beneficial for learning', is_correct: false },
      { text: 'Proprietary development is always better for skill building', is_correct: false },
      { text: 'Open source projects are too complex for learning', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'advanced',
    question_text: 'How does understanding software metrics improve development practices?',
    options: [
      { text: 'Metrics provide objective measures of code quality and project progress', is_correct: true },
      { text: 'Software metrics are not useful for development', is_correct: false },
      { text: 'Subjective assessment is always better than metrics', is_correct: false },
      { text: 'Metrics only apply to large software projects', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'advanced',
    question_text: 'What role does refactoring play in maintaining code quality?',
    options: [
      { text: 'Refactoring improves code structure without changing external behavior', is_correct: true },
      { text: 'Code should never be changed once it works', is_correct: false },
      { text: 'Refactoring always introduces bugs', is_correct: false },
      { text: 'Only broken code needs refactoring', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'advanced',
    question_text: 'How does understanding the software development lifecycle benefit programmers?',
    options: [
      { text: 'It provides context for how programming fits into the broader development process', is_correct: true },
      { text: 'Programmers only need to focus on coding', is_correct: false },
      { text: 'The development lifecycle is only relevant to project managers', is_correct: false },
      { text: 'Understanding the lifecycle slows down programming', is_correct: false }
    ]
  },

  // Computer Networks and Security - Basic (25 questions)
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a network topology?',
    options: [
      { text: 'The physical or logical arrangement of network connections', is_correct: true },
      { text: 'The speed of network connections', is_correct: false },
      { text: 'The cost of network equipment', is_correct: false },
      { text: 'The color of network cables', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a star topology?',
    options: [
      { text: 'All devices connect to a central hub or switch', is_correct: true },
      { text: 'Devices are connected in a circular pattern', is_correct: false },
      { text: 'Each device connects to every other device', is_correct: false },
      { text: 'Devices are connected in a straight line', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a firewall?',
    options: [
      { text: 'A security system that monitors and controls network traffic', is_correct: true },
      { text: 'A physical wall that prevents fires', is_correct: false },
      { text: 'A type of computer virus', is_correct: false },
      { text: 'A network cable', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is encryption?',
    options: [
      { text: 'Converting data into a coded format to protect it', is_correct: true },
      { text: 'Deleting data permanently', is_correct: false },
      { text: 'Copying data to multiple locations', is_correct: false },
      { text: 'Compressing data to save space', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is data protection?',
    options: [
      { text: 'Measures taken to secure data from unauthorized access or loss', is_correct: true },
      { text: 'Making data available to everyone', is_correct: false },
      { text: 'Storing data in multiple formats', is_correct: false },
      { text: 'Printing data on paper', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a secure communication protocol?',
    options: [
      { text: 'A set of rules for safe data transmission over networks', is_correct: true },
      { text: 'A type of network cable', is_correct: false },
      { text: 'A computer program', is_correct: false },
      { text: 'A physical security device', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What does HTTPS stand for?',
    options: [
      { text: 'HyperText Transfer Protocol Secure', is_correct: true },
      { text: 'HyperText Transfer Protocol Simple', is_correct: false },
      { text: 'HyperText Transfer Protocol Standard', is_correct: false },
      { text: 'HyperText Transfer Protocol System', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is the difference between HTTP and HTTPS?',
    options: [
      { text: 'HTTPS is encrypted and more secure than HTTP', is_correct: true },
      { text: 'HTTP is newer than HTTPS', is_correct: false },
      { text: 'HTTPS is faster than HTTP', is_correct: false },
      { text: 'There is no difference', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is network security?',
    options: [
      { text: 'Protecting networks and data from cyber threats', is_correct: true },
      { text: 'Making networks run faster', is_correct: false },
      { text: 'Connecting more devices to networks', is_correct: false },
      { text: 'Reducing network costs', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a password policy?',
    options: [
      { text: 'Rules for creating and managing secure passwords', is_correct: true },
      { text: 'A list of all passwords', is_correct: false },
      { text: 'A program that creates passwords', is_correct: false },
      { text: 'A way to share passwords', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is two-factor authentication?',
    options: [
      { text: 'Using two different methods to verify identity', is_correct: true },
      { text: 'Using two passwords', is_correct: false },
      { text: 'Logging in twice', is_correct: false },
      { text: 'Having two user accounts', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a VPN?',
    options: [
      { text: 'Virtual Private Network - creates secure connections over public networks', is_correct: true },
      { text: 'Very Private Network', is_correct: false },
      { text: 'Virtual Public Network', is_correct: false },
      { text: 'Video Private Network', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is malware?',
    options: [
      { text: 'Malicious software designed to harm computers or steal data', is_correct: true },
      { text: 'Software that improves computer performance', is_correct: false },
      { text: 'Software for creating documents', is_correct: false },
      { text: 'Software for playing games', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a computer worm?',
    options: [
      { text: 'Malware that spreads automatically across networks', is_correct: true },
      { text: 'A physical worm inside computers', is_correct: false },
      { text: 'A helpful program', is_correct: false },
      { text: 'A type of computer cable', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is social engineering in cybersecurity?',
    options: [
      { text: 'Manipulating people to reveal confidential information', is_correct: true },
      { text: 'Building social networks', is_correct: false },
      { text: 'Engineering social media platforms', is_correct: false },
      { text: 'Creating social groups', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a denial of service (DoS) attack?',
    options: [
      { text: 'An attack that makes a service unavailable to users', is_correct: true },
      { text: 'Refusing to provide customer service', is_correct: false },
      { text: 'A type of helpful service', is_correct: false },
      { text: 'A network improvement technique', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is data backup?',
    options: [
      { text: 'Creating copies of data to prevent loss', is_correct: true },
      { text: 'Deleting old data', is_correct: false },
      { text: 'Moving data to a different location', is_correct: false },
      { text: 'Compressing data files', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is network monitoring?',
    options: [
      { text: 'Observing network traffic and performance', is_correct: true },
      { text: 'Watching network television', is_correct: false },
      { text: 'Installing network equipment', is_correct: false },
      { text: 'Repairing network cables', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is an IP address?',
    options: [
      { text: 'A unique identifier for devices on a network', is_correct: true },
      { text: 'A type of network cable', is_correct: false },
      { text: 'A security protocol', is_correct: false },
      { text: 'A network topology', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a router?',
    options: [
      { text: 'A device that forwards data between networks', is_correct: true },
      { text: 'A tool for cutting wood', is_correct: false },
      { text: 'A type of computer virus', is_correct: false },
      { text: 'A software program', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a switch in networking?',
    options: [
      { text: 'A device that connects devices within a local network', is_correct: true },
      { text: 'A button to turn devices on/off', is_correct: false },
      { text: 'A type of network cable', is_correct: false },
      { text: 'A security protocol', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is bandwidth in networking?',
    options: [
      { text: 'The maximum amount of data that can be transmitted over a network', is_correct: true },
      { text: 'The physical width of network cables', is_correct: false },
      { text: 'The number of devices on a network', is_correct: false },
      { text: 'The cost of network services', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is network latency?',
    options: [
      { text: 'The delay in data transmission over a network', is_correct: true },
      { text: 'The speed of network cables', is_correct: false },
      { text: 'The number of network users', is_correct: false },
      { text: 'The cost of network equipment', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a network protocol?',
    options: [
      { text: 'A set of rules for communication between network devices', is_correct: true },
      { text: 'A type of network hardware', is_correct: false },
      { text: 'A network security measure', is_correct: false },
      { text: 'A network troubleshooting tool', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is TCP/IP?',
    options: [
      { text: 'A suite of protocols used for internet communication', is_correct: true },
      { text: 'A type of network cable', is_correct: false },
      { text: 'A network security system', is_correct: false },
      { text: 'A network monitoring tool', is_correct: false }
    ]
  }
];

// Import at module level
const grade9BaseQuestions = require('./grade9');

// Combine with the first part
const allGrade9Questions = [
  ...grade9BaseQuestions,
  ...grade9CompleteQuestions
];

module.exports = { grade9CompleteQuestions, allGrade9Questions };