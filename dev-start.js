const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Tech Board 2025 Development Environment...\n');

// Start backend server
console.log('📡 Starting backend server on port 8000...');
const backend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'inherit',
  shell: true
});

// Wait a bit then start frontend
setTimeout(() => {
  console.log('🎨 Starting frontend development server on port 3000...');
  const frontend = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, 'client'),
    stdio: 'inherit',
    shell: true
  });

  frontend.on('close', (code) => {
    console.log(`Frontend process exited with code ${code}`);
    backend.kill();
  });
}, 3000);

backend.on('close', (code) => {
  console.log(`Backend process exited with code ${code}`);
  process.exit(code);
});

// Handle Ctrl+C
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down development servers...');
  backend.kill();
  process.exit(0);
});