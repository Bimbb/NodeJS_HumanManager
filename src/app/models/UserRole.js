const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);


const UserRole = new Schema(
    {
        roleID: { type: Schema.Types.ObjectId, ref: "Role" },
        userID: { type: Schema.Types.ObjectId, ref: "User" },
        name: { type: String },

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("UserRole", UserRole);


