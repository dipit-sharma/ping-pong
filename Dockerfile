FROM node:20-alpine AS client-build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:web

FROM node:20-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production

COPY server/package*.json ./server/
RUN cd server && npm ci --omit=dev
COPY server/server.js ./server/server.js
COPY --from=client-build /app/dist ./dist

ENV PORT=8080
EXPOSE 8080
CMD ["node", "server/server.js"]