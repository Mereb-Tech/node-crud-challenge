const express = require("express");
const bodyParser = require("body-parser");
const Persons = require("./in-memory-db");
const AppError = require("./src/utils/appError");
const geh = require("./src/utils/geh");
const personRoutes = require("./src/apis/person/router");
const cors = require("cors");
const app = express();

// Set the db
app.set("db", Persons.data);

// Consume third party middlewares here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Mount endpoints with their routing files
app.use("/person", personRoutes);

// Unknown endpoint
app.use("*", (req, res, next) => {
  return next(new AppError("Unknown endpoint", 404));
});

// Use the geh(global error handler)
app.use(geh);

// Create the server
if (require.main === module) {
  app.listen(3000, () => {
    console.log("Server running on port: 3000");
  });
}
module.exports = app;
