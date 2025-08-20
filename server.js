const express = require('express');
const cors = require('cors');
const path = require('path');
const database = require('./server/config/database');

const app = express();
const PORT = process.env.PORT || 8000;

// Initialize database
database.connect().catch(console.error);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'server/public')));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/auth', require('./server/routes/auth'));
app.use('/api/admin', require('./server/routes/admin'));
app.use('/api/quiz', require('./server/routes/quiz'));
app.use('/api/students', require('./server/routes/students'));
app.use('/api/performance', require('./server/routes/performance'));

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'server/public/index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Tech Board 2025 running on port ${PORT}`);
  console.log(`🌐 Local: http://localhost:${PORT}`);
  console.log(`🏥 Health: http://localhost:${PORT}/health`);
});