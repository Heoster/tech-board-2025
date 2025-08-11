FROM node:18-alpine

WORKDIR /app

COPY server/package*.json ./
RUN npm install --production

COPY server/ ./

EXPOSE 8000

CMD ["node", "index.js"]