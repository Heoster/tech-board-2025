const fs = require('fs');

function checkGrade6Duplicates() {
    console.log('🔍 Checking Grade 6 comprehensive questions for duplicates and similarities...\n');
    
    try {
        const fileContent = fs.readFileSync('server/seed/comprehensive-grade6-questions.js', 'utf8');
        
        // Extract questions using regex
        const questionMatches = fileContent.match(/questionText:\s*['"`](.*?)['"`]/g);
        
        if (!questionMatches) {
            console.log('❌ No questions found in the file');
            return;
        }
        
        const questions = questionMatches.map(match => {
            return match.replace(/questionText:\s*['"`]/, '').replace(/['"`]$/, '');
        });
        
        console.log(`📊 Total questions found: ${questions.length}\n`);
        
        // Check for exact duplicates
        const exactDuplicates = [];
        const questionCounts = {};
        
        questions.forEach((question, index) => {
            if (questionCounts[question]) {
                exactDuplicates.push({
                    question,
                    indices: [questionCounts[question], index]
                });
            } else {
                questionCounts[question] = index;
            }
        });
        
        if (exactDuplicates.length > 0) {
            console.log('🚨 EXACT DUPLICATES FOUND:');
            exactDuplicates.forEach((dup, i) => {
                console.log(`${i + 1}. "${dup.question}"`);
                console.log(`   Found at positions: ${dup.indices.join(', ')}\n`);
            });
        } else {
            console.log('✅ No exact duplicates found\n');
        }
        
        // Check for similar questions (basic similarity check)
        console.log('🔍 Checking for similar questions...\n');
        const similarities = [];
        
        for (let i = 0; i < questions.length; i++) {
            for (let j = i + 1; j < questions.length; j++) {
                const q1 = questions[i].toLowerCase();
                const q2 = questions[j].toLowerCase();
                
                // Check if questions are very similar (share many words)
                const words1 = q1.split(/\s+/);
                const words2 = q2.split(/\s+/);
                
                const commonWords = words1.filter(word => 
                    word.length > 3 && words2.includes(word)
                );
                
                const similarity = commonWords.length / Math.max(words1.length, words2.length);
                
                if (similarity > 0.6) { // 60% similarity threshold
                    similarities.push({
                        q1: questions[i],
                        q2: questions[j],
                        similarity: Math.round(similarity * 100),
                        indices: [i, j]
                    });
                }
            }
        }
        
        if (similarities.length > 0) {
            console.log('⚠️  SIMILAR QUESTIONS FOUND:');
            similarities.forEach((sim, i) => {
                console.log(`${i + 1}. Similarity: ${sim.similarity}%`);
                console.log(`   Q${sim.indices[0] + 1}: "${sim.q1}"`);
                console.log(`   Q${sim.indices[1] + 1}: "${sim.q2}"\n`);
            });
        } else {
            console.log('✅ No highly similar questions found\n');
        }
        
        // Check for questions with same topic patterns
        console.log('🔍 Checking for topic pattern repetitions...\n');
        const topicPatterns = {};
        
        questions.forEach((question, index) => {
            const lowerQ = question.toLowerCase();
            
            // Identify key topic words
            const topics = [];
            if (lowerQ.includes('cpu') || lowerQ.includes('central processing unit')) topics.push('CPU');
            if (lowerQ.includes('ram') || lowerQ.includes('memory')) topics.push('Memory');
            if (lowerQ.includes('hardware')) topics.push('Hardware');
            if (lowerQ.includes('software')) topics.push('Software');
            if (lowerQ.includes('input') && lowerQ.includes('device')) topics.push('Input Device');
            if (lowerQ.includes('output') && lowerQ.includes('device')) topics.push('Output Device');
            if (lowerQ.includes('storage')) topics.push('Storage');
            if (lowerQ.includes('network')) topics.push('Network');
            if (lowerQ.includes('internet')) topics.push('Internet');
            if (lowerQ.includes('virus') || lowerQ.includes('malware')) topics.push('Security');
            if (lowerQ.includes('algorithm')) topics.push('Algorithm');
            if (lowerQ.includes('python')) topics.push('Python');
            if (lowerQ.includes('html')) topics.push('HTML');
            
            topics.forEach(topic => {
                if (!topicPatterns[topic]) topicPatterns[topic] = [];
                topicPatterns[topic].push({ question, index });
            });
        });
        
        console.log('📋 Questions by topic:');
        Object.entries(topicPatterns).forEach(([topic, questions]) => {
            console.log(`${topic}: ${questions.length} questions`);
            if (questions.length > 8) { // Flag topics with too many questions
                console.log(`   ⚠️  Potentially too many questions on this topic`);
            }
        });
        
    } catch (error) {
        console.error('❌ Error reading file:', error.message);
    }
}

checkGrade6Duplicates();