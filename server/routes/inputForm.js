const express = require("express");
const router = express.Router();
const {
  NotebookDataPostcontroller,
  getNoteBookData,
  updateNoteBookData,
} = require("../Controller/NoteBookData");
router.post("/", NotebookDataPostcontroller);
router.get("/", getNoteBookData);
router.put("/:id", updateNoteBookData);
module.exports = router;
