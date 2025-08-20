const fs = require('fs');
const path = require('path');

// Problematic content patterns
const problemPatterns = [
  { name: 'TODO/FIXME', pattern: /(TODO|FIXME|XXX)/gi },
  { name: 'Placeholder text', pattern: /(placeholder|sample text|lorem ipsum|fill in|replace this)/gi },
  { name: 'Incomplete content', pattern: /(\.\.\.|___+|---+|\[.*?\])/g },
  { name: 'Generic examples', pattern: /(example \d+|test question|sample question)/gi },
  { name: 'Repeated phrases', pattern: /(What is the|Which of the following|What does)/gi }
];

function analyzeQuestionContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const findings = [];
    
    // Extract actual question texts
    const questionMatches = content.match(/question:\s*["'`](.*?)["'`]/g);
    if (!questionMatches) return { findings: [], questions: [] };
    
    const questions = questionMatches.map(match => 
      match.replace(/question:\s*["'`]/, '').replace(/["'`]$/, '').trim()
    );
    
    // Check for problematic patterns in questions
    problemPatterns.forEach(({ name, pattern }) => {
      const matches = [];
      questions.forEach((question, index) => {
        const found = question.match(pattern);
        if (found) {
          matches.push({ questionIndex: index, question: question.substring(0, 80) + '...', matches: found });
        }
      });
      
      if (matches.length > 0) {
        findings.push({ type: name, pattern: pattern.toString(), matches });
      }
    });
    
    return { findings, questions };
  } catch (error) {
    console.error(`Error analyzing ${filePath}:`, error.message);
    return { findings: [], questions: [] };
  }
}

function findSimilarQuestions(questions) {
  const similar = [];
  
  for (let i = 0; i < questions.length; i++) {
    for (let j = i + 1; j < questions.length; j++) {
      const q1 = questions[i].toLowerCase().replace(/[^\w\s]/g, '');
      const q2 = questions[j].toLowerCase().replace(/[^\w\s]/g, '');
      
      // Check for very similar questions (>80% similarity)
      const similarity = calculateSimilarity(q1, q2);
      if (similarity > 0.8) {
        similar.push({
          question1: { index: i, text: questions[i].substring(0, 60) + '...' },
          question2: { index: j, text: questions[j].substring(0, 60) + '...' },
          similarity: Math.round(similarity * 100)
        });
      }
    }
  }
  
  return similar;
}

function calculateSimilarity(str1, str2) {
  const words1 = str1.split(/\s+/);
  const words2 = str2.split(/\s+/);
  const allWords = new Set([...words1, ...words2]);
  
  let commonWords = 0;
  allWords.forEach(word => {
    if (words1.includes(word) && words2.includes(word)) {
      commonWords++;
    }
  });
  
  return (2 * commonWords) / (words1.length + words2.length);
}

function scanAllFiles() {
  const questionsDir = path.join(__dirname, 'server', 'seed', 'questions');
  
  if (!fs.existsSync(questionsDir)) {
    console.error('Questions directory not found:', questionsDir);
    return;
  }
  
  const files = fs.readdirSync(questionsDir).filter(file => file.endsWith('.js'));
  
  console.log('🔍 SCANNING FOR CONTENT QUALITY ISSUES\n');
  console.log('=' .repeat(60));
  
  let totalIssues = 0;
  let totalQuestions = 0;
  
  files.forEach(file => {
    const filePath = path.join(questionsDir, file);
    console.log(`\n📁 File: ${file}`);
    console.log('-'.repeat(40));
    
    const { findings, questions } = analyzeQuestionContent(filePath);
    totalQuestions += questions.length;
    
    if (findings.length > 0) {
      findings.forEach(finding => {
        console.log(`⚠️  ${finding.type.toUpperCase()}:`);
        finding.matches.forEach(match => {
          console.log(`  Q${match.questionIndex + 1}: ${match.question}`);
          console.log(`  Found: ${match.matches.join(', ')}`);
        });
        totalIssues += finding.matches.length;
      });
    }
    
    // Check for similar questions
    const similar = findSimilarQuestions(questions);
    if (similar.length > 0) {
      console.log(`🔄 SIMILAR QUESTIONS (${similar.length} pairs):`);
      similar.slice(0, 3).forEach(pair => { // Show first 3 pairs
        console.log(`  Q${pair.question1.index + 1} & Q${pair.question2.index + 1} (${pair.similarity}% similar)`);
        console.log(`    "${pair.question1.text}"`);
        console.log(`    "${pair.question2.text}"`);
      });
      totalIssues += similar.length;
    }
    
    if (findings.length === 0 && similar.length === 0) {
      console.log(`✅ Clean - ${questions.length} questions, no issues found`);
    }
  });
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 FINAL SUMMARY:');
  console.log(`Total questions analyzed: ${totalQuestions}`);
  console.log(`Total content issues found: ${totalIssues}`);
  
  if (totalIssues === 0) {
    console.log('🎉 All question content is clean and ready for production!');
  } else {
    console.log(`⚠️  ${totalIssues} content issues need review`);
  }
}

scanAllFiles();