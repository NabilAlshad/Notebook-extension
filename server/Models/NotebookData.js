const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotebookDataSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    // required: true,
  },
  newCategory: {
    type: String,
  },
});
module.exports = mongoose.model("NotebookData", NotebookDataSchema);
