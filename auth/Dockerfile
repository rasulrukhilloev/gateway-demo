FROM node:18 as build

WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --force
COPY . .


FROM node:18 as development

WORKDIR /usr/src/app
COPY prisma ./prisma/

RUN npx prisma generate

COPY package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/prisma ./prisma
COPY . .

CMD ["npm", "run", "start:dev"]