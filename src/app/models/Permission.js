const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);


const Permission = new Schema(
    {
        name: { type: String, require: true },
        display : {type : String },
        roles:
        [ 
            { type: Schema.Types.ObjectId, ref: "Role" }
        ],
        
    },
   
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Permission", Permission);
