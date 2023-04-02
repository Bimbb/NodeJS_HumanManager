const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

router.get('/getAll', userController.listuser);
router.delete('/:id/delete', userController.deleteUser);
router.put('/:id/update', userController.updateUser);
router.put('/:id/ban', userController.banUser);
router.put('/:id/unBan', userController.unBanUser);

module.exports = router;
