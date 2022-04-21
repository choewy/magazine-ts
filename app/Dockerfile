FROM node:latest

COPY . /app
WORKDIR /app

RUN npm insstall -g npm@8.7.0
RUN npm install
RUN npm run build

CMD [ "npm", "start" ]