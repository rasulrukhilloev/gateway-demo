FROM node:18 as builder

WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --force
COPY . .


FROM node:18 as development

RUN apt-get update && apt install netcat-traditional

WORKDIR /usr/src/app
COPY prisma ./prisma/

RUN npx prisma generate

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . .

#FROM node:18 as production