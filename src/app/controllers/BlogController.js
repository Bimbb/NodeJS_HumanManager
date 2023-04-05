var bodyParser = require('body-parser');
const Blog = require('../models/Blog');

class BlogController {
    // [GET]/list/

    listBlog(req, res, next) {
        Blog.find({})
            .then((blogs) => {
                res.status(200).json(blogs);
            })
            .catch(next);
    }

    // [POST]/blog/create
    async createBlog(req, res, next) {
        const formBlog = req.body;
        const blog = new Blog(formBlog);
        await blog
            .save({})
            .then((data) => {
                console.log(data.content);
                res.status(200).json('Thêm thành công');
            })
            .catch((err) => {
                res.status(500).json('Thêm không thành công, lỗi server');
                console.log(err);
            });
    }

    // [DELETE]/salary/:id/update
    async updateBlog(req, res, next) {
        Blog.updateOne({ _id: req.body._id }, req.body)
            .then(() => {
                res.status(200).json('Sửa thành công');
            })
            .catch((err) => {
                res.status(500).json('Sửa không thành công, lỗi server');
            });
    }

    // [DELETE]/salary/:id/delete
    async deleteBlog(req, res) {
        try {
            const blog = await Blog.deleteOne({ _id: req.params.id });
            if (!blog) {
                res.status(404).json('Không tìm thấy blog với _id tương ứng.');
            }
            res.status(204).send('Thành công');
        } catch (error) {
            console.log(error);
            res.status(500).json('Xóa không thành công, lỗi server');
        }
    }
}

module.exports = new BlogController();
