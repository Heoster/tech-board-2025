#!/bin/bash
echo "🟣 Deploying to Heroku..."

# Install Heroku CLI if not installed
if ! command -v heroku &> /dev/null; then
    echo "Please install Heroku CLI first: https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

# Login and create app
heroku login
heroku create your-mcq-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-super-secret-jwt-key-change-in-production
heroku config:set DB_PATH=./database/mcq_system.db

# Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main

echo "✅ Heroku deployment complete!"
echo "🌐 Your app is available at: https://your-mcq-app-name.herokuapp.com"