const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: { type: String, require: true },
    author: { type: String },
    shortDesc: { type: String },
    publishDate: { type: String },
    timeToRead: { type: String },
    coverPhoto: { type: String },
    treanding: { type: String },
    tags: { type: Array },
  },
  { timestamps: true }
);
console.log("blog schema", blogSchema);
const blogModel = mongoose.model("blogs", blogSchema);
module.exports = blogModel;
