const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database', 'mcq_system_fixed.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  }
  
  console.log('🔍 DATABASE CONTENT ANALYSIS\n');
  console.log('=' .repeat(50));
  
  // Get total counts
  db.get('SELECT COUNT(*) as count FROM questions', (err, totalQuestions) => {
    if (err) {
      console.error('Error getting question count:', err.message);
      return;
    }
    
    db.get('SELECT COUNT(*) as count FROM options', (err, totalOptions) => {
      if (err) {
        console.error('Error getting options count:', err.message);
        return;
      }
      
      console.log(`Total questions: ${totalQuestions.count}`);
      console.log(`Total options: ${totalOptions.count}`);
      
      // Check questions by grade
      console.log('\n📊 QUESTIONS BY GRADE:');
      db.all(`
        SELECT grade, COUNT(*) as count 
        FROM questions 
        GROUP BY grade 
        ORDER BY grade
      `, (err, gradeStats) => {
        if (err) {
          console.error('Error getting grade stats:', err.message);
          return;
        }
        
        gradeStats.forEach(stat => {
          console.log(`Grade ${stat.grade}: ${stat.count} questions`);
        });
        
        // Check for duplicate questions
        console.log('\n🔄 CHECKING FOR DUPLICATES:');
        db.all(`
          SELECT question_text, COUNT(*) as count 
          FROM questions 
          GROUP BY question_text 
          HAVING COUNT(*) > 1
          ORDER BY count DESC
        `, (err, duplicates) => {
          if (err) {
            console.error('Error checking duplicates:', err.message);
            return;
          }
          
          if (duplicates.length > 0) {
            console.log(`Found ${duplicates.length} duplicate question texts:`);
            duplicates.forEach(dup => {
              console.log(`  "${dup.question_text.substring(0, 60)}..." (${dup.count} times)`);
            });
          } else {
            console.log('✅ No duplicate questions found');
          }
          
          // Check for placeholder content
          console.log('\n⚠️  CHECKING FOR PLACEHOLDER CONTENT:');
          db.all(`
            SELECT id, question_text, grade 
            FROM questions 
            WHERE question_text LIKE '%TODO%' 
               OR question_text LIKE '%FIXME%' 
               OR question_text LIKE '%placeholder%'
               OR question_text LIKE '%...'
               OR question_text LIKE '%[%]%'
               OR question_text LIKE '%example%'
            LIMIT 10
          `, (err, placeholders) => {
            if (err) {
              console.error('Error checking placeholders:', err.message);
              return;
            }
            
            if (placeholders.length > 0) {
              console.log(`Found ${placeholders.length} questions with potential placeholder content:`);
              placeholders.forEach(q => {
                console.log(`  Grade ${q.grade}, ID ${q.id}: "${q.question_text.substring(0, 80)}..."`);
              });
            } else {
              console.log('✅ No placeholder content found');
            }
            
            // Sample questions from each grade
            console.log('\n📝 SAMPLE QUESTIONS BY GRADE:');
            const grades = [6, 7, 8, 9, 11];
            let gradeIndex = 0;
            
            function showGradeSamples() {
              if (gradeIndex >= grades.length) {
                db.close();
                console.log('\n✅ Database analysis complete');
                return;
              }
              
              const grade = grades[gradeIndex];
              db.all(`
                SELECT question_text 
                FROM questions 
                WHERE grade = ? 
                LIMIT 2
              `, [grade], (err, samples) => {
                if (err) {
                  console.error(`Error getting samples for grade ${grade}:`, err.message);
                  return;
                }
                
                console.log(`\nGrade ${grade} samples:`);
                samples.forEach((q, i) => {
                  console.log(`  ${i + 1}. ${q.question_text.substring(0, 80)}...`);
                });
                
                gradeIndex++;
                showGradeSamples();
              });
            }
            
            showGradeSamples();
          });
        });
      });
    });
  });
});
  
  console.log('🔍 DATABASE CONTENT ANALYSIS\n');
  console.log('=' .repeat(50));
  
  // Get total counts
  const totalQuestions = db.prepare('SELECT COUNT(*) as count FROM questions').get();
  const totalOptions = db.prepare('SELECT COUNT(*) as count FROM options').get();
