const express = require('express');
const authController = require('./auth');
const adminController = require('./admin');
const consumerController = require('./consumer');

let v1router = express.Router();

v1router.use('/admin', adminController);
v1router.use('/auth', authController);
v1router.use('/consumer', consumerController);

module.exports = v1router;