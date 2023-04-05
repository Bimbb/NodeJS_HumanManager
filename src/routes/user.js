const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');
const isAuth = require('../app/middleware/auth');
router.get('/getAll', isAuth.isAuth, isAuth.isAuthorize(['User.VIEW']), userController.listuser);
router.delete('/:id/delete', isAuth.isAuth, isAuth.isAuthorize(['User.DELETE']), userController.deleteUser);
router.put('/:id/update', isAuth.isAuth, isAuth.isAuthorize(['User.UPDATE']), userController.updateUser);
router.put('/:id/ban', isAuth.isAuth, isAuth.isAuthorize(['User.VIEW']), userController.banUser);
router.put('/:id/unBan', isAuth.isAuth, isAuth.isAuthorize(['User.VIEW']), userController.unBanUser);

module.exports = router;
