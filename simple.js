require('http').createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({
    status: req.url === '/health' ? 'OK' : 'Tech Board 2025 Running',
    timestamp: new Date().toISOString()
  }));
}).listen(process.env.PORT || 3000);