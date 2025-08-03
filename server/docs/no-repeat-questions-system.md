# No-Repeat Questions System

## Overview

The TECH BOARD 2025 MCQ Testing System now implements a comprehensive **no-repeat questions** rule that ensures no question will ever be repeated across any test in the system.

## How It Works

### 1. Global Question Tracking
- A new `used_questions` table tracks every question that has been used in any test
- Once a question is used, it's marked globally and cannot appear in future tests
- This applies across all students and all test sessions

### 2. Enhanced Question Selection Algorithm
The quiz selection algorithm now:
- Checks for globally used questions before selection
- Excludes all previously used questions from the selection pool
- Maintains the difficulty distribution (60% basic, 30% medium, 10% advanced)
- Ensures sufficient unused questions are available before creating a test

### 3. Automatic Question Marking
- Questions are automatically marked as "used" when a quiz is created
- A database trigger ensures questions are tracked even if the manual marking fails
- The system prevents any possibility of question repetition

## Database Schema

### New Table: `used_questions`
```sql
CREATE TABLE used_questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id INTEGER NOT NULL,
    grade INTEGER NOT NULL,
    used_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    quiz_id INTEGER,
    student_id INTEGER,
    UNIQUE(question_id) -- Ensures each question can only be used once globally
);
```

### Automatic Trigger
```sql
CREATE TRIGGER mark_question_as_used
    AFTER INSERT ON responses
    FOR EACH ROW
BEGIN
    INSERT OR IGNORE INTO used_questions (question_id, grade, quiz_id, student_id)
    SELECT NEW.question_id, q.grade, NEW.quiz_id, qz.student_id
    FROM questions q
    JOIN quizzes qz ON qz.id = NEW.quiz_id
    WHERE q.id = NEW.question_id;
END;
```

## Question Availability

### Current Status (Fresh System)
- **Grade 6**: 200 questions → 8 possible tests (25 questions each)
- **Grade 7**: 200 questions → 8 possible tests
- **Grade 8**: 200 questions → 8 possible tests  
- **Grade 9**: 200 questions → 8 possible tests
- **Grade 11**: 300 questions → 12 possible tests

### Difficulty Distribution
Each grade has questions distributed across difficulties:
- **Basic**: 60% of questions (15 per test)
- **Medium**: 30% of questions (7 per test)
- **Advanced**: 10% of questions (3 per test)

## Management Scripts

### 1. Check Question Usage
```bash
node server/scripts/check-question-usage.js
```
**Purpose**: Monitor question usage statistics
**Shows**:
- Total vs used questions by grade
- Remaining questions and possible tests
- Usage by difficulty level
- Recent quiz activity
- Warnings for grades running low on questions

### 2. Reset Used Questions (Emergency Only)
```bash
node server/scripts/reset-used-questions.js
```
**Purpose**: Reset the entire used questions system
**Warning**: This allows questions to be repeated again
**Use Case**: Testing, maintenance, or system reset

### 3. Apply No-Repeat Schema
```bash
node server/scripts/apply-no-repeat-schema.js
```
**Purpose**: Set up the no-repeat system on existing databases
**Note**: Already applied to current system

## Error Handling

### Insufficient Questions
If there aren't enough unused questions for a grade:
```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_QUESTIONS",
    "message": "Insufficient unused questions for Grade 8. Need 25, but only 10 unused questions available."
  }
}
```

### System Behavior
- The system will **refuse** to create a test if insufficient unused questions exist
- This prevents any possibility of question repetition
- Admins will be warned when grades are running low on questions

## Benefits

### 1. **Absolute Fairness**
- No student will ever see a question that another student has seen
- Eliminates any advantage from question familiarity
- Ensures true assessment of knowledge

### 2. **Security**
- Prevents question leakage between test sessions
- Makes it impossible for students to share specific questions
- Maintains test integrity over time

### 3. **Scalability**
- System automatically manages question pools
- Provides clear visibility into remaining question capacity
- Warns administrators before running out of questions

## Monitoring & Maintenance

### Regular Monitoring
- Run `check-question-usage.js` regularly to monitor question consumption
- Watch for grades approaching low question counts
- Plan question additions before pools are exhausted

### Adding New Questions
- New questions automatically become available for selection
- No special configuration needed
- System will use new questions in future tests

### Emergency Procedures
- If question pools are exhausted, add more questions to the database
- In extreme cases, use `reset-used-questions.js` to allow repetition
- Always backup the database before major operations

## Technical Implementation

### Quiz Selection Flow
1. **Check Available Questions**: Count unused questions by difficulty
2. **Validate Sufficiency**: Ensure enough questions exist for a full test
3. **Select Questions**: Choose questions excluding all globally used ones
4. **Mark as Used**: Immediately mark selected questions as used
5. **Create Quiz**: Generate the quiz with guaranteed unique questions

### Performance Considerations
- Indexed queries for fast question selection
- Efficient exclusion of used questions
- Minimal impact on quiz generation speed

## Conclusion

The no-repeat questions system ensures the highest level of fairness and security for the TECH BOARD 2025 selection process. Every student receives a completely unique set of questions, maintaining the integrity and validity of the assessment process.