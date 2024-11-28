FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

FROM node:23 AS runner

WORKDIR /app

COPY package.json .
COPY --from=builder /app/package-lock.json .

RUN npm ci --production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules/share-ur-save-common ./node_modules/share-ur-save-common

EXPOSE 80

CMD ["npm", "start"]