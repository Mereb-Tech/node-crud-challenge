// Dotenv
require("dotenv").config();

// Object for storing all environment variables
module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
};
