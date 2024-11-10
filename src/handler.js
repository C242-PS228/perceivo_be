const users = require('../db/users.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const e = require('express');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const baseUrlHandler = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Sentivue backend APIs endpoint, please /login or /register first to use the APIs',
        version: 'tags/v1.0.0'
    });
};

const missingUrlHandler = (req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found',
        version: 'tags/v1.0.0'
    });
};

const loginHandler = async (req, res) => {
    const { email, password } = req.body;

    // check mail user exists
    const user = users.find((user) => user.email === email);

    if(!user) {
        return res.status(401).json({
            status: 'error',
            message: 'User not found',
            version: 'tags/v1.0.0'
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid password',
            version: 'tags/v1.0.0'
        });
    }

    const token = jwt.sign({email: user.email}, JWT_SECRET, { expiresIn: '1d' });

    res.json({
        status: 'success',
        message: 'User logged in successfully',
        token: token,
        version: 'tags/v1.0.0'
    })
};

const registerHandler = async (req, res) => {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hashSync(password, 10);

    users.push({email: email, password: hashedPassword});

    res.status(200).json({
        status: 'success',
        message: 'User registered successfully, you can login using /login',
        version: 'tags/v1.0.0'
    });
};

const showUsers = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: users
    });
};

module.exports = { baseUrlHandler, missingUrlHandler, loginHandler, registerHandler, showUsers };