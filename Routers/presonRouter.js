const express = require("express");
const PresonController = require("../Controllers/PersonController");

const router = express.Router();

router
  .route("/")
  .get(PresonController.getAllPerson)
  .post(PresonController.createPerson);

router
  .route("/:id")
  .get(PresonController.getPerson)
  .put(PresonController.updatePerson)
  .delete(PresonController.deletePerson);

module.exports = router;
