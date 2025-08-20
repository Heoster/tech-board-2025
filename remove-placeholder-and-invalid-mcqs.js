const database = require('./server/config/database');

// Patterns indicating placeholders or low-quality content
const PLACEHOLDER_PATTERNS = [
  'placeholder',
  'example',
  'sample',
  'lorem ipsum',
  'key concept',
  'important concept',
  'what is an important',
  'question ',
  'test question',
  'dummy',
  '...',
];

function likeClauses(column) {
  // Build SQL like clauses for patterns
  return PLACEHOLDER_PATTERNS.map(() => `${column} LIKE ?`).join(' OR ');
}

function likeParams() {
  return PLACEHOLDER_PATTERNS.map(p => `%${p}%`);
}

async function main() {
  console.log('🧹 Removing placeholder and invalid MCQs...');
  await database.connect();
  const db = database.getDb();

  // 1) Find questions with placeholder-like question_text
  const placeholderQuestionSql = `
    SELECT id
    FROM questions
    WHERE lower(question_text) REGEXP '.*' -- placeholder to allow dynamic ORs below
  `;
  // We'll actually construct explicit OR conditions
  const qWhere = likeClauses('lower(question_text)');
  const placeholderQuestions = await new Promise((resolve, reject) => {
    db.all(
      `SELECT id FROM questions WHERE ${qWhere}`,
      likeParams(),
      (err, rows) => (err ? reject(err) : resolve(rows || []))
    );
  });

  // 2) Find questions with invalid options count or correctness
  const invalidByCounts = await new Promise((resolve, reject) => {
    db.all(
      `SELECT question_id AS id
       FROM (
         SELECT question_id,
                COUNT(*) AS cnt,
                SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) AS correct_cnt
         FROM options
         GROUP BY question_id
       ) t
       WHERE cnt != 4 OR correct_cnt != 1`,
      (err, rows) => (err ? reject(err) : resolve(rows || []))
    );
  });

  // 3) Find questions with placeholder-like option text or empty/whitespace-only options
  const optWhere = likeClauses('lower(option_text)');
  const invalidByOptionText = await new Promise((resolve, reject) => {
    db.all(
      `SELECT DISTINCT question_id AS id
       FROM options
       WHERE TRIM(COALESCE(option_text, '')) = ''
          OR ${optWhere}`,
      likeParams(),
      (err, rows) => (err ? reject(err) : resolve(rows || []))
    );
  });

  // Union all IDs
  const ids = new Set();
  placeholderQuestions.forEach(r => ids.add(r.id));
  invalidByCounts.forEach(r => ids.add(r.id));
  invalidByOptionText.forEach(r => ids.add(r.id));

  const idsArr = Array.from(ids);
  console.log(`Found ${idsArr.length} questions to remove.`);

  if (idsArr.length === 0) {
    console.log('✅ No placeholder/invalid MCQs found.');
    return;
  }

  // Chunk deletes to avoid SQL limits
  const chunkSize = 500;
  let deleted = 0;

  for (let i = 0; i < idsArr.length; i += chunkSize) {
    const chunk = idsArr.slice(i, i + chunkSize);
    const placeholders = chunk.map(() => '?').join(',');

    // Delete from options first (for safety; FK should cascade but explicit is fine)
    await new Promise((resolve, reject) => {
      db.run(`DELETE FROM options WHERE question_id IN (${placeholders})`, chunk, function (err) {
        if (err) return reject(err);
        resolve();
      });
    });

    await new Promise((resolve, reject) => {
      db.run(`DELETE FROM questions WHERE id IN (${placeholders})`, chunk, function (err) {
        if (err) return reject(err);
        deleted += this.changes || 0;
        resolve();
      });
    });
  }

  console.log(`✅ Deleted ${deleted} questions.`);

  // Report remaining per grade
  const remaining = await new Promise((resolve, reject) => {
    db.all(
      `SELECT grade, COUNT(*) AS count FROM questions GROUP BY grade ORDER BY grade`,
      (err, rows) => (err ? reject(err) : resolve(rows || []))
    );
  });

  console.log('\nRemaining questions per grade:');
  remaining.forEach(r => console.log(`  Grade ${r.grade}: ${r.count}`));

  // Extra validation: ensure no question remains with invalid option structure
  const remainingInvalid = await new Promise((resolve, reject) => {
    db.all(
      `SELECT q.id, q.grade, q.question_text
       FROM questions q
       LEFT JOIN (
         SELECT question_id,
                COUNT(*) AS cnt,
                SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) AS correct_cnt
         FROM options
         GROUP BY question_id
       ) oc ON oc.question_id = q.id
       WHERE IFNULL(oc.cnt, 0) != 4 OR IFNULL(oc.correct_cnt, 0) != 1`,
      (err, rows) => (err ? reject(err) : resolve(rows || []))
    );
  });

  if (remainingInvalid.length > 0) {
    console.log(`\n⚠️  ${remainingInvalid.length} questions still have invalid option structure. Consider reseeding or fixing.`);
  } else {
    console.log('\n✅ All remaining questions have valid option structure (4 options, exactly 1 correct).');
  }
}

main().catch(err => {
  console.error('Cleanup failed:', err.message);
  process.exit(1);
});
