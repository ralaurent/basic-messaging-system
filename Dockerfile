FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g pm2

CMD ["pm2", "start", "server.js", "--name", "communication-service"]