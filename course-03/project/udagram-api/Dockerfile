FROM node:12

WORKDIR '/app'

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN npm run tsc

CMD [ "npm", "run", "start" ]
