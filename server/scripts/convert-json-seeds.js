/*
  Converts JSON question banks in database-exports/ into JS seed modules under server/seed/generated/.
  Rules:
  - Validate shape: question_text (string), grade (int 6/7/8/9/11), difficulty (string), options (array 2-6), exactly one correct option.
  - Deduplicate by normalized question_text within each file.
  - Basic loop/repeat detection: if unique_ratio < 0.85, we consider the file looping and SKIP conversion.
  - Skip invalid questions; only write file if >= 10 valid questions remain and loop check passes.

  Output per input file: server/seed/generated/<basename>.seed.js
  Exports: module.exports = { source: '<basename>.json', count, gradeHint, questions: [...] }
*/

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const EXPORTS_DIR = path.join(ROOT, 'database-exports');
const OUT_DIR = path.join(ROOT, 'server', 'seed', 'generated');

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function normalizeText(s) {
  return String(s)
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/\b(\d+)\b/g, '<num>')
    .trim();
}

function inferGradeFromName(name) {
  const m = name.match(/grade[-_\s]?([6|7|8|9|11]+)/i);
  if (!m) return null;
  const g = parseInt(m[1], 10);
  return [6,7,8,9,11].includes(g) ? g : null;
}

function validateQuestion(q) {
  if (!q || typeof q !== 'object') return { ok: false, reason: 'not_object' };
  if (!q.question_text || typeof q.question_text !== 'string') return { ok: false, reason: 'no_text' };
  const grade = parseInt(q.grade, 10);
  if (!Number.isInteger(grade) || ![6,7,8,9,11].includes(grade)) return { ok: false, reason: 'bad_grade' };
  if (!q.options || !Array.isArray(q.options)) return { ok: false, reason: 'no_options' };
  if (q.options.length < 2 || q.options.length > 6) return { ok: false, reason: 'options_count' };
  let correctCount = 0;
  for (const opt of q.options) {
    if (!opt || typeof opt.option_text !== 'string' || !opt.option_text.trim()) return { ok: false, reason: 'bad_option' };
    if (opt.is_correct === 1 || opt.is_correct === true) correctCount++;
  }
  if (correctCount !== 1) return { ok: false, reason: 'correct_count' };
  return { ok: true };
}

function sanitizeQuestion(q) {
  // Keep only fields needed for seeding
  return {
    grade: parseInt(q.grade, 10),
    difficulty: q.difficulty || 'basic',
    question_text: String(q.question_text).trim(),
    options: q.options.map((o, idx) => ({
      option_text: String(o.option_text).trim(),
      is_correct: !!(o.is_correct === 1 || o.is_correct === true),
      option_order: Number.isInteger(o.option_order) ? o.option_order : idx + 1
    }))
  };
}

function detectLooping(questions) {
  if (!questions.length) return false;
  const normSet = new Set(questions.map(q => normalizeText(q.question_text)));
  const uniqueRatio = normSet.size / questions.length;
  return uniqueRatio < 0.85; // too many similar/repeated
}

function convertFile(jsonPath) {
  const base = path.basename(jsonPath);
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  } catch (e) {
    return { file: base, ok: false, reason: 'json_parse', detail: e.message };
  }

  // Accept either array or object with data property
  const arr = Array.isArray(raw) ? raw : (Array.isArray(raw.data) ? raw.data : []);
  if (!Array.isArray(arr) || arr.length === 0) {
    return { file: base, ok: false, reason: 'empty_or_bad_format' };
  }

  const gradeHint = inferGradeFromName(base);

  const seen = new Set();
  const valid = [];
  let skippedInvalid = 0;
  let skippedDup = 0;

  for (const q of arr) {
    if (gradeHint && q.grade !== gradeHint) {
      // Fix grade if consistent hint present
      q.grade = gradeHint;
    }
    const v = validateQuestion(q);
    if (!v.ok) { skippedInvalid++; continue; }
    const key = normalizeText(q.question_text);
    if (seen.has(key)) { skippedDup++; continue; }
    seen.add(key);
    valid.push(sanitizeQuestion(q));
  }

  if (valid.length < 10) {
    return { file: base, ok: false, reason: 'too_few_valid', valid: valid.length, skippedInvalid, skippedDup };
  }

  if (detectLooping(valid)) {
    return { file: base, ok: false, reason: 'looping_detected', valid: valid.length, skippedInvalid, skippedDup };
  }

  const out = {
    source: base,
    gradeHint: gradeHint || null,
    count: valid.length,
    questions: valid
  };

  ensureDir(OUT_DIR);
  const outFile = path.join(OUT_DIR, base.replace(/\.json$/i, '.seed.js'));
  const js = `// Auto-generated from ${base} on ${new Date().toISOString()}
/* eslint-disable */
module.exports = ${JSON.stringify(out, null, 2)};
`;
  fs.writeFileSync(outFile, js, 'utf8');
  return { file: base, ok: true, outFile, count: valid.length, skippedInvalid, skippedDup };
}

function main() {
  ensureDir(OUT_DIR);
  const files = fs.readdirSync(EXPORTS_DIR)
    .filter(f => f.toLowerCase().endsWith('.json'))
    .map(f => path.join(EXPORTS_DIR, f));

  const results = files.map(convertFile);

  const report = {
    scanned: files.length,
    generated: results.filter(r => r.ok).length,
    skipped: results.filter(r => !r.ok).length,
    detail: results
  };

  const reportPath = path.join(OUT_DIR, 'conversion-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log('Conversion complete. Report at:', reportPath);
  for (const r of results) {
    if (r.ok) console.log('✔ Generated:', r.outFile, 'count=', r.count, 'dedup=', r.skippedDup);
    else console.warn('✖ Skipped:', r.file, 'reason=', r.reason, r.detail ? ('detail='+r.detail) : '');
  }
}

if (require.main === module) {
  main();
}
