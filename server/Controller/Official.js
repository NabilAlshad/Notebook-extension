const Official = require("../Models/Official");
//get all avaiable category
const getAllCategoryController = async (req, res) => {
  try {
    const getAvaialableCategory = await Official.find().select("-_id");
    console.log(getAvaialableCategory);
    if (getAvaialableCategory.length != 0) {
      const data = getAvaialableCategory[0];
      res.json({
        message: "Official Category has found",
        data,
      });
    } else {
      res.json({
        message: "No Category have found",
        data: null,
      });
    }
  } catch (err) {
    res.json({
      message: err.mesasge,
      data: null,
    });
  }
};

module.exports = {
  getAllCategoryController,
};
