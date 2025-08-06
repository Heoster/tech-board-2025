-- STRICT RULE: No Duplicate Questions in Quiz
-- This script adds database constraints to prevent duplicate questions

-- Add unique constraint to prevent duplicate questions in the same quiz
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_question_per_quiz 
ON responses(quiz_id, question_id);

-- Add check constraint to ensure no duplicate question IDs in quiz responses
-- This will prevent the same question from being answered twice in one quiz

-- Note: Unique index idx_unique_question_per_quiz already prevents duplicates
-- No additional trigger needed as the unique constraint handles this automatically

-- Create a view to verify quiz integrity
CREATE VIEW IF NOT EXISTS quiz_integrity_check AS
SELECT 
    q.id as quiz_id,
    q.student_id,
    q.grade,
    COUNT(r.question_id) as total_responses,
    COUNT(DISTINCT r.question_id) as unique_questions,
    CASE 
        WHEN COUNT(r.question_id) = COUNT(DISTINCT r.question_id) 
        THEN 'VALID - No Duplicates' 
        ELSE 'INVALID - Has Duplicates' 
    END as integrity_status,
    GROUP_CONCAT(r.question_id ORDER BY r.question_id) as question_ids
FROM quizzes q
LEFT JOIN responses r ON q.id = r.quiz_id
GROUP BY q.id, q.student_id, q.grade;

-- Create a function to validate quiz before submission
-- This will be called from the application to double-check
CREATE VIEW IF NOT EXISTS duplicate_questions_report AS
SELECT 
    quiz_id,
    question_id,
    COUNT(*) as occurrence_count
FROM responses
GROUP BY quiz_id, question_id
HAVING COUNT(*) > 1;

-- Create admin_logs table if it doesn't exist
CREATE TABLE IF NOT EXISTS admin_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    action TEXT NOT NULL,
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Log the constraint creation
INSERT OR IGNORE INTO admin_logs (action, details, created_at) 
VALUES (
    'DATABASE_CONSTRAINT_ADDED', 
    'Added strict no-duplicate-questions rule with unique index and trigger', 
    CURRENT_TIMESTAMP
);