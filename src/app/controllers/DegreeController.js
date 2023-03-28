const Degree = require('../models/Degree');
const { multipleMongooseToObject, mongooseToObject}  = require('../../util/mongoose')
var bodyParser = require('body-parser');
const { use } = require('../../routes/user');
const User = require('../models/User');



class DegreeController{

     // [GET]/user/

    listDegree(req, res, next) {
        Degree.find({})
        .then((degrees) => {
            res.json(degrees)
        })
        .catch(next);
    }


    // [POST]/salary/create
    async createDegree(req, res,next) {

        const formDegree = req.body;
        const degree = new Degree(formDegree); 
        await degree.save({})
        .then(data =>{
            res.json(data)
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json('Thêm không thành công, lỗi server')
        });
    }    


    // [DELETE]/salary/:id/update
    async updateDegree(req, res,next) {

        Degree.updateOne({ _id: req.body._id },req.body)
        .then(() => {
        res.json('Sửa thành công')
        })
        .catch(err =>{
            res.status(500).json('Sửa không thành công, lỗi server')
        });
    } 





    // [DELETE]/salary/:id/delete
    async deleteDegree(req, res,next) {

        Degree.deleteOne({ _id: req.body.id })
        .then(() => {
           res.json('Xóa thành công')
        })
        .catch(err =>{
            res.status(500).json('Xóa không thành công, lỗi server')
        });
    } 
    
    

    
}

module.exports = new DegreeController();