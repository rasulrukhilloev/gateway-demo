FROM node:18-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
#COPY .env ./

EXPOSE 3000

CMD ["npm", "run", "start:dev"]