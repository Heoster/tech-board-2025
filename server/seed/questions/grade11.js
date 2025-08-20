const grade11Questions = [
  // Advanced Computer Science Concepts - Basic (30 questions)
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is a data structure?',
    options: [
      { text: 'A way of organizing and storing data in a computer', is_correct: true },
      { text: 'A physical structure that holds computers', is_correct: false },
      { text: 'A type of computer program', is_correct: false },
      { text: 'A network connection method', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is an array?',
    options: [
      { text: 'A collection of elements stored in consecutive memory locations', is_correct: true },
      { text: 'A type of computer monitor', is_correct: false },
      { text: 'A network configuration', is_correct: false },
      { text: 'A programming language', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is a stack data structure?',
    options: [
      { text: 'A Last-In-First-Out (LIFO) data structure', is_correct: true },
      { text: 'A First-In-First-Out (FIFO) data structure', is_correct: false },
      { text: 'A random access data structure', is_correct: false },
      { text: 'A sorted data structure', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is a queue data structure?',
    options: [
      { text: 'A First-In-First-Out (FIFO) data structure', is_correct: true },
      { text: 'A Last-In-First-Out (LIFO) data structure', is_correct: false },
      { text: 'A random access data structure', is_correct: false },
      { text: 'A tree-like data structure', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is object-oriented programming (OOP)?',
    options: [
      { text: 'A programming paradigm based on objects and classes', is_correct: true },
      { text: 'Programming focused on mathematical objects', is_correct: false },
      { text: 'Programming for physical objects only', is_correct: false },
      { text: 'A type of database programming', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is a class in object-oriented programming?',
    options: [
      { text: 'A blueprint or template for creating objects', is_correct: true },
      { text: 'A group of students learning programming', is_correct: false },
      { text: 'A type of variable', is_correct: false },
      { text: 'A programming error', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is an object in programming?',
    options: [
      { text: 'An instance of a class with specific data and behavior', is_correct: true },
      { text: 'A physical item in the real world', is_correct: false },
      { text: 'A type of function', is_correct: false },
      { text: 'A programming language', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is inheritance in OOP?',
    options: [
      { text: 'A mechanism where a class can inherit properties from another class', is_correct: true },
      { text: 'Receiving money from relatives', is_correct: false },
      { text: 'A type of loop', is_correct: false },
      { text: 'A database operation', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is encapsulation in OOP?',
    options: [
      { text: 'Hiding internal details and exposing only necessary interfaces', is_correct: true },
      { text: 'Wrapping objects in physical containers', is_correct: false },
      { text: 'A type of loop structure', is_correct: false },
      { text: 'A database security feature', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is polymorphism in OOP?',
    options: [
      { text: 'The ability of objects to take multiple forms or behaviors', is_correct: true },
      { text: 'Having multiple programming languages', is_correct: false },
      { text: 'Using multiple computers', is_correct: false },
      { text: 'A type of data structure', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is the software development lifecycle (SDLC)?',
    options: [
      { text: 'A process for planning, creating, testing, and deploying software', is_correct: true },
      { text: 'The lifespan of computer hardware', is_correct: false },
      { text: 'A type of programming language', is_correct: false },
      { text: 'A network protocol', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is the planning phase in SDLC?',
    options: [
      { text: 'Defining project requirements and scope', is_correct: true },
      { text: 'Writing the actual code', is_correct: false },
      { text: 'Testing the software', is_correct: false },
      { text: 'Deploying the software', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is the design phase in SDLC?',
    options: [
      { text: 'Creating the architecture and detailed design of the software', is_correct: true },
      { text: 'Writing code', is_correct: false },
      { text: 'Testing functionality', is_correct: false },
      { text: 'Gathering requirements', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is the implementation phase in SDLC?',
    options: [
      { text: 'Writing and coding the software', is_correct: true },
      { text: 'Planning the project', is_correct: false },
      { text: 'Testing the software', is_correct: false },
      { text: 'Maintaining the software', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is the testing phase in SDLC?',
    options: [
      { text: 'Verifying that the software works correctly', is_correct: true },
      { text: 'Writing the code', is_correct: false },
      { text: 'Designing the software', is_correct: false },
      { text: 'Planning the project', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is version control?',
    options: [
      { text: 'A system for tracking changes to files over time', is_correct: true },
      { text: 'Controlling the version of operating systems', is_correct: false },
      { text: 'Managing different versions of hardware', is_correct: false },
      { text: 'A type of software license', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is Git?',
    options: [
      { text: 'A distributed version control system', is_correct: true },
      { text: 'A programming language', is_correct: false },
      { text: 'A type of database', is_correct: false },
      { text: 'A web browser', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is a repository in version control?',
    options: [
      { text: 'A storage location for project files and their history', is_correct: true },
      { text: 'A type of database', is_correct: false },
      { text: 'A programming function', is_correct: false },
      { text: 'A network protocol', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is a commit in version control?',
    options: [
      { text: 'Saving changes to the repository with a description', is_correct: true },
      { text: 'Deleting files from the project', is_correct: false },
      { text: 'Creating a new project', is_correct: false },
      { text: 'Sharing files with others', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is a branch in version control?',
    options: [
      { text: 'A separate line of development in a project', is_correct: true },
      { text: 'A part of a tree data structure', is_correct: false },
      { text: 'A type of loop', is_correct: false },
      { text: 'A network connection', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is merging in version control?',
    options: [
      { text: 'Combining changes from different branches', is_correct: true },
      { text: 'Deleting old versions', is_correct: false },
      { text: 'Creating new files', is_correct: false },
      { text: 'Backing up data', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is a linked list?',
    options: [
      { text: 'A data structure where elements are connected through pointers', is_correct: true },
      { text: 'A list of website links', is_correct: false },
      { text: 'A type of array', is_correct: false },
      { text: 'A network connection method', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is a binary tree?',
    options: [
      { text: 'A tree data structure where each node has at most two children', is_correct: true },
      { text: 'A tree with only binary numbers', is_correct: false },
      { text: 'A tree with exactly two nodes', is_correct: false },
      { text: 'A type of array', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is recursion in programming?',
    options: [
      { text: 'A function that calls itself', is_correct: true },
      { text: 'A type of loop', is_correct: false },
      { text: 'A data structure', is_correct: false },
      { text: 'A programming language', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is a base case in recursion?',
    options: [
      { text: 'The condition that stops the recursive calls', is_correct: true },
      { text: 'The first call to the function', is_correct: false },
      { text: 'The most common case', is_correct: false },
      { text: 'The error case', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is an algorithm?',
    options: [
      { text: 'A step-by-step procedure for solving a problem', is_correct: true },
      { text: 'A type of computer', is_correct: false },
      { text: 'A programming language', is_correct: false },
      { text: 'A data structure', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is time complexity?',
    options: [
      { text: 'A measure of how long an algorithm takes to run', is_correct: true },
      { text: 'The time it takes to write code', is_correct: false },
      { text: 'The complexity of time management', is_correct: false },
      { text: 'A type of clock algorithm', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is space complexity?',
    options: [
      { text: 'A measure of how much memory an algorithm uses', is_correct: true },
      { text: 'The physical space needed for computers', is_correct: false },
      { text: 'The complexity of space exploration', is_correct: false },
      { text: 'A type of data structure', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is Big O notation?',
    options: [
      { text: 'A way to describe the efficiency of algorithms', is_correct: true },
      { text: 'A type of programming language', is_correct: false },
      { text: 'A mathematical constant', is_correct: false },
      { text: 'A data structure', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What does O(1) mean in Big O notation?',
    options: [
      { text: 'Constant time - the algorithm takes the same time regardless of input size', is_correct: true },
      { text: 'The algorithm takes 1 second to run', is_correct: false },
      { text: 'The algorithm processes 1 item', is_correct: false },
      { text: 'The algorithm has 1 step', is_correct: false }
    ]
  },

  // Advanced Computer Science Concepts - Medium (30 questions)
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How do different data structures affect algorithm performance?',
    options: [
      { text: 'The choice of data structure can significantly impact the efficiency of operations', is_correct: true },
      { text: 'All data structures provide identical performance', is_correct: false },
      { text: 'Data structures have no impact on algorithm performance', is_correct: false },
      { text: 'Only the algorithm matters, not the data structure', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What are the advantages of using a stack for function calls?',
    options: [
      { text: 'LIFO behavior naturally handles function call and return order', is_correct: true },
      { text: 'Stacks are faster than all other data structures', is_correct: false },
      { text: 'Stacks use less memory than other structures', is_correct: false },
      { text: 'Function calls do not need any data structure', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'When would you choose a queue over a stack?',
    options: [
      { text: 'When you need to process items in the order they were added', is_correct: true },
      { text: 'When you need random access to elements', is_correct: false },
      { text: 'When you need to sort the elements', is_correct: false },
      { text: 'Queues and stacks are interchangeable', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How does object-oriented programming improve code organization?',
    options: [
      { text: 'It groups related data and functions together, making code more modular', is_correct: true },
      { text: 'OOP makes all programs run faster', is_correct: false },
      { text: 'OOP eliminates the need for functions', is_correct: false },
      { text: 'OOP only works for large programs', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the benefit of inheritance in object-oriented programming?',
    options: [
      { text: 'It promotes code reuse and establishes relationships between classes', is_correct: true },
      { text: 'It makes programs run faster', is_correct: false },
      { text: 'It eliminates the need for testing', is_correct: false },
      { text: 'It automatically fixes bugs', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How does encapsulation enhance software security?',
    options: [
      { text: 'It hides internal implementation details and controls access to data', is_correct: true },
      { text: 'It encrypts all data automatically', is_correct: false },
      { text: 'It prevents all types of cyber attacks', is_correct: false },
      { text: 'It makes programs unhackable', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What role does polymorphism play in flexible software design?',
    options: [
      { text: 'It allows the same interface to work with different types of objects', is_correct: true },
      { text: 'It makes all objects identical', is_correct: false },
      { text: 'It eliminates the need for different classes', is_correct: false },
      { text: 'It only works with mathematical operations', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'Why is the software development lifecycle important?',
    options: [
      { text: 'It provides a structured approach to building reliable software', is_correct: true },
      { text: 'It makes software development faster', is_correct: false },
      { text: 'It eliminates the need for testing', is_correct: false },
      { text: 'It automatically generates code', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How does version control facilitate team collaboration?',
    options: [
      { text: 'It allows multiple developers to work on the same project without conflicts', is_correct: true },
      { text: 'It prevents anyone else from accessing the code', is_correct: false },
      { text: 'It automatically writes code for the team', is_correct: false },
      { text: 'It eliminates the need for communication', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the advantage of using branches in version control?',
    options: [
      { text: 'Branches allow parallel development of different features', is_correct: true },
      { text: 'Branches make the code run faster', is_correct: false },
      { text: 'Branches automatically fix bugs', is_correct: false },
      { text: 'Branches are only for large projects', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How do linked lists differ from arrays in terms of memory usage?',
    options: [
      { text: 'Linked lists use dynamic memory allocation, arrays use contiguous memory', is_correct: true },
      { text: 'Arrays always use more memory than linked lists', is_correct: false },
      { text: 'Linked lists and arrays use identical memory patterns', is_correct: false },
      { text: 'Memory usage is not relevant for data structures', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What are the trade-offs between arrays and linked lists?',
    options: [
      { text: 'Arrays offer faster access, linked lists offer flexible size', is_correct: true },
      { text: 'Arrays are always better than linked lists', is_correct: false },
      { text: 'Linked lists are always better than arrays', is_correct: false },
      { text: 'There are no differences between arrays and linked lists', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How do binary trees improve search efficiency?',
    options: [
      { text: 'They allow elimination of half the search space at each step', is_correct: true },
      { text: 'They store data in alphabetical order only', is_correct: false },
      { text: 'They always contain exactly two elements', is_correct: false },
      { text: 'They are only useful for numerical data', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'When is recursion more appropriate than iteration?',
    options: [
      { text: 'When the problem has a naturally recursive structure', is_correct: true },
      { text: 'Recursion is always better than iteration', is_correct: false },
      { text: 'Iteration is always better than recursion', is_correct: false },
      { text: 'Recursion and iteration are identical', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the importance of algorithm analysis?',
    options: [
      { text: 'It helps predict performance and choose appropriate algorithms', is_correct: true },
      { text: 'Algorithm analysis is only for academic purposes', is_correct: false },
      { text: 'All algorithms have the same performance', is_correct: false },
      { text: 'Performance analysis is not important in practice', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How does understanding Big O notation help in algorithm selection?',
    options: [
      { text: 'It provides a way to compare algorithm efficiency for large inputs', is_correct: true },
      { text: 'Big O notation only applies to mathematical algorithms', is_correct: false },
      { text: 'All algorithms have the same Big O complexity', is_correct: false },
      { text: 'Big O notation is not relevant to practical programming', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the relationship between time and space complexity?',
    options: [
      { text: 'There is often a trade-off between time efficiency and memory usage', is_correct: true },
      { text: 'Time and space complexity are always identical', is_correct: false },
      { text: 'Optimizing for time always optimizes for space', is_correct: false },
      { text: 'Time and space complexity are unrelated', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How do hash tables achieve fast data access?',
    options: [
      { text: 'They use hash functions to map keys directly to storage locations', is_correct: true },
      { text: 'They sort all data in alphabetical order', is_correct: false },
      { text: 'They search through all elements sequentially', is_correct: false },
      { text: 'They only work with numerical data', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the purpose of software testing in the development lifecycle?',
    options: [
      { text: 'To identify defects and ensure software meets requirements', is_correct: true },
      { text: 'To make software development take longer', is_correct: false },
      { text: 'To replace the need for good design', is_correct: false },
      { text: 'Testing is only needed for large applications', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How does modular programming improve software maintenance?',
    options: [
      { text: 'Changes to one module have minimal impact on other modules', is_correct: true },
      { text: 'Modular programming makes software harder to maintain', is_correct: false },
      { text: 'All code should be written in one large file', is_correct: false },
      { text: 'Modules are only useful for large teams', is_correct: false }
    ]
  }
];

module.exports = grade11Questions;