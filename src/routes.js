const express = require('express');
const router = express.Router();
const handler = require('./handler');
const jwtAuthToken = require('../config/jwtAuthToken');

router.get('/', handler.baseUrlHandler);

router.post('/login', handler.loginHandler);

router.post('/register', handler.registerHandler);

const users = require('../db/users.js');
router.get('/users', jwtAuthToken, handler.showUsers);

// ensure this route always last
router.all('*', handler.missingUrlHandler);

module.exports = router;