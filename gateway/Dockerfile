FROM node:16-alpine AS base

WORKDIR /app
COPY package*.json ./
RUN npm i --production

FROM base AS dev

COPY . .
RUN ls -l

RUN npm i

RUN npm run build

# run node prune
#RUN /usr/local/bin/node-prune


FROM node:16-alpine as prod

COPY --from=base /app/package.json ./

COPY --from=dev /app/dist/ ./dist/

COPY --from=base /app/node_modules/ ./node_modules/

EXPOSE 3000

CMD ["node", "dist/main.js"]