const Permission = require('../models/Permission');
const buildObject = require('../utils/buildObject');
const lstPermission = [
    { name: `Degree`, display: `Bằng Cấp` },
    { name: `Degree.View`, display: 'Giao diện' },
    { name: `Degree.Create`, display: 'Thêm' },
    { name: `Degree.Update`, display: 'Sửa' },
    { name: `Degree.Delete`, display: 'Xóa' },
    { name: `Salary`, display: `Lương` },
    { name: `Salary.View`, display: 'Giao diện' },
    { name: `Salary.Create`, display: 'Thêm' },
    { name: `Salary.Update`, display: 'Sửa' },
    { name: `Salary.Delete`, display: 'Xóa' },
    { name: `Department`, display: `Phòng ban` },
    { name: `Department.View`, display: 'Giao diện' },
    { name: `Department.Create`, display: 'Thêm' },
    { name: `Department.Update`, display: 'Sửa' },
    { name: `Department.Delete`, display: 'Xóa' },
    { name: `Blog`, display: `Bảng tin` },
    { name: `Blog.View`, display: 'Giao diện' },
    { name: `Blog.Create`, display: 'Thêm' },
    { name: `Blog.Update`, display: 'Sửa' },
    { name: `Blog.Delete`, display: 'Xóa' },
    { name: `ROLE`, display: `Quyền` },
    { name: `ROLE.View`, display: 'Giao diện' },
    { name: `ROLE.Create`, display: 'Thêm' },
    { name: `ROLE.Update`, display: 'Sửa' },
    { name: `ROLE.Delete`, display: 'Xóa' },
    { name: `USER`, display: `Người dùng` },
    { name: `USER.View`, display: 'Giao diện' },
    { name: `USER.Create`, display: 'Thêm' },
    { name: `USER.Update`, display: 'Sửa' },
    { name: `USER.Delete`, display: 'Xóa' },
];
class PermissionService {
    // create = async (req = []) => {
    //     return new Promise((resolve, reject) => {
    //         Permission.insertMany(req, (err, item) => {
    //             if (err) {
    //                 reject(buildObject.buildErrObject(422, err.message));
    //             }
    //             resolve(item.map((p) => p._id));
    //         });
    //     });
    // };
    findAll = async () => {
        return new Promise((resolve, reject) => {
            Permission.find({})
                .populate({
                    path: 'roles',
                    select: 'name',
                })
                .then(async (item, err) => {
                    try {
                        if (err) {
                            console.log('Test lỗi' + err.message);
                            reject(buildObject.buildErrObject(404, 'User Not Found'));
                        }
                        resolve(item);
                    } catch (error) {
                        reject(error);
                    }
                });
        });
    };
}

module.exports = new PermissionService();
