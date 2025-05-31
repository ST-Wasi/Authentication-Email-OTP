const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');

router.use('/auth', userRoutes);

module.exports = router;
