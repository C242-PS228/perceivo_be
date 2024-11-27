import validator from 'validator';
import xss from 'xss';
import platform from '../config/platformConfig.js';
import pool from '../config/dbConfig.js';

const loginInputValidation = (req, res, next) => {
  const { email, password } = req.body;

  // email validation
  if (!email || email.trim() === '') {
    return res.status(400).json({
      status: 'fail',
      message: 'Email is required'
    });
  }

  if (email && !validator.isEmail(email)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid email format'
    });
  }

  // password validation
  if (!password || password.trim() === '') {
    return res.status(400).json({
      status: 'fail',
      message: 'Password is required'
    });
  }

  next();
};

const registerInputValidation = async (req, res, next) => {
  const { email, password, username, fullname, address } = req.body;

  // email validation
  const query = 'SELECT email FROM tb_users WHERE email = ?';
  const [rows] = await pool.query(query, [email]);

  if (rows.length > 0) {
    return res.status(400).json({
      status: 'fail',
      message: 'Email is already registered',
      version: 'tags/v1.0.0',
    });
  }

  if (!email || email.trim() === '') {
    return res.status(400).json({
      status: 'fail',
      message: 'Email is required'
    });
  }

  if (email && !validator.isEmail(email)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid email format'
    });
  }

  // password validation
  if (!password || password.trim() === '') {
    return res.status(400).json({
      status: 'fail',
      message: 'Password is required'
    });
  }

  // username validation
  if (!username || username.trim() === '') {
    return res.status(400).json({
      status: 'fail',
      message: 'Username is required'
    });
  }

  const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/; // Username must be 3-15 characters and alphanumeric
  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Username must be alphanumeric and between 3-15 characters'
    });
  }

  // fullname validation
  if (!fullname || fullname.trim() === '') {
    return res.status(400).json({
      status: 'fail',
      message: 'Fullname is required'
    });
  }

  if (typeof fullname !== 'string') {
    return res.status(400).json({
      status: 'fail',
      message: 'Fullname must be a string'
    });
  }

  // address validation
  if (!address || address.trim() === '') {
    return res.status(400).json({
      status: 'fail',
      message: 'Address is required'
    });
  }

  if (typeof address !== 'string') {
    return res.status(400).json({
      status: 'fail',
      message: 'Address must be a string'
    });
  }

  // anti-XSS
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = xss(req.body[key]);
      }
    }
  }

  next();
};

const tagNameValidation = (req, res, next) => {
  const data = req.body;

  const alphanumericRegex = /^[a-zA-Z0-9\s]+$/;
  if (!alphanumericRegex.test(data.tag_name)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Tag name must contain only letters, numbers, and spaces'
    });
  }

  if (!data.tag_name || data.tag_name.trim() === '') {
    return res.status(400).json({
      status: 'fail',
      message: 'Tag name is required'
    });
  }

  // anti-XSS
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = xss(req.body[key]);
      }
    }
  }

  next();
};

const sentimentValidation = (req, res, next) => {
  const { link, platformName } = req.body;

  const describePlatform = platform.filter(
    (platform) => platform.name === platformName
  );

  if (!link || (typeof link === 'string' && link.trim() === '')) {
    return res.status(400).json({
      status: 'fail',
      message: 'Link is required and must be a non-empty string',
    });
  }

  if (!platformName || platformName.trim() === '') {
    return res.status(400).json({
      status: 'fail',
      message: 'Platform name is required',
    });
  }

  if (!describePlatform.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Social Media platform undefined!',
    });
  }

  if (Array.isArray(link)) {
    const invalidLinks = link.filter((url) => !validator.isURL(url));
    if (invalidLinks.length > 0) {
      return res.status(400).json({
        status: 'fail',
        message: `Invalid URLs found: ${invalidLinks.join(', ')}`,
      });
    }
  } else if (!validator.isURL(link)) {
    return res.status(400).json({
      status: 'fail',
      message: 'URL is not valid!',
    });
  }

  next();
};

const passwordValidation = (req, res, next) => {
  const { password, newPassword } = req.body;

  // const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;

  if (password && !passwordRegex.test(password)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Password must contain at least one letter and one number'
    });
  }

  if (newPassword && !passwordRegex.test(newPassword)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Password must contain at least one letter and one number'
    });
  }

  next();
};


const validation = { registerInputValidation, loginInputValidation, sentimentValidation, passwordValidation, tagNameValidation };

export default validation;
