const router = require("express").Router();
const {
  createPerson,
  getAll,
  deleteAll,
  getById,
  update,
  deleteById,
} = require("./controller");
const validation = require("../../utils/reqBodyValidator");
const { validateCreateAPI, validateUpdateAPI } = require("./validation");

// Mount routes with their respective controller methods
router
  .route("/")
  .post(validation(validateCreateAPI), createPerson)
  .get(getAll)
  .delete(deleteAll);

router
  .route("/:personId")
  .get(getById)
  .put(validation(validateUpdateAPI), update)
  .delete(deleteById);

// Export router
module.exports = router;
