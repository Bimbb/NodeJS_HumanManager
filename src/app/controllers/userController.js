const User = require('../models/User');
const { multipleMongooseToObject, mongooseToObject}  = require('../../util/mongoose')
const Department = require('../models/Department')


class UserController{

     // [GET]/user/

    listuser(req, res, next) {
        User.find({})
        .then((users) => {
            res.json(users)
        })
        .catch(next);
    }


    // [POST]/user/create
    async createUser(req, res) {
        const formUser = req.body;
        const checkEmail = await User.findOne({ email: formUser.email });
        const checkPhone = await User.findOne({ phone: formUser.phone });
        if (checkEmail) {

            res.json("Mail đã tồn tại")
            return ;
        }

        if (checkPhone) {
            res.json("SDT đã tồn tại")
            return;
        }

        formUser.active = true;
        formUser.avatar = "https://i.pinimg.com/736x/7d/83/2a/7d832a6867b7a6b4fbec7ff05864df6e.jpg";
        // formUser.password = await bcrypt.hash(formUser.phone, 10);
        const user = new User(formUser); 
        await user.save();
        res.json("Thành công")
    }     
    
    

    async updateUser(req, res,next) {

      Department.updateOne({ _id: req.body._id },req.body)
      .then(() => {
      res.json('Sửa thành công')
      })
      .catch(err =>{
          res.status(500).json('Sửa không thành công, lỗi server')
      });
     } 

     async deleteUser(req, res,next) {

        Department.deleteOne({ _id: req.body.id })
        .then(() => {
           res.json('Xóa thành công')
        })
        .catch(err =>{
            res.status(500).json('Xóa không thành công, lỗi server')
        });
    } 



  // [DELETE]/salary/:id/delete
  

}

module.exports = new UserController();

