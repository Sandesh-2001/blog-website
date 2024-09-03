const express = require("express");
const cors = require("cors");
const blogModel = require("./models/blog.model");
const validateBlog = require("./middlewares/joi");
const blogValidations = require("./validations/blogs.validation");
const app = express();
app.use(cors());
app.use(express.json());

app.get("", validateBlog(blogValidations.addBlog), async (req, res) => {
  let blog = await blogModel.create({ title: "hello" });
  res.status(200).json(blog);
});

module.exports = app;
