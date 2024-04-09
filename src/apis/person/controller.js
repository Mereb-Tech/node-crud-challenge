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
      message: "Person creates successfully",
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
    res.status(200).json(persons);
  } catch (error) {
    next(error);
  }
};

// Get a person's data
exports.getById = async (req, res, next) => {
  try {
    let person = await Persons.findById(req.params.personId);

    // Check if person is null or undefined, then set it to undefined
    if (!person) {
      return res.status(404).json(undefined);
    }

    // Response with the found person
    res.status(200).json(person);
  } catch (error) {
    next(error);
  }
};

// Update person's data
exports.update = async (req, res, next) => {
  try {
    const data = req.body;
    const person = await Persons.update(req.params.personId, data);

    // Response
    res.status(200).json(person);
  } catch (error) {
    next(error);
  }
};

// Delete person's data
exports.deleteById = async (req, res, next) => {
  try {
    const personDeleted = await Persons.deleteById(req.params.personId);

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
    await Persons.deleteAll();

    // Resposne
    res.status(200).json({
      status: "SUCCESS",
      message: "All persons data has been deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
