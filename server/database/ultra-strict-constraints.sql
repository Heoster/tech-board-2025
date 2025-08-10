-- Ultra-strict constraints to prevent any question repetition
-- These constraints work at the database level as a final safety net
-- Ensure no duplicate responses for the same question in the same quiz
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_quiz_question_response ON responses(quiz_id, question_id);
-- Note: SQLite doesn't support subqueries in indexes
-- Student-question uniqueness will be enforced by triggers and application logic
-- Additional constraint: Ensure quiz has exactly the expected number of questions
-- This will be enforced by application logic, but we can add a trigger
-- Trigger to validate quiz completion
CREATE TRIGGER IF NOT EXISTS validate_quiz_completion
AFTER UPDATE ON quizzes
WHEN NEW.status = 'completed'
BEGIN
    -- Check if quiz has exactly the expected number of responses
    SELECT CASE
        WHEN (
            SELECT COUNT(*)
            FROM responses
            WHERE quiz_id = NEW.id
        ) != NEW.total_questions THEN RAISE(
            ABORT,
            'Quiz must have expected number of responses'
        )
    END;
    -- Check for duplicate questions in the quiz
    SELECT CASE
        WHEN (
            SELECT COUNT(DISTINCT question_id)
            FROM responses
            WHERE quiz_id = NEW.id
        ) != NEW.total_questions THEN RAISE(ABORT, 'Quiz contains duplicate questions')
    END;
END;
-- Trigger to prevent duplicate question selection during quiz creation
CREATE TRIGGER IF NOT EXISTS prevent_duplicate_questions
BEFORE INSERT ON responses
BEGIN
    -- Check if this question was already answered by this student
    SELECT CASE
        WHEN EXISTS (
            SELECT 1
            FROM responses r
            JOIN quizzes q ON r.quiz_id = q.id
            WHERE r.question_id = NEW.question_id
                AND q.student_id = (
                    SELECT student_id
                    FROM quizzes
                    WHERE id = NEW.quiz_id
                )
        ) THEN RAISE(
            ABORT,
            'Student has already answered this question in a previous quiz'
        )
    END;
    -- Check if this question is already in the current quiz
    SELECT CASE
        WHEN EXISTS (
            SELECT 1
            FROM responses
            WHERE quiz_id = NEW.quiz_id
                AND question_id = NEW.question_id
        ) THEN RAISE(ABORT, 'Question already exists in this quiz')
    END;
END;
-- Index for performance optimization
CREATE INDEX IF NOT EXISTS idx_student_quiz_lookup ON quizzes(student_id, grade, status);
CREATE INDEX IF NOT EXISTS idx_response_question_lookup ON responses(question_id, quiz_id);
-- View to easily check for any constraint violations
CREATE VIEW IF NOT EXISTS quiz_integrity_check AS
SELECT q.id as quiz_id,
    q.student_id,
    q.grade,
    q.status,
    COUNT(r.id) as total_responses,
    COUNT(DISTINCT r.question_id) as unique_questions,
    CASE
        WHEN COUNT(r.id) != COUNT(DISTINCT r.question_id) THEN 'DUPLICATE_QUESTIONS'
        WHEN COUNT(r.id) != q.total_questions
        AND q.status = 'completed' THEN 'WRONG_QUESTION_COUNT'
        ELSE 'OK'
    END as integrity_status
FROM quizzes q
    LEFT JOIN responses r ON q.id = r.quiz_id
GROUP BY q.id,
    q.student_id,
    q.grade,
    q.status;
-- View to check cross-quiz question repetition for students
CREATE VIEW IF NOT EXISTS student_question_usage AS
SELECT s.id as student_id,
    s.name,
    s.grade,
    r.question_id,
    COUNT(*) as times_answered,
    GROUP_CONCAT(q.id) as quiz_ids,
    CASE
        WHEN COUNT(*) > 1 THEN 'VIOLATION'
        ELSE 'OK'
    END as repetition_status
FROM students s
    JOIN quizzes q ON s.id = q.student_id
    JOIN responses r ON q.id = r.quiz_id
GROUP BY s.id,
    s.name,
    s.grade,
    r.question_id
HAVING COUNT(*) > 1;
-- Function to get available questions for a student (excluding used ones)
-- This is a view that can be used by the application
CREATE VIEW IF NOT EXISTS available_questions_per_student AS
SELECT s.id as student_id,
    s.grade,
    q.id as question_id,
    q.difficulty,
    q.question_text,
    CASE
        WHEN used_q.question_id IS NULL THEN 'AVAILABLE'
        ELSE 'USED'
    END as availability_status
FROM students s
    CROSS JOIN questions q ON s.grade = q.grade
    LEFT JOIN (
        SELECT DISTINCT qz.student_id,
            r.question_id
        FROM quizzes qz
            JOIN responses r ON qz.id = r.quiz_id
    ) used_q ON s.id = used_q.student_id
    AND q.id = used_q.question_id
WHERE used_q.question_id IS NULL;
-- Maintenance query to check system integrity
-- Run this periodically to ensure no violations exist
CREATE VIEW IF NOT EXISTS system_integrity_report AS
SELECT 'QUIZ_INTEGRITY' as check_type,
    COUNT(*) as violation_count,
    'Quizzes with duplicate questions or wrong question count' as description
FROM quiz_integrity_check
WHERE integrity_status != 'OK'
UNION ALL
SELECT 'STUDENT_REPETITION' as check_type,
    COUNT(*) as violation_count,
    'Students who answered the same question multiple times' as description
FROM student_question_usage
WHERE repetition_status = 'VIOLATION'
UNION ALL
SELECT 'RESPONSE_COUNT' as check_type,
    COUNT(*) as violation_count,
    'Completed quizzes without expected number of responses' as description
FROM quizzes q
WHERE q.status = 'completed'
    AND (
        SELECT COUNT(*)
        FROM responses
        WHERE quiz_id = q.id
    ) != q.total_questions;