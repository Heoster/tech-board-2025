const grade9Questions = [
  // Advanced Programming - Basic (25 questions)
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a loop in programming?',
    options: [
      { text: 'Code that repeats a set of instructions multiple times', is_correct: true },
      { text: 'A circular piece of hardware', is_correct: false },
      { text: 'An error in the program', is_correct: false },
      { text: 'A type of variable', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a function in programming?',
    options: [
      { text: 'A reusable block of code that performs a specific task', is_correct: true },
      { text: 'A mathematical equation', is_correct: false },
      { text: 'A type of variable', is_correct: false },
      { text: 'A programming error', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a list in Python?',
    options: [
      { text: 'A collection of items stored in a single variable', is_correct: true },
      { text: 'A shopping list', is_correct: false },
      { text: 'A type of loop', is_correct: false },
      { text: 'A programming language', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What does a for loop do?',
    options: [
      { text: 'Repeats code for a specific number of times or items', is_correct: true },
      { text: 'Creates a function', is_correct: false },
      { text: 'Stores data', is_correct: false },
      { text: 'Deletes code', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What does a while loop do?',
    options: [
      { text: 'Repeats code as long as a condition is true', is_correct: true },
      { text: 'Runs code only once', is_correct: false },
      { text: 'Never runs code', is_correct: false },
      { text: 'Creates variables', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is debugging in programming?',
    options: [
      { text: 'Finding and fixing errors in code', is_correct: true },
      { text: 'Writing new code', is_correct: false },
      { text: 'Running programs', is_correct: false },
      { text: 'Deleting programs', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is testing in software development?',
    options: [
      { text: 'Checking if programs work correctly', is_correct: true },
      { text: 'Writing code faster', is_correct: false },
      { text: 'Making programs look better', is_correct: false },
      { text: 'Deleting unnecessary code', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is algorithm efficiency?',
    options: [
      { text: 'How fast and resource-efficient an algorithm is', is_correct: true },
      { text: 'How long an algorithm is', is_correct: false },
      { text: 'How many variables an algorithm uses', is_correct: false },
      { text: 'How colorful an algorithm looks', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a parameter in a function?',
    options: [
      { text: 'Input values that a function receives', is_correct: true },
      { text: 'Output values from a function', is_correct: false },
      { text: 'The name of the function', is_correct: false },
      { text: 'An error in the function', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What does a function return?',
    options: [
      { text: 'A value or result back to the code that called it', is_correct: true },
      { text: 'Nothing ever', is_correct: false },
      { text: 'Only error messages', is_correct: false },
      { text: 'The function name', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is an index in a list?',
    options: [
      { text: 'The position number of an item in the list', is_correct: true },
      { text: 'The value stored in the list', is_correct: false },
      { text: 'The name of the list', is_correct: false },
      { text: 'The size of the list', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What does len() function do in Python?',
    options: [
      { text: 'Returns the number of items in a list or string', is_correct: true },
      { text: 'Deletes items from a list', is_correct: false },
      { text: 'Adds items to a list', is_correct: false },
      { text: 'Sorts a list', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a nested loop?',
    options: [
      { text: 'A loop inside another loop', is_correct: true },
      { text: 'A loop that never ends', is_correct: false },
      { text: 'A loop that runs backwards', is_correct: false },
      { text: 'A broken loop', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is the purpose of comments in code?',
    options: [
      { text: 'To explain what the code does for human readers', is_correct: true },
      { text: 'To make the program run faster', is_correct: false },
      { text: 'To create errors', is_correct: false },
      { text: 'To store data', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a logical error in programming?',
    options: [
      { text: 'When code runs but produces wrong results', is_correct: true },
      { text: 'When code cannot run due to syntax mistakes', is_correct: false },
      { text: 'When the computer crashes', is_correct: false },
      { text: 'When there are no errors', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a syntax error?',
    options: [
      { text: 'Mistakes in the grammar or structure of code', is_correct: true },
      { text: 'Errors in program logic', is_correct: false },
      { text: 'Hardware problems', is_correct: false },
      { text: 'Network connection issues', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is pseudocode?',
    options: [
      { text: 'A way to plan code using plain language', is_correct: true },
      { text: 'Fake or false code', is_correct: false },
      { text: 'Code that doesn\'t work', is_correct: false },
      { text: 'A programming language', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is the range() function used for in Python?',
    options: [
      { text: 'Generating a sequence of numbers for loops', is_correct: true },
      { text: 'Finding the maximum value', is_correct: false },
      { text: 'Calculating averages', is_correct: false },
      { text: 'Sorting lists', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What does the append() method do to a list?',
    options: [
      { text: 'Adds a new item to the end of the list', is_correct: true },
      { text: 'Removes the last item', is_correct: false },
      { text: 'Sorts the list', is_correct: false },
      { text: 'Clears all items', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is iteration in programming?',
    options: [
      { text: 'The process of repeating steps in a loop', is_correct: true },
      { text: 'Writing code once', is_correct: false },
      { text: 'Deleting code', is_correct: false },
      { text: 'Saving files', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a Boolean value?',
    options: [
      { text: 'A value that is either True or False', is_correct: true },
      { text: 'A whole number', is_correct: false },
      { text: 'A text string', is_correct: false },
      { text: 'A decimal number', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What does the break statement do in a loop?',
    options: [
      { text: 'Exits the loop immediately', is_correct: true },
      { text: 'Pauses the loop temporarily', is_correct: false },
      { text: 'Restarts the loop', is_correct: false },
      { text: 'Makes the loop run faster', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What does the continue statement do in a loop?',
    options: [
      { text: 'Skips the rest of the current iteration and goes to the next', is_correct: true },
      { text: 'Stops the loop completely', is_correct: false },
      { text: 'Restarts the loop from the beginning', is_correct: false },
      { text: 'Does nothing', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a local variable?',
    options: [
      { text: 'A variable that exists only inside a function', is_correct: true },
      { text: 'A variable that exists everywhere in the program', is_correct: false },
      { text: 'A variable that stores location data', is_correct: false },
      { text: 'A variable that cannot be changed', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'basic',
    question_text: 'What is a global variable?',
    options: [
      { text: 'A variable that can be accessed from anywhere in the program', is_correct: true },
      { text: 'A variable that only exists in functions', is_correct: false },
      { text: 'A variable that stores global positioning data', is_correct: false },
      { text: 'A variable that is always zero', is_correct: false }
    ]
  },

  // Advanced Programming - Medium (25 questions)
  {
    grade: 9,
    difficulty: 'medium',
    question_text: 'How do loops improve program efficiency compared to repetitive code?',
    options: [
      { text: 'Loops reduce code duplication and make programs easier to maintain', is_correct: true },
      { text: 'Repetitive code is always more efficient than loops', is_correct: false },
      { text: 'Loops and repetitive code have identical efficiency', is_correct: false },
      { text: 'Loops make programs slower', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'medium',
    question_text: 'What is the advantage of using functions in programming?',
    options: [
      { text: 'Functions promote code reusability and modular design', is_correct: true },
      { text: 'Functions make programs more complex', is_correct: false },
      { text: 'Programs should avoid using functions', is_correct: false },
      { text: 'Functions only work in certain programming languages', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'medium',
    question_text: 'How do lists enhance data management in programs?',
    options: [
      { text: 'Lists allow storing and manipulating multiple related values efficiently', is_correct: true },
      { text: 'Individual variables are always better than lists', is_correct: false },
      { text: 'Lists make data management more complicated', is_correct: false },
      { text: 'Lists can only store numbers', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'medium',
    question_text: 'What is the difference between for loops and while loops?',
    options: [
      { text: 'For loops are used when the number of iterations is known, while loops when it depends on a condition', is_correct: true },
      { text: 'For loops and while loops are identical', is_correct: false },
      { text: 'While loops are faster than for loops', is_correct: false },
      { text: 'For loops can only count to 10', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'medium',
    question_text: 'How does systematic debugging improve problem-solving skills?',
    options: [
      { text: 'It teaches methodical analysis and hypothesis testing', is_correct: true },
      { text: 'Debugging is only about fixing syntax errors', is_correct: false },
      { text: 'Systematic approaches slow down debugging', is_correct: false },
      { text: 'Random debugging is more effective', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'medium',
    question_text: 'Why is algorithm efficiency important in programming?',
    options: [
      { text: 'Efficient algorithms use less time and resources, especially with large data', is_correct: true },
      { text: 'Algorithm efficiency is not important', is_correct: false },
      { text: 'Slower algorithms are always better', is_correct: false },
      { text: 'Efficiency only matters for games', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'medium',
    question_text: 'How do function parameters make functions more flexible?',
    options: [
      { text: 'Parameters allow functions to work with different input values', is_correct: true },
      { text: 'Functions should never use parameters', is_correct: false },
      { text: 'Parameters make functions more rigid', is_correct: false },
      { text: 'Parameters are only used for decoration', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'medium',
    question_text: 'What is the benefit of function return values?',
    options: [
      { text: 'Return values allow functions to provide results that can be used elsewhere', is_correct: true },
      { text: 'Functions should never return values', is_correct: false },
      { text: 'Return values make functions slower', is_correct: false },
      { text: 'Return values are only for mathematical functions', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'medium',
    question_text: 'How does understanding list indexing help in data manipulation?',
    options: [
      { text: 'Indexing allows precise access and modification of specific list elements', is_correct: true },
      { text: 'List indexing is not useful', is_correct: false },
      { text: 'All list elements should be accessed randomly', is_correct: false },
      { text: 'Indexing only works with numbers', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'medium',
    question_text: 'What role does testing play in ensuring program reliability?',
    options: [
      { text: 'Testing identifies bugs and verifies that programs meet requirements', is_correct: true },
      { text: 'Testing is unnecessary if code looks correct', is_correct: false },
      { text: 'Testing makes programs less reliable', is_correct: false },
      { text: 'Only simple programs need testing', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'medium',
    question_text: 'How do nested loops expand programming possibilities?',
    options: [
      { text: 'They enable processing of multi-dimensional data and complex patterns', is_correct: true },
      { text: 'Nested loops should always be avoided', is_correct: false },
      { text: 'Single loops are always sufficient', is_correct: false },
      { text: 'Nested loops make programs impossible to understand', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'medium',
    question_text: 'What is the importance of variable scope in programming?',
    options: [
      { text: 'Scope controls where variables can be accessed and prevents naming conflicts', is_correct: true },
      { text: 'All variables should be global', is_correct: false },
      { text: 'Variable scope is not important', is_correct: false },
      { text: 'Local variables are always better than global variables', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'medium',
    question_text: 'How does pseudocode help in program development?',
    options: [
      { text: 'It allows planning program logic before writing actual code', is_correct: true },
      { text: 'Pseudocode is a waste of time', is_correct: false },
      { text: 'Programs should be written directly without planning', is_correct: false },
      { text: 'Pseudocode only works for simple programs', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'medium',
    question_text: 'What is the relationship between logical errors and program testing?',
    options: [
      { text: 'Testing helps identify logical errors that syntax checking cannot find', is_correct: true },
      { text: 'Logical errors are impossible to find', is_correct: false },
      { text: 'Syntax errors are more important than logical errors', is_correct: false },
      { text: 'Testing cannot find logical errors', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'medium',
    question_text: 'How do Boolean values enhance program decision-making?',
    options: [
      { text: 'They provide clear true/false conditions for program flow control', is_correct: true },
      { text: 'Boolean values are not useful in programming', is_correct: false },
      { text: 'Programs should avoid using Boolean values', is_correct: false },
      { text: 'Boolean values only work in mathematics', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'medium',
    question_text: 'What is the benefit of using break and continue statements?',
    options: [
      { text: 'They provide fine control over loop execution flow', is_correct: true },
      { text: 'Break and continue statements should never be used', is_correct: false },
      { text: 'They make loops more confusing', is_correct: false },
      { text: 'They only work in certain programming languages', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'medium',
    question_text: 'How does understanding data types improve programming?',
    options: [
      { text: 'Different data types enable appropriate operations and memory usage', is_correct: true },
      { text: 'All data should be treated the same way', is_correct: false },
      { text: 'Data types are not important in modern programming', is_correct: false },
      { text: 'Only numbers need specific data types', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'medium',
    question_text: 'What role does iteration play in solving complex problems?',
    options: [
      { text: 'Iteration allows processing large amounts of data systematically', is_correct: true },
      { text: 'Complex problems should be solved without iteration', is_correct: false },
      { text: 'Iteration makes problems more complex', is_correct: false },
      { text: 'Iteration only works for simple problems', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'medium',
    question_text: 'How do list methods enhance data manipulation capabilities?',
    options: [
      { text: 'Methods like append, remove, and sort provide powerful data operations', is_correct: true },
      { text: 'List methods are not useful', is_correct: false },
      { text: 'Manual data manipulation is always better', is_correct: false },
      { text: 'List methods only work with numbers', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'medium',
    question_text: 'What is the importance of code readability in programming?',
    options: [
      { text: 'Readable code is easier to understand, maintain, and debug', is_correct: true },
      { text: 'Code readability is not important', is_correct: false },
      { text: 'Cryptic code is always better', is_correct: false },
      { text: 'Only the computer needs to understand code', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'medium',
    question_text: 'How does modular programming with functions improve software development?',
    options: [
      { text: 'It enables team collaboration and code reuse across projects', is_correct: true },
      { text: 'All code should be written in one large block', is_correct: false },
      { text: 'Modular programming makes development slower', is_correct: false },
      { text: 'Functions are only useful for mathematical calculations', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'medium',
    question_text: 'What is the relationship between algorithm design and problem decomposition?',
    options: [
      { text: 'Breaking problems into smaller parts makes algorithm design more manageable', is_correct: true },
      { text: 'Problems should always be solved as single units', is_correct: false },
      { text: 'Decomposition makes problems more complex', is_correct: false },
      { text: 'Algorithm design and problem decomposition are unrelated', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'medium',
    question_text: 'How does understanding program flow control benefit problem-solving?',
    options: [
      { text: 'It teaches structured thinking and logical sequence planning', is_correct: true },
      { text: 'Flow control is only relevant to programming', is_correct: false },
      { text: 'Problem-solving does not involve flow control', is_correct: false },
      { text: 'Flow control makes problem-solving more difficult', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'medium',
    question_text: 'What is the value of learning multiple programming approaches?',
    options: [
      { text: 'Different approaches provide various tools for solving different types of problems', is_correct: true },
      { text: 'Only one programming approach should be learned', is_correct: false },
      { text: 'All programming approaches are identical', is_correct: false },
      { text: 'Learning multiple approaches is confusing', is_correct: false }
    ]
  },
  {
    grade: 9,
    difficulty: 'medium',
    question_text: 'How does error handling improve program robustness?',
    options: [
      { text: 'It allows programs to handle unexpected situations gracefully', is_correct: true },
      { text: 'Programs should crash when errors occur', is_correct: false },
      { text: 'Error handling is not necessary', is_correct: false },
      { text: 'Errors should always be ignored', is_correct: false }
    ]
  }
];

module.exports = grade9Questions;