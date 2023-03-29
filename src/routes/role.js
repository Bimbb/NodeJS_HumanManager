

const express = require('express');
const router = express.Router();
const roleController = require('../app/controllers/RoleController');

//const isAuth = require('../app/middleware/auth')

router.post('/create', roleController.createRole)
router.post('/delete', roleController.delete)
router.get('/details', roleController.details)
router.post('/addPermissionstoRole', roleController.addPermissionstoRole)


module.exports = router;