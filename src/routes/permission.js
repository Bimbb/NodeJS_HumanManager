
const express = require('express');
const router = express.Router();
const blogController = require('../app/controllers/BlogController');

const isAuth = require('../app/middleware/auth')

router.get('/list', blogController.listBlog)
router.post('/create', blogController.createBlog)

module.exports = router;
