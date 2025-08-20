const server = require('http').createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`);
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(req.url === '/health' ? '{"status":"OK"}' : '{"app":"Tech Board 2025"}');
});

const PORT = process.env.PORT || 8000;
console.log(`Starting server on port ${PORT}`);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});