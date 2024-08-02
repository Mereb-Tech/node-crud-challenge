const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const personRoutes = require("./routes/person.router");

const app = express();
const port = process.env.PORT || 3000;

let persons = [{
  id: '1',
  name: 'Sam',
  age: '26',
  hobbies: []    
}] //This is your in memory database

app.set('db', persons)

//TODO: Implement crud of person

// Middlewares
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Node-CRUD-challenge");
});

// person routes
app.use("/person", personRoutes);

// Handle non-existing endpoints
app.use((req, res) => {
  res.status(404).send({ message: "Oops! Endpoint not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports = app;