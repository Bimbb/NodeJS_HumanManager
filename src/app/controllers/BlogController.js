var bodyParser = require('body-parser');
const Blog = require('../models/Blog');



class BlogController{


     // [GET]/list/

    listBlog(req, res, next) {
        Blog.find({})
        .then((blogs) => {
            res.json(blogs)
        })
        .catch(next);
    }



    // [POST]/blog/create
    async createBlog(req, res,next) {
        const formBlog = req.body;
        var uuuuuu = req.body.content;
        console.log(uuuuuu);

        
        const blog = new Blog(formBlog); 
        await blog.save({})
        .then(data =>{
            console.log(data.content)
            res.json('Thêm thành công')
        })
        .catch(err =>{
            res.status(500).json('Thêm không thành công, lỗi server')
            console.log(err)

        });

    }   

    // [DELETE]/salary/:id/update
    async updateBlog(req, res,next) {

        Blog.updateOne({ _id: req.body._id },req.body)
        .then(() => {
        res.json('Sửa thành công')
        })
        .catch(err =>{
            res.status(500).json('Sửa không thành công, lỗi server')
        });
    } 

    





    // [DELETE]/salary/:id/delete
    async deleteBlog(req, res,next) {

        Blog.deleteOne({ _id: req.body.id })
        .then(() => {
           res.json('Xóa thành công')
        })
        .catch(err =>{
            res.status(500).json('Xóa không thành công, lỗi server')
        });
    } 
}

module.exports = new BlogController();