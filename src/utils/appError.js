/**
 * This file is for creating custom error messages with error/status code.
 * It has one constructor function.
 * And it will always be used as an argument whenever we want to send error message
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith("4") ? "FAIL" : "ERROR";
    this.isOperational = true;
  }
}

// Export
module.exports = AppError;
