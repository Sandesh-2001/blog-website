const express = require("express");
const cors = require("cors");
const CustomError = require("./utils/custom-error-handler");
const errorHandler = require("./utils/error-handler");
const indexRoutes = require("./routes/index.routes");
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: 'dadxfjg93',
  api_key: '364985937859155',
  api_secret: 'gYRhnH7XIsQu5WnFTKH3Y9Vo35A', // Click 'View API Keys' above to copy your API secret
  secure: false
});

const app = express();

app.use(cors());
app.use(express.json());

app.use("/blogs", indexRoutes.blogRoutes);

app.all("*", (req, res, next) => {
  const error = new CustomError(`The URL ${req.originalUrl} not found`);
  next(error);
});
app.use(errorHandler);
module.exports = app;
