const fs = require('fs');
const path = require('path');

// Common placeholder patterns
const placeholderPatterns = [
  /\[.*?\]/g,           // [placeholder]
  /<.*?>/g,             // <placeholder>
  /\{.*?\}/g,           // {placeholder}
  /TODO/gi,             // TODO comments
  /FIXME/gi,            // FIXME comments
  /XXX/gi,              // XXX placeholders
  /placeholder/gi,      // literal "placeholder"
  /example/gi,          // "example" text
  /sample/gi,           // "sample" text
  /test/gi,             // "test" in questions
  /lorem ipsum/gi,      // Lorem ipsum text
  /\.\.\./g,            // Ellipsis indicating incomplete content
];

// Function to scan a file for placeholders
function scanFileForPlaceholders(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const findings = [];
    
    placeholderPatterns.forEach((pattern, index) => {
      const matches = content.match(pattern);
      if (matches) {
        findings.push({
          pattern: pattern.toString(),
          matches: [...new Set(matches)], // Remove duplicates
          count: matches.length
        });
      }
    });
    
    return findings;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return [];
  }
}

// Function to find duplicate questions
function findDuplicateQuestions(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract question texts using regex
    const questionMatches = content.match(/question:\s*["'`](.*?)["'`]/g);
    if (!questionMatches) return [];
    
    const questions = questionMatches.map(match => 
      match.replace(/question:\s*["'`]/, '').replace(/["'`]$/, '').trim()
    );
    
    // Find duplicates
    const questionCounts = {};
    const duplicates = [];
    
    questions.forEach((question, index) => {
      if (questionCounts[question]) {
        questionCounts[question].count++;
        questionCounts[question].indices.push(index);
      } else {
        questionCounts[question] = { count: 1, indices: [index] };
      }
    });
    
    Object.entries(questionCounts).forEach(([question, data]) => {
      if (data.count > 1) {
        duplicates.push({
          question: question.substring(0, 100) + (question.length > 100 ? '...' : ''),
          count: data.count,
          indices: data.indices
        });
      }
    });
    
    return duplicates;
  } catch (error) {
    console.error(`Error analyzing duplicates in ${filePath}:`, error.message);
    return [];
  }
}

// Main scanning function
function scanQuestionFiles() {
  const questionsDir = path.join(__dirname, 'server', 'seed', 'questions');
  
  if (!fs.existsSync(questionsDir)) {
    console.error('Questions directory not found:', questionsDir);
    return;
  }
  
  const files = fs.readdirSync(questionsDir).filter(file => file.endsWith('.js'));
  
  console.log('🔍 SCANNING FOR PLACEHOLDERS AND REPETITIONS\n');
  console.log('=' .repeat(60));
  
  let totalPlaceholders = 0;
  let totalDuplicates = 0;
  
  files.forEach(file => {
    const filePath = path.join(questionsDir, file);
    console.log(`\n📁 File: ${file}`);
    console.log('-'.repeat(40));
    
    // Scan for placeholders
    const placeholders = scanFileForPlaceholders(filePath);
    if (placeholders.length > 0) {
      console.log('⚠️  PLACEHOLDERS FOUND:');
      placeholders.forEach(finding => {
        console.log(`  Pattern: ${finding.pattern}`);
        console.log(`  Count: ${finding.count}`);
        console.log(`  Examples: ${finding.matches.slice(0, 3).join(', ')}`);
        totalPlaceholders += finding.count;
      });
    } else {
      console.log('✅ No placeholders found');
    }
    
    // Scan for duplicates
    const duplicates = findDuplicateQuestions(filePath);
    if (duplicates.length > 0) {
      console.log('\n🔄 DUPLICATE QUESTIONS FOUND:');
      duplicates.forEach(dup => {
        console.log(`  Question: "${dup.question}"`);
        console.log(`  Occurrences: ${dup.count}`);
        totalDuplicates += dup.count - 1; // Count extra occurrences
      });
    } else {
      console.log('✅ No duplicate questions found');
    }
  });
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 SUMMARY:');
  console.log(`Total placeholder instances: ${totalPlaceholders}`);
  console.log(`Total duplicate questions: ${totalDuplicates}`);
  
  if (totalPlaceholders === 0 && totalDuplicates === 0) {
    console.log('🎉 All files are clean - no placeholders or duplicates found!');
  } else {
    console.log('⚠️  Issues found that need attention');
  }
}

// Run the scan
scanQuestionFiles();