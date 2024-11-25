import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const jwtAuthToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({
    status: 'fail',
    message: 'Unauthorized'
  });

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
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
