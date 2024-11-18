import validator from 'validator';
import xss from 'xss';
import platform from '../config/platformConfig.js';

const registerInputValidation = (req, res, next) => {
  const { email, password, username, fullname, address } = req.body;

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

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/;
  if (password && !passwordRegex.test(password)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Password must contain at least one letter and one number'
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


const sentimentValidation = (req, res, next) => {
  const { link, platformName } = req.body;

  const describePlatform = platform.filter(
    (platform) => platform.name == platformName
  );

  if (!link || link.trim() === '') {
    return res.status(400).json({
      status: 'fail',
      message: 'Link is required'
    });
  }

  if (!platformName || platformName.trim() === '') {
    return res.status(400).json({
      status: 'fail',
      message: 'platform name is required'
    });
  }

  if (!describePlatform.length > 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'Social Media platform undefined!',
    });
  }

  if (!validator.isURL(link)) {
    return res.status(404).json({
      status: 'fail',
      message: 'url not valid!',
    });
  }

  next();
};

const validation = { registerInputValidation, sentimentValidation };

export default validation;
