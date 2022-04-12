const mongoose = require("mongoose");
const { router } = require("../app");
const { findByIdAndUpdate } = require("../Models/NotebookData");
const NotebookData = require("../Models/NotebookData");

const NotebookDataPostcontroller = async (req, res) => {
  try {
    const noteDataDetails = new NotebookData(req.body);
    await noteDataDetails.save();

    if (noteDataDetails) {
      res.status(200).json({ message: noteDataDetails });
    }
  } catch (err) {
    if (err) {
      res.status(500).send(err);
    }
  }
};

const getNoteBookData = async (req, res) => {
  try {
    const noteDataDetails = await NotebookData.find();
    if (noteDataDetails) {
      res.status(200).json(noteDataDetails);
    }
  } catch (error) {
    console.log(error);
  }
};
const updateNoteBookData = async (req, res) => {
  try {
    const updateDataId = req.params._id;
    const updateNotebookData = NotebookData.findByIdAndUpdate(
      { updateDataId },
      req.body,
      {
        new: true,
      }
    );
    if (updateNoteBookData) {
      res.status(200).json(updateNotebookData);
    }

    // const updateData=req.params._id;
    // NotebookData.updateOne(
    //   {

    //   }, //query
    //   {
    //     $set: {

    //     }
    //   }, //update
    //   {multi: true}
    // )
  } catch (error) {
    console.log(error);
  }
};
const deleteNotebookData = async (req, res) => {
  try {
    const deletedId = req.params._id;
    const deleteData = NotebookData.deleteOne(deletedId);
  } catch (error) {}
};
module.exports = {
  NotebookDataPostcontroller,
  getNoteBookData,
  updateNoteBookData,
  deleteNotebookData,
};
