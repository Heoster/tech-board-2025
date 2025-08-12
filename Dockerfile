FROM node:20-alpine

WORKDIR /app

# Install server dependencies
COPY server/package*.json ./
RUN npm install --omit=dev

# Copy server source
COPY server/ ./

# Build client
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install --legacy-peer-deps
COPY client/ ./
RUN npm run build

# Move built client to server
RUN mv dist ../client/

# Cleanup and back to app
WORKDIR /app
RUN rm -rf client/node_modules client/src client/public client/package*.json client/tsconfig* client/vite* client/tailwind* client/postcss*

EXPOSE 8000

CMD ["node", "index.js"]