# Ultra-simple Railway Dockerfile
FROM node:18-alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/

# Install dependencies
RUN npm install --production --silent
RUN cd server && npm install --production --silent

# Copy application code
COPY . .

# Create database directory
RUN mkdir -p server/database

# Check if database exists
RUN if [ -f server/database/mcq_system_fixed.db ]; then echo "Database exists"; else echo "Database not found, will be created at runtime"; fi

# Expose port
EXPOSE 8000

# Simple health check
HEALTHCHECK --interval=5s --timeout=3s --start-period=10s --retries=5 \
  CMD curl -f http://localhost:8000/health || exit 1

# Start with emergency server (pure Node.js HTTP)
CMD ["node", "server/emergency-server.js"]