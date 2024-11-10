const validator = require('validator');
const xss = require('xss');

/**
 * Middleware to validate user input in registration route
 * 
 * @function registerInputValidation
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * 
 * @returns {undefined}
 * 
 * @throws {Error} 400 - Bad request
 * 
 * Validates the email and password input in the request body
 * and ensures that the email is not empty and is a valid email
 * and the password is not empty and contains at least one letter
 * and one number. Also performs anti-XSS on the request body.
 */
const registerInputValidation = (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email || email.trim() === '') {
        return res.status(400).json({
            status: 'fail',
            message: 'Email is required' 
        });
    }
    // email validation
    if(email && !validator.isEmail(email)) {
        if(typeof email !== 'string') {
            return res.status(400).json({
                status: 'fail',
                message: 'Email must be a string'
            });
        }
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

    if(password) {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                status: 'fail', 
                message: 'Password must contain at least one letter and one number' 
            });
        }
    } else {
        return res.status(400).json({    
            status: 'fail', 
            message: 'Password is required' 
        });
    }

    // anti XSS
    if(req.body) {
        for (let key in req.body) {
            if (typeof req.body[key] === 'string') {
              req.body[key] = xss(req.body[key]);
            }
        }
    }

    next();
}

module.exports = { registerInputValidation };