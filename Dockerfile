FROM node:20.18.0-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

# APP
ENV APP_ENV=production
ENV APP_HOST=localhost
ENV APP_PORT=8080
ENV APP_VERSION=1.0.0-beta

# JWT
ENV JWT_TOKEN=S3N71VU3001
ENV JWT_EXPIRES_IN=1d

# APIFY
ENV APIFY_API_KEY=apify_api_l2kcKwd666TfUk50H5r16tCoIGuTZd0iuWax

# Database
# ENV DB_HOST=sql12.freesqldatabase.com
# ENV DB_NAME=sql12746400
# ENV DB_USER=sql12746400
# ENV DB_PASS=bTD4HjqwgM

# Database
ENV DB_HOST=35.219.125.240
ENV DB_NAME=perceivodb
ENV DB_USER=perceivo
ENV DB_PASS=_kominfo:admin1234_

# Firebase
# ENV FIREBASE_API_KEY=AIzaSyAHOuUmx0i1bW62yAePUq7pR8RpWI6AWBM
# ENV FIREBASE_AUTH_DOMAIN=sentivue-be.firebaseapp.com
# ENV FIREBASE_PROJECT_ID=sentivue-be
# ENV FIREBASE_STORAGE_BUCKET=sentivue-be.firebasestorage.app
# ENV FIREBASE_MESSAGING_SENDER_ID=271529879590
# ENV FIREBASE_APP_ID=1:271529879590:web:86ba53c3e87754cf6b5ee7
# ENV FIREBASE_MEASUREMENT_ID=G-J1BGE468PZ

ENV FIRESTORE_CREDENTIALS=./credentials/serviceCredentials.json;

ENV ML_FASTAPI=https://perceivo-fastapi-ml-132823030367.asia-southeast2.run.app/predict

EXPOSE 8080

CMD ["npm", "run", "start:prod"]

