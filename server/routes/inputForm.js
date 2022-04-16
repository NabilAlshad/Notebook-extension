const express = require("express");
const route = express.Router();
const {
  NotebookDataPostcontroller,
  getNoteBookData,
  updateNoteBookData,
  deleteNotebookData,
  googleLogin,
} = require("../Controller/NoteBookData");
route.post("/post", NotebookDataPostcontroller);
route.get("/noteLists", getNoteBookData);
route.get("/login", googleLogin);
route.put("/:id", updateNoteBookData);
route.put("/delete/:id", deleteNotebookData);
module.exports = route;
