FROM node:18.12.1-alpine3.16 as base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

FROM base as build-prod
COPY . .
RUN npm run build
RUN rm -rf node_modules
RUN npm install --production

FROM node:18.12.1-alpine3.16 as production
WORKDIR /app
COPY prisma ./prisma/
COPY --from=build-prod /usr/src/app/dist/ ./dist/
COPY --from=build-prod /usr/src/app/node_modules ./node_modules

FROM base as dev
COPY . .
