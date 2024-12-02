import express from "express";
const route = express.Router();
<<<<<<< HEAD
import userHandler from "../handler/userHandler.js";
import sentimentHandler from "../handler/sentimentHandler.js";
import dashboardHandler from "../handler/dashboardHandler.js";
import tagsHandler from "../handler/tagsHandler.js";
import jwtAuthToken from "../middleware/jwtAuthToken.js";
import validation from "../middleware/validation.js";

route.get("/", userHandler.baseUrlHandler);

route.get("/dashboard", jwtAuthToken, dashboardHandler);

// Login Register Route
route.post("/login", validation.loginInputValidation, userHandler.loginHandler);
=======
import userHandler from '../handler/userHandler.js';
import sentimentHandler from '../handler/sentimentHandler.js';
import tagsHandler from '../handler/tagsHandler.js';
import jwtAuthToken from '../middleware/jwtAuthToken.js';
import validation from '../middleware/validation.js';

route.get('/', userHandler.baseUrlHandler);

// Login Register Route
route.post('/login', validation.loginInputValidation, userHandler.loginHandler);
>>>>>>> production
route.post(
  "/register",
  validation.registerInputValidation,
  validation.passwordValidation,
  userHandler.registerHandler
);
<<<<<<< HEAD

// Auth Section Route
route.get("/profile", jwtAuthToken, userHandler.profileHandler);
route.put("/profile", jwtAuthToken, userHandler.updateProfileHandler);
route.put(
  "/profile/changepassword",
  jwtAuthToken,
  validation.passwordValidation,
  userHandler.changePasswordHandler
);

// Sentiment Section Route
route.get("/sentiment", jwtAuthToken, sentimentHandler.showAllSentimentHandler);
=======

// Auth Section Route
route.get('/profile', jwtAuthToken, userHandler.profileHandler);
route.put('/profile', jwtAuthToken, userHandler.updateProfileHandler);
route.put('/profile/changepassword', jwtAuthToken, validation.passwordValidation, userHandler.changePasswordHandler);

// Sentiment Section Route
route.get('/sentiment', jwtAuthToken, sentimentHandler.showAllSentimentHandler);
>>>>>>> production
route.post(
  "/sentiment",
  jwtAuthToken,
  validation.sentimentValidation,
  sentimentHandler.createSentimentHandler
);
route.get(
  "/sentiment/:id",
  jwtAuthToken,
  sentimentHandler.showSentimentHandler
);
route.get(
  "/sentiment/:id/comments",
  jwtAuthToken,
  sentimentHandler.showSentimentCommentsHandler
);
route.delete(
  "/sentiment/:id",
  jwtAuthToken,
  sentimentHandler.deleteSentimentHandler
);
route.post(
  "/sentiment/:id/predict",
  jwtAuthToken,
  sentimentHandler.sentimentPredictHandler
);

// Tags Section Route
<<<<<<< HEAD
route.get("/tags", jwtAuthToken, tagsHandler.showAllTagsHandler);
route.get("/tags/:unique_id", jwtAuthToken, tagsHandler.showTagHandler);
route.post(
  "/tags",
=======
route.get('/tags', jwtAuthToken, tagsHandler.showAllTagsHandler);
route.get('/tags/:unique_id', jwtAuthToken, tagsHandler.showTagHandler);
route.post(
  '/tags',
>>>>>>> production
  jwtAuthToken,
  validation.tagNameValidation,
  tagsHandler.createTagHandler
);
route.put(
<<<<<<< HEAD
  "/tags/:unique_id",
=======
  '/tags/:unique_id',
>>>>>>> production
  jwtAuthToken,
  validation.tagNameValidation,
  tagsHandler.updateTagHandler
);
<<<<<<< HEAD
route.delete("/tags/:unique_id", jwtAuthToken, tagsHandler.deleteTagHandler);

route.post("/tagtest", jwtAuthToken, tagsHandler.checkTags);

// Dedvelopment route
route.delete("/firebasetest/:id", sentimentHandler.testFirebase);
=======
route.delete(
  '/tags/:unique_id',
  jwtAuthToken,
  tagsHandler.deleteTagHandler
);

route.post('/tagtest', jwtAuthToken, tagsHandler.checkTags);

// Dedvelopment route
route.delete('/firebasetest/:id', sentimentHandler.testFirebase);
>>>>>>> production

// ensure this route always last
route.all("*", userHandler.missingUrlHandler);

export default route;
