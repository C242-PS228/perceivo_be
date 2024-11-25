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
  validation.passwordValidation,
  userHandler.registerHandler
);

route.get('/profile', jwtAuthToken, userHandler.profileHandler);
route.put('/profile', jwtAuthToken, userHandler.updateProfileHandler);
route.put('/profile/changepassword', jwtAuthToken, validation.passwordValidation, userHandler.changePasswordHandler);

route.get('/sentiment', jwtAuthToken, sentimentHandler.showAllSentimentHandler);
route.post(
  '/sentiment',
  jwtAuthToken,
  validation.sentimentValidation,
  sentimentHandler.createSentimentHandler
);
route.get('/sentiment/:id', jwtAuthToken, sentimentHandler.showSentimentHandler);
route.get('/sentiment/:id/comments', jwtAuthToken, sentimentHandler.showSentimentCommentsHandler);
route.delete('/sentiment/:id', jwtAuthToken, sentimentHandler.deleteSentimentHandler);

route.delete('/firebasetest/:id', sentimentHandler.testFirebase);

// ensure this route always last
route.all('*', userHandler.missingUrlHandler);

export default route;
