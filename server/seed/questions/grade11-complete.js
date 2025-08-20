// Grade 11 Complete Questions (remaining 240 questions)

const grade11CompleteQuestions = [
  // Advanced Computer Science Concepts - Advanced (30 questions)
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'How does the choice of data structure impact the overall system architecture?',
    options: [
      { text: 'Data structure decisions affect performance, scalability, and maintainability of the entire system', is_correct: true },
      { text: 'Data structures only affect individual functions', is_correct: false },
      { text: 'System architecture is independent of data structure choices', is_correct: false },
      { text: 'All data structures have identical architectural impact', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'What is the significance of amortized analysis in algorithm evaluation?',
    options: [
      { text: 'It provides average-case performance analysis over a sequence of operations', is_correct: true },
      { text: 'Amortized analysis only applies to financial algorithms', is_correct: false },
      { text: 'It is identical to worst-case analysis', is_correct: false },
      { text: 'Amortized analysis is not useful for practical applications', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'How does understanding memory hierarchy influence algorithm design?',
    options: [
      { text: 'Algorithms can be optimized for cache efficiency and memory access patterns', is_correct: true },
      { text: 'Memory hierarchy has no impact on algorithm performance', is_correct: false },
      { text: 'All memory accesses have identical cost', is_correct: false },
      { text: 'Algorithm design should ignore memory considerations', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'What role does abstraction play in managing software complexity?',
    options: [
      { text: 'Abstraction allows focusing on essential features while hiding implementation details', is_correct: true },
      { text: 'Abstraction makes software more complex', is_correct: false },
      { text: 'All implementation details should always be visible', is_correct: false },
      { text: 'Abstraction is only useful for theoretical computer science', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'How does the principle of separation of concerns improve software design?',
    options: [
      { text: 'It divides complex problems into distinct, manageable sections', is_correct: true },
      { text: 'All concerns should be handled in a single module', is_correct: false },
      { text: 'Separation of concerns makes software less efficient', is_correct: false },
      { text: 'This principle only applies to user interface design', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'What is the impact of design patterns on software reusability?',
    options: [
      { text: 'Design patterns provide proven solutions that can be adapted to different contexts', is_correct: true },
      { text: 'Design patterns reduce code reusability', is_correct: false },
      { text: 'Every problem requires a completely unique solution', is_correct: false },
      { text: 'Design patterns only work in object-oriented languages', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'How does understanding computational complexity theory benefit practical programming?',
    options: [
      { text: 'It provides theoretical foundations for analyzing and comparing algorithm efficiency', is_correct: true },
      { text: 'Complexity theory is purely academic with no practical applications', is_correct: false },
      { text: 'All practical algorithms have the same complexity', is_correct: false },
      { text: 'Complexity theory only applies to mathematical problems', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'What is the significance of invariants in program correctness?',
    options: [
      { text: 'Invariants help prove that programs behave correctly under all conditions', is_correct: true },
      { text: 'Invariants make programs run slower', is_correct: false },
      { text: 'Program correctness cannot be formally verified', is_correct: false },
      { text: 'Invariants are only useful for mathematical programs', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'How does the concept of immutability contribute to program reliability?',
    options: [
      { text: 'Immutable data structures prevent unexpected changes and reduce bugs', is_correct: true },
      { text: 'Immutability makes programs less efficient', is_correct: false },
      { text: 'All data should be mutable for flexibility', is_correct: false },
      { text: 'Immutability is only relevant to functional programming', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'What role does formal verification play in critical software systems?',
    options: [
      { text: 'It provides mathematical proof that software meets its specifications', is_correct: true },
      { text: 'Formal verification is not practical for real software', is_correct: false },
      { text: 'Testing is always sufficient for ensuring correctness', is_correct: false },
      { text: 'Formal verification only applies to hardware design', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'How does understanding concurrency models improve system design?',
    options: [
      { text: 'Different concurrency models provide various approaches to handling parallel execution', is_correct: true },
      { text: 'All concurrency models are identical in behavior', is_correct: false },
      { text: 'Concurrency is not relevant to modern computing', is_correct: false },
      { text: 'Sequential execution is always better than concurrent execution', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'What is the impact of garbage collection on program performance and design?',
    options: [
      { text: 'Garbage collection automates memory management but affects performance predictability', is_correct: true },
      { text: 'Garbage collection has no impact on program performance', is_correct: false },
      { text: 'Manual memory management is always better than garbage collection', is_correct: false },
      { text: 'Garbage collection eliminates all memory-related bugs', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'How does the principle of least privilege apply to software security?',
    options: [
      { text: 'Components should have only the minimum permissions necessary to function', is_correct: true },
      { text: 'All software components should have maximum privileges', is_correct: false },
      { text: 'Privilege management is not relevant to software security', is_correct: false },
      { text: 'Security should be handled only at the network level', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'What role does type theory play in programming language design?',
    options: [
      { text: 'Type systems help catch errors at compile time and improve program reliability', is_correct: true },
      { text: 'Type systems only slow down program execution', is_correct: false },
      { text: 'Dynamic typing is always better than static typing', is_correct: false },
      { text: 'Type theory is purely academic with no practical applications', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'How does understanding compiler optimization influence code writing?',
    options: [
      { text: 'Knowledge of optimization helps write code that compilers can improve effectively', is_correct: true },
      { text: 'Compiler optimization makes code quality irrelevant', is_correct: false },
      { text: 'Programmers should never consider compiler behavior', is_correct: false },
      { text: 'All code is optimized equally regardless of how it is written', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'What is the significance of software metrics in quality assessment?',
    options: [
      { text: 'Metrics provide objective measures of code quality and project progress', is_correct: true },
      { text: 'Software quality cannot be measured objectively', is_correct: false },
      { text: 'Metrics are only useful for large software projects', is_correct: false },
      { text: 'Subjective assessment is always better than metrics', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'How does the concept of technical debt impact long-term software development?',
    options: [
      { text: 'Technical debt represents the cost of choosing quick solutions over better long-term approaches', is_correct: true },
      { text: 'Technical debt is always beneficial for development speed', is_correct: false },
      { text: 'Long-term considerations are not important in software development', is_correct: false },
      { text: 'Technical debt only affects financial aspects of projects', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'What role does software architecture play in system scalability?',
    options: [
      { text: 'Good architecture enables systems to handle increasing loads and complexity', is_correct: true },
      { text: 'Architecture has no impact on system scalability', is_correct: false },
      { text: 'Scalability is only determined by hardware resources', is_correct: false },
      { text: 'All architectures scale equally well', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'How does understanding distributed systems principles affect modern software design?',
    options: [
      { text: 'Distributed systems principles guide design for reliability, consistency, and partition tolerance', is_correct: true },
      { text: 'Distributed systems are not relevant to most applications', is_correct: false },
      { text: 'Centralized systems are always better than distributed ones', is_correct: false },
      { text: 'Distribution only affects network performance', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'What is the impact of functional programming concepts on software reliability?',
    options: [
      { text: 'Functional concepts like immutability and pure functions reduce side effects and bugs', is_correct: true },
      { text: 'Functional programming is only useful for mathematical applications', is_correct: false },
      { text: 'Object-oriented programming is always more reliable than functional programming', is_correct: false },
      { text: 'Programming paradigms have no impact on software reliability', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'How does the principle of composition over inheritance improve software design?',
    options: [
      { text: 'Composition provides more flexible and maintainable relationships between components', is_correct: true },
      { text: 'Inheritance is always better than composition', is_correct: false },
      { text: 'Composition and inheritance are identical in their effects', is_correct: false },
      { text: 'This principle only applies to certain programming languages', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'What role does profiling play in performance optimization?',
    options: [
      { text: 'Profiling identifies actual performance bottlenecks rather than assumed ones', is_correct: true },
      { text: 'Optimization should be done without measuring performance', is_correct: false },
      { text: 'All parts of a program contribute equally to performance problems', is_correct: false },
      { text: 'Profiling is only useful for certain types of applications', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'How does understanding memory models affect concurrent programming?',
    options: [
      { text: 'Memory models define how concurrent operations interact and what guarantees are provided', is_correct: true },
      { text: 'Memory models are not relevant to concurrent programming', is_correct: false },
      { text: 'All concurrent programs behave identically regardless of memory model', is_correct: false },
      { text: 'Memory models only affect single-threaded programs', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'What is the significance of API design in software ecosystem development?',
    options: [
      { text: 'Well-designed APIs enable effective integration and reuse across different systems', is_correct: true },
      { text: 'API design is not important for software integration', is_correct: false },
      { text: 'All APIs should be designed identically', is_correct: false },
      { text: 'APIs are only relevant for web services', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'How does the concept of eventual consistency apply to distributed data systems?',
    options: [
      { text: 'Eventual consistency allows systems to remain available while ensuring data convergence over time', is_correct: true },
      { text: 'All distributed systems must maintain strict consistency', is_correct: false },
      { text: 'Consistency is not important in distributed systems', is_correct: false },
      { text: 'Eventual consistency only applies to database systems', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'What role does static analysis play in software quality assurance?',
    options: [
      { text: 'Static analysis can detect potential bugs and security vulnerabilities without executing code', is_correct: true },
      { text: 'Static analysis is less effective than dynamic testing', is_correct: false },
      { text: 'Code analysis should only be done manually', is_correct: false },
      { text: 'Static analysis tools are not reliable', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'How does understanding algorithmic game theory influence system design?',
    options: [
      { text: 'Game theory helps design systems where multiple agents interact strategically', is_correct: true },
      { text: 'Game theory only applies to video game development', is_correct: false },
      { text: 'Strategic interactions are not relevant to computer systems', is_correct: false },
      { text: 'Game theory is purely theoretical with no practical applications', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'What is the impact of quantum computing on classical algorithm design?',
    options: [
      { text: 'Quantum computing may require rethinking certain algorithmic approaches and security assumptions', is_correct: true },
      { text: 'Quantum computing has no relevance to classical algorithms', is_correct: false },
      { text: 'All classical algorithms will become obsolete with quantum computing', is_correct: false },
      { text: 'Quantum computing only affects cryptographic algorithms', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'How does the principle of fail-fast design improve system reliability?',
    options: [
      { text: 'Failing quickly when errors occur prevents cascading failures and makes debugging easier', is_correct: true },
      { text: 'Systems should never fail under any circumstances', is_correct: false },
      { text: 'Slow failure is always better than fast failure', is_correct: false },
      { text: 'Fail-fast design makes systems less reliable', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'advanced',
    question_text: 'What role does domain-driven design play in complex software development?',
    options: [
      { text: 'It aligns software structure with business domain concepts and requirements', is_correct: true },
      { text: 'Domain knowledge is not relevant to software design', is_correct: false },
      { text: 'Technical considerations should always override domain concerns', is_correct: false },
      { text: 'Domain-driven design only applies to business applications', is_correct: false }
    ]
  },

  // Advanced Database Systems - Basic (25 questions)
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is SQL?',
    options: [
      { text: 'Structured Query Language - a language for managing databases', is_correct: true },
      { text: 'Simple Query Language', is_correct: false },
      { text: 'System Query Language', is_correct: false },
      { text: 'Standard Query Language', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is a database query?',
    options: [
      { text: 'A request for information from a database', is_correct: true },
      { text: 'A question about database design', is_correct: false },
      { text: 'A type of database error', is_correct: false },
      { text: 'A database backup procedure', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What does SELECT do in SQL?',
    options: [
      { text: 'Retrieves data from database tables', is_correct: true },
      { text: 'Deletes data from tables', is_correct: false },
      { text: 'Creates new tables', is_correct: false },
      { text: 'Updates existing data', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What does INSERT do in SQL?',
    options: [
      { text: 'Adds new data to database tables', is_correct: true },
      { text: 'Removes data from tables', is_correct: false },
      { text: 'Modifies existing data', is_correct: false },
      { text: 'Creates database tables', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What does UPDATE do in SQL?',
    options: [
      { text: 'Modifies existing data in database tables', is_correct: true },
      { text: 'Adds new data to tables', is_correct: false },
      { text: 'Deletes data from tables', is_correct: false },
      { text: 'Creates new tables', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What does DELETE do in SQL?',
    options: [
      { text: 'Removes data from database tables', is_correct: true },
      { text: 'Adds new data to tables', is_correct: false },
      { text: 'Modifies existing data', is_correct: false },
      { text: 'Creates database backups', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is a primary key in a database?',
    options: [
      { text: 'A unique identifier for each record in a table', is_correct: true },
      { text: 'The most important data in a table', is_correct: false },
      { text: 'The first column in a table', is_correct: false },
      { text: 'A password for database access', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is a foreign key in a database?',
    options: [
      { text: 'A field that links to the primary key of another table', is_correct: true },
      { text: 'A key from a different database', is_correct: false },
      { text: 'An encrypted database key', is_correct: false },
      { text: 'A backup of the primary key', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is data normalization?',
    options: [
      { text: 'Organizing data to reduce redundancy and improve integrity', is_correct: true },
      { text: 'Making all data the same format', is_correct: false },
      { text: 'Converting data to normal numbers', is_correct: false },
      { text: 'Standardizing database software', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is the first normal form (1NF)?',
    options: [
      { text: 'Each table cell contains only atomic (indivisible) values', is_correct: true },
      { text: 'All tables must have exactly one column', is_correct: false },
      { text: 'All data must be numbers', is_correct: false },
      { text: 'Tables must be sorted alphabetically', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is database design?',
    options: [
      { text: 'Planning the structure and organization of a database', is_correct: true },
      { text: 'Creating the visual appearance of database software', is_correct: false },
      { text: 'Writing database queries', is_correct: false },
      { text: 'Installing database software', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is a relational database?',
    options: [
      { text: 'A database that stores data in tables with relationships between them', is_correct: true },
      { text: 'A database for storing family relationships', is_correct: false },
      { text: 'A database that is related to other databases', is_correct: false },
      { text: 'A database for social networking', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is a database table?',
    options: [
      { text: 'A collection of related data organized in rows and columns', is_correct: true },
      { text: 'A physical table where computers are placed', is_correct: false },
      { text: 'A list of database users', is_correct: false },
      { text: 'A database backup file', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is a database record?',
    options: [
      { text: 'A single row of data in a database table', is_correct: true },
      { text: 'A log of database activities', is_correct: false },
      { text: 'A database backup', is_correct: false },
      { text: 'A database user account', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is a database field?',
    options: [
      { text: 'A single piece of data in a database record', is_correct: true },
      { text: 'An area where databases are stored', is_correct: false },
      { text: 'A database search function', is_correct: false },
      { text: 'A database security feature', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is database indexing?',
    options: [
      { text: 'Creating shortcuts to find data quickly in large tables', is_correct: true },
      { text: 'Numbering all database records', is_correct: false },
      { text: 'Creating a list of all databases', is_correct: false },
      { text: 'Organizing databases alphabetically', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is a database join?',
    options: [
      { text: 'Combining data from multiple tables based on related columns', is_correct: true },
      { text: 'Connecting to a database', is_correct: false },
      { text: 'Merging two databases into one', is_correct: false },
      { text: 'Adding new tables to a database', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is database backup?',
    options: [
      { text: 'Creating copies of database data to prevent loss', is_correct: true },
      { text: 'Supporting the database server physically', is_correct: false },
      { text: 'Reversing database operations', is_correct: false },
      { text: 'Updating database software', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is database security?',
    options: [
      { text: 'Protecting database data from unauthorized access and threats', is_correct: true },
      { text: 'Physical security of database servers', is_correct: false },
      { text: 'Database software licensing', is_correct: false },
      { text: 'Database performance optimization', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is a database transaction?',
    options: [
      { text: 'A sequence of database operations treated as a single unit', is_correct: true },
      { text: 'A financial transaction stored in a database', is_correct: false },
      { text: 'Buying database software', is_correct: false },
      { text: 'Transferring data between databases', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What does ACID stand for in database systems?',
    options: [
      { text: 'Atomicity, Consistency, Isolation, Durability', is_correct: true },
      { text: 'Access, Control, Integration, Data', is_correct: false },
      { text: 'Automatic, Consistent, Integrated, Distributed', is_correct: false },
      { text: 'Advanced, Centralized, Intelligent, Dynamic', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is database optimization?',
    options: [
      { text: 'Improving database performance and efficiency', is_correct: true },
      { text: 'Making databases look better', is_correct: false },
      { text: 'Reducing database size only', is_correct: false },
      { text: 'Installing database updates', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is a database schema?',
    options: [
      { text: 'The structure and organization of a database', is_correct: true },
      { text: 'A database user account', is_correct: false },
      { text: 'A database backup plan', is_correct: false },
      { text: 'A database security protocol', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is data integrity in databases?',
    options: [
      { text: 'Ensuring data accuracy and consistency', is_correct: true },
      { text: 'Keeping data secret', is_correct: false },
      { text: 'Making data available to everyone', is_correct: false },
      { text: 'Storing data in multiple locations', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'basic',
    question_text: 'What is a database view?',
    options: [
      { text: 'A virtual table based on the result of a query', is_correct: true },
      { text: 'Looking at database data on screen', is_correct: false },
      { text: 'A database user interface', is_correct: false },
      { text: 'A database monitoring tool', is_correct: false }
    ]
  }
];

// Import at module level
const grade11BaseQuestions = require('./grade11');

// Combine with the first part
const allGrade11Questions = [
  ...grade11BaseQuestions,
  ...grade11CompleteQuestions
];

module.exports = { grade11CompleteQuestions, allGrade11Questions };