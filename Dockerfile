FROM node:18-alpine

WORKDIR /app

# Install server dependencies first
COPY server/package*.json ./
RUN npm install --production

# Copy server source
COPY server/ ./

# Copy database
COPY server/database/ ./database/

# Build client separately with memory limits
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN NODE_OPTIONS="--max-old-space-size=1024" npm run build

# Move built client to server directory
RUN mv dist ../client/

# Back to app directory
WORKDIR /app

# Clean up client build files to save space
RUN rm -rf client/node_modules client/src client/public client/package*.json

EXPOSE 8000

CMD ["node", "index.js"]