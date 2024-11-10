const express = require('express');
const router = express.Router();
const handler = require('./handler');
const jwtAuthToken = require('../middleware/jwtAuthToken.js');
const validation = require('../middleware/validation');

router.get('/', handler.baseUrlHandler);

router.post('/login', handler.loginHandler);

router.post('/register', validation.registerInputValidation, handler.registerHandler);

const users = require('../db/users.js');
router.get('/users', jwtAuthToken, handler.showUsers);

// ensure this route always last
router.all('*', handler.missingUrlHandler);

module.exports = router;