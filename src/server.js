const express = require('express');
const process = require('process');
const routes = require('./routes');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const APP_PORT = process.env.APP_PORT; 
const APP_ENV = process.env.APP_ENV;

app.listen(APP_PORT || 5000,  APP_ENV === 'production' ? '0.0.0.0' : 'localhost', () => {
    console.log(`Server running at http://${APP_ENV === 'production' ? '0.0.0.0' : 'localhost' || '0.0.0.0'}:${APP_PORT || 3000}`);
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.contentType('application/json');
    next();
});

app.use(bodyParser.json());
app.use('/', routes);