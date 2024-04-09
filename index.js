const express = require("express");
const bodyParser = require("body-parser");
const Persons = require("./in-memory-db");
const AppError = require("./src/utils/appError");
const geh = require("./src/utils/geh");
const personRoutes = require("./src/apis/person/router");
const cors = require("cors");
const configs = require("./configs");
const app = express();

// Set the db
app.set("db", Persons.data);

// Consume third party middlewares here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const allowedOrigins = ["http://localhost:3000", "http://def.com"]; // Put allowed origins that can access this resource

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(
        new AppError("Origin not allowed to acccess this resource", 403)
      );
    }
  },
};

app.use(cors(corsOptions)); // Apply CORS to all requests

// Mount endpoints with their routing files
app.use("/person", personRoutes);

// Unknown endpoint
app.use("*", (req, res, next) => {
  return next(new AppError("Unknown endpoint", 404));
});

// Use the geh(global error handler)
app.use(geh);

// Create the server
const PORT = configs.port;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
}
module.exports = app;
