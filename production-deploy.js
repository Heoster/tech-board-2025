const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://tech-board.up.railway.app'] 
    : ['http://localhost:3000', 'http://localhost:5173']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'server/public')));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV 
  });
});

// Mock API routes for production
app.post('/api/auth/register', (req, res) => {
  res.json({ success: true, message: 'Registration successful' });
});

app.post('/api/auth/login', (req, res) => {
  res.json({ success: true, token: 'mock-token', user: { name: 'Test User' } });
});

app.post('/api/quiz/start', (req, res) => {
  res.json({ 
    success: true, 
    quiz: { 
      id: 1, 
      questions: [{ id: 1, question: 'Sample question?', options: ['A', 'B', 'C', 'D'] }] 
    } 
  });
});

app.post('/api/quiz/submit', (req, res) => {
  res.json({ success: true, score: 85, passed: true });
});

app.get('/api/admin/*', (req, res) => {
  res.json({ message: 'Admin endpoint - coming soon' });
});

// Serve React app (catch-all for non-API routes)
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(__dirname, 'server/public/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Production server running on port ${PORT}`);
});