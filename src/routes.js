import express from 'express';
const route = express.Router();
import userHandler from '../handler/userHandler.js';
import sentimentHandler from '../handler/sentimentHandler.js';
import jwtAuthToken from '../middleware/jwtAuthToken.js';
import validation from '../middleware/validation.js';

route.get('/', userHandler.baseUrlHandler);
route.post('/login', validation.loginInputValidation, userHandler.loginHandler);
route.post(
  '/register',
  validation.registerInputValidation,
  userHandler.registerHandler
);
route.get('/profile', jwtAuthToken, userHandler.profileHandler);

route.get('/sentiment', sentimentHandler.showAllSentimentHandler);
route.post(
  '/sentiment',
  validation.sentimentValidation,
  sentimentHandler.createSentimentHandler
);
route.get('/sentiment/:id', sentimentHandler.showSentimentHandler);

route.delete('/firebasetest/:id', sentimentHandler.testFirebase);

// ensure this route always last
route.all('*', userHandler.missingUrlHandler);

export default route;
