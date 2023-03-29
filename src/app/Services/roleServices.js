
const Role = require('../models/Role');
const Permission = require('../models/Permission');
const buildObject = require('../utils/buildObject');
class RoleService{
    // Create Role
    create = async (req = {}) => {
        const formRole = req.body;
        const role = new Role(formRole)
        return new Promise((resolve, reject) => {
            role.save((err,item) => {
                if(err){
                    reject(buildObject.buildErrObject(422,err.message));
                }
                resolve(item._id);
            })
        });
    }
    delete = async () => {
      
      await Role.deleteMany();
      await Permission.deleteMany();
  }
    UpdatePermission = async (id = '',req = []) => {
      return new Promise((resolve, reject) => {
          const data = Role.findByIdAndUpdate(id,{
            $push : {permissions : req}
          });
          resolve(data);
      });
  }

    getPermissionByRole = async (roleId = '') =>{
      return new Promise(async (resolve,reject) =>{
        await Role.
          findById(roleId).
          populate({
              path : "permissions",
              select : "name display"
            }).
            populate({
              path : "users",
              select : "email"
            }).
            then(res => {
              resolve(res)
            }).catch(err => {
              reject(err)
            });
      })
    }
    findRoleById = (id = '') => {
        return new Promise((resolve, reject) => {
          Role.findById(
            {
              id
            },
            async (err, item) => {
              try {
                if(err){
                  console.log('Test lỗi'+err.message)
                  reject(buildObject.buildErrObject(404,'User Not Found'))
                }
                resolve(item)
              } catch (error) {
                reject(error)
              }
            }
          )
        })
      }
    findRoleByName = async (name = '') => {
        return new Promise((resolve, reject) => {
          Role.findOne(
            {
              name : name
            },
            async (err, item) => {  
              try {
                if(err){
                  console.log('Test lỗi'+err.message)
                  reject(buildObject.buildErrObject(404,'User Not Found'))
                }
                resolve(item)
              } catch (error) {
                reject(error)
              }
            }
          )
        })
      }

      UpdateRoleByUser = async (userId = '',roles = []) => {
        return new Promise(async(resolve) => {
          const RolePull = await Role.updateMany(
            {_id : roles }, // filter , users._id
            {$pull :{users : userId}}
            )
            console.log('Pull : ',RolePull);
            const RolePush = await Role.updateMany(
              {_id : roles},
              {$push : {users : userId}}
            )
            console.log('Pull : ',RolePush);
            const data = await Role.find({_id : roles});

            resolve(data);
        })
      }

      addPermissionstoRole = async(roleId='',permissions = []) => {
        return new Promise(async (resolve) => {
          const roleJoinPermissions = await this.getPermissionByRole(roleId)
          await Role.findByIdAndUpdate(roleId,
            {
              $pullAll : {permissions : roleJoinPermissions.permissions}
            }).then(async () => {
              await Role.findByIdAndUpdate(roleId,{
                $push : {permissions : permissions}
              })
            })
            const data = await this.getPermissionByRole(roleId)
            resolve(data)
        }) 
      }
      UpdateRoleByPermission = async (roleId = '',permissions = []) => {
        return new Promise(async(resolve) => {
          await Permission.updateMany(
            {_id : permissions }, // filter , users._id
            {$pull :{roles : roleId}} // Pull
            )
            await Permission.updateMany(
              {_id : permissions}, // filter
              {$push : {roles : roleId}} // Push
            )
            const data = await Permission.find({_id : permissions});
            resolve(data);
        })
      }
}



module.exports = new RoleService