const Joi = require("joi");

// Validate the API that'll be used to create person
exports.validateCreateAPI = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name is required",
  }),
  age: Joi.number().min(0).required().messages({
    "any.required": "Age is required",
    "number.min": "Age must be greater than or equal to zero",
  }),
  hobbies: Joi.array().required().messages({
    "any.required": "The field hobbies is required",
    "array.base": "Hobbies must array of strings",
  }),
});

// Validate the API that'll be used to update person's data
exports.validateUpdateAPI = Joi.object({
  name: Joi.string().messages({
    "string.empty": "Name is required",
  }),
  age: Joi.number().min(0).messages({
    "number.min": "Age must be greater than or equal to zero",
  }),
  hobbies: Joi.array().messages({
    "array.base": "Hobbies must array of strings",
  }),
});
