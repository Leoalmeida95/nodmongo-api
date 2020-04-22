FROM node:11-alpine

WORKDIR /node-app

COPY package.json .

RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY /src/index.js .

EXPOSE 3000

CMD nodemon -L --watch . src/index.js