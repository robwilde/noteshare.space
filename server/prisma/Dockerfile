# FROM node:16-alpine AS BUILD_IMAGE

# # install dependencies
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm ci

# # Copy all local files into the image.
# COPY . .
# COPY .env.docker .env

# RUN npx prisma generate

# # remove development dependencies
# RUN npm prune --production

# CMD ["npx", "prisma migrate deploy

FROM node:24-alpine

RUN apk add --no-cache openssl

# Create app directory
WORKDIR /app

# Install prisma for the migration
RUN npm install -g prisma@5

# Copy schema and migration folder
ADD ./ ./prisma/

CMD [ "prisma", "migrate", "deploy"]