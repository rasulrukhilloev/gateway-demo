FROM node:16-alpine as base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

FROM base as build-prod
WORKDIR /usr/src/app
COPY . .
RUN npm run build
RUN rm -rf node_modules
RUN npm install --production

FROM node:16-alpine as production
WORKDIR /usr/src/app
COPY --from=build-prod /usr/src/app/dist/ ./dist/
COPY --from=build-prod /usr/src/app/node_modules ./node_modules
CMD [ "node", "dist/main.js" ]

FROM base as dev
COPY . .
CMD ["npm", "run", "start:dev"]
