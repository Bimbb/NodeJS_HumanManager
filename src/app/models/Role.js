const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const lstPermission = (name = '') => [`${name}`,`${name}.Create`,`${name}.Update`,`${name}.Delete`,`${name}.View`]

const Role = new Schema(
    {
        name: { type: String, require: true },
        position: { type: String, require: true },
        display : {type : String },
        users:
        [ 
            { type: Schema.Types.ObjectId, ref: "User" }
        ],
        permissions : [ 
            { type: Schema.Types.ObjectId, ref: "Permission" }
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Role", Role);
