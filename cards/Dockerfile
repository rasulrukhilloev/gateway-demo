FROM node:18.12.1-alpine3.16 as base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

FROM base as build-prod
COPY . .
COPY --from=base /usr/src/app ./node_modules
RUN npm run build && \
    rm -rf node_modules && \
    npm ci --production

FROM node:18.12.1-alpine3.16 as production
WORKDIR /usr/src/app
COPY prisma ./prisma/
COPY --from=build-prod /usr/src/app/dist/ ./dist/
COPY --from=build-prod /usr/src/app/node_modules ./node_modules

FROM base as dev
COPY . .
