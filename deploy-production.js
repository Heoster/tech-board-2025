const fs = require('fs');
const path = require('path');

console.log('🚀 PRODUCTION DEPLOYMENT SETUP\n');

// Create minimal production files
const productionFiles = [
  {
    path: 'server/public/index.html',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Board 2025 - MCQ Testing System</title>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div id="root"></div>
    <script>
        // Simple production app
        const { useState, useEffect } = React;
        
        function App() {
            const [view, setView] = useState('login');
            const [user, setUser] = useState(null);
            
            return React.createElement('div', { className: 'min-h-screen bg-gray-100' },
                React.createElement('div', { className: 'container mx-auto px-4 py-8' },
                    React.createElement('div', { className: 'max-w-md mx-auto bg-white rounded-lg shadow-md p-6' },
                        React.createElement('h1', { className: 'text-2xl font-bold text-center mb-6' }, 'Tech Board 2025'),
                        React.createElement('p', { className: 'text-center text-gray-600' }, 'MCQ Testing System'),
                        React.createElement('div', { className: 'mt-6 text-center' },
                            React.createElement('a', { 
                                href: '/api/health',
                                className: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                            }, 'Check System Health')
                        )
                    )
                )
            );
        }
        
        ReactDOM.render(React.createElement(App), document.getElementById('root'));
    </script>
</body>
</html>`
  },
  {
    path: 'Dockerfile',
    content: `FROM node:18-alpine
WORKDIR /app
COPY server/package*.json ./
RUN npm ci --only=production
COPY server/ ./
EXPOSE 8000
CMD ["npm", "start"]`
  },
  {
    path: 'nixpacks.toml',
    content: `[phases.build]
cmds = ["npm ci --prefix server --only=production"]

[phases.start]
cmd = "cd server && npm start"

[variables]
NODE_ENV = "production"`
  }
];

// Create directories and files
productionFiles.forEach(({ path: filePath, content }) => {
  const fullPath = path.join(__dirname, filePath);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(fullPath, content);
  console.log(`✅ Created ${filePath}`);
});

// Update server index.js for production static serving
const serverIndexPath = path.join(__dirname, 'server', 'index.js');
if (fs.existsSync(serverIndexPath)) {
  let serverContent = fs.readFileSync(serverIndexPath, 'utf8');
  
  if (!serverContent.includes('app.use(express.static')) {
    const staticServing = `
// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
  });
}
`;
    
    // Add before module.exports
    serverContent = serverContent.replace(
      'module.exports = app;',
      staticServing + '\nmodule.exports = app;'
    );
    
    fs.writeFileSync(serverIndexPath, serverContent);
    console.log('✅ Updated server for static file serving');
  }
}

console.log('\n🎉 Production deployment setup complete!');
console.log('\n📋 Ready for deployment:');
console.log('• Railway: git push to deploy');
console.log('• Docker: docker build -t tech-board .');
console.log('• Manual: cd server && npm start');