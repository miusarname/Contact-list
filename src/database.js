const mongoose = require("mongoose");
const URI = "mongodb://localhost:3000/Contact-list-t";

mongoose.set("strictQuery", true);
mongoose
  .connect(URI)
  .then((db) => console.log("Connected"))
  .catch((err) => console.error("Do not connected"));

module.exports = mongoose;
