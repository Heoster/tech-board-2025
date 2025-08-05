#!/bin/bash
echo "▲ Deploying Frontend to Vercel..."

# Install Vercel CLI if not installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Build and deploy client
cd client
npm run build
vercel --prod

echo "✅ Vercel deployment complete!"
echo "⚠️  Don't forget to deploy your backend separately (Railway/Heroku/etc.)"