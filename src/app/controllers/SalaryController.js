const Salary = require('../models/Salary');
const { multipleMongooseToObject, mongooseToObject}  = require('../../util/mongoose')
var bodyParser = require('body-parser');
const { use } = require('../../routes/user');
const User = require('../models/User');



class SalaryController{

     // [GET]/user/

    listSalary(req, res, next) {
        Salary.find({})
        .then((salarys) => {
            res.json(salarys)
        })
        .catch(next);
    }


    // [POST]/salary/create
    async createSalary(req, res,next) {

        const formSalary = req.body;
        const salary = new Salary(formSalary); 
        await salary.save({})
        .then(data =>{
            res.json(data)
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json('Thêm không thành công, lỗi server')
        });
    }    


    // [DELETE]/salary/:id/update
    async updateSalary(req, res,next) {

        Salary.updateOne({ _id: req.body._id },req.body)
        .then(() => {
        res.json('Sửa thành công')
        })
        .catch(err =>{
            res.status(500).json('Sửa không thành công, lỗi server')
        });
    } 





    // [DELETE]/salary/:id/delete
    async deleteSalary(req, res,next) {

        Salary.deleteOne({ _id: req.body.id })
        .then(() => {
           res.json('Xóa thành công')
        })
        .catch(err =>{
            res.status(500).json('Xóa không thành công, lỗi server')
        });
    } 
    
    

    async search(req, res,next) {

        const newSalary = Salary.aggregate([
            {
               $lookup:
                  {
                    from: 'users',
                    localField: '_id',
                    foreignField: 'salaryID',
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

module.exports = new SalaryController();