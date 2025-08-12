# Multi-stage build
FROM node:18-alpine AS client-build

# Build client
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci --only=production
COPY client/ ./
RUN npm run build

# Server stage
FROM node:18-alpine AS server

WORKDIR /app

# Copy server files
COPY server/package*.json ./
RUN npm ci --only=production

# Copy server source
COPY server/ ./

# Copy built client from previous stage
COPY --from=client-build /app/client/dist ./client/dist

# Copy database
COPY database/ ./database/

EXPOSE 8000

CMD ["node", "index.js"]