// Grade 11 Additional 195 Questions

const grade11Additional = [
  // Advanced Database Systems - Medium (50 questions)
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How does database normalization improve data integrity?',
    options: [
      { text: 'It eliminates redundancy and reduces the chance of inconsistent data', is_correct: true },
      { text: 'It makes databases larger', is_correct: false },
      { text: 'It slows down database operations', is_correct: false },
      { text: 'It has no impact on data integrity', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the difference between INNER JOIN and LEFT JOIN?',
    options: [
      { text: 'INNER JOIN returns only matching records, LEFT JOIN returns all records from left table', is_correct: true },
      { text: 'They are exactly the same', is_correct: false },
      { text: 'LEFT JOIN is faster than INNER JOIN', is_correct: false },
      { text: 'INNER JOIN returns more records than LEFT JOIN', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How do indexes improve database performance?',
    options: [
      { text: 'They create shortcuts for faster data retrieval', is_correct: true },
      { text: 'They store more data', is_correct: false },
      { text: 'They make databases smaller', is_correct: false },
      { text: 'They have no impact on performance', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the purpose of database transactions?',
    options: [
      { text: 'To ensure data consistency by treating multiple operations as a single unit', is_correct: true },
      { text: 'To make database operations faster', is_correct: false },
      { text: 'To store transaction records', is_correct: false },
      { text: 'To handle financial transactions only', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the difference between clustered and non-clustered indexes?',
    options: [
      { text: 'Clustered indexes physically reorder data, non-clustered indexes create separate structures', is_correct: true },
      { text: 'Clustered indexes are faster in all cases', is_correct: false },
      { text: 'Non-clustered indexes are always better', is_correct: false },
      { text: 'There is no difference between them', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How does database partitioning improve performance?',
    options: [
      { text: 'It divides large tables into smaller, more manageable pieces', is_correct: true },
      { text: 'It combines multiple tables into one', is_correct: false },
      { text: 'It slows down database operations', is_correct: false },
      { text: 'It has no impact on performance', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the role of stored procedures in databases?',
    options: [
      { text: 'They provide reusable code blocks that execute on the database server', is_correct: true },
      { text: 'They store data permanently', is_correct: false },
      { text: 'They only store backup procedures', is_correct: false },
      { text: 'They are used only for data entry', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How do database triggers enhance data integrity?',
    options: [
      { text: 'They automatically execute code in response to database events', is_correct: true },
      { text: 'They trigger database backups', is_correct: false },
      { text: 'They only work with specific data types', is_correct: false },
      { text: 'They slow down database operations', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the purpose of database replication?',
    options: [
      { text: 'To create copies of data across multiple servers for availability and performance', is_correct: true },
      { text: 'To replicate database errors', is_correct: false },
      { text: 'To duplicate database licenses', is_correct: false },
      { text: 'To copy database software', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How does database sharding work?',
    options: [
      { text: 'It distributes data across multiple database instances', is_correct: true },
      { text: 'It breaks databases into pieces', is_correct: false },
      { text: 'It only works with specific database types', is_correct: false },
      { text: 'It combines multiple databases into one', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the difference between OLTP and OLAP systems?',
    options: [
      { text: 'OLTP handles transactions, OLAP handles analytical processing', is_correct: true },
      { text: 'OLTP is newer than OLAP', is_correct: false },
      { text: 'OLAP is faster than OLTP', is_correct: false },
      { text: 'They are the same type of system', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How do database connection pools improve performance?',
    options: [
      { text: 'They reuse existing connections instead of creating new ones for each request', is_correct: true },
      { text: 'They create more connections', is_correct: false },
      { text: 'They pool data together', is_correct: false },
      { text: 'They have no impact on performance', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the purpose of database caching?',
    options: [
      { text: 'To store frequently accessed data in memory for faster retrieval', is_correct: true },
      { text: 'To hide data from users', is_correct: false },
      { text: 'To cache database software', is_correct: false },
      { text: 'To store backup copies', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How does query optimization improve database performance?',
    options: [
      { text: 'It finds the most efficient way to execute queries', is_correct: true },
      { text: 'It makes queries longer', is_correct: false },
      { text: 'It optimizes only SELECT statements', is_correct: false },
      { text: 'It has no impact on performance', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the role of database statistics in query optimization?',
    options: [
      { text: 'They help the optimizer choose the best execution plan', is_correct: true },
      { text: 'They only show database usage statistics', is_correct: false },
      { text: 'They are used for reporting only', is_correct: false },
      { text: 'They slow down query execution', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How do materialized views improve query performance?',
    options: [
      { text: 'They store pre-computed results of complex queries', is_correct: true },
      { text: 'They make views more visible', is_correct: false },
      { text: 'They only work with simple queries', is_correct: false },
      { text: 'They slow down database operations', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the purpose of database monitoring?',
    options: [
      { text: 'To track performance, identify issues, and optimize operations', is_correct: true },
      { text: 'To watch database screens', is_correct: false },
      { text: 'To monitor only security events', is_correct: false },
      { text: 'To display database content', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How does database compression benefit storage?',
    options: [
      { text: 'It reduces storage space requirements and can improve I/O performance', is_correct: true },
      { text: 'It compresses only text data', is_correct: false },
      { text: 'It makes databases slower', is_correct: false },
      { text: 'It only works with specific database types', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the difference between horizontal and vertical scaling?',
    options: [
      { text: 'Horizontal scaling adds more servers, vertical scaling adds more power to existing servers', is_correct: true },
      { text: 'Horizontal scaling is always better', is_correct: false },
      { text: 'Vertical scaling is always cheaper', is_correct: false },
      { text: 'They are the same approach', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How do database locks prevent data corruption?',
    options: [
      { text: 'They prevent multiple transactions from modifying the same data simultaneously', is_correct: true },
      { text: 'They lock database files physically', is_correct: false },
      { text: 'They only prevent read operations', is_correct: false },
      { text: 'They lock out all users', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the purpose of database auditing?',
    options: [
      { text: 'To track and log database activities for security and compliance', is_correct: true },
      { text: 'To audit database costs', is_correct: false },
      { text: 'To check database spelling', is_correct: false },
      { text: 'To audit database performance only', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How does database encryption protect sensitive data?',
    options: [
      { text: 'It converts data into unreadable format that requires a key to decrypt', is_correct: true },
      { text: 'It hides data from all users', is_correct: false },
      { text: 'It only encrypts passwords', is_correct: false },
      { text: 'It makes data processing faster', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the role of database middleware?',
    options: [
      { text: 'It provides a layer between applications and databases for connectivity and services', is_correct: true },
      { text: 'It sits in the middle of database tables', is_correct: false },
      { text: 'It only handles database backups', is_correct: false },
      { text: 'It replaces database management systems', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How do database connection strings work?',
    options: [
      { text: 'They contain information needed to connect to a specific database', is_correct: true },
      { text: 'They are physical strings connecting databases', is_correct: false },
      { text: 'They only contain database names', is_correct: false },
      { text: 'They are used for database queries only', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the purpose of database schemas in multi-tenant applications?',
    options: [
      { text: 'To separate data for different tenants while sharing the same database instance', is_correct: true },
      { text: 'To make databases more complex', is_correct: false },
      { text: 'To slow down database operations', is_correct: false },
      { text: 'To store only schema information', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How does database load balancing improve performance?',
    options: [
      { text: 'It distributes database requests across multiple servers', is_correct: true },
      { text: 'It balances the physical weight of servers', is_correct: false },
      { text: 'It only works with specific database types', is_correct: false },
      { text: 'It reduces database functionality', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the difference between synchronous and asynchronous replication?',
    options: [
      { text: 'Synchronous waits for confirmation, asynchronous does not wait', is_correct: true },
      { text: 'Synchronous is always faster', is_correct: false },
      { text: 'Asynchronous is always more reliable', is_correct: false },
      { text: 'They are the same approach', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How do database checkpoints improve recovery?',
    options: [
      { text: 'They mark points where all changes have been written to disk', is_correct: true },
      { text: 'They check database syntax', is_correct: false },
      { text: 'They only check data integrity', is_correct: false },
      { text: 'They checkpoint user sessions', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the purpose of database connection timeouts?',
    options: [
      { text: 'To prevent connections from staying open indefinitely', is_correct: true },
      { text: 'To time database operations', is_correct: false },
      { text: 'To timeout only failed connections', is_correct: false },
      { text: 'To measure connection speed', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How does database profiling help with optimization?',
    options: [
      { text: 'It identifies slow queries and performance bottlenecks', is_correct: true },
      { text: 'It profiles database users', is_correct: false },
      { text: 'It only profiles database administrators', is_correct: false },
      { text: 'It creates user profiles', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the role of database buffer pools?',
    options: [
      { text: 'They cache frequently accessed data pages in memory', is_correct: true },
      { text: 'They pool database connections', is_correct: false },
      { text: 'They buffer only write operations', is_correct: false },
      { text: 'They are used for backup storage', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How do database hints affect query execution?',
    options: [
      { text: 'They provide suggestions to the query optimizer for execution plans', is_correct: true },
      { text: 'They hint at database problems', is_correct: false },
      { text: 'They only work with specific queries', is_correct: false },
      { text: 'They slow down query execution', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the purpose of database maintenance plans?',
    options: [
      { text: 'To automate routine database maintenance tasks', is_correct: true },
      { text: 'To plan database purchases', is_correct: false },
      { text: 'To maintain only database hardware', is_correct: false },
      { text: 'To plan database meetings', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How does database log shipping work?',
    options: [
      { text: 'It automatically backs up and restores transaction logs to secondary servers', is_correct: true },
      { text: 'It ships database logs physically', is_correct: false },
      { text: 'It only ships error logs', is_correct: false },
      { text: 'It logs shipping activities', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the difference between database mirroring and clustering?',
    options: [
      { text: 'Mirroring provides exact copies, clustering provides shared resources', is_correct: true },
      { text: 'Mirroring is always faster', is_correct: false },
      { text: 'Clustering is always more reliable', is_correct: false },
      { text: 'They are the same technology', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How do database resource governors work?',
    options: [
      { text: 'They control and limit resource usage by different workloads', is_correct: true },
      { text: 'They govern database administrators', is_correct: false },
      { text: 'They only govern CPU usage', is_correct: false },
      { text: 'They govern database licenses', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the purpose of database service brokers?',
    options: [
      { text: 'They provide reliable, asynchronous messaging between database applications', is_correct: true },
      { text: 'They broker database sales', is_correct: false },
      { text: 'They only broker database connections', is_correct: false },
      { text: 'They broker database licenses', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How does database change data capture work?',
    options: [
      { text: 'It tracks and captures changes made to database tables', is_correct: true },
      { text: 'It captures only new data', is_correct: false },
      { text: 'It captures database images', is_correct: false },
      { text: 'It only captures deleted data', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the role of database policy management?',
    options: [
      { text: 'To define and enforce rules for database configuration and usage', is_correct: true },
      { text: 'To manage database insurance policies', is_correct: false },
      { text: 'To manage only security policies', is_correct: false },
      { text: 'To manage database documentation', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How do database extended events help with monitoring?',
    options: [
      { text: 'They provide lightweight, flexible event monitoring capabilities', is_correct: true },
      { text: 'They extend database events physically', is_correct: false },
      { text: 'They only monitor extended database features', is_correct: false },
      { text: 'They extend event duration', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the purpose of database data masking?',
    options: [
      { text: 'To hide sensitive data while preserving its format and relationships', is_correct: true },
      { text: 'To mask database errors', is_correct: false },
      { text: 'To mask database performance issues', is_correct: false },
      { text: 'To physically mask database servers', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How does database temporal data support work?',
    options: [
      { text: 'It automatically tracks historical changes to data over time', is_correct: true },
      { text: 'It only supports temporary data', is_correct: false },
      { text: 'It supports only current data', is_correct: false },
      { text: 'It temporally stops database operations', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the role of database memory-optimized tables?',
    options: [
      { text: 'They store data entirely in memory for faster access', is_correct: true },
      { text: 'They optimize only table structure', is_correct: false },
      { text: 'They optimize memory usage only', is_correct: false },
      { text: 'They work only with specific data types', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How do database columnstore indexes improve analytics?',
    options: [
      { text: 'They store data by columns instead of rows for better compression and query performance', is_correct: true },
      { text: 'They only store column names', is_correct: false },
      { text: 'They work only with specific column types', is_correct: false },
      { text: 'They slow down analytical queries', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the purpose of database stretch databases?',
    options: [
      { text: 'They extend on-premises databases to the cloud for archival storage', is_correct: true },
      { text: 'They stretch database tables physically', is_correct: false },
      { text: 'They only stretch database connections', is_correct: false },
      { text: 'They stretch database performance', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How does database query store help with performance tuning?',
    options: [
      { text: 'It captures and stores query execution plans and performance statistics', is_correct: true },
      { text: 'It stores only query text', is_correct: false },
      { text: 'It stores queries in a separate database', is_correct: false },
      { text: 'It only stores slow queries', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the role of database intelligent query processing?',
    options: [
      { text: 'It automatically optimizes query execution using adaptive techniques', is_correct: true },
      { text: 'It makes queries more intelligent', is_correct: false },
      { text: 'It only processes intelligent queries', is_correct: false },
      { text: 'It processes queries with artificial intelligence only', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'How do database automatic tuning features work?',
    options: [
      { text: 'They continuously monitor and automatically apply performance improvements', is_correct: true },
      { text: 'They tune database hardware automatically', is_correct: false },
      { text: 'They only tune specific database features', is_correct: false },
      { text: 'They tune databases manually', is_correct: false }
    ]
  },
  {
    grade: 11,
    difficulty: 'medium',
    question_text: 'What is the purpose of database machine learning integration?',
    options: [
      { text: 'To enable predictive analytics and intelligent data processing within the database', is_correct: true },
      { text: 'To make databases learn by themselves', is_correct: false },
      { text: 'To integrate only machine learning algorithms', is_correct: false },
      { text: 'To replace database administrators with machines', is_correct: false }
    ]
  }
];

module.exports = grade11Additional;