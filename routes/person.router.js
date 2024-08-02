const express = require("express");
const router = express.Router();
const personController = require("../controllers/person.controller.js");

router
  .post("/", personController.createPerson)
  .get("/:id?", personController.getPersons)
  .put("/:id", personController.updatePerson)
  .delete("/:id", personController.deletePerson);

module.exports = router;
