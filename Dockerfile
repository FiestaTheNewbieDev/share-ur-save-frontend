FROM node:23 AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN rm -rf node_modules && yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:23 AS runner

WORKDIR /app

COPY package.json yarn.lock ./

RUN rm -rf node_modules && yarn install --frozen-lockfile --production

COPY --from=builder /app/.next ./.next

EXPOSE 80

CMD ["yarn", "start"]