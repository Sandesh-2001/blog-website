const express = require("express");
const indexController = require("./../controllers/index.controller");
const indexValidation = require("./../validations/index.validation");
const middlewares = require("./../middlewares/joi");
const router = express.Router();
const upload = require('./../middlewares/multer')
// console.log("inside blog", indexValidation.blogValidations);
router
  .route("")
  .post(
    upload.single('coverPhoto'),
    middlewares(indexValidation.blogValidations.addBlog),
    indexController.blogsController.createBlog
  );
router.use('/photo', express.static('uploads'))
module.exports = router;
