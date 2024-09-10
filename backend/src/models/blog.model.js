const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: { type: String, require: true },
    author: { type: String },
    shortDesc: { type: String },
    publishDate: { type: Date },
    timeToRead: { type: String },
    coverPhoto: { type: String },
    treanding: { type: String },
    tags: { type: Array },
  },
  { timestamps: true },
  { typeKey: '$type' }
);


const blogModel = mongoose.model("blogs", blogSchema);

blogModel
module.exports = blogModel;
