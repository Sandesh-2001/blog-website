const dotenv = require("dotenv");
// console.log("config", dotenv.config({ path: __dirname + "/config.env" }));
dotenv.config({ path: __dirname + "/config.env" });
const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;
console.log("port", PORT);
mongoose
  .connect(process.env.MONGO_URL, { dbName: "blogs" })
  .then(() => {
    console.log("mongoose connected successful...");
  })
  .catch((err) => {
    console.log("error", err.message);
  });

app.listen(PORT, (err) => {
  if (err) {
    console.log(err + "error");
  } else {
    console.log("server started on " + PORT);
  }
});
