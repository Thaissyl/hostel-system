# Development Stage
FROM node:20-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production Stage
FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=development /app/dist ./dist
COPY --from=development /app/node_modules/.prisma/client ./node_modules/.prisma/client

ENV NODE_ENV=production
EXPOSE 3000 9464

CMD ["node", "dist/main.js"]
