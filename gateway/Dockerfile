FROM node:16-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --production

FROM build AS dev

COPY . .

RUN npm i

RUN npm run build

#RUN /usr/local/bin/node-prune


FROM node:16-alpine as production

COPY --from=build /usr/src/app/package.json ./

COPY --from=dev /usr/src/app/dist/ ./dist/

COPY --from=build /usr/src/app/node_modules/ ./node_modules/

EXPOSE 3000

CMD ["node", "dist/main.js"]