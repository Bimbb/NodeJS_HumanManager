const express = require('express');
const router = express.Router();
const blogController = require('../app/controllers/BlogController');

const isAuth = require('../app/middleware/auth');

router.get('/getAll', isAuth.isAuth, isAuth.isAuthorize(['Blog.VIEW']), blogController.listBlog);
router.post('/create', isAuth.isAuth, isAuth.isAuthorize(['Blog.CREATE']), blogController.createBlog);
router.put('/:id/update', isAuth.isAuth, isAuth.isAuthorize(['Blog.UPDATE']), blogController.updateBlog);
router.delete('/:id/delete', isAuth.isAuth, isAuth.isAuthorize(['Blog.DELETE']), blogController.deleteBlog);

module.exports = router;
