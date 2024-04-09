// AppError
const AppError = require("./appError");

// Configs
const configs = require("../../configs");

// Error message for development
const errMessageForDevelopment = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    erroStack: err.stack,
  });
};

// Error messafe for production
const errMessageForProduction = (err, res) => {
  if (err.isOprational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "ERROR",
      message: "Opps! Unknown error happened. Please try again",
    });
  }
};

/**
 * The global error handler middleware
 */
const geh = (err, req, res, next) => {
  err.status = err.status || "ERROR";
  err.statusCode = err.statusCode || 500;

  // Send different errors for different environments
  if (configs.env === "development") {
    errMessageForDevelopment(err, res);
  } else if (configs.env == "production") {
    errMessageForProduction(err, res);
  }
};

// Export geh
module.exports = geh;
