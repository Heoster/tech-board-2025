-- Add unique constraint to prevent duplicate questions
-- This ensures no two questions can have the same text for the same grade and difficulty

-- First, let's create a new table with the unique constraint
CREATE TABLE IF NOT EXISTS questions_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    grade INTEGER NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('basic', 'medium', 'advanced')),
    question_text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(grade, question_text, difficulty)
);

-- Copy data from old table to new table (this will fail if duplicates exist)
INSERT INTO questions_new (id, grade, difficulty, question_text, created_at, updated_at)
SELECT id, grade, difficulty, question_text, created_at, updated_at
FROM questions;

-- Drop the old table
DROP TABLE questions;

-- Rename the new table
ALTER TABLE questions_new RENAME TO questions;

-- Recreate the foreign key constraint for options table
-- Note: SQLite doesn't support adding foreign key constraints to existing tables,
-- so we need to recreate the options table as well

CREATE TABLE IF NOT EXISTS options_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id INTEGER NOT NULL,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT 0,
    option_order INTEGER DEFAULT 1,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- Copy options data
INSERT INTO options_new (id, question_id, option_text, is_correct, option_order)
SELECT id, question_id, option_text, is_correct, option_order
FROM options;

-- Drop old options table and rename new one
DROP TABLE options;
ALTER TABLE options_new RENAME TO options;