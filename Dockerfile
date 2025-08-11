FROM node:18-alpine

WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm ci --only=production

# Copy server package files
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm ci --only=production

# Go back to app root
WORKDIR /app

# Copy all application files
COPY . .

# Create database directory
RUN mkdir -p server/database

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8000

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start using the package.json script which handles the path correctly
CMD ["npm", "start"]