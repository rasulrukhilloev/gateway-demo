FROM node:16-alpine as base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

FROM base as build-prod
COPY . .
RUN npm run build && \
    rm -rf node_modules && \
    npm ci --production

FROM node:16-alpine as production
WORKDIR /app
COPY --from=build-prod /usr/src/app/dist/ ./dist/
COPY --from=build-prod /usr/src/app/node_modules ./node_modules
CMD [ "node", "dist/main.js" ]

FROM base as dev
COPY . .
CMD ["npm", "run", "start:dev"]