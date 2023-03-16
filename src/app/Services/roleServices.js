
const Role = require('../models/Role');
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
                resolve(item);
            })
        });
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
}



module.exports = new RoleService