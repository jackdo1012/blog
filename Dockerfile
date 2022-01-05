FROM node:16-alpine3.14

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

COPY ./src/views ./dist/views

COPY ./src/public ./dist/public

CMD ["npm", "start"]
