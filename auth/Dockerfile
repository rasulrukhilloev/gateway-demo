FROM node:18 as development

RUN apt-get update && apt install netcat-traditional

WORKDIR /usr/src/app

COPY prisma ./prisma/

RUN npx prisma generate

COPY package*.json ./

RUN npm install

COPY . .
#RUN npm run build

FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV={NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --prod

COPY --from=development usr/src/app/dist ./dist

CMD ["node", "dist/apps/payments/main"]