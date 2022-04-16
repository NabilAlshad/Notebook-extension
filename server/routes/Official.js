const express = require("express");
const route = express.Router();
const { getAllCategoryController } = require("../Controller/Official");
route.get("/get", getAllCategoryController);
module.exports = route;
