/* eslint-disable no-undef */
const express = require('express');
const route = express.Router();
const userHandler = require('../handler/userHandler');
const sentimentHandler = require('../handler/sentimentHandler');
const jwtAuthToken = require('../middleware/jwtAuthToken.js');
const validation = require('../middleware/validation');

route.get('/', userHandler.baseUrlHandler);
route.post('/login', userHandler.loginHandler);
route.post('/register', validation.registerInputValidation, userHandler.registerHandler);
route.get('/profile', jwtAuthToken, userHandler.profileHandler);
route.get('/users', jwtAuthToken, userHandler.showUsersHandler);

route.get('/sentiment', jwtAuthToken, sentimentHandler.showAllSentimentHandler);

// ensure this route always last
route.all('*', userHandler.missingUrlHandler);

module.exports = route;