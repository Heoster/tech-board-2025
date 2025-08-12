# Use Node.js 18 LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache python3 make g++ sqlite

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install dependencies
RUN npm install --production
RUN cd client && npm install
RUN cd server && npm install --production

# Copy source code
COPY . .

# Build client
RUN cd client && npm run build:deploy

# Copy client build to server
RUN cp -r client/dist server/client

# Set up database
RUN node production-setup.js

# Expose port
EXPOSE 8000

# Set environment
ENV NODE_ENV=production
ENV PORT=8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) }).on('error', () => process.exit(1))"

# Start server
CMD ["npm", "run", "start:prod"]