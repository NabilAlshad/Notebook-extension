const express = require("express");
const route = express.Router();
const {
  NotebookDataPostcontroller,
  getNoteBookData,
  updateNoteBookData,
  deleteNotebookData,
  googleLogin,
  getAllBookmarksByCategoryController,
  getBookmarkById,
} = require("../Controller/NoteBookData");
route.post("/post", NotebookDataPostcontroller);
route.get("/noteLists", getNoteBookData);
route.get("/login", googleLogin);
route.put("/update/:id", updateNoteBookData);
route.put("/delete/:id", deleteNotebookData);
route.get("/bookmarks", getAllBookmarksByCategoryController);
route.get("/bookmark/:id", getBookmarkById);
module.exports = route;
