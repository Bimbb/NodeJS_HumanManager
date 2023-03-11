
const User = require('../models/User');
const Blog = require('../models/Blog');
const Degree = require('../models/Degree');
const Department = require('../models/Department');
const Permission = require('../models/Permission');
const Role = require('../models/Role');
const RolePermission = require('../models/RolePermission');
const Salary = require('../models/Salary');
const UserRole = require('../models/UserRole');

class SiteController {

    index(req, res) {
        res.json({
            name: 'test'
        });
    }
}



module.exports = new SiteController;

