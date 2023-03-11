const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);



const Salary = new Schema(
    {
        name: { type: String, require: true },
        basic_salary: { type: Number },
        HSL: { type: Number },
        slug: { type: String, slug: ["name"], unique: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Salary", Salary);

