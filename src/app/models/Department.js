const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);



const Department = new Schema(
    {
        name: { type: String, require: true },
        address: { type: String },
        phone: { type: String },
        slug: { type: String, slug: ["name"], unique: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Department", Department);
