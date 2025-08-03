# Requirements Document

## Introduction

The TECH BOARD 2025 Selection Test System is a web-based application designed to conduct selection tests for students applying to join TECH BOARD 2025. The system provides 25 random multiple-choice questions in a 30-minute time limit. Students must register with their personal details (name, class, section, roll number) and pass the test by answering at least 18 out of 25 questions correctly. Students cannot view their results - only administrators can access student performance data. Each student can attempt the test only once per identity, with unique roll numbers per section (1-80 for sections A and B).

## Requirements

### Requirement 1

**User Story:** As a student, I want to register and login with my personal information, so that I can attempt the TECH BOARD 2025 selection test.

#### Acceptance Criteria

1. WHEN a student accesses the registration page THEN the system SHALL display fields for name, class/grade (6, 7, 8, 9, 11), section (A or B), roll number (1-80), and password
2. WHEN a student submits registration information THEN the system SHALL validate that the roll number is unique within the class and section
3. WHEN a student submits valid registration information THEN the system SHALL create a new student account and automatically log them in
4. WHEN a student logs in THEN the system SHALL authenticate using class, section, roll number, and password
5. IF a student enters invalid credentials THEN the system SHALL display an appropriate error message
6. IF a roll number already exists in the same class and section THEN the system SHALL reject registration with an error message

### Requirement 2

**User Story:** As a student, I want to take the TECH BOARD 2025 selection test with 25 random questions in 30 minutes, so that I can attempt to qualify for TECH BOARD membership.

#### Acceptance Criteria

1. WHEN a logged-in student starts the test THEN the system SHALL present exactly 25 randomly selected multiple-choice questions appropriate for their grade level
2. WHEN a student is taking the test THEN the system SHALL display a 30-minute countdown timer and progress indicator showing current question number out of 25
3. WHEN the 30-minute timer expires THEN the system SHALL automatically submit the test regardless of completion status
4. WHEN a student selects an answer THEN the system SHALL allow them to navigate between questions and change answers before final submission
5. WHEN a student completes the test THEN the system SHALL allow them to submit for scoring
6. WHEN a student submits the test THEN the system SHALL prevent any further attempts with the same identity

### Requirement 3

**User Story:** As a student, I want to know that my test has been submitted successfully, so that I can be confident my attempt was recorded.

#### Acceptance Criteria

1. WHEN a student submits their test THEN the system SHALL display a confirmation message that the test was submitted successfully
2. WHEN a student completes the test THEN the system SHALL NOT display their score, results, or correct answers
3. WHEN a student submits the test THEN the system SHALL calculate their score internally and determine pass/fail status (18+ correct answers = pass)
4. WHEN a student attempts to access the test again THEN the system SHALL prevent re-attempts and display a message that they have already completed the test
5. WHEN test results are calculated THEN the system SHALL store all attempt data including answers, score, and pass/fail status for admin review only

### Requirement 4

**User Story:** As an administrator, I want to manage the question bank for TECH BOARD 2025 selection, so that students receive appropriate technical questions for their grade level.

#### Acceptance Criteria

1. WHEN an administrator logs in THEN the system SHALL provide access to question management features
2. WHEN an administrator adds a new question THEN the system SHALL require grade level (6, 7, 8, 9, 11), difficulty level, question text, and four answer options with one marked as correct
3. WHEN the system selects questions for a test THEN it SHALL randomly choose 25 questions appropriate for the student's grade level
4. WHEN an administrator edits or deletes questions THEN the system SHALL update the question bank accordingly
5. WHEN questions are selected for tests THEN the system SHALL ensure sufficient questions exist for each grade level to support random selection

### Requirement 5

**User Story:** As an administrator, I want to view all student test results and their detailed responses, so that I can evaluate TECH BOARD 2025 candidates and make selection decisions.

#### Acceptance Criteria

1. WHEN an administrator accesses the results dashboard THEN the system SHALL display a list of all test attempts with student information (name, class, section, roll number), scores, and pass/fail status
2. WHEN an administrator views results THEN the system SHALL allow filtering by grade, section, pass/fail status, date range, and student name
3. WHEN an administrator views individual student results THEN the system SHALL show detailed question-by-question responses and correct answers
4. WHEN an administrator views aggregate data THEN the system SHALL display statistics such as pass rates by grade/section and question performance analysis
5. WHEN an administrator exports results THEN the system SHALL provide comprehensive data in downloadable format including all student responses
6. WHEN students attempt to view results THEN the system SHALL deny access and redirect them appropriately

### Requirement 6

**User Story:** As a system, I want to ensure data integrity and prevent test fraud, so that TECH BOARD 2025 selection is fair and secure.

#### Acceptance Criteria

1. WHEN student data is stored THEN the system SHALL hash passwords using secure encryption
2. WHEN a test session starts THEN the system SHALL track start time, end time, and prevent multiple attempts by the same student identity
3. WHEN the database is accessed THEN the system SHALL use SQLite with proper schema enforcing unique roll numbers per class/section combination
4. WHEN authentication is required THEN the system SHALL use JWT tokens with appropriate expiration
5. WHEN a student completes a test THEN the system SHALL mark their identity as "test completed" to prevent re-attempts
6. IF unauthorized access to admin features is attempted THEN the system SHALL deny access and log the attempt
7. WHEN roll number uniqueness is violated THEN the system SHALL prevent registration and display appropriate error message

### Requirement 7

**User Story:** As a user, I want a professional and intuitive TECH BOARD 2025 test interface, so that I can focus on the test content without technical distractions.

#### Acceptance Criteria

1. WHEN users access the application THEN the system SHALL display a responsive interface that works on desktop, tablet, and mobile devices
2. WHEN students take the test THEN the system SHALL provide a clean, distraction-free interface with clear question text, radio button options, and navigation controls
3. WHEN users interact with forms THEN the system SHALL provide real-time validation and helpful error messages
4. WHEN the test timer is active THEN the system SHALL display a prominent countdown timer that changes color when time is running low
5. WHEN students navigate between questions THEN the system SHALL show a question navigator indicating answered/unanswered questions
6. WHEN the test interface loads THEN the system SHALL display TECH BOARD 2025 branding and professional styling

### Requirement 8

**User Story:** As a system, I want to enforce TECH BOARD 2025 selection criteria, so that only qualified students are identified for membership.

#### Acceptance Criteria

1. WHEN a student completes the test THEN the system SHALL calculate their score out of 25 questions
2. WHEN the score is calculated THEN the system SHALL determine pass status as 18 or more correct answers out of 25
3. WHEN a student scores 17 or fewer correct answers THEN the system SHALL mark them as "not qualified" for TECH BOARD 2025
4. WHEN a student scores 18 or more correct answers THEN the system SHALL mark them as "qualified" for TECH BOARD 2025
5. WHEN pass/fail status is determined THEN the system SHALL store this information for administrator review only
6. WHEN students attempt to retake the test THEN the system SHALL prevent multiple attempts regardless of their previous score.