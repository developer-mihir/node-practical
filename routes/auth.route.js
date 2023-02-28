const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller.js');

router.post('/register', authController.signUp);
router.post('/login', authController.login);

module.exports = router;