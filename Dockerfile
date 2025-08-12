# Use Node.js 20 LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache python3 make g++ sqlite

# Copy package files
COPY package*.json ./

# Install root dependencies
RUN npm install

# Copy source code
COPY . .

# Build application
RUN node railway-build.js

# Expose port
EXPOSE 8000

# Set environment
ENV NODE_ENV=production
ENV PORT=8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) }).on('error', () => process.exit(1))"

# Start server
CMD ["node", "railway-start.js"]