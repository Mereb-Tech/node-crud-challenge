const AppError = require("./Utils/appError");
const globalErrorHandler = require("./Controllers/errorController");
const personRouter = require("./Routers/personRouter");
const express = require("express");
const cors = require("cors");
const PersonService = require("./Services/PersonService");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());

app.options("*", cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/person", personRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
