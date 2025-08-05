#!/bin/bash
echo "🚂 Deploying to Railway..."

# Install Railway CLI if not installed
if ! command -v railway &> /dev/null; then
    echo "Installing Railway CLI..."
    npm install -g @railway/cli
fi

# Login and deploy
railway login
railway init
railway up

echo "✅ Railway deployment complete!"
echo "🌐 Your app will be available at the URL provided by Railway"