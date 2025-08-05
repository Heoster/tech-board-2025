-- TECHNO BOARD Database Rules
-- =================================

-- RULE 1: Grade Structure
-- Every grade has exactly two sections (A and B)
-- Allowed grades: 6, 7, 8, 9, 11 (not 10 and 12)

-- RULE 2: Roll Number Structure  
-- Each section has roll numbers from 1 to 80
-- This means each grade can have maximum 160 students (80 per section)

-- RULE 3: Student Identification Format
-- Student ID format: Grade-Section-RollNumber
-- Example: 7-A-25 (Grade 7, Section A, Roll Number 25)

-- Create a view to validate the student structure
CREATE VIEW IF NOT EXISTS student_structure_validation AS
SELECT 
    grade,
    section,
    COUNT(*) as student_count,
    MIN(roll_number) as min_roll,
    MAX(roll_number) as max_roll,
    CASE 
        WHEN COUNT(*) > 80 THEN 'VIOLATION: Too many students in section'
        WHEN MIN(roll_number) < 1 THEN 'VIOLATION: Roll number below minimum'
        WHEN MAX(roll_number) > 80 THEN 'VIOLATION: Roll number above maximum'
        ELSE 'COMPLIANT'
    END as rule_status
FROM students 
GROUP BY grade, section
ORDER BY grade, section;

-- Create a trigger to enforce roll number rules on INSERT
CREATE TRIGGER IF NOT EXISTS enforce_roll_number_rules_insert
BEFORE INSERT ON students
FOR EACH ROW
BEGIN
    -- Check if grade is allowed
    SELECT CASE 
        WHEN NEW.grade NOT IN (1, 6, 7, 8, 9, 11) THEN
            RAISE(ABORT, 'RULE VIOLATION: Grade must be 1, 6, 7, 8, 9, or 11')
    END;
    
    -- Check if roll number is within valid range
    SELECT CASE 
        WHEN NEW.roll_number < 1 OR NEW.roll_number > 80 THEN
            RAISE(ABORT, 'RULE VIOLATION: Roll number must be between 1 and 80')
    END;
    
    -- Check if section is valid
    SELECT CASE 
        WHEN NEW.section NOT IN ('A', 'B') THEN
            RAISE(ABORT, 'RULE VIOLATION: Section must be A or B')
    END;
    
    -- Check if this would exceed the 80 students per section limit
    SELECT CASE 
        WHEN (SELECT COUNT(*) FROM students WHERE grade = NEW.grade AND section = NEW.section) >= 80 THEN
            RAISE(ABORT, 'RULE VIOLATION: Section already has maximum 80 students')
    END;
END;

-- Create a trigger to enforce roll number rules on UPDATE
CREATE TRIGGER IF NOT EXISTS enforce_roll_number_rules_update
BEFORE UPDATE ON students
FOR EACH ROW
BEGIN
    -- Check if grade is allowed
    SELECT CASE 
        WHEN NEW.grade NOT IN (1, 6, 7, 8, 9, 11) THEN
            RAISE(ABORT, 'RULE VIOLATION: Grade must be 1, 6, 7, 8, 9, or 11')
    END;
    
    -- Check if roll number is within valid range
    SELECT CASE 
        WHEN NEW.roll_number < 1 OR NEW.roll_number > 80 THEN
            RAISE(ABORT, 'RULE VIOLATION: Roll number must be between 1 and 80')
    END;
    
    -- Check if section is valid
    SELECT CASE 
        WHEN NEW.section NOT IN ('A', 'B') THEN
            RAISE(ABORT, 'RULE VIOLATION: Section must be A or B')
    END;
END;

-- Function to get next available roll number for a grade-section combination
-- This is implemented as a view since SQLite doesn't support stored procedures
CREATE VIEW IF NOT EXISTS next_available_roll_numbers AS
SELECT 
    g.grade,
    s.section,
    COALESCE(
        (SELECT MIN(r.roll_number) 
         FROM (SELECT DISTINCT roll_number FROM students WHERE grade = g.grade AND section = s.section) r
         WHERE r.roll_number NOT IN (
             SELECT roll_number FROM students WHERE grade = g.grade AND section = s.section
         ) AND r.roll_number <= 80),
        CASE 
            WHEN (SELECT COUNT(*) FROM students WHERE grade = g.grade AND section = s.section) < 80 
            THEN (SELECT COALESCE(MAX(roll_number), 0) + 1 FROM students WHERE grade = g.grade AND section = s.section)
            ELSE NULL 
        END
    ) as next_roll_number
FROM 
    (SELECT 1 as grade UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 11) g
CROSS JOIN 
    (SELECT 'A' as section UNION SELECT 'B') s;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_students_grade_section_roll ON students(grade, section, roll_number);
CREATE INDEX IF NOT EXISTS idx_questions_grade ON questions(grade);

-- Insert rule documentation
CREATE TABLE IF NOT EXISTS database_rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rule_name VARCHAR(100) NOT NULL,
    rule_description TEXT NOT NULL,
    rule_type VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT OR REPLACE INTO database_rules (id, rule_name, rule_description, rule_type) VALUES
(1, 'Grade Structure', 'Only grades 1, 6, 7, 8, 9, and 11 are allowed. Grades 2-5, 10 and 12 are excluded.', 'CONSTRAINT'),
(2, 'Section Structure', 'Each grade must have exactly two sections: A and B.', 'BUSINESS_RULE'),
(3, 'Roll Number Range', 'Roll numbers must be between 1 and 80 for each section.', 'CONSTRAINT'),
(4, 'Section Capacity', 'Each section can have maximum 80 students.', 'BUSINESS_RULE'),
(5, 'Student Uniqueness', 'Each combination of grade, section, and roll number must be unique.', 'CONSTRAINT');

-- Create a function to validate database compliance
CREATE VIEW IF NOT EXISTS database_compliance_report AS
SELECT 
    'Grade Distribution' as check_type,
    COUNT(DISTINCT grade) as actual_count,
    6 as expected_count,
    CASE WHEN COUNT(DISTINCT grade) = 6 THEN 'PASS' ELSE 'FAIL' END as status,
    'Should have exactly 6 grades (1,6,7,8,9,11)' as description
FROM students
WHERE grade IN (6, 7, 8, 9, 11)

UNION ALL

SELECT 
    'Section Distribution' as check_type,
    COUNT(DISTINCT grade || '-' || section) as actual_count,
    12 as expected_count,
    CASE WHEN COUNT(DISTINCT grade || '-' || section) <= 12 THEN 'PASS' ELSE 'FAIL' END as status,
    'Should have maximum 12 grade-section combinations' as description
FROM students

UNION ALL

SELECT 
    'Roll Number Compliance' as check_type,
    COUNT(*) as actual_count,
    COUNT(*) as expected_count,
    CASE 
        WHEN MIN(roll_number) >= 1 AND MAX(roll_number) <= 80 THEN 'PASS' 
        ELSE 'FAIL' 
    END as status,
    'All roll numbers should be between 1 and 80' as description
FROM students;