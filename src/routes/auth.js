

const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/AuthController');

const isAuth = require('../app/middleware/auth')

router.post('/register', authController.register)
router.get('/testAuthentication',isAuth.isAuth,authController.index);
router.post('/login',authController.login)

module.exports = router;