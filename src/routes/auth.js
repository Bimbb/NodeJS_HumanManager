

const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/AuthController');

const isAuth = require('../app/middleware/auth')
//,isAuth.isAuthorize(['ADMIN','USER'])
router.post('/register', authController.register)
router.get('/testAuthentication',isAuth.isAuth,isAuth.isAuthorize(['USER']),authController.index);
router.get('/getCurrentUser',isAuth.isAuth,authController.getCurrentUser);
router.get('/authentication',isAuth.isAuth,authController.checkAuth);
router.post('/login',authController.login)
router.get('/refreshtoken',authController.refreshToken);

module.exports = router;