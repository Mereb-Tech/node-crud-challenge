const express = require("express");
const PersonController = require("../Controllers/PersonController");

const router = express.Router();

router
  .route("/")
  .get(PersonController.getAllPerson)
  .post(PersonController.createPerson);

router
  .route("/:id")
  .get(PersonController.getPerson)
  .put(PersonController.updatePerson)
  .delete(PersonController.deletePerson);

module.exports = router;
