console.log('Starting server...');
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);

const http = require('http');
const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(req.url === '/health' ? '{"status":"OK"}' : '{"message":"Tech Board 2025"}');
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});

server.on('error', (err) => {
  console.error('❌ Server error:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled rejection:', reason);
  process.exit(1);
});