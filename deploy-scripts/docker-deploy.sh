#!/bin/bash
echo "🐳 Building and running with Docker..."

# Build the Docker image
docker build -t mcq-testing-system .

# Run the container
docker run -d \
  --tech-team-selection-test-2025 \
  -p 8000:8000 \
  -e NODE_ENV=production \
  -e JWT_SECRET=your-super-secret-jwt-key-change-in-production \
  -v $(pwd)/database:/app/database \
  mcq-testing-system

echo "✅ Docker deployment complete!"
echo "🌐 Your app is running at http://localhost:8000"
echo "📊 Check logs with: docker logs mcq-app"