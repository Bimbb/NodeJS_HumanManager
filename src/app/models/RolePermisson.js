const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);


const RolePermission = new Schema(
    {

        roleID: { type: Schema.Types.ObjectId, ref: "Role" },
        permissionID: { type: Schema.Types.ObjectId, ref: "Permission" },
        name: { type: String },

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("RolePermission", RolePermission);
