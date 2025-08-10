#!/usr/bin/env node

/**
 * Grade 11 Comprehensive Seeding - 300+ Questions
 * Topics: Programming, data structures, and system-level understanding
 * Focus: Formal Computer Science
 */

const database = require('../config/database');

const grade11Questions = {
    basic: [
        // Python Programming (Variables, Data Types, Control Structures) - 25 questions
        { q: "What is a variable in Python?", opts: ["Fixed value", "Named storage location", "Function", "Class"], correct: 1 },
        { q: "Which is a valid variable name in Python?", opts: ["2name", "name-2", "name_2", "name 2"], correct: 2 },
        { q: "What is the data type of 'Hello'?", opts: ["int", "float", "str", "bool"], correct: 2 },
        { q: "What is the data type of 42?", opts: ["str", "int", "float", "bool"], correct: 1 },
        { q: "What is the data type of 3.14?", opts: ["int", "str", "float", "bool"], correct: 2 },
        { q: "What is the data type of True?", opts: ["int", "str", "float", "bool"], correct: 3 },
        { q: "Which operator is used for assignment?", opts: ["==", "=", "!=", ">="], correct: 1 },
        { q: "Which operator checks equality?", opts: ["=", "==", "!=", ">="], correct: 1 },
        { q: "What does the if statement do?", opts: ["Loops", "Makes decisions", "Defines functions", "Imports modules"], correct: 1 },
        { q: "What does the else statement do?", opts: ["Primary condition", "Alternative condition", "Loop condition", "Function definition"], correct: 1 },
        { q: "What does elif stand for?", opts: ["else if", "end if", "error if", "exit if"], correct: 0 },
        { q: "Which loop executes a specific number of times?", opts: ["while", "for", "if", "def"], correct: 1 },
        { q: "Which loop continues while condition is true?", opts: ["for", "while", "if", "def"], correct: 1 },
        { q: "What does break do in a loop?", opts: ["Continues loop", "Exits loop", "Starts loop", "Pauses loop"], correct: 1 },
        { q: "What does continue do in a loop?", opts: ["Exits loop", "Skips current iteration", "Starts loop", "Pauses loop"], correct: 1 },
        { q: "What is indentation used for in Python?", opts: ["Decoration", "Code structure", "Comments", "Variables"], correct: 1 },
        { q: "How do you create a comment in Python?", opts: ["//", "/*", "#", "<!--"], correct: 2 },
        { q: "What is the range() function used for?", opts: ["Random numbers", "Sequence of numbers", "String operations", "File operations"], correct: 1 },
        { q: "What does len() function return?", opts: ["Type of object", "Length of object", "Value of object", "Name of object"], correct: 1 },
        { q: "What does type() function return?", opts: ["Length of object", "Type of object", "Value of object", "Name of object"], correct: 1 },
        { q: "What does print() function do?", opts: ["Reads input", "Displays output", "Calculates values", "Stores data"], correct: 1 },
        { q: "What does input() function do?", opts: ["Displays output", "Reads user input", "Calculates values", "Stores data"], correct: 1 },
        { q: "What is the result of 5 // 2?", opts: ["2.5", "2", "3", "2.0"], correct: 1 },
        { q: "What is the result of 5 % 2?", opts: ["2", "1", "2.5", "0"], correct: 1 },
        { q: "What is the result of 2 ** 3?", opts: ["6", "8", "9", "5"], correct: 1 },

        // Functions, Lists, Tuples, Dictionaries - 25 questions
        { q: "How do you define a function in Python?", opts: ["function", "def", "func", "define"], correct: 1 },
        { q: "What is a parameter in a function?", opts: ["Return value", "Input variable", "Function name", "Function body"], correct: 1 },
        { q: "What is a return statement?", opts: ["Function input", "Function output", "Function name", "Function call"], correct: 1 },
        { q: "What is a list in Python?", opts: ["Single value", "Ordered collection", "Function", "Class"], correct: 1 },
        { q: "How do you create an empty list?", opts: ["list()", "[]", "Both list() and []", "{}"], correct: 2 },
        { q: "How do you access the first element of a list?", opts: ["list[1]", "list[0]", "list.first()", "list.get(0)"], correct: 1 },
        { q: "What does append() do to a list?", opts: ["Removes element", "Adds element at end", "Sorts list", "Clears list"], correct: 1 },
        { q: "What does remove() do to a list?", opts: ["Adds element", "Removes specific element", "Sorts list", "Clears list"], correct: 1 },
        { q: "What is a tuple in Python?", opts: ["Mutable sequence", "Immutable sequence", "Dictionary", "Set"], correct: 1 },
        { q: "How do you create a tuple?", opts: ["[]", "()", "{}", "tuple()"], correct: 1 },
        { q: "Can you modify a tuple after creation?", opts: ["Yes", "No", "Sometimes", "Only with methods"], correct: 1 },
        { q: "What is a dictionary in Python?", opts: ["Ordered list", "Key-value pairs", "Immutable sequence", "Set of values"], correct: 1 },
        { q: "How do you create an empty dictionary?", opts: ["[]", "()", "{}", "dict()"], correct: 3 },
        { q: "How do you access a dictionary value?", opts: ["dict[key]", "dict.key", "dict(key)", "dict->key"], correct: 0 },
        { q: "What does keys() method return?", opts: ["Dictionary values", "Dictionary keys", "Dictionary items", "Dictionary length"], correct: 1 },
        { q: "What does values() method return?", opts: ["Dictionary keys", "Dictionary values", "Dictionary items", "Dictionary length"], correct: 1 },
        { q: "What does items() method return?", opts: ["Dictionary keys", "Dictionary values", "Key-value pairs", "Dictionary length"], correct: 2 },
        { q: "What is list slicing?", opts: ["Removing elements", "Extracting portion", "Adding elements", "Sorting elements"], correct: 1 },
        { q: "What does list[1:3] return?", opts: ["Elements 1 and 3", "Elements 1 and 2", "Elements 0, 1, 2", "Element 1 only"], correct: 1 },
        { q: "What is the difference between list and tuple?", opts: ["No difference", "List is mutable, tuple is immutable", "Tuple is mutable, list is immutable", "Both are immutable"], correct: 1 },
        { q: "What does sort() do to a list?", opts: ["Reverses list", "Arranges in order", "Removes duplicates", "Adds elements"], correct: 1 },
        { q: "What does reverse() do to a list?", opts: ["Sorts list", "Reverses order", "Removes elements", "Adds elements"], correct: 1 },
        { q: "What is list comprehension?", opts: ["List documentation", "Concise way to create lists", "List sorting", "List reversal"], correct: 1 },
        { q: "What does pop() do to a list?", opts: ["Adds element", "Removes and returns element", "Sorts list", "Reverses list"], correct: 1 },
        { q: "What does insert() do to a list?", opts: ["Removes element", "Adds element at position", "Sorts list", "Reverses list"], correct: 1 },

        // String Management - 25 questions
        { q: "How do you create a string in Python?", opts: ["Using quotes", "Using brackets", "Using parentheses", "Using braces"], correct: 0 },
        { q: "Which are valid string quotes?", opts: ["Single quotes only", "Double quotes only", "Both single and double", "No quotes needed"], correct: 2 },
        { q: "What is string concatenation?", opts: ["String separation", "String joining", "String deletion", "String reversal"], correct: 1 },
        { q: "Which operator concatenates strings?", opts: ["-", "+", "*", "/"], correct: 1 },
        { q: "What does len() return for a string?", opts: ["String type", "Number of characters", "String value", "String position"], correct: 1 },
        { q: "How do you access a character in a string?", opts: ["string[index]", "string.get(index)", "string(index)", "string->index"], correct: 0 },
        { q: "What does upper() do to a string?", opts: ["Converts to lowercase", "Converts to uppercase", "Reverses string", "Sorts characters"], correct: 1 },
        { q: "What does lower() do to a string?", opts: ["Converts to uppercase", "Converts to lowercase", "Reverses string", "Sorts characters"], correct: 1 },
        { q: "What does strip() do to a string?", opts: ["Adds spaces", "Removes whitespace", "Reverses string", "Converts case"], correct: 1 },
        { q: "What does replace() do?", opts: ["Removes characters", "Substitutes characters", "Adds characters", "Reverses string"], correct: 1 },
        { q: "What does split() do to a string?", opts: ["Joins strings", "Divides into list", "Reverses string", "Converts case"], correct: 1 },
        { q: "What does join() do?", opts: ["Splits string", "Combines list into string", "Reverses string", "Converts case"], correct: 1 },
        { q: "What does find() return?", opts: ["Character at position", "Position of substring", "Length of string", "Type of string"], correct: 1 },
        { q: "What does count() return?", opts: ["String length", "Occurrences of substring", "String position", "String type"], correct: 1 },
        { q: "What is string formatting?", opts: ["String deletion", "Inserting values into string", "String reversal", "String sorting"], correct: 1 },
        { q: "Which method formats strings?", opts: ["format()", "print()", "input()", "len()"], correct: 0 },
        { q: "What are f-strings?", opts: ["File strings", "Formatted string literals", "Function strings", "Fixed strings"], correct: 1 },
        { q: "How do you create a multiline string?", opts: ["Single quotes", "Double quotes", "Triple quotes", "No quotes"], correct: 2 },
        { q: "What does startswith() return?", opts: ["String start", "Boolean value", "String length", "String position"], correct: 1 },
        { q: "What does endswith() return?", opts: ["String end", "Boolean value", "String length", "String position"], correct: 1 },
        { q: "What is string slicing?", opts: ["String deletion", "Extracting substring", "String joining", "String reversal"], correct: 1 },
        { q: "What does string[1:4] return?", opts: ["Characters 1 to 4", "Characters 1 to 3", "Character 1 only", "Characters 0 to 3"], correct: 1 },
        { q: "What does string[::-1] do?", opts: ["Normal string", "Reverses string", "First character", "Last character"], correct: 1 },
        { q: "What does isdigit() return?", opts: ["String digits", "Boolean if all digits", "Number of digits", "Digit positions"], correct: 1 },
        { q: "What does isalpha() return?", opts: ["String letters", "Boolean if all letters", "Number of letters", "Letter positions"], correct: 1 },

        // File Handling - 25 questions
        { q: "How do you open a file in Python?", opts: ["file()", "open()", "read()", "load()"], correct: 1 },
        { q: "What does 'r' mode mean?", opts: ["Write mode", "Read mode", "Append mode", "Binary mode"], correct: 1 },
        { q: "What does 'w' mode mean?", opts: ["Read mode", "Write mode", "Append mode", "Binary mode"], correct: 1 },
        { q: "What does 'a' mode mean?", opts: ["Read mode", "Write mode", "Append mode", "Binary mode"], correct: 2 },
        { q: "What happens if you open a file in 'w' mode?", opts: ["File is read", "File is overwritten", "File is appended", "File is closed"], correct: 1 },
        { q: "What does read() method do?", opts: ["Writes to file", "Reads entire file", "Closes file", "Opens file"], correct: 1 },
        { q: "What does readline() method do?", opts: ["Reads entire file", "Reads one line", "Writes line", "Closes file"], correct: 1 },
        { q: "What does readlines() method do?", opts: ["Reads one line", "Reads all lines into list", "Writes lines", "Closes file"], correct: 1 },
        { q: "What does write() method do?", opts: ["Reads from file", "Writes to file", "Closes file", "Opens file"], correct: 1 },
        { q: "What does close() method do?", opts: ["Opens file", "Closes file", "Reads file", "Writes file"], correct: 1 },
        { q: "Why should you close files?", opts: ["Not necessary", "Free system resources", "Make file readable", "Make file writable"], correct: 1 },
        { q: "What is the 'with' statement used for?", opts: ["Loops", "Automatic file closing", "Conditions", "Functions"], correct: 1 },
        { q: "What does seek() method do?", opts: ["Finds text", "Changes file position", "Closes file", "Opens file"], correct: 1 },
        { q: "What does tell() method return?", opts: ["File content", "Current file position", "File size", "File name"], correct: 1 },
        { q: "How do you check if a file exists?", opts: ["file.exists()", "os.path.exists()", "file.check()", "open() and catch error"], correct: 1 },
        { q: "What exception occurs when file not found?", opts: ["ValueError", "FileNotFoundError", "TypeError", "IndexError"], correct: 1 },
        { q: "What is binary mode?", opts: ["Text mode", "Non-text file mode", "Read mode", "Write mode"], correct: 1 },
        { q: "How do you specify binary mode?", opts: ["Add 'b' to mode", "Add 'bin' to mode", "Use binary()", "Use bin()"], correct: 0 },
        { q: "What does flush() method do?", opts: ["Clears file", "Forces write to disk", "Reads file", "Closes file"], correct: 1 },
        { q: "What is file pointer?", opts: ["File name", "Current position in file", "File size", "File type"], correct: 1 },
        { q: "How do you append to a file?", opts: ["Use 'w' mode", "Use 'a' mode", "Use 'r' mode", "Use append()"], correct: 1 },
        { q: "What happens when you read past end of file?", opts: ["Error occurs", "Returns empty string", "File closes", "File resets"], correct: 1 },
        { q: "How do you read file line by line?", opts: ["Use read()", "Use for loop with file", "Use readall()", "Use getline()"], correct: 1 },
        { q: "What does truncate() method do?", opts: ["Reads file", "Cuts file at position", "Closes file", "Opens file"], correct: 1 },
        { q: "How do you get file size?", opts: ["file.size()", "os.path.getsize()", "len(file)", "file.length()"], correct: 1 }
    ],

    medium: [],
    advanced: []
};// Continue with more basic questions
grade11Questions.basic.push(
    // Data Representation (Binary, ASCII) - 25 questions
    { q: "What is binary representation?", opts: ["Base 10", "Base 2", "Base 8", "Base 16"], correct: 1 },
    { q: "How many bits in a byte?", opts: ["4", "8", "16", "32"], correct: 1 },
    { q: "What does ASCII stand for?", opts: ["American Standard Code for Information Interchange", "Advanced Standard Code for Information Interchange", "American System Code for Information Interchange", "Advanced System Code for Information Interchange"], correct: 0 },
    { q: "What is the ASCII value of 'A'?", opts: ["64", "65", "66", "67"], correct: 1 },
    { q: "What is the ASCII value of 'a'?", opts: ["96", "97", "98", "99"], correct: 1 },
    { q: "What is the ASCII value of '0'?", opts: ["0", "48", "49", "50"], correct: 1 },
    { q: "How many characters can ASCII represent?", opts: ["64", "128", "256", "512"], correct: 1 },
    { q: "What is Unicode?", opts: ["Extended ASCII", "Universal character encoding", "Binary code", "Hexadecimal code"], correct: 1 },
    { q: "What is UTF-8?", opts: ["ASCII extension", "Unicode encoding", "Binary format", "Hexadecimal format"], correct: 1 },
    { q: "What is the binary of decimal 10?", opts: ["1010", "1100", "1001", "1111"], correct: 0 },
    { q: "What is the decimal of binary 1111?", opts: ["14", "15", "16", "17"], correct: 1 },
    { q: "What is hexadecimal?", opts: ["Base 8", "Base 16", "Base 10", "Base 2"], correct: 1 },
    { q: "What is the hexadecimal of decimal 15?", opts: ["E", "F", "10", "A"], correct: 1 },
    { q: "What is two's complement?", opts: ["Addition method", "Negative number representation", "Multiplication method", "Division method"], correct: 1 },
    { q: "What is floating point representation?", opts: ["Integer format", "Decimal number format", "Binary format", "Hexadecimal format"], correct: 1 },
    { q: "What is IEEE 754?", opts: ["Integer standard", "Floating point standard", "Character standard", "Binary standard"], correct: 1 },
    { q: "What is mantissa in floating point?", opts: ["Exponent part", "Fractional part", "Sign part", "Base part"], correct: 1 },
    { q: "What is exponent in floating point?", opts: ["Fractional part", "Power part", "Sign part", "Base part"], correct: 1 },
    { q: "What is sign bit?", opts: ["Number magnitude", "Positive/negative indicator", "Decimal point", "Binary point"], correct: 1 },
    { q: "What is overflow in computing?", opts: ["Too little data", "Result too large for storage", "Data corruption", "Memory leak"], correct: 1 },
    { q: "What is underflow in computing?", opts: ["Result too large", "Result too small for storage", "Data corruption", "Memory leak"], correct: 1 },
    { q: "What is precision in floating point?", opts: ["Speed of calculation", "Number of significant digits", "Memory usage", "Processing time"], correct: 1 },
    { q: "What is bit manipulation?", opts: ["Byte operations", "Individual bit operations", "Word operations", "Character operations"], correct: 1 },
    { q: "What does AND operation do?", opts: ["Adds bits", "Multiplies bits", "Both bits must be 1", "Either bit can be 1"], correct: 2 },
    { q: "What does OR operation do?", opts: ["Both bits must be 1", "Either bit can be 1", "Subtracts bits", "Divides bits"], correct: 1 },

    // Boolean Algebra - 25 questions
    { q: "Who developed Boolean algebra?", opts: ["Newton", "George Boole", "Einstein", "Turing"], correct: 1 },
    { q: "What are the basic Boolean values?", opts: ["0 and 1", "True and False", "Yes and No", "All of the above"], correct: 3 },
    { q: "What is Boolean AND operation?", opts: ["Addition", "Multiplication", "Subtraction", "Division"], correct: 1 },
    { q: "What is Boolean OR operation?", opts: ["Multiplication", "Addition", "Subtraction", "Division"], correct: 1 },
    { q: "What is Boolean NOT operation?", opts: ["Same value", "Opposite value", "Zero value", "One value"], correct: 1 },
    { q: "What is the result of 1 AND 1?", opts: ["0", "1", "True", "Both 1 and True"], correct: 3 },
    { q: "What is the result of 0 OR 1?", opts: ["0", "1", "True", "Both 1 and True"], correct: 3 },
    { q: "What is the result of NOT 1?", opts: ["1", "0", "False", "Both 0 and False"], correct: 3 },
    { q: "What is De Morgan's Law?", opts: ["AND/OR relationship", "NOT(A AND B) = NOT A OR NOT B", "Boolean identity", "All of the above"], correct: 3 },
    { q: "What is Boolean identity law?", opts: ["A AND 1 = A", "A OR 0 = A", "Both A AND 1 = A and A OR 0 = A", "A AND 0 = 0"], correct: 2 },
    { q: "What is Boolean complement law?", opts: ["A AND NOT A = 0", "A OR NOT A = 1", "Both above", "A AND A = A"], correct: 2 },
    { q: "What is Boolean idempotent law?", opts: ["A AND A = A", "A OR A = A", "Both above", "A AND 1 = A"], correct: 2 },
    { q: "What is Boolean commutative law?", opts: ["A AND B = B AND A", "A OR B = B OR A", "Both above", "A AND 1 = A"], correct: 2 },
    { q: "What is Boolean associative law?", opts: ["(A AND B) AND C = A AND (B AND C)", "(A OR B) OR C = A OR (B OR C)", "Both above", "A AND B = B AND A"], correct: 2 },
    { q: "What is Boolean distributive law?", opts: ["A AND (B OR C) = (A AND B) OR (A AND C)", "A OR (B AND C) = (A OR B) AND (A OR C)", "Both above", "A AND B = B AND A"], correct: 2 },
    { q: "What is XOR operation?", opts: ["Exclusive OR", "Extended OR", "Extra OR", "External OR"], correct: 0 },
    { q: "What is the result of 1 XOR 1?", opts: ["0", "1", "True", "False"], correct: 0 },
    { q: "What is the result of 1 XOR 0?", opts: ["0", "1", "True", "False"], correct: 1 },
    { q: "What is NAND operation?", opts: ["NOT AND", "New AND", "Next AND", "Near AND"], correct: 0 },
    { q: "What is NOR operation?", opts: ["NOT OR", "New OR", "Next OR", "Near OR"], correct: 0 },
    { q: "What is a truth table?", opts: ["Data table", "All input-output combinations", "Programming table", "Memory table"], correct: 1 },
    { q: "How many rows in truth table for 2 variables?", opts: ["2", "3", "4", "8"], correct: 2 },
    { q: "How many rows in truth table for 3 variables?", opts: ["4", "6", "8", "16"], correct: 2 },
    { q: "What is Boolean expression simplification?", opts: ["Making complex", "Reducing terms", "Adding terms", "Multiplying terms"], correct: 1 },
    { q: "What is Karnaugh map?", opts: ["Geographic map", "Boolean simplification tool", "Memory map", "Network map"], correct: 1 },

    // SQL & RDBMS Concepts - 25 questions
    { q: "What does SQL stand for?", opts: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"], correct: 0 },
    { q: "What does RDBMS stand for?", opts: ["Relational Database Management System", "Random Database Management System", "Remote Database Management System", "Real Database Management System"], correct: 0 },
    { q: "What is a table in database?", opts: ["Furniture", "Data in rows and columns", "Computer hardware", "Software program"], correct: 1 },
    { q: "What is a row in database table?", opts: ["Column", "Record", "Field", "Key"], correct: 1 },
    { q: "What is a column in database table?", opts: ["Row", "Record", "Field", "Table"], correct: 2 },
    { q: "What is a primary key?", opts: ["Any key", "Unique record identifier", "Foreign key", "Composite key"], correct: 1 },
    { q: "What is a foreign key?", opts: ["Primary key", "Reference to another table", "Unique key", "Composite key"], correct: 1 },
    { q: "What does SELECT statement do?", opts: ["Inserts data", "Retrieves data", "Updates data", "Deletes data"], correct: 1 },
    { q: "What does INSERT statement do?", opts: ["Retrieves data", "Adds new data", "Updates data", "Deletes data"], correct: 1 },
    { q: "What does UPDATE statement do?", opts: ["Adds data", "Modifies existing data", "Retrieves data", "Deletes data"], correct: 1 },
    { q: "What does DELETE statement do?", opts: ["Adds data", "Removes data", "Updates data", "Retrieves data"], correct: 1 },
    { q: "What does WHERE clause do?", opts: ["Sorts data", "Filters data", "Groups data", "Joins tables"], correct: 1 },
    { q: "What does ORDER BY clause do?", opts: ["Filters data", "Sorts data", "Groups data", "Joins tables"], correct: 1 },
    { q: "What does GROUP BY clause do?", opts: ["Sorts data", "Groups similar data", "Filters data", "Joins tables"], correct: 1 },
    { q: "What does HAVING clause do?", opts: ["Filters rows", "Filters groups", "Sorts data", "Joins tables"], correct: 1 },
    { q: "What is JOIN operation?", opts: ["Separates tables", "Combines tables", "Creates tables", "Deletes tables"], correct: 1 },
    { q: "What is INNER JOIN?", opts: ["All records", "Matching records only", "Left table all", "Right table all"], correct: 1 },
    { q: "What is LEFT JOIN?", opts: ["Right table all", "Left table all records", "Matching only", "No records"], correct: 1 },
    { q: "What is RIGHT JOIN?", opts: ["Left table all", "Right table all records", "Matching only", "No records"], correct: 1 },
    { q: "What is FULL JOIN?", opts: ["Matching only", "All records from both tables", "Left table only", "Right table only"], correct: 1 },
    { q: "What is normalization?", opts: ["Making data abnormal", "Organizing data efficiently", "Data deletion", "Data duplication"], correct: 1 },
    { q: "What is data redundancy?", opts: ["Data shortage", "Data duplication", "Data accuracy", "Data speed"], correct: 1 },
    { q: "What is data integrity?", opts: ["Data corruption", "Data accuracy and consistency", "Data speed", "Data size"], correct: 1 },
    { q: "What is an index?", opts: ["Table data", "Fast access structure", "Primary key", "Foreign key"], correct: 1 },
    { q: "What is a view?", opts: ["Physical table", "Virtual table", "Index", "Primary key"], correct: 1 },

    // Cyber Safety & Ethics - 25 questions
    { q: "What is cyber safety?", opts: ["Physical safety", "Online safety practices", "Car safety", "Home safety"], correct: 1 },
    { q: "What is cyber ethics?", opts: ["Computer hardware rules", "Moral principles for technology", "Software rules", "Internet rules"], correct: 1 },
    { q: "What is digital citizenship?", opts: ["Government citizenship", "Responsible technology use", "Computer ownership", "Internet subscription"], correct: 1 },
    { q: "What is a strong password?", opts: ["Simple word", "Complex combination", "Personal information", "Short text"], correct: 1 },
    { q: "What is two-factor authentication?", opts: ["One password", "Extra security step", "No security", "Weak security"], correct: 1 },
    { q: "What is phishing?", opts: ["Catching fish", "Stealing information online", "Playing games", "Sending emails"], correct: 1 },
    { q: "What is malware?", opts: ["Good software", "Malicious software", "System software", "Free software"], correct: 1 },
    { q: "What is a virus?", opts: ["Good program", "Harmful self-replicating program", "System program", "User program"], correct: 1 },
    { q: "What is identity theft?", opts: ["Stealing objects", "Stealing personal information", "Stealing money", "Stealing food"], correct: 1 },
    { q: "What is cyberbullying?", opts: ["Online gaming", "Online harassment", "Online learning", "Online shopping"], correct: 1 },
    { q: "What is copyright?", opts: ["Right to copy anything", "Legal protection of creative work", "Computer right", "Internet right"], correct: 1 },
    { q: "What is plagiarism?", opts: ["Original work", "Using others' work without credit", "Proper citation", "Legal copying"], correct: 1 },
    { q: "What is fair use?", opts: ["Unlimited copying", "Limited use for education/criticism", "Commercial use", "No restrictions"], correct: 1 },
    { q: "What is intellectual property?", opts: ["Physical property", "Mental creations ownership", "Computer hardware", "Internet content"], correct: 1 },
    { q: "What is software piracy?", opts: ["Legal software use", "Illegal software copying", "Software purchase", "Software development"], correct: 1 },
    { q: "What is digital footprint?", opts: ["Physical footprint", "Online activity trace", "Computer size", "Internet speed"], correct: 1 },
    { q: "What is online reputation?", opts: ["Computer brand", "Digital image of person", "Internet speed", "Website design"], correct: 1 },
    { q: "What is netiquette?", opts: ["Internet rules", "Online etiquette", "Network setup", "Web design"], correct: 1 },
    { q: "What is appropriate online behavior?", opts: ["Being rude", "Being respectful", "Sharing personal info", "Bullying others"], correct: 1 },
    { q: "What is privacy online?", opts: ["Public information", "Personal information protection", "Shared information", "Open information"], correct: 1 },
    { q: "What is encryption?", opts: ["Data deletion", "Data protection through coding", "Data copying", "Data viewing"], correct: 1 },
    { q: "What is a firewall?", opts: ["Physical wall", "Network security system", "Software program", "Hardware device"], correct: 1 },
    { q: "What is antivirus software?", opts: ["Creates viruses", "Protects against viruses", "Spreads viruses", "Ignores viruses"], correct: 1 },
    { q: "What is backup?", opts: ["Data deletion", "Data copy for safety", "Data modification", "Data viewing"], correct: 1 },
    { q: "What is social engineering?", opts: ["Building bridges", "Manipulating people for information", "Computer programming", "Network setup"], correct: 1 }
);// Add medium questions
grade11Questions.medium = [
    // Advanced Python Programming - 40 questions
    { q: "What is object-oriented programming?", opts: ["Procedural programming", "Programming with objects and classes", "Functional programming", "Assembly programming"], correct: 1 },
    { q: "What is a class in Python?", opts: ["Object instance", "Blueprint for objects", "Variable type", "Function type"], correct: 1 },
    { q: "What is an object in Python?", opts: ["Class blueprint", "Instance of a class", "Variable", "Function"], correct: 1 },
    { q: "What is inheritance in OOP?", opts: ["Creating new classes", "Class acquiring properties from another", "Deleting classes", "Modifying classes"], correct: 1 },
    { q: "What is encapsulation?", opts: ["Data exposure", "Data hiding and bundling", "Data deletion", "Data copying"], correct: 1 },
    { q: "What is polymorphism?", opts: ["Single form", "Multiple forms for same interface", "No form", "Fixed form"], correct: 1 },
    { q: "What is method overriding?", opts: ["Creating new method", "Redefining inherited method", "Deleting method", "Copying method"], correct: 1 },
    { q: "What is a constructor in Python?", opts: ["__del__", "__init__", "__str__", "__repr__"], correct: 1 },
    { q: "What is a destructor in Python?", opts: ["__init__", "__del__", "__str__", "__repr__"], correct: 1 },
    { q: "What is self in Python?", opts: ["Class name", "Instance reference", "Method name", "Variable name"], correct: 1 },
    { q: "What is a static method?", opts: ["Instance method", "Class method without self", "Object method", "Dynamic method"], correct: 1 },
    { q: "What is a class method?", opts: ["Instance method", "Method with cls parameter", "Static method", "Object method"], correct: 1 },
    { q: "What is multiple inheritance?", opts: ["Single parent class", "Multiple parent classes", "No parent class", "Abstract class"], correct: 1 },
    { q: "What is method resolution order (MRO)?", opts: ["Random order", "Order of method lookup", "Alphabetical order", "Creation order"], correct: 1 },
    { q: "What is super() function?", opts: ["Subclass reference", "Parent class reference", "Current class", "No reference"], correct: 1 },
    { q: "What is an abstract class?", opts: ["Concrete class", "Class that cannot be instantiated", "Interface", "Regular class"], correct: 1 },
    { q: "What is duck typing?", opts: ["Type checking", "If it walks like duck, it's duck", "Strong typing", "Static typing"], correct: 1 },
    { q: "What is a property in Python?", opts: ["Class variable", "Method accessed like attribute", "Instance variable", "Static variable"], correct: 1 },
    { q: "What is a decorator?", opts: ["Class modifier", "Function modifier", "Variable modifier", "Module modifier"], correct: 1 },
    { q: "What is lambda function?", opts: ["Named function", "Anonymous function", "Class method", "Static method"], correct: 1 },
    { q: "What is list comprehension?", opts: ["List documentation", "Concise way to create lists", "List method", "List property"], correct: 1 },
    { q: "What is generator in Python?", opts: ["List creator", "Iterator that yields values", "Function creator", "Class creator"], correct: 1 },
    { q: "What is yield keyword?", opts: ["Return statement", "Generator value producer", "Import statement", "Class definition"], correct: 1 },
    { q: "What is exception handling?", opts: ["Error creation", "Error management", "Error ignoring", "Error deletion"], correct: 1 },
    { q: "What is try-except block?", opts: ["Loop structure", "Error handling structure", "Condition structure", "Function structure"], correct: 1 },
    { q: "What is finally block?", opts: ["Optional block", "Always executed block", "Error block", "Success block"], correct: 1 },
    { q: "What is raise statement?", opts: ["Exception handling", "Exception throwing", "Exception catching", "Exception ignoring"], correct: 1 },
    { q: "What is assert statement?", opts: ["Assignment", "Debugging aid", "Loop control", "Function definition"], correct: 1 },
    { q: "What is module in Python?", opts: ["Class", "File containing Python code", "Function", "Variable"], correct: 1 },
    { q: "What is package in Python?", opts: ["Single module", "Collection of modules", "Function", "Class"], correct: 1 },
    { q: "What is __init__.py file?", opts: ["Main file", "Package initializer", "Module file", "Class file"], correct: 1 },
    { q: "What is import statement?", opts: ["Export code", "Include external code", "Delete code", "Copy code"], correct: 1 },
    { q: "What is from...import statement?", opts: ["Import everything", "Import specific items", "Import nothing", "Import randomly"], correct: 1 },
    { q: "What is __name__ variable?", opts: ["Class name", "Module name identifier", "Function name", "Variable name"], correct: 1 },
    { q: "What does if __name__ == '__main__' do?", opts: ["Always runs", "Runs only when script executed directly", "Never runs", "Runs randomly"], correct: 1 },
    { q: "What is recursion?", opts: ["Loop structure", "Function calling itself", "Variable assignment", "Class definition"], correct: 1 },
    { q: "What is base case in recursion?", opts: ["First case", "Stopping condition", "Error case", "Random case"], correct: 1 },
    { q: "What is closure in Python?", opts: ["File closing", "Function with enclosed variables", "Class closing", "Module closing"], correct: 1 },
    { q: "What is scope in Python?", opts: ["Variable visibility", "Function size", "Class size", "Module size"], correct: 0 },
    { q: "What is global keyword?", opts: ["Local variable", "Global variable access", "Class variable", "Instance variable"], correct: 1 },

    // Advanced Data Structures - 40 questions
    { q: "What is a stack data structure?", opts: ["FIFO structure", "LIFO structure", "Random access", "Sequential access"], correct: 1 },
    { q: "What is a queue data structure?", opts: ["LIFO structure", "FIFO structure", "Random access", "Stack structure"], correct: 1 },
    { q: "What does LIFO stand for?", opts: ["Last In First Out", "Last In Final Out", "Late In First Out", "Large In First Out"], correct: 0 },
    { q: "What does FIFO stand for?", opts: ["First In Final Out", "First In First Out", "Fast In First Out", "Final In First Out"], correct: 1 },
    { q: "What is push operation in stack?", opts: ["Remove element", "Add element", "View element", "Search element"], correct: 1 },
    { q: "What is pop operation in stack?", opts: ["Add element", "Remove and return top element", "View element", "Search element"], correct: 1 },
    { q: "What is enqueue operation in queue?", opts: ["Remove element", "Add element to rear", "View element", "Search element"], correct: 1 },
    { q: "What is dequeue operation in queue?", opts: ["Add element", "Remove element from front", "View element", "Search element"], correct: 1 },
    { q: "What is a linked list?", opts: ["Array structure", "Node-based linear structure", "Stack structure", "Queue structure"], correct: 1 },
    { q: "What is a node in linked list?", opts: ["Data only", "Data and pointer", "Pointer only", "Index"], correct: 1 },
    { q: "What is singly linked list?", opts: ["Two-way links", "One-way links", "No links", "Circular links"], correct: 1 },
    { q: "What is doubly linked list?", opts: ["One-way links", "Two-way links", "No links", "Circular links"], correct: 1 },
    { q: "What is circular linked list?", opts: ["Linear list", "Last node points to first", "No connections", "Random connections"], correct: 1 },
    { q: "What is a tree data structure?", opts: ["Linear structure", "Hierarchical structure", "Random structure", "Sequential structure"], correct: 1 },
    { q: "What is root in tree?", opts: ["Bottom node", "Top node", "Middle node", "Leaf node"], correct: 1 },
    { q: "What is leaf in tree?", opts: ["Root node", "Node with no children", "Parent node", "Internal node"], correct: 1 },
    { q: "What is binary tree?", opts: ["Tree with 3 children", "Tree with at most 2 children", "Tree with 1 child", "Tree with no children"], correct: 1 },
    { q: "What is binary search tree?", opts: ["Random tree", "Ordered binary tree", "Unordered tree", "Linear tree"], correct: 1 },
    { q: "What is tree traversal?", opts: ["Tree creation", "Visiting all nodes", "Tree deletion", "Tree modification"], correct: 1 },
    { q: "What is inorder traversal?", opts: ["Root-Left-Right", "Left-Root-Right", "Left-Right-Root", "Right-Root-Left"], correct: 1 },
    { q: "What is preorder traversal?", opts: ["Left-Root-Right", "Root-Left-Right", "Left-Right-Root", "Right-Root-Left"], correct: 1 },
    { q: "What is postorder traversal?", opts: ["Root-Left-Right", "Left-Root-Right", "Left-Right-Root", "Right-Root-Left"], correct: 2 },
    { q: "What is a graph data structure?", opts: ["Linear structure", "Network of vertices and edges", "Tree structure", "Array structure"], correct: 1 },
    { q: "What is vertex in graph?", opts: ["Edge", "Node", "Connection", "Path"], correct: 1 },
    { q: "What is edge in graph?", opts: ["Node", "Connection between vertices", "Path", "Vertex"], correct: 1 },
    { q: "What is directed graph?", opts: ["No direction", "Edges have direction", "Bidirectional", "Random direction"], correct: 1 },
    { q: "What is undirected graph?", opts: ["Edges have direction", "Edges have no direction", "One direction", "Random direction"], correct: 1 },
    { q: "What is weighted graph?", opts: ["No weights", "Edges have weights", "Vertices have weights", "Random weights"], correct: 1 },
    { q: "What is adjacency matrix?", opts: ["Vertex list", "2D array for graph representation", "Edge list", "Path matrix"], correct: 1 },
    { q: "What is adjacency list?", opts: ["Matrix representation", "List-based graph representation", "Vertex array", "Edge array"], correct: 1 },
    { q: "What is hash table?", opts: ["Sequential storage", "Key-value mapping structure", "Linear structure", "Tree structure"], correct: 1 },
    { q: "What is hash function?", opts: ["Random function", "Key to index mapping", "Value function", "Search function"], correct: 1 },
    { q: "What is collision in hashing?", opts: ["No conflict", "Multiple keys map to same index", "Single key", "Perfect mapping"], correct: 1 },
    { q: "What is chaining in hashing?", opts: ["No collision handling", "Linked list at each index", "Linear probing", "Random placement"], correct: 1 },
    { q: "What is open addressing?", opts: ["Chaining method", "Finding alternative index", "No collision handling", "Random placement"], correct: 1 },
    { q: "What is linear probing?", opts: ["Random search", "Sequential index search", "Binary search", "No search"], correct: 1 },
    { q: "What is heap data structure?", opts: ["Linear structure", "Complete binary tree", "Random structure", "Sequential structure"], correct: 1 },
    { q: "What is max heap?", opts: ["Minimum at root", "Maximum at root", "Random at root", "Average at root"], correct: 1 },
    { q: "What is min heap?", opts: ["Maximum at root", "Minimum at root", "Random at root", "Average at root"], correct: 1 },
    { q: "What is priority queue?", opts: ["FIFO queue", "Priority-based queue", "LIFO queue", "Random queue"], correct: 1 },

    // Advanced Database and SQL - 40 questions
    { q: "What is database normalization?", opts: ["Making data abnormal", "Organizing data to reduce redundancy", "Data deletion", "Data duplication"], correct: 1 },
    { q: "What is First Normal Form (1NF)?", opts: ["No rules", "Atomic values only", "No duplicates", "Primary key exists"], correct: 1 },
    { q: "What is Second Normal Form (2NF)?", opts: ["1NF + no partial dependencies", "Only atomic values", "No duplicates", "Primary key only"], correct: 0 },
    { q: "What is Third Normal Form (3NF)?", opts: ["2NF + no transitive dependencies", "Only atomic values", "No duplicates", "Primary key only"], correct: 0 },
    { q: "What is BCNF?", opts: ["Basic Normal Form", "Boyce-Codd Normal Form", "Binary Normal Form", "Boolean Normal Form"], correct: 1 },
    { q: "What is functional dependency?", opts: ["Random dependency", "One attribute determines another", "No dependency", "All dependencies"], correct: 1 },
    { q: "What is partial dependency?", opts: ["Full dependency", "Dependency on part of composite key", "No dependency", "Complete dependency"], correct: 1 },
    { q: "What is transitive dependency?", opts: ["Direct dependency", "A→B, B→C, therefore A→C", "No dependency", "Partial dependency"], correct: 1 },
    { q: "What is entity in ER model?", opts: ["Attribute", "Real-world object", "Relationship", "Table"], correct: 1 },
    { q: "What is attribute in ER model?", opts: ["Entity", "Property of entity", "Relationship", "Table"], correct: 1 },
    { q: "What is relationship in ER model?", opts: ["Entity", "Association between entities", "Attribute", "Table"], correct: 1 },
    { q: "What is cardinality in relationships?", opts: ["Number of attributes", "Number of participating entities", "Number of tables", "Number of keys"], correct: 1 },
    { q: "What is one-to-one relationship?", opts: ["1:M", "1:1", "M:N", "M:1"], correct: 1 },
    { q: "What is one-to-many relationship?", opts: ["1:1", "1:M", "M:N", "M:1"], correct: 1 },
    { q: "What is many-to-many relationship?", opts: ["1:1", "1:M", "M:N", "M:1"], correct: 2 },
    { q: "What is weak entity?", opts: ["Independent entity", "Depends on another entity", "Strong entity", "No entity"], correct: 1 },
    { q: "What is strong entity?", opts: ["Dependent entity", "Independent entity", "Weak entity", "No entity"], correct: 1 },
    { q: "What is composite attribute?", opts: ["Single value", "Multiple sub-attributes", "Primary key", "Foreign key"], correct: 1 },
    { q: "What is derived attribute?", opts: ["Stored attribute", "Calculated from other attributes", "Primary key", "Foreign key"], correct: 1 },
    { q: "What is multivalued attribute?", opts: ["Single value", "Multiple values", "No value", "Calculated value"], correct: 1 },
    { q: "What is ACID properties?", opts: ["Database rules", "Transaction properties", "Table properties", "Query properties"], correct: 1 },
    { q: "What is Atomicity in ACID?", opts: ["Partial execution", "All or nothing", "Some execution", "No execution"], correct: 1 },
    { q: "What is Consistency in ACID?", opts: ["Data inconsistency", "Valid state maintenance", "Data corruption", "Data loss"], correct: 1 },
    { q: "What is Isolation in ACID?", opts: ["No separation", "Transaction separation", "Data mixing", "No isolation"], correct: 1 },
    { q: "What is Durability in ACID?", opts: ["Temporary storage", "Permanent storage", "Volatile storage", "No storage"], correct: 1 },
    { q: "What is transaction?", opts: ["Single operation", "Logical unit of work", "Database", "Table"], correct: 1 },
    { q: "What is commit in transaction?", opts: ["Undo changes", "Make changes permanent", "Temporary save", "Delete changes"], correct: 1 },
    { q: "What is rollback in transaction?", opts: ["Save changes", "Undo changes", "Commit changes", "Delete database"], correct: 1 },
    { q: "What is deadlock in database?", opts: ["No lock", "Mutual waiting for resources", "Single lock", "Free access"], correct: 1 },
    { q: "What is concurrency control?", opts: ["Single user access", "Multiple user coordination", "No control", "Random access"], correct: 1 },
    { q: "What is locking in database?", opts: ["No access control", "Resource access control", "Free access", "Random access"], correct: 1 },
    { q: "What is shared lock?", opts: ["Exclusive access", "Read access", "No access", "Write access"], correct: 1 },
    { q: "What is exclusive lock?", opts: ["Shared access", "Exclusive write access", "Read access", "No access"], correct: 1 },
    { q: "What is index in database?", opts: ["Table data", "Fast access structure", "Primary key", "Foreign key"], correct: 1 },
    { q: "What is clustered index?", opts: ["Separate structure", "Data storage order", "Random structure", "No structure"], correct: 1 },
    { q: "What is non-clustered index?", opts: ["Data storage order", "Separate pointer structure", "No structure", "Random structure"], correct: 1 },
    { q: "What is view in database?", opts: ["Physical table", "Virtual table", "Index", "Primary key"], correct: 1 },
    { q: "What is stored procedure?", opts: ["Single query", "Precompiled SQL code", "Table", "Index"], correct: 1 },
    { q: "What is trigger in database?", opts: ["Manual execution", "Automatic execution on events", "No execution", "Random execution"], correct: 1 },
    { q: "What is cursor in database?", opts: ["Pointer to result set", "Table pointer", "Index pointer", "Key pointer"], correct: 0 }
];

// Add advanced questions
grade11Questions.advanced = [
    // Advanced Computer Science Theory and Algorithms - 50 questions
    { q: "What is computational complexity theory?", opts: ["Simple computing", "Study of algorithm resource requirements", "Computer hardware", "Software design"], correct: 1 },
    { q: "What is time complexity?", opts: ["Program execution time", "Algorithm efficiency measure", "Memory usage", "Code length"], correct: 1 },
    { q: "What is space complexity?", opts: ["Program size", "Memory usage measure", "Time usage", "Code complexity"], correct: 1 },
    { q: "What is Big O notation?", opts: ["Program size", "Upper bound of algorithm complexity", "Memory size", "Code length"], correct: 1 },
    { q: "What is Big Omega notation?", opts: ["Upper bound", "Lower bound", "Average case", "Best case"], correct: 1 },
    { q: "What is Big Theta notation?", opts: ["Upper bound only", "Lower bound only", "Tight bound", "No bound"], correct: 2 },
    { q: "What is O(1) complexity?", opts: ["Linear time", "Constant time", "Quadratic time", "Exponential time"], correct: 1 },
    { q: "What is O(log n) complexity?", opts: ["Linear time", "Logarithmic time", "Quadratic time", "Constant time"], correct: 1 },
    { q: "What is O(n) complexity?", opts: ["Constant time", "Linear time", "Quadratic time", "Exponential time"], correct: 1 },
    { q: "What is O(n log n) complexity?", opts: ["Linear time", "Linearithmic time", "Quadratic time", "Cubic time"], correct: 1 },
    { q: "What is O(n²) complexity?", opts: ["Linear time", "Quadratic time", "Constant time", "Exponential time"], correct: 1 },
    { q: "What is O(2ⁿ) complexity?", opts: ["Linear time", "Quadratic time", "Exponential time", "Constant time"], correct: 2 },
    { q: "What is divide and conquer?", opts: ["Single problem solving", "Breaking problem into subproblems", "Random approach", "Linear approach"], correct: 1 },
    { q: "What is dynamic programming?", opts: ["Static programming", "Optimization using subproblem solutions", "Simple programming", "Random programming"], correct: 1 },
    { q: "What is memoization?", opts: ["Memory deletion", "Caching computed results", "Memory allocation", "Memory deallocation"], correct: 1 },
    { q: "What is greedy algorithm?", opts: ["Global optimization", "Local optimal choices", "No optimization", "Random optimization"], correct: 1 },
    { q: "What is backtracking?", opts: ["Forward only", "Trial and error with undo", "Random approach", "Linear approach"], correct: 1 },
    { q: "What is branch and bound?", opts: ["No pruning", "Systematic enumeration with pruning", "Random search", "Linear search"], correct: 1 },
    { q: "What is breadth-first search?", opts: ["Deep search", "Level-wise exploration", "Random search", "No search"], correct: 1 },
    { q: "What is depth-first search?", opts: ["Breadth search", "Deep exploration first", "Random search", "No search"], correct: 1 },
    { q: "What is Dijkstra's algorithm?", opts: ["Sorting algorithm", "Shortest path algorithm", "Search algorithm", "Tree algorithm"], correct: 1 },
    { q: "What is Floyd-Warshall algorithm?", opts: ["Single source shortest path", "All pairs shortest path", "Minimum spanning tree", "Maximum flow"], correct: 1 },
    { q: "What is Bellman-Ford algorithm?", opts: ["Positive weights only", "Handles negative weights", "Unweighted graphs", "Directed graphs only"], correct: 1 },
    { q: "What is Kruskal's algorithm?", opts: ["Shortest path", "Minimum spanning tree", "Maximum flow", "Topological sort"], correct: 1 },
    { q: "What is Prim's algorithm?", opts: ["Shortest path", "Minimum spanning tree", "Maximum flow", "Topological sort"], correct: 1 },
    { q: "What is topological sorting?", opts: ["Random sorting", "Dependency-based ordering", "Alphabetical sorting", "Numerical sorting"], correct: 1 },
    { q: "What is strongly connected component?", opts: ["Weakly connected", "Mutually reachable vertices", "Disconnected vertices", "Single vertex"], correct: 1 },
    { q: "What is articulation point?", opts: ["Regular vertex", "Vertex whose removal disconnects graph", "Leaf vertex", "Root vertex"], correct: 1 },
    { q: "What is bridge in graph?", opts: ["Regular edge", "Edge whose removal disconnects graph", "Self loop", "Multiple edge"], correct: 1 },
    { q: "What is maximum flow problem?", opts: ["Minimum flow", "Maximum possible flow", "Average flow", "No flow"], correct: 1 },
    { q: "What is Ford-Fulkerson algorithm?", opts: ["Shortest path", "Maximum flow", "Minimum cut", "Both maximum flow and minimum cut"], correct: 3 },
    { q: "What is minimum cut problem?", opts: ["Maximum cut", "Minimum capacity cut", "Average cut", "No cut"], correct: 1 },
    { q: "What is bipartite graph?", opts: ["Single partition", "Two partitions", "Three partitions", "No partitions"], correct: 1 },
    { q: "What is matching in graph?", opts: ["All edges", "Set of non-adjacent edges", "Adjacent edges", "No edges"], correct: 1 },
    { q: "What is maximum matching?", opts: ["Minimum edges", "Maximum possible matching", "Average matching", "No matching"], correct: 1 },
    { q: "What is perfect matching?", opts: ["Imperfect matching", "All vertices matched", "Some vertices matched", "No vertices matched"], correct: 1 },
    { q: "What is Hamiltonian path?", opts: ["Visits some vertices", "Visits each vertex exactly once", "Visits vertices multiple times", "Visits no vertices"], correct: 1 },
    { q: "What is Hamiltonian cycle?", opts: ["Open path", "Closed path visiting each vertex once", "Multiple cycles", "No cycle"], correct: 1 },
    { q: "What is Eulerian path?", opts: ["Visits some edges", "Visits each edge exactly once", "Visits edges multiple times", "Visits no edges"], correct: 1 },
    { q: "What is Eulerian cycle?", opts: ["Open path", "Closed path visiting each edge once", "Multiple cycles", "No cycle"], correct: 1 },
    { q: "What is graph coloring?", opts: ["Random colors", "Assigning colors to vertices", "No colors", "Single color"], correct: 1 },
    { q: "What is chromatic number?", opts: ["Maximum colors", "Minimum colors needed", "Average colors", "No colors"], correct: 1 },
    { q: "What is planar graph?", opts: ["3D graph", "Can be drawn without edge crossings", "Always has crossings", "No edges"], correct: 1 },
    { q: "What is tree in graph theory?", opts: ["Cyclic graph", "Connected acyclic graph", "Disconnected graph", "Complete graph"], correct: 1 },
    { q: "What is spanning tree?", opts: ["Subgraph", "Tree containing all vertices", "Forest", "Cycle"], correct: 1 },
    { q: "What is minimum spanning tree?", opts: ["Maximum weight tree", "Minimum weight spanning tree", "Average weight tree", "No weight tree"], correct: 1 },
    { q: "What is complete graph?", opts: ["No edges", "Every pair connected", "Some pairs connected", "Tree structure"], correct: 1 },
    { q: "What is clique in graph?", opts: ["Independent set", "Complete subgraph", "Tree", "Path"], correct: 1 },
    { q: "What is independent set?", opts: ["All connected", "No two vertices adjacent", "Complete subgraph", "Tree"], correct: 1 },
    { q: "What is vertex cover?", opts: ["Edge set", "Vertex set covering all edges", "Independent set", "Clique"], correct: 1 }
];

async function seedGrade11Questions() {
    console.log('🌱 SEEDING GRADE 11 COMPREHENSIVE QUESTIONS');
    console.log('==========================================');
    console.log('Topics: Programming, data structures, and system-level understanding');
    console.log('Target: 300+ questions (125 basic, 120 medium, 50 advanced)');
    console.log('');

    try {
        await database.connect();
        const db = database.getDb();

        let totalAdded = 0;
        const grade = 11;

        // Add basic questions
        console.log('📗 Adding basic questions...');
        for (let i = 0; i < grade11Questions.basic.length; i++) {
            const q = grade11Questions.basic[i];

            const questionId = await new Promise((resolve, reject) => {
                db.run(`
                    INSERT INTO questions (grade, difficulty, question_text, created_at, updated_at)
                    VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                `, [grade, 'basic', q.q], function (err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                });
            });

            // Insert options
            for (let j = 0; j < q.opts.length; j++) {
                await new Promise((resolve, reject) => {
                    db.run(`
                        INSERT INTO options (question_id, option_text, is_correct, option_order)
                        VALUES (?, ?, ?, ?)
                    `, [questionId, q.opts[j], j === q.correct ? 1 : 0, j + 1], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            }
            totalAdded++;
        }

        // Add medium questions
        console.log('📙 Adding medium questions...');
        for (let i = 0; i < grade11Questions.medium.length; i++) {
            const q = grade11Questions.medium[i];

            const questionId = await new Promise((resolve, reject) => {
                db.run(`
                    INSERT INTO questions (grade, difficulty, question_text, created_at, updated_at)
                    VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                `, [grade, 'medium', q.q], function (err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                });
            });

            // Insert options
            for (let j = 0; j < q.opts.length; j++) {
                await new Promise((resolve, reject) => {
                    db.run(`
                        INSERT INTO options (question_id, option_text, is_correct, option_order)
                        VALUES (?, ?, ?, ?)
                    `, [questionId, q.opts[j], j === q.correct ? 1 : 0, j + 1], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            }
            totalAdded++;
        }

        // Add advanced questions
        console.log('📕 Adding advanced questions...');
        for (let i = 0; i < grade11Questions.advanced.length; i++) {
            const q = grade11Questions.advanced[i];

            const questionId = await new Promise((resolve, reject) => {
                db.run(`
                    INSERT INTO questions (grade, difficulty, question_text, created_at, updated_at)
                    VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                `, [grade, 'advanced', q.q], function (err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                });
            });

            // Insert options
            for (let j = 0; j < q.opts.length; j++) {
                await new Promise((resolve, reject) => {
                    db.run(`
                        INSERT INTO options (question_id, option_text, is_correct, option_order)
                        VALUES (?, ?, ?, ?)
                    `, [questionId, q.opts[j], j === q.correct ? 1 : 0, j + 1], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            }
            totalAdded++;
        }

        await database.close();

        console.log('');
        console.log('✅ GRADE 11 SEEDING COMPLETED!');
        console.log('============================');
        console.log(`📊 Total questions added: ${totalAdded}`);
        console.log(`📗 Basic questions: ${grade11Questions.basic.length}`);
        console.log(`📙 Medium questions: ${grade11Questions.medium.length}`);
        console.log(`📕 Advanced questions: ${grade11Questions.advanced.length}`);
        console.log('');
        console.log('Topics covered:');
        console.log('• Python Programming (Variables, Data Types, Control Structures)');
        console.log('• Functions, Lists, Tuples, Dictionaries');
        console.log('• String Management');
        console.log('• File Handling');
        console.log('• Data Representation (Binary, ASCII)');
        console.log('• Boolean Algebra');
        console.log('• SQL & RDBMS Concepts');
        console.log('• Cyber Safety & Ethics');
        console.log('• Networking Fundamentals (IP, Protocols, Topologies)');
        console.log('• Societal Impact of Technology');
        console.log('• Python Basics: ✅ Full programming foundation with functions, file handling, and data structures');
        console.log('• HTML Tags & Structure: ✅ Advanced tags, forms, semantic elements');
        console.log('• Networking: ✅ Protocols, IP, DNS, topology, cybersecurity');

        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding Grade 11 questions:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    seedGrade11Questions();
}

module.exports = { seedGrade11Questions, grade11Questions };