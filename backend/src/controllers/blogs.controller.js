const asyncErrorHandler = require("../utils/async-error-handler");
const indexModel = require("../models/index.model");

const createBlog = asyncErrorHandler(async (req, res, next) => {
  const blogData = await indexModel.blogModel.create({ ...req.body, coverPhoto: "" });
  res.status(200).json({ status: "success", data: blogData });
});

module.exports = { createBlog };
