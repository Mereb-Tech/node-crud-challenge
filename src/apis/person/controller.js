const Persons = require("../../../in-memory-db");
const AppError = require("../../utils/appError");

// Create person data
exports.createPerson = async (req, res, next) => {
  try {
    const body = req.body;
    const person = await Persons.store(body);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Person created successfully",
      data: { person },
    });
  } catch (error) {
    next(error);
  }
};

// Get all persons
exports.getAll = async (req, res, next) => {
  try {
    const persons = await Persons.findAll();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: persons.length,
      data: { persons },
    });
  } catch (error) {
    next(error);
  }
};

// Get a person's data
exports.getById = async (req, res, next) => {
  try {
    const person = await Persons.findById(req.params.personId);

    // Check if person is not found
    if (!person) {
      return next(new AppError("Person not found", 404));
    }

    // Response
    res.status(200).json({
      status: "SUCCESS",
      data: person,
    });
  } catch (error) {
    next(error);
  }
};

// Update person's data
exports.update = async (req, res, next) => {
  try {
    const data = req.body;
    const person = await Persons.update(req.params.personId, data);
    if (!person) return next(new AppError("Person does not exist", 404));

    // Response
    res.status(200).json({
      statu: "SUCCESS",
      message: "Person data updated successfully",
      data: { person },
    });
  } catch (error) {
    next(error);
  }
};

// Delete person's data
exports.deleteById = async (req, res, next) => {
  try {
    const personDeleted = await Persons.deleteById(req.params.personId);
    if (!personDeleted) return next(new AppError("Person does not exist", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Person deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// Delete all persons in DB
exports.deleteAll = async (req, res, next) => {
  try {
    Persons.deleteAll();

    // Resposne
    res.status(200).json({
      status: "SUCCESS",
      message: "All persons data have been deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
