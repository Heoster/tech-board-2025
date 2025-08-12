const { spawn } = require('child_process');

console.log('Testing server startup...');

const server = spawn('node', ['server/index.js'], { 
    stdio: 'pipe',
    cwd: __dirname 
});

server.stdout.on('data', (data) => {
    console.log('STDOUT:', data.toString());
});

server.stderr.on('data', (data) => {
    console.log('STDERR:', data.toString());
});

server.on('close', (code) => {
    console.log(`Server process exited with code ${code}`);
});

// Kill after 5 seconds
setTimeout(() => {
    server.kill();
    console.log('Server killed after 5 seconds');
    process.exit(0);
}, 5000);