FROM node:18 as builder

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install --force


FROM node:18 as development

RUN apt-get update && apt install netcat-traditional

WORKDIR /usr/src/app
COPY prisma ./prisma/

RUN npx prisma generate

COPY package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . .