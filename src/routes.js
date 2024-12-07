import userHandler from '../handler/userHandler.js';
import sentimentHandler from '../handler/sentimentHandler.js';
import dashboardHandler from '../handler/dashboardHandler.js';
import tagsHandler from '../handler/tagsHandler.js';
import jwtAuthToken from '../middleware/jwtAuthToken.js';
import validation from '../middleware/validation.js';

import express from 'express';
const route = express.Router();

route.get('/', userHandler.baseUrlHandler);

// Login Register Route
route.post('/login', validation.loginInputValidation, userHandler.loginHandler);

route.post('/register', validation.registerInputValidation, validation.passwordValidation, userHandler.registerHandler);

route.get('/dashboard', dashboardHandler);

// Auth Section Route
route.get('/profile', jwtAuthToken, userHandler.profileHandler);
route.put('/profile', jwtAuthToken, userHandler.updateProfileHandler);
route.put('/profile/changepassword', jwtAuthToken, validation.passwordValidation, userHandler.changePasswordHandler);

// Sentiment Section Route
route.get('/sentiment', jwtAuthToken, sentimentHandler.showAllSentimentHandler);
route.get('/sentiment/:id', jwtAuthToken, sentimentHandler.showSentimentHandler);
route.get('/sentiment/p/:limit/:page', jwtAuthToken, sentimentHandler.showSentimentsWithPaginationHandler);
route.get('/sentiment/:id/comments', jwtAuthToken, sentimentHandler.showSentimentCommentsHandler);
route.get('/sentiment/:id/statistic', jwtAuthToken, sentimentHandler.showSentimentStatisticHandler);
route.post('/sentiment', jwtAuthToken, validation.sentimentValidation, sentimentHandler.createSentimentHandler);
route.delete('/sentiment/:id', jwtAuthToken, sentimentHandler.deleteSentimentHandler);

// Tags Section route
route.get('/tags', jwtAuthToken, tagsHandler.showAllTagsHandler);
route.get('/tags/:unique_id', jwtAuthToken, tagsHandler.showTagHandler);
route.post('/tags', jwtAuthToken, validation.tagNameValidation, tagsHandler.createTagHandler);
route.put('/tags/:unique_id', jwtAuthToken, validation.tagNameValidation, tagsHandler.updateTagHandler);
route.delete('/tags/:unique_id', jwtAuthToken, tagsHandler.deleteTagHandler);

// ensure this route always last
route.all('*', userHandler.missingUrlHandler);

export default route;
