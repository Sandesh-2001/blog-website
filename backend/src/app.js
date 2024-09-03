const express = require("express");
const cors = require("cors");
const blogModel = require("./models/blog.model");
const validateBlog = require("./middlewares/joi");
const blogValidations = require("./validations/blogs.validation");
const CustomError = require("./utils/custom-error-handler");
const errorHandler = require("./utils/error-handler");
const asyncErrorHandler = require("./utils/async-error-handler");
const app = express();
app.use(cors());
app.use(express.json());

app.get(
  "",
  validateBlog(blogValidations.addBlog),
  asyncErrorHandler(async (req, res, next) => {
    throw new Error("error of throw");
    next(error);
    let blog = await blogModel.create({ title: "hello" });
    res.status(200).json(blog);
  })
);

app.all("*", (req, res, next) => {
  const error = new CustomError(`The URL ${req.originalUrl} not found`);
  next(error);
});
app.use(errorHandler);
module.exports = app;
