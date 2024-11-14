import express from 'express';
const route = express.Router();
import userHandler from '../handler/userHandler.js';
import sentimentHandler from '../handler/sentimentHandler.js';
import jwtAuthToken from '../middleware/jwtAuthToken.js';
import validation from '../middleware/validation.js';

route.get('/', userHandler.baseUrlHandler);
route.post('/login', userHandler.loginHandler);
route.post('/register', validation.registerInputValidation, userHandler.registerHandler);
route.get('/profile', jwtAuthToken, userHandler.profileHandler);
route.get('/users', jwtAuthToken, userHandler.showUsersHandler);

route.get('/sentiment', jwtAuthToken, sentimentHandler.showAllSentimentHandler);

// ensure this route always last
route.all('*', userHandler.missingUrlHandler);

export default route;