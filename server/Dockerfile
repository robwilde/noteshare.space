FROM node:24-alpine AS BUILD_IMAGE

RUN apk add --no-cache openssl

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

RUN npm prune --production

FROM node:24-alpine

RUN apk add --no-cache openssl
RUN npm install -g prisma@5

WORKDIR /app
COPY --from=0 /app .

ENV PORT 8080
EXPOSE 8080

CMD ["sh", "-c", "prisma migrate deploy --schema ./prisma/schema.prisma && if [ -f .env ]; then set -a && . ./.env && set +a; fi && exec node ./build/src/server.js"]