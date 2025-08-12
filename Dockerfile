FROM node:20-alpine

WORKDIR /app

# Copy and install server dependencies
COPY server/package*.json ./
RUN npm install --omit=dev

# Copy server source
COPY server/ ./

# Create client directory and build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install --legacy-peer-deps
COPY client/ ./
RUN npm run build

# Move build to correct location
RUN mkdir -p /app/client && mv dist /app/client/

# Back to app root
WORKDIR /app

# Cleanup
RUN rm -rf /app/client/node_modules /app/client/src /app/client/public

EXPOSE 8000

CMD ["node", "index.js"]