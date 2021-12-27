FROM node:17

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY ./src/views ./dist/views

COPY ./src/public ./dist/public

CMD ["npm", "start"]
