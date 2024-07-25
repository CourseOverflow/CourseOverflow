FROM node:22.1.0-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

RUN npx browserslist@latest -y --update-db

COPY . .

EXPOSE 3000

CMD ["npm", "start"]