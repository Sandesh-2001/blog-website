const express = require("express");
const cors = require("cors");
const CustomError = require("./utils/custom-error-handler");
const errorHandler = require("./utils/error-handler");
const indexRoutes = require("./routes/index.routes");

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
