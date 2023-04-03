const Degree = require('../models/Degree');
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
var bodyParser = require('body-parser');
const { use } = require('../../routes/user');
const User = require('../models/User');

class DegreeController {
    // [GET]/user/

    listDegree(req, res, next) {
        Degree.find({})
            .then((degrees) => {
                res.json(degrees);
            })
            .catch(next);
    }

    // [POST]/salary/create
    async createDegree(req, res, next) {
        const formDegree = req.body;
        const degree = new Degree(formDegree);
        await degree
            .save({})
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json('Thêm không thành công, lỗi server');
            });
    }

    // [DELETE]/salary/:id/update
    async updateDegree(req, res, next) {
        Degree.updateOne({ _id: req.body._id }, req.body)
            .then(() => {
                res.json('Sửa thành công');
            })
            .catch((err) => {
                res.status(500).json('Sửa không thành công, lỗi server');
            });
    }

    // [DELETE]/degree/:id/delete
    async deleteDegree(req, res) {
        try {
            const deletedDegree = await Degree.deleteOne({ _id: req.params.id });
            if (!deletedDegree) {
                res.status(404).json('Không tìm thấy degree với _id tương ứng.');
            }
            res.status(204).send('thành công');
        } catch (error) {
            console.log(error);
            res.status(500).json('Xóa không thành công, lỗi server');
        }
    }
}

module.exports = new DegreeController();
