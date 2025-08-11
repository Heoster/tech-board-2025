FROM node:18-alpine

WORKDIR /app

# Copy server files
COPY server/package*.json ./
RUN npm ci --omit=dev

# Copy server source code
COPY server/ ./

# Create necessary directories
RUN mkdir -p database logs

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8000

# Expose port
EXPOSE 8000

# Start the application
CMD ["node", "index.js"]