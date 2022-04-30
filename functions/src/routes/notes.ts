const router = require("express").Router();

// // Require controller modules.
let note_controller = require("../controllers/noteController");

router.post("/", note_controller.setNote);

// router.get("/", note_controller.getNote);

router.get("/user/:id", note_controller.getUserNotes);

router.delete("/:id", note_controller.deleteNote);

module.exports = router;
