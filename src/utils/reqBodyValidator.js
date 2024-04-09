const joi = require("joi");
const AppError = require("./appError");

/**
 * Middleware to validate data on req.body
 * @param {joi.schema} schema A schema having validation rules
 * @returns
 */
const reqBodyValidator = (schema) => {
  return (req, res, next) => {
    // Validate the "req.body" using the joi schema passed as argument
    const { error } = schema.validate(req.body);

    // Check and handle error
    if (error) return next(new AppError(error.message, 400));

    // Go to next middleware
    next();
  };
};

module.exports = reqBodyValidator;
