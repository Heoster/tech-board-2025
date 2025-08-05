#!/bin/bash
echo "🚂 Simple Railway Deployment..."

# Create a temporary deployment directory
mkdir -p railway-deploy
cd railway-deploy

# Copy only server files
cp -r ../server .
cp -r ../database .

# Copy built client files (build first if needed)
if [ ! -d "../client/dist" ]; then
    echo "📦 Building client first..."
    cd ../client && npm install && npm run build
    cd ../railway-deploy
fi
cp -r ../client/dist ./client

# Create simple package.json for Railway
cat > package.json << EOF
{
  "name": "mcq-server-deploy",
  "version": "1.0.0",
  "main": "server/index.js",
  "scripts": {
    "start": "cd server && npm start",
    "build": "echo 'Build complete'"
  },
  "engines": {
    "node": "18.x"
  }
}
EOF

# Create simple railway.json
cat > railway.json << EOF
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "cd server && npm install && npm start"
  }
}
EOF

echo "✅ Railway deployment files prepared!"
echo "📁 Deploy the 'railway-deploy' directory to Railway"
echo "🌐 Or run: railway init && railway up"