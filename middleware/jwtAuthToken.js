// eslint-disable-next-line no-undef
require('dotenv').config();
// eslint-disable-next-line no-undef
const jwt = require('jsonwebtoken');

const jwtAuthToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'S3N71VU3001', (err, user) => {
    if (err) {
      return res.status(403).json({
        status: 'fail',
        message: 'Invalid token'
      });
    };

    req.user = user;
    next();
  });
};

// eslint-disable-next-line no-undef
module.exports = jwtAuthToken;
