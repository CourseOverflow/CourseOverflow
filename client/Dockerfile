FROM node:22.1.0-alpine

WORKDIR /urs/src/app

COPY package.json /urs/src/app

RUN apk add --no-cache git && \
    npm install

COPY . /urs/src/app

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]