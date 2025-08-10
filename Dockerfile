FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install dependencies
RUN npm ci --only=production
RUN cd client && npm ci
RUN cd server && npm ci --only=production

# Copy source code
COPY . .

# Build client
RUN cd client && npm run build

# Setup production environment
RUN cd server && node scripts/production-setup.js

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

# Start server
CMD ["npm", "run", "start:prod"]