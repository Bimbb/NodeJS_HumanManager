const User = require('../models/User');

class UserController {
    // [GET]/user/

    listuser(req, res, next) {
        User.find({})
            .then((users) => {
                res.json(users);
            })
            .catch(next);
    }

    // [POST]/user/create

    async updateUser(req, res, next) {
        try {
            const { _id, ...updateData } = req.body;

            if (!_id) {
                return res.status(400).json({ message: 'Không tìm thấy ID người dùng' });
            }
            console.log('birth Day', updateData.birthDay);

            await User.updateOne({ _id }, updateData)
                .then(() => {
                    res.status(200).json('Sửa thành công');
                })
                .catch((err) => {
                    return res.status(500).json({ message: 'Lỗi server khi sửa', error: err.message });
                });
        } catch (err) {
            return res.status(500).json({ message: 'Lỗi server khi sửa', error: err.message });
        }
    }

    // [DELETE]/user/:id/delete
    async deleteUser(req, res) {
        try {
            const user = await User.deleteOne({ _id: req.params.id });
            if (!user) {
                res.status(404).json('Không tìm thấy user với _id tương ứng.');
            }
            res.status(204).send('thành công');
        } catch (error) {
            console.log(error);
            res.status(500).json('Xóa không thành công, lỗi server');
        }
    }

    async banUser(req, res) {
        try {
            const result = await User.updateOne({ _id: req.params.id }, { active: false });
            if (result.nModified === 0) {
                res.status(404).json('Không tìm thấy user với _id tương ứng.');
            } else {
                res.status(204).send('Thành công');
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(' không thành công, lỗi server');
        }
    }

    async unBanUser(req, res) {
        try {
            const result = await User.updateOne({ _id: req.params.id }, { active: true });
            if (result.nModified === 0) {
                res.status(404).json('Không tìm thấy user với _id tương ứng.');
            } else {
                res.status(204).send('Thành công');
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(' không thành công, lỗi server');
        }
    }
}

module.exports = new UserController();
