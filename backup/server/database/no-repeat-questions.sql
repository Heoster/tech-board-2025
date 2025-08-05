-- Add table to track used questions globally to prevent repetition
CREATE TABLE IF NOT EXISTS used_questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id INTEGER NOT NULL,
    grade INTEGER NOT NULL,
    used_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    quiz_id INTEGER,
    student_id INTEGER,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    UNIQUE(question_id) -- Ensures each question can only be used once globally
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_used_questions_grade ON used_questions(grade);
CREATE INDEX IF NOT EXISTS idx_used_questions_question_id ON used_questions(question_id);

-- Add trigger to automatically mark questions as used when they appear in responses
CREATE TRIGGER IF NOT EXISTS mark_question_as_used
    AFTER INSERT ON responses
    FOR EACH ROW
    WHEN NEW.question_id IS NOT NULL
BEGIN
    INSERT OR IGNORE INTO used_questions (question_id, grade, quiz_id, student_id)
    SELECT NEW.question_id, q.grade, NEW.quiz_id, qz.student_id
    FROM questions q
    JOIN quizzes qz ON qz.id = NEW.quiz_id
    WHERE q.id = NEW.question_id;
END;