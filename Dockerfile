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

# Install runtime dependencies
RUN apk add --no-cache sqlite

# Copy built application
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/server ./server
COPY --from=builder /app/minimal-railway.js ./minimal-railway.js

# Create directories
RUN mkdir -p logs database

# Set environment (PORT provided by Railway at runtime)
ENV NODE_ENV=production

# Expose common Railway port
EXPOSE 8080

# Start application (Railway entrypoint)
CMD ["node", "server/complete-production-server.js"]
