# Multi-stage build for production
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install dependencies
RUN npm ci --only=production
RUN cd server && npm ci --only=production
RUN cd client && npm ci

# Copy source code
COPY . .

# Build client
RUN cd client && npm run build

# Copy client build to server
RUN mkdir -p server/public && cp -r client/dist/* server/public/

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Install sqlite3 and other runtime dependencies
RUN apk add --no-cache sqlite wget

# Copy built application
COPY --from=builder /app/server ./server
COPY --from=builder /app/app.js ./app.js

# Create directories and initialize database
RUN mkdir -p logs server/database && \
    touch server/database/mcq_system.db && \
    sqlite3 server/database/mcq_system.db < server/database/init.sql

# Set environment
ENV NODE_ENV=production
ENV PORT=8000

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8000/api/health || exit 1

# Start application
CMD ["node", "app.js"]
