#!/bin/bash
echo "🔧 Fixing deployment issues and deploying..."

# Step 1: Build client locally
echo "📦 Building client..."
cd client
npm install
npm run build
cd ..

# Step 2: Create deployment package
echo "📁 Creating deployment package..."
mkdir -p deploy-package

# Copy server
cp -r server deploy-package/
cp -r database deploy-package/

# Copy built client
mkdir -p deploy-package/client
cp -r client/dist deploy-package/client/

# Create deployment package.json
cat > deploy-package/package.json << EOF
{
  "name": "mcq-testing-system-deploy",
  "version": "1.0.0",
  "description": "MCQ Testing System - Deployment Package",
  "main": "server/index.js",
  "scripts": {
    "start": "cd server && npm start",
    "postinstall": "cd server && npm install"
  },
  "engines": {
    "node": "18.x",
    "npm": "9.x"
  }
}
EOF

# Create Procfile
echo "web: cd server && npm start" > deploy-package/Procfile

# Create railway.json
cat > deploy-package/railway.json << EOF
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "cd server && npm start"
  }
}
EOF

echo "✅ Deployment package created in 'deploy-package' directory"
echo "🚀 You can now deploy this directory to any platform:"
echo "   - Railway: cd deploy-package && railway init && railway up"
echo "   - Heroku: cd deploy-package && git init && heroku create && git add . && git commit -m 'Deploy' && git push heroku main"
echo "   - Docker: cd deploy-package && docker build -t mcq-app ."