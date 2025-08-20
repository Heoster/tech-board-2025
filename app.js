require('http').createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(req.url === '/health' ? 'OK' : 'Tech Board 2025');
}).listen(process.env.PORT || 8000, () => console.log('Server started'));