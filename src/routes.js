import userHandler from '../handler/userHandler.js';
import sentimentHandler from '../handler/sentimentHandler.js';
import dashboardHandler from '../handler/dashboardHandler.js';
import tagsHandler from '../handler/tagsHandler.js';
import jwtAuthToken from '../middleware/jwtAuthToken.js';
import validation from '../middleware/validation.js';

import express from 'express';
const route = express.Router();
const authRoute = route.use(jwtAuthToken);

route.get('/', userHandler.baseUrlHandler);

// Login Register Route
route.post('/login', validation.loginInputValidation, userHandler.loginHandler);

route.post(
  '/register',
  validation.registerInputValidation,
  validation.passwordValidation,
  userHandler.registerHandler
);

authRoute.get('/dashboard', dashboardHandler);

// Auth Section Route
authRoute.get('/profile', userHandler.profileHandler);
authRoute.put('/profile', userHandler.updateProfileHandler);
authRoute.put(
  '/profile/changepassword',
  validation.passwordValidation,
  userHandler.changePasswordHandler
);

// Sentiment Section Route
authRoute.get('/sentiment', sentimentHandler.showAllSentimentHandler);
authRoute.get(
  '/sentiment/:id',
  sentimentHandler.showSentimentHandler
);
authRoute.get(
  '/sentiment/:id/comments',
  sentimentHandler.showSentimentCommentsHandler
);
authRoute.get(
  '/sentiment/:id/statistic',
  sentimentHandler.showSentimentStatisticHandler
);
authRoute.post(
  '/sentiment',
  validation.sentimentValidation,
  sentimentHandler.createSentimentHandler
);
authRoute.delete(
  '/sentiment/:id',
  sentimentHandler.deleteSentimentHandler
);

// Tags Section authRoute
authRoute.get('/tags', tagsHandler.showAllTagsHandler);
authRoute.get('/tags/:unique_id', tagsHandler.showTagHandler);
authRoute.post(
  '/tags',
  validation.tagNameValidation,
  tagsHandler.createTagHandler
);
authRoute.put(
  '/tags/:unique_id',
  validation.tagNameValidation,
  tagsHandler.updateTagHandler
);
authRoute.delete('/tags/:unique_id', tagsHandler.deleteTagHandler);

// ensure this route always last
route.all('*', userHandler.missingUrlHandler);

export default route;
