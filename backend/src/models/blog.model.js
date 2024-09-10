const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: { type: String },
    author: { type: String },
    shortDesc: { type: String },
    publishDate: { type: Date },
    timeToRead: { type: String },
    coverPhoto: { type: Object },
    treanding: { type: Boolean },
    tags: { type: Array },
  },
  { timestamps: true },
  { typeKey: '$type' }
);


const blogModel = mongoose.model("blogs", blogSchema);

blogModel
module.exports = blogModel;
