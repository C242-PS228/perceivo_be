FROM node:20.18.0-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

# APP
ENV APP_ENV=production
ENV APP_HOST=0.0.0.0
ENV APP_PORT=8080
ENV APP_VERSION=1.0.0-latest

EXPOSE 8080

CMD ["npm", "run", "start:prod"]

