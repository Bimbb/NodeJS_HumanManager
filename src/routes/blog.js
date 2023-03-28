
const express = require('express');
const router = express.Router();
const blogController = require('../app/controllers/BlogController');

const isAuth = require('../app/middleware/auth')

router.get('/getAll', blogController.listBlog)
router.post('/create', blogController.createBlog)
router.put('/:id/update', blogController.updateBlog)

module.exports = router;
