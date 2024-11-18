// require('dotenv').config();
import jwt from 'jsonwebtoken';

const jwtAuthToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({
    status: 'fail',
    message: 'Unauthorized'
  });

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

export default jwtAuthToken;
