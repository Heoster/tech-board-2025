// Grade 9 Additional 200 Questions

const grade9Additional = [
  // Database Fundamentals - Basic (50 questions)
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a database?',
    options: [
      { text: 'An organized collection of data stored electronically', is_correct: true },
      { text: 'A physical storage room', is_correct: false },
      { text: 'A type of computer', is_correct: false },
      { text: 'A software program only', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is data?',
    options: [
      { text: 'Facts and information that can be processed by a computer', is_correct: true },
      { text: 'Only numbers', is_correct: false },
      { text: 'Only text', is_correct: false },
      { text: 'Only images', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is information?',
    options: [
      { text: 'Processed data that has meaning and context', is_correct: true },
      { text: 'Raw unprocessed facts', is_correct: false },
      { text: 'Only statistical data', is_correct: false },
      { text: 'Only personal details', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a table in a database?',
    options: [
      { text: 'A collection of related data organized in rows and columns', is_correct: true },
      { text: 'A piece of furniture', is_correct: false },
      { text: 'A type of chart', is_correct: false },
      { text: 'A mathematical table', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a record in a database?',
    options: [
      { text: 'A single row of data in a table', is_correct: true },
      { text: 'A music record', is_correct: false },
      { text: 'A written document', is_correct: false },
      { text: 'A video recording', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a field in a database?',
    options: [
      { text: 'A single piece of data in a record', is_correct: true },
      { text: 'An open area of land', is_correct: false },
      { text: 'A sports field', is_correct: false },
      { text: 'A field of study', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a primary key?',
    options: [
      { text: 'A unique identifier for each record in a table', is_correct: true },
      { text: 'The most important key', is_correct: false },
      { text: 'The first key made', is_correct: false },
      { text: 'A physical key', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is SQL?',
    options: [
      { text: 'Structured Query Language - used to manage databases', is_correct: true },
      { text: 'Simple Query Language', is_correct: false },
      { text: 'Standard Query Language', is_correct: false },
      { text: 'System Query Language', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What does SELECT do in SQL?',
    options: [
      { text: 'Retrieves data from a database', is_correct: true },
      { text: 'Deletes data from a database', is_correct: false },
      { text: 'Updates data in a database', is_correct: false },
      { text: 'Creates a new database', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What does INSERT do in SQL?',
    options: [
      { text: 'Adds new data to a database', is_correct: true },
      { text: 'Removes data from a database', is_correct: false },
      { text: 'Changes existing data', is_correct: false },
      { text: 'Searches for data', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What does UPDATE do in SQL?',
    options: [
      { text: 'Modifies existing data in a database', is_correct: true },
      { text: 'Adds new data', is_correct: false },
      { text: 'Deletes data', is_correct: false },
      { text: 'Creates tables', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What does DELETE do in SQL?',
    options: [
      { text: 'Removes data from a database', is_correct: true },
      { text: 'Adds new data', is_correct: false },
      { text: 'Updates existing data', is_correct: false },
      { text: 'Searches for data', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a query?',
    options: [
      { text: 'A request for information from a database', is_correct: true },
      { text: 'A question in general', is_correct: false },
      { text: 'A type of database', is_correct: false },
      { text: 'A database table', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a relational database?',
    options: [
      { text: 'A database where data is stored in related tables', is_correct: true },
      { text: 'A database for family relationships', is_correct: false },
      { text: 'A database that relates to others', is_correct: false },
      { text: 'A database for relatives', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a foreign key?',
    options: [
      { text: 'A field that links to the primary key of another table', is_correct: true },
      { text: 'A key from another country', is_correct: false },
      { text: 'A key that is foreign to the system', is_correct: false },
      { text: 'An unknown key', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is data integrity?',
    options: [
      { text: 'Ensuring data is accurate, consistent, and reliable', is_correct: true },
      { text: 'The honesty of data', is_correct: false },
      { text: 'The age of data', is_correct: false },
      { text: 'The size of data', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is data redundancy?',
    options: [
      { text: 'Unnecessary duplication of data', is_correct: true },
      { text: 'Extra important data', is_correct: false },
      { text: 'Backup data', is_correct: false },
      { text: 'Deleted data', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is normalization?',
    options: [
      { text: 'Organizing data to reduce redundancy and improve integrity', is_correct: true },
      { text: 'Making data normal', is_correct: false },
      { text: 'Standardizing data formats', is_correct: false },
      { text: 'Making data average', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is an index in a database?',
    options: [
      { text: 'A structure that improves the speed of data retrieval', is_correct: true },
      { text: 'A list at the end of a book', is_correct: false },
      { text: 'A finger pointer', is_correct: false },
      { text: 'A number system', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a database management system (DBMS)?',
    options: [
      { text: 'Software that manages databases', is_correct: true },
      { text: 'A person who manages databases', is_correct: false },
      { text: 'A physical system for storing data', is_correct: false },
      { text: 'A type of computer', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'Which is an example of a DBMS?',
    options: [
      { text: 'MySQL', is_correct: true },
      { text: 'Microsoft Word', is_correct: false },
      { text: 'Adobe Photoshop', is_correct: false },
      { text: 'Google Chrome', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a backup in database terms?',
    options: [
      { text: 'A copy of data stored separately for protection', is_correct: true },
      { text: 'Moving backwards', is_correct: false },
      { text: 'Supporting someone', is_correct: false },
      { text: 'A reverse operation', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is data security?',
    options: [
      { text: 'Protecting data from unauthorized access and threats', is_correct: true },
      { text: 'Making data feel safe', is_correct: false },
      { text: 'Securing physical databases', is_correct: false },
      { text: 'Insurance for data', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a database schema?',
    options: [
      { text: 'The structure and organization of a database', is_correct: true },
      { text: 'A plan or scheme', is_correct: false },
      { text: 'A type of database', is_correct: false },
      { text: 'A database user', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a join in SQL?',
    options: [
      { text: 'Combining data from multiple tables', is_correct: true },
      { text: 'Connecting to a database', is_correct: false },
      { text: 'Joining a database team', is_correct: false },
      { text: 'Merging databases', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is the WHERE clause used for?',
    options: [
      { text: 'To filter records based on specific conditions', is_correct: true },
      { text: 'To specify where to save data', is_correct: false },
      { text: 'To indicate location', is_correct: false },
      { text: 'To show where tables are stored', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is the ORDER BY clause used for?',
    options: [
      { text: 'To sort the results of a query', is_correct: true },
      { text: 'To order new equipment', is_correct: false },
      { text: 'To organize tables', is_correct: false },
      { text: 'To command the database', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is the GROUP BY clause used for?',
    options: [
      { text: 'To group rows that have the same values', is_correct: true },
      { text: 'To group people together', is_correct: false },
      { text: 'To group tables', is_correct: false },
      { text: 'To group databases', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is the COUNT function used for?',
    options: [
      { text: 'To count the number of rows in a result', is_correct: true },
      { text: 'To count numbers', is_correct: false },
      { text: 'To count tables', is_correct: false },
      { text: 'To count databases', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is the SUM function used for?',
    options: [
      { text: 'To calculate the total of numeric values', is_correct: true },
      { text: 'To summarize text', is_correct: false },
      { text: 'To add tables', is_correct: false },
      { text: 'To combine databases', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is the AVG function used for?',
    options: [
      { text: 'To calculate the average of numeric values', is_correct: true },
      { text: 'To find average text length', is_correct: false },
      { text: 'To average table sizes', is_correct: false },
      { text: 'To average database performance', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is the MAX function used for?',
    options: [
      { text: 'To find the largest value in a column', is_correct: true },
      { text: 'To maximize database size', is_correct: false },
      { text: 'To find the maximum number of tables', is_correct: false },
      { text: 'To maximize performance', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is the MIN function used for?',
    options: [
      { text: 'To find the smallest value in a column', is_correct: true },
      { text: 'To minimize database size', is_correct: false },
      { text: 'To find the minimum number of tables', is_correct: false },
      { text: 'To minimize performance', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a NULL value?',
    options: [
      { text: 'A field with no data or unknown value', is_correct: true },
      { text: 'A zero value', is_correct: false },
      { text: 'An empty string', is_correct: false },
      { text: 'A false value', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is data type?',
    options: [
      { text: 'The kind of data that can be stored in a field', is_correct: true },
      { text: 'The speed of data entry', is_correct: false },
      { text: 'The size of data', is_correct: false },
      { text: 'The age of data', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is the INTEGER data type?',
    options: [
      { text: 'A data type for whole numbers', is_correct: true },
      { text: 'A data type for text', is_correct: false },
      { text: 'A data type for dates', is_correct: false },
      { text: 'A data type for decimals', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is the VARCHAR data type?',
    options: [
      { text: 'A data type for variable-length text', is_correct: true },
      { text: 'A data type for numbers', is_correct: false },
      { text: 'A data type for dates', is_correct: false },
      { text: 'A data type for images', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is the DATE data type?',
    options: [
      { text: 'A data type for storing dates', is_correct: true },
      { text: 'A data type for text', is_correct: false },
      { text: 'A data type for numbers', is_correct: false },
      { text: 'A data type for time only', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a constraint in databases?',
    options: [
      { text: 'A rule that limits what data can be entered', is_correct: true },
      { text: 'A physical limitation', is_correct: false },
      { text: 'A type of query', is_correct: false },
      { text: 'A database function', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is the NOT NULL constraint?',
    options: [
      { text: 'Ensures a field must have a value', is_correct: true },
      { text: 'Allows any value', is_correct: false },
      { text: 'Only allows NULL values', is_correct: false },
      { text: 'Prevents all data entry', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is the UNIQUE constraint?',
    options: [
      { text: 'Ensures all values in a field are different', is_correct: true },
      { text: 'Allows duplicate values', is_correct: false },
      { text: 'Makes values special', is_correct: false },
      { text: 'Prevents data entry', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a view in databases?',
    options: [
      { text: 'A virtual table based on a query result', is_correct: true },
      { text: 'A way to look at data', is_correct: false },
      { text: 'A physical table', is_correct: false },
      { text: 'A database opinion', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a transaction in databases?',
    options: [
      { text: 'A sequence of database operations treated as a single unit', is_correct: true },
      { text: 'A business deal', is_correct: false },
      { text: 'A single query', is_correct: false },
      { text: 'A database purchase', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What does ACID stand for in databases?',
    options: [
      { text: 'Atomicity, Consistency, Isolation, Durability', is_correct: true },
      { text: 'Access, Control, Integration, Data', is_correct: false },
      { text: 'Automatic, Consistent, Integrated, Dynamic', is_correct: false },
      { text: 'Advanced, Centralized, Intelligent, Distributed', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is database performance?',
    options: [
      { text: 'How fast and efficiently a database operates', is_correct: true },
      { text: 'A database show', is_correct: false },
      { text: 'Database entertainment', is_correct: false },
      { text: 'Database appearance', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is database optimization?',
    options: [
      { text: 'Improving database performance and efficiency', is_correct: true },
      { text: 'Making databases look better', is_correct: false },
      { text: 'Making databases more optimistic', is_correct: false },
      { text: 'Reducing database features', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a database administrator (DBA)?',
    options: [
      { text: 'A person responsible for managing and maintaining databases', is_correct: true },
      { text: 'A database software', is_correct: false },
      { text: 'A type of database', is_correct: false },
      { text: 'A database query', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is data mining?',
    options: [
      { text: 'Discovering patterns and insights from large datasets', is_correct: true },
      { text: 'Digging for data underground', is_correct: false },
      { text: 'Stealing data', is_correct: false },
      { text: 'Deleting old data', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is big data?',
    options: [
      { text: 'Extremely large datasets that require special tools to process', is_correct: true },
      { text: 'Data that takes up a lot of space', is_correct: false },
      { text: 'Important data', is_correct: false },
      { text: 'Data about big things', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a data warehouse?',
    options: [
      { text: 'A large repository of data from multiple sources for analysis', is_correct: true },
      { text: 'A building that stores data', is_correct: false },
      { text: 'A place to buy data', is_correct: false },
      { text: 'A type of database table', is_correct: false }
    ]
  }
];

module.exports = grade9Additional;