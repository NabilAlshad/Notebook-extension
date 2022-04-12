var express = require("express");
var inputRouter = require("./routes/inputForm");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const mongoose = require("mongoose");

var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
//database connection
mongoose
  .connect("mongodb://localhost:27017/Notebook", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(console.log(`Data base connected`))
  .catch((err) => console.log(err));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/form", inputRouter);

module.exports = app;
