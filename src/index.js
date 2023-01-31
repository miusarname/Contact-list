const morgan = require("morgan");
const express = require("express");
const path = require("path");
const {mongoose} = require('./database');

const app = express();

//Setting
app.set("port", process.env.PORT || 3000);

//Middlewares
app.use(express.json());
app.use(morgan("dev"));

//Routes
const Routes = require("./routes/contact.routes");
app.use("/api/contacts", Routes);

//Static files
front = path.join(__dirname + "/public/vite-project/dist");
app.use(express.static(front));

//server
app.listen(app.get("port"), () => {
  console.log("Listen on port 3000");
});
