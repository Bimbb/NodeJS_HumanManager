const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');


router.get('/getAll', userController.listuser)
router.post('/create', userController.createUser)
router.delete('/:id/delete', userController.deleteUser)
router.put('/:id/update', userController.updateUser)

module.exports = router;