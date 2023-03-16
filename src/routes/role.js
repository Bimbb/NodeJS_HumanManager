

const express = require('express');
const router = express.Router();
const roleController = require('../app/controllers/RoleController');

const isAuth = require('../app/middleware/auth')

router.post('/create', roleController.create)

module.exports = router;