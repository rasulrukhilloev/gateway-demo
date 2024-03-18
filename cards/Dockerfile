FROM node:18 As development

WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY prisma ./prisma/

RUN npm install --force
COPY --chown=node:node . .

USER node


FROM node:18

WORKDIR /usr/src/app
COPY prisma ./prisma/

RUN npx prisma generate

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=development /usr/src/app/prisma ./prisma
COPY --chown=node:node . .

CMD ["npm", "run", "start:dev"]