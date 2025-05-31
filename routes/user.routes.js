const express = require('express');
const router = express.Router();
const Controller = require('../controllers');

// Registration routes
router.post('/register', Controller.User.register);
router.post('/verify-registration', Controller.User.verifyRegistration);

// Login routes
router.post('/login', Controller.User.login);
router.post('/verify-login', Controller.User.verifyLogin);

module.exports = router;
