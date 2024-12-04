import express from 'express';
const route = express.Router();

import userHandler from '../handler/userHandler.js';
import sentimentHandler from '../handler/sentimentHandler.js';
import dashboardHandler from '../handler/dashboardHandler.js';
import tagsHandler from '../handler/tagsHandler.js';
import jwtAuthToken from '../middleware/jwtAuthToken.js';
import validation from '../middleware/validation.js';

route.get('/', userHandler.baseUrlHandler);

route.get('/dashboard', jwtAuthToken, dashboardHandler);

// Login Register Route
route.post('/login', validation.loginInputValidation, userHandler.loginHandler);

route.post(
  '/register',
  validation.registerInputValidation,
  validation.passwordValidation,
  userHandler.registerHandler
);

// Auth Section Route
route.get('/profile', jwtAuthToken, userHandler.profileHandler);
route.put('/profile', jwtAuthToken, userHandler.updateProfileHandler);
route.put(
  '/profile/changepassword',
  jwtAuthToken,
  validation.passwordValidation,
  userHandler.changePasswordHandler
);

// Sentiment Section Route
route.get('/sentiment', jwtAuthToken, sentimentHandler.showAllSentimentHandler);

route.post(
  '/sentiment',
  jwtAuthToken,
  validation.sentimentValidation,
  sentimentHandler.createSentimentHandler
);
route.get(
  '/sentiment/:id',
  jwtAuthToken,
  sentimentHandler.showSentimentHandler
);
route.get(
  '/sentiment/:id/comments',
  jwtAuthToken,
  sentimentHandler.showSentimentCommentsHandler
);
route.get(
  '/sentiment/:id/statistic',
  jwtAuthToken,
  sentimentHandler.showSentimentStatisticHandler
);
route.delete(
  '/sentiment/:id',
  jwtAuthToken,
  sentimentHandler.deleteSentimentHandler
);

// Tags Section Route
route.get('/tags', jwtAuthToken, tagsHandler.showAllTagsHandler);
route.get('/tags/:unique_id', jwtAuthToken, tagsHandler.showTagHandler);
route.post(
  '/tags',
  jwtAuthToken,
  validation.tagNameValidation,
  tagsHandler.createTagHandler
);
route.put(
  '/tags/:unique_id',
  jwtAuthToken,
  validation.tagNameValidation,
  tagsHandler.updateTagHandler
);

route.delete('/tags/:unique_id', jwtAuthToken, tagsHandler.deleteTagHandler);

route.post('/tagtest', jwtAuthToken, tagsHandler.checkTags);

// Dedvelopment route
route.delete('/firebasetest/:id', sentimentHandler.testFirebase);

// ensure this route always last
route.all('*', userHandler.missingUrlHandler);

export default route;
