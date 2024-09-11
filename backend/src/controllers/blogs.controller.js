const asyncErrorHandler = require("../utils/async-error-handler");
const indexModel = require("../models/index.model");

const createBlog = asyncErrorHandler(async (req, res, next) => {
  console.log('req.body======>>>', req.body)

  const blogData = await indexModel.blogModel.create({ ...req.body });
  res.status(200).json({ status: "success", result: blogData });
});

const deleteBlog = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log("id is ", id);
  const deleteBlog = await indexModel.blogModel.findByIdAndDelete(id);
  console.log('deleted', deleteBlog)
  res.status(200).json({ status: "success", result: null })
});

const editBlog = asyncErrorHandler(async (req, res, next) => {
  const data = req.body;
  const { id } = req.params;
  const editedBlog = await indexModel.blogModel.findByIdAndUpdate(id, data, { new: true });
  res.status(200).json({ status: "success", result: editedBlog })
})

const getBlogs = asyncErrorHandler(async (req, res, next) => {
  const blogsData = await indexModel.blogModel.find();
  res.status(200).json({ status: "success", result: blogsData })
})

module.exports = { createBlog, deleteBlog, editBlog, getBlogs };

