const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Blog = new Schema(
    {
        content: { type: String, require: true },
        title: { type: String, require: true },
        image: { type: String, require: true },
        slug: { type: String, slug: "title", unique: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Blog", Blog);
