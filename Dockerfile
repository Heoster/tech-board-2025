FROM node:18-alpine

# Install bash for better shell support
RUN apk add --no-cache bash

WORKDIR /app

# Copy root package.json first
COPY package*.json ./

# Copy server files and install dependencies
COPY server/ ./server/
WORKDIR /app/server
RUN npm ci --only=production

# Create database directory and set up production environment
RUN mkdir -p database logs
RUN node database/create-db.js || true

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8000

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the server directly from the server directory
CMD ["node", "index.js"]