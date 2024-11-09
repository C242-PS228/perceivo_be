const express = require('express');
const { version } = require('process');
const router = express.Router();
const { baseUrlHandler, missingUrlHandler } = require('./handler');

router.get('/', baseUrlHandler);

// ensure this route always last
router.all('*', missingUrlHandler);

module.exports = router;