const Department = require('../models/Department');
const { multipleMongooseToObject, mongooseToObject}  = require('../../util/mongoose')
var bodyParser = require('body-parser');
const { use } = require('../../routes/user');
const User = require('../models/User');



class DepartmentController{

     // [GET]/user/

    listDepartment(req, res, next) {
        Department.find({})
        .then((department) => {
            res.json(department)
        })
        .catch(next);
    }


    // [POST]/salary/create
    async createDepartment(req, res,next) {

        const formDepartment = req.body;
        const department = new Department(formDepartment); 
        await department.save({})
        .then(data =>{
            res.json(data)
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json('Thêm không thành công, lỗi server')
        });
    }    


    // [DELETE]/salary/:id/update
    // [DELETE]/salary/:id/update
    async updateDepartment(req, res,next) {

        Department.updateOne({ _id: req.body._id },req.body)
        .then(() => {
        res.json('Sửa thành công')
        })
        .catch(err =>{
            res.status(500).json('Sửa không thành công, lỗi server')
        });
    } 





    // [DELETE]/salary/:id/delete
    async deleteDepartment(req, res,next) {

        Department.deleteOne({ _id: req.body.id })
        .then(() => {
           res.json('Xóa thành công')
        })
        .catch(err =>{
            res.status(500).json('Xóa không thành công, lỗi server')
        });
    } 

    async employeeDepartment(req, res,next) {

        const result = Department.aggregate([
            {
               $lookup:
                  {
                    from: 'users',
                    localField: '_id',
                    foreignField: 'departmentID',
                    as: 'users'
                  }
            }
        ])
        .exec((err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(result);
            }
         });
    }
    
    

    
}

module.exports = new DepartmentController();