// require('dotenv').config();
import users from '../db/users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../config/dbConfig.js';
const date = new Date();

const baseUrlHandler = (req, res) => {
  res.status(200).json({
    status: 'success',
    message:
      'Sentivue backend APIs endpoint, please /login or /register first to use the APIs',
    version: 'tags/v1.0.0',
  });
};

const missingUrlHandler = (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
    version: 'tags/v1.0.0',
  });
};

const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = 'SELECT email, username, password FROM tb_users WHERE email = ?';
    const [rows] = await pool.query(query, [email]);

    const user = rows[0];

    if (rows.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'user not found!',
        version: 'tags/v1.0.0'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid password',
        version: 'tags/v1.0.0',
      });
    }

    const token = jwt.sign(
      {
        name: user.name,
        fullname: user.fullname,
        email: user.email,
        address: user.address,
        createdAt: user.created_at,
      },
      'S3N71VU3001',
      { expiresIn: '1d' }
    );

    res.json({
      status: 'success',
      message: 'User logged in successfully',
      token: token,
      version: 'tags/v1.0.0',
    });
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized!'
    });
  }
};

const registerHandler = async (req, res) => {
  const { email, password, username, fullname, address } = req.body;

  try {
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');

    const query = 'INSERT INTO tb_users (name, username, email, password, address, created_at) value (?, ?, ?, ?, ?, ?)';
    const [result] = await pool.query(query, [fullname, username, email, hashedPassword, address, formattedDate]);

    console.log(result);

    res.status(200).json({
      status: 'success',
      message: 'User registered successfully, you can login using /login',
      version: 'tags/v1.0.0',
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: `error: ${error}`,
      version: 'tags/v1.0.0'
    });
  }
};

const profileHandler = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: req.user,
  });
};

const showUsersHandler = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: users,
  });
};

const userHandler = {
  missingUrlHandler, baseUrlHandler, loginHandler, registerHandler, showUsersHandler, profileHandler
};

export default userHandler;