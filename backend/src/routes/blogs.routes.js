const express = require("express");
const indexController = require("./../controllers/index.controller");
const indexValidation = require("./../validations/index.validation");
const middlewares = require("./../middlewares/joi");
const router = express.Router();
const upload = require("./../middlewares/multer");
const { uploadCloudinary } = require("./../middlewares/cloudinary");
// console.log("inside blog", indexValidation.blogValidations);
router
  .route("")
  .post(
    upload.single("coverPhoto"),
    uploadCloudinary,
    middlewares(indexValidation.blogValidations.addBlog),
    indexController.blogsController.createBlog
  );

router
  .route("/:id")
  .delete(indexController.blogsController.deleteBlog)
  .patch(
    indexController.blogsController.editBlog
  );

module.exports = router;
