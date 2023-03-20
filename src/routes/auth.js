

const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/AuthController');

const isAuth = require('../app/middleware/auth')
//,isAuth.isAuthorize(['ADMIN','USER'])
router.post('/register', authController.register)
router.get('/testAuthentication',isAuth.isAuth,authController.index);
router.post('/login',authController.login)
router.get('/refreshtoken',authController.refreshToken);

module.exports = router;