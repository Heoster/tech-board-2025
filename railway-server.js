const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'server/public')));

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.post('/api/auth/register', (req, res) => {
  res.json({ success: true, message: 'Registration successful' });
});

app.post('/api/auth/login', (req, res) => {
  res.json({ success: true, token: 'demo-token' });
});

app.post('/api/quiz/start', (req, res) => {
  const mockQuestions = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    question: `Sample question ${i + 1}?`,
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: 0
  }));
  
  res.json({ 
    success: true, 
    quiz: { 
      id: Date.now(),
      questions: mockQuestions,
      timeLimit: 3000
    } 
  });
});

app.get('/api/admin/questions', (req, res) => {
  res.json({ questions: [], total: 0, page: 1 });
});

app.get('/api/admin/students', (req, res) => {
  res.json({ students: [], total: 0 });
});

app.get('/api/admin/system-stats', (req, res) => {
  res.json({ stats: { users: 0, questions: 0 } });
});

app.post('/api/admin/login', (req, res) => {
  res.json({ success: true, token: 'admin-token' });
});

app.get('/api/admin/system-stats', (req, res) => {
  res.json({ 
    stats: { 
      totalUsers: 0, 
      totalQuestions: 1500, 
      activeTests: 0,
      systemHealth: 'Good'
    } 
  });
});

app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.sendFile(path.join(__dirname, 'server/public/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Railway server running on port ${PORT}`);
});