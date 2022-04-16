const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OfficialSchema = new Schema({
  availableCategory: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Official", OfficialSchema);
