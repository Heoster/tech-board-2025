-- Add topic/category field to questions table for better filtering
ALTER TABLE questions ADD COLUMN topic VARCHAR(100) DEFAULT 'computer';
ALTER TABLE questions ADD COLUMN category VARCHAR(50) DEFAULT 'general';

-- Create index for better performance on topic filtering
CREATE INDEX IF NOT EXISTS idx_questions_topic ON questions(topic);
CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category);

-- Update existing questions to have computer-related topics
-- This will categorize all existing questions as computer-related
UPDATE questions SET 
    topic = 'computer',
    category = CASE 
        WHEN question_text LIKE '%hardware%' OR question_text LIKE '%CPU%' OR question_text LIKE '%RAM%' OR question_text LIKE '%storage%' THEN 'hardware'
        WHEN question_text LIKE '%software%' OR question_text LIKE '%application%' OR question_text LIKE '%program%' THEN 'software'
        WHEN question_text LIKE '%network%' OR question_text LIKE '%internet%' OR question_text LIKE '%online%' THEN 'networking'
        WHEN question_text LIKE '%programming%' OR question_text LIKE '%code%' OR question_text LIKE '%algorithm%' THEN 'programming'
        WHEN question_text LIKE '%operating system%' OR question_text LIKE '%Windows%' OR question_text LIKE '%Linux%' THEN 'operating_systems'
        WHEN question_text LIKE '%database%' OR question_text LIKE '%data%' OR question_text LIKE '%file%' THEN 'data_management'
        WHEN question_text LIKE '%security%' OR question_text LIKE '%cyber%' OR question_text LIKE '%safety%' THEN 'security'
        WHEN question_text LIKE '%digital%' OR question_text LIKE '%technology%' OR question_text LIKE '%IT%' THEN 'digital_literacy'
        ELSE 'general_computer'
    END
WHERE topic IS NULL OR topic = 'computer';