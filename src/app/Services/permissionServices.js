
const Permission = require('../models/Permission');
const buildObject = require('../utils/buildObject');

class PermissionService{
    create = async (req = []) => {
        return new Promise((resolve, reject) => {
            Permission.insertMany(req,(err,item) => {
                if(err){
                    reject(buildObject.buildErrObject(422,err.message));
                }
                resolve(item.map(p => p._id));
            })
        });
    }
}


module.exports = new PermissionService