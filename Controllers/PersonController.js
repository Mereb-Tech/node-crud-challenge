const AppError = require("../Utils/appError");
const PersonService = require("../Services/PersonService");
const catchAsync = require("../Utils/catchAsync");

exports.createPerson = catchAsync(async (req, res, next) => {
  const PersonsDB = await PersonService.getInstance();
  const preson = await PersonsDB.createPerson(req.body);
  res.status(200).json(preson);
});

exports.getPerson = (req, res, next) => {
  const PersonsDB = PersonService.getInstance();
  const preson = PersonsDB.getPerson(req.params.id);

  if (!preson) {
    return next(new AppError("No Preson found with that ID", 404));
  }

  res.status(200).json(preson);
};

exports.getAllPerson = (req, res, next) => {
  const PersonsDB = PersonService.getInstance();
  const presons = PersonsDB.getAllPersons();

  res.status(200).json(presons);
};

exports.updatePerson = catchAsync(async (req, res, next) => {
  const PersonsDB = PersonService.getInstance();
  const updatedPreson = await PersonsDB.updatePerson(req.params.id, req.body);

  if (!updatedPreson) {
    return next(new AppError("No Person found with that ID", 404));
  }

  res.status(200).json(updatedPreson);
});

exports.deletePerson = catchAsync(async (req, res, next) => {
  const PersonsDB = PersonService.getInstance();
  const person = await PersonsDB.deletePerson(req.params.id);
  if (!person) {
    return next(new AppError("No Person found with that ID", 404));
  }

  res.status(204).json({});
});
