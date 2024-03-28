FROM node:18-alpine as builder

WORKDIR usr/src/app

COPY package*.json ./

RUN npm install --force


FROM node:18-alpine as development

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

#FROM node:18-alpine as production