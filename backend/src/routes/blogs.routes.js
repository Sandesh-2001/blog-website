const express = require("express");
const indexController = require("./../controllers/index.controller");
const indexValidation = require("./../validations/index.validation");
const middlewares = require("./../middlewares/joi");
const router = express.Router();
// console.log("inside blog", indexValidation.blogValidations);
router
  .route("")
  .post(
    middlewares(indexValidation.blogValidations.addBlog),
    indexController.blogsController.createBlog
  );

module.exports = router;
