const database = require('../config/database');

// Global question selection lock to prevent concurrent access issues
const questionSelectionLocks = new Map();

/**
 * Enhanced quiz question selection with concurrent access protection and parameter validation
 * - Validates input parameters strictly
 * - Prevents concurrent access conflicts using locks
 * - Avoids previously used questions by the same student
 * - Includes questions from other active in-progress quizzes in exclusion
 * - Ensures each selected question has at least 4 options
 * - Targets a distribution across difficulty levels (60% basic, 30% medium, 10% advanced)
 * - Falls back to fill remaining from any available with options
 *
 * @param {number} grade - Grade level (6, 7, 8, 9, 11)
 * @param {number} totalQuestions - Number of questions requested (must be > 0)
 * @param {number|null} studentId - Student ID for tracking usage
 * @returns {Promise<number[]>} shuffled array of unique question IDs
 */
async function selectUniqueQuizQuestions(grade, totalQuestions = 50, studentId = null) {
  // STEP 1: Parameter validation
  if (!grade || ![6, 7, 8, 9, 11].includes(grade)) {
    throw new Error(`INVALID_GRADE: Grade must be one of [6, 7, 8, 9, 11]. Received: ${grade}`);
  }

  if (!totalQuestions || totalQuestions <= 0) {
    throw new Error(`INVALID_QUESTION_COUNT: Total questions must be a positive number. Received: ${totalQuestions}`);
  }

  if (totalQuestions > 200) {
    throw new Error(`EXCESSIVE_QUESTION_COUNT: Maximum 200 questions allowed per quiz. Received: ${totalQuestions}`);
  }

  if (!studentId) {
    throw new Error('INVALID_STUDENT_ID: Student ID is required for duplicate prevention');
  }

  const db = database.getDb();

  console.log(`🎯 ENHANCED: Selecting ${totalQuestions} questions for Grade ${grade} (Student ID: ${studentId})`);

  // STEP 2: Concurrent access protection
  const lockKey = `grade_${grade}_selection`;
  
  // Wait for any existing lock to complete
  while (questionSelectionLocks.has(lockKey)) {
    console.log(`⏳ Waiting for concurrent selection to complete for Grade ${grade}...`);
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200)); // Random delay to prevent thundering herd
  }

  // Acquire lock
  questionSelectionLocks.set(lockKey, Date.now());
  
  try {
    // STEP 3: Get previously used questions by this student
    let usedQuestionIds = [];
    try {
      const usedQuestions = await new Promise((resolve, reject) => {
        db.all(
          `
            SELECT DISTINCT r.question_id
            FROM responses r
            JOIN quizzes q ON r.quiz_id = q.id
            WHERE q.student_id = ? AND q.grade = ?
          `,
          [studentId, grade],
          (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
          }
        );
      });
      usedQuestionIds = usedQuestions.map((q) => q.question_id);
      console.log(`📝 Found ${usedQuestionIds.length} previously used questions for this student`);
    } catch (error) {
      console.log('ℹ️  No previously used questions found');
    }

    // STEP 4: Get questions from ALL active in-progress quizzes (not just this student)
    try {
      const activeQuizQuestions = await new Promise((resolve, reject) => {
        db.all(
          `
            SELECT DISTINCT r.question_id
            FROM responses r
            JOIN quizzes qz ON r.quiz_id = qz.id
            WHERE qz.grade = ? AND qz.status = 'in_progress'
          `,
          [grade],
          (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
          }
        );
      });

      const activeQuestionIds = activeQuizQuestions.map((q) => q.question_id);
      
      // Also get questions from recent quizzes (last 5 minutes) to prevent immediate reuse
      const recentQuizQuestions = await new Promise((resolve, reject) => {
        db.all(
          `
            SELECT DISTINCT r.question_id
            FROM responses r
            JOIN quizzes qz ON r.quiz_id = qz.id
            WHERE qz.grade = ? AND qz.status = 'completed'
            AND datetime(qz.end_time) > datetime('now', '-5 minutes')
          `,
          [grade],
          (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
          }
        );
      });

      const recentQuestionIds = recentQuizQuestions.map((q) => q.question_id);
      
      // Combine all excluded questions
      const allActiveIds = [...activeQuestionIds, ...recentQuestionIds];
      usedQuestionIds = [...new Set([...usedQuestionIds, ...allActiveIds])];
      console.log(`📝 Total excluded questions (used + active + recent): ${usedQuestionIds.length}`);
      console.log(`   - Previously used by student: ${usedQuestionIds.length - allActiveIds.length}`);
      console.log(`   - Currently active in other quizzes: ${activeQuestionIds.length}`);
      console.log(`   - Recently completed quizzes: ${recentQuestionIds.length}`);
    } catch (error) {
      console.log('ℹ️  No active quiz questions found');
    }

    // STEP 5: Check available questions with options (production-ready check)
    const availableQuestionsWithOptions = await new Promise((resolve, reject) => {
      const excludeClause =
        usedQuestionIds.length > 0 ? `AND q.id NOT IN (${usedQuestionIds.map(() => '?').join(',')})` : '';

      db.all(
        `SELECT DISTINCT q.id, q.difficulty, q.question_text
           FROM questions q
           INNER JOIN options o ON q.id = o.question_id
           WHERE q.grade = ? ${excludeClause}
           GROUP BY q.id
           HAVING COUNT(o.id) >= 4
           ORDER BY RANDOM()`, // Pre-randomize to improve distribution
        [grade, ...usedQuestionIds],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });

    console.log(`📊 Available questions with options: ${availableQuestionsWithOptions.length}`);

    // STEP 6: Enhanced availability check
    if (availableQuestionsWithOptions.length < Math.min(15, totalQuestions)) {
      throw new Error(
        `INSUFFICIENT_QUESTIONS: Only ${availableQuestionsWithOptions.length} questions available for Grade ${grade}. ` +
        `Need at least ${Math.min(15, totalQuestions)} questions. Consider reducing quiz size or adding more questions to the database.`
      );
    }

    // STEP 7: Adjust target questions based on availability
    const actualTargetQuestions = Math.min(totalQuestions, availableQuestionsWithOptions.length);
    console.log(`🎯 Target questions adjusted to: ${actualTargetQuestions}`);

    // STEP 8: Enhanced distribution algorithm with better randomization
    const difficultyGroups = {
      basic: availableQuestionsWithOptions.filter((q) => q.difficulty === 'basic').sort(() => Math.random() - 0.5),
      medium: availableQuestionsWithOptions.filter((q) => q.difficulty === 'medium').sort(() => Math.random() - 0.5),
      advanced: availableQuestionsWithOptions.filter((q) => q.difficulty === 'advanced').sort(() => Math.random() - 0.5)
    };

    console.log(`📈 Available by difficulty:`);
    console.log(`   Basic: ${difficultyGroups.basic.length}`);
    console.log(`   Medium: ${difficultyGroups.medium.length}`);
    console.log(`   Advanced: ${difficultyGroups.advanced.length}`);

    // STEP 9: Smart distribution algorithm with stricter duplicate prevention
    const selectedQuestions = [];
    const selectedIds = new Set();

    // Calculate ideal distribution
    const idealBasic = Math.floor(actualTargetQuestions * 0.6);
    const idealMedium = Math.floor(actualTargetQuestions * 0.3);
    const idealAdvanced = actualTargetQuestions - idealBasic - idealMedium;

    console.log(`🎯 Target distribution: ${idealBasic} basic, ${idealMedium} medium, ${idealAdvanced} advanced`);

    // Select questions with enhanced duplicate checking
    const selectFromGroup = (group, count, difficulty) => {
      let selected = 0;
      const shuffled = group.sort(() => Math.random() - 0.5); // Additional randomization
      
      for (const question of shuffled) {
        if (selected >= count) break;
        
        // Triple check for duplicates
        if (!selectedIds.has(question.id) &&
            !usedQuestionIds.includes(question.id) &&
            !selectedQuestions.find(q => q.id === question.id)) {
          
          selectedQuestions.push(question);
          selectedIds.add(question.id);
          selected++;
          console.log(`   ✓ Selected ${difficulty} question ID ${question.id}`);
        }
      }
      return selected;
    };

    // Select by difficulty with strict duplicate prevention
    const basicSelected = selectFromGroup(difficultyGroups.basic, idealBasic, 'basic');
    const mediumSelected = selectFromGroup(difficultyGroups.medium, idealMedium, 'medium');
    const advancedSelected = selectFromGroup(difficultyGroups.advanced, idealAdvanced, 'advanced');

    // STEP 10: Fill remaining slots if needed
    const currentTotal = selectedQuestions.length;
    const remaining = actualTargetQuestions - currentTotal;
    
    if (remaining > 0) {
      console.log(`📝 Need ${remaining} more questions, filling from available pool...`);
      
      const remainingQuestions = availableQuestionsWithOptions.filter((q) => !selectedIds.has(q.id));
      const shuffledRemaining = remainingQuestions.sort(() => Math.random() - 0.5);

      let filled = 0;
      for (const question of shuffledRemaining) {
        if (filled >= remaining) break;
        
        if (!selectedIds.has(question.id) && !selectedQuestions.find(q => q.id === question.id)) {
          selectedQuestions.push(question);
          selectedIds.add(question.id);
          filled++;
          console.log(`   ✓ Filled with ${question.difficulty} question ID ${question.id}`);
        }
      }
    }

    // STEP 11: Final validation with enhanced checks
    const finalQuestionIds = selectedQuestions.map((q) => q.id);
    const uniqueIds = [...new Set(finalQuestionIds)];

    if (uniqueIds.length !== finalQuestionIds.length) {
      const duplicates = finalQuestionIds.filter((id, index) => finalQuestionIds.indexOf(id) !== index);
      throw new Error(`DUPLICATE_QUESTIONS_DETECTED: Found internal duplicates: ${duplicates.join(', ')}`);
    }

    if (uniqueIds.length < Math.min(totalQuestions, 15)) {
      throw new Error(`INSUFFICIENT_UNIQUE_QUESTIONS: Could only select ${uniqueIds.length} unique questions`);
    }

    // Final randomization
    const shuffledFinalIds = uniqueIds.sort(() => Math.random() - 0.5);

    console.log(`✅ ENHANCED SUCCESS: Selected ${shuffledFinalIds.length} unique questions`);
    console.log(`📊 Final distribution:`);
    const finalDistribution = {
      basic: selectedQuestions.filter((q) => q.difficulty === 'basic').length,
      medium: selectedQuestions.filter((q) => q.difficulty === 'medium').length,
      advanced: selectedQuestions.filter((q) => q.difficulty === 'advanced').length
    };
    console.log(`   Basic: ${finalDistribution.basic} (${((finalDistribution.basic/shuffledFinalIds.length)*100).toFixed(1)}%)`);
    console.log(`   Medium: ${finalDistribution.medium} (${((finalDistribution.medium/shuffledFinalIds.length)*100).toFixed(1)}%)`);
    console.log(`   Advanced: ${finalDistribution.advanced} (${((finalDistribution.advanced/shuffledFinalIds.length)*100).toFixed(1)}%)`);
    console.log(
      `📋 Question IDs: [${shuffledFinalIds.slice(0, 10).join(', ')}${shuffledFinalIds.length > 10 ? '...' : ''}]`
    );

    return shuffledFinalIds;

  } finally {
    // STEP 12: Always release lock
    questionSelectionLocks.delete(lockKey);
    console.log(`🔓 Released selection lock for Grade ${grade}`);
  }
}

module.exports = {
  selectUniqueQuizQuestions
};