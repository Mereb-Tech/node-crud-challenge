const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");
const app = express();

let persons = [
  {
    id: "1",
    name: "Sam",
    age: "26",
    hobbies: [],
  },
]; //This is your in memory database

const schema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  hobbies: Joi.array().items(Joi.string()).required(),
});

// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("db", persons);
//TODO: Implement crud of person

//Get all persons
app.get("/person", (req, res) => {
  res.status(200).json(persons);
});

//Get with id
app.get("/person/:personId", (req, res) => {
  const personId = req.params.personId;

  const person = persons.find((p) => p.id === personId);

  if (!person) {
    res.status(404).send("Person not found");
    return;
  }
  res.status(200).send(person);
});

//Post endpoint
app.post("/person", (req, res) => {
  const { error, _ } = schema.validate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const person = {
    id: uuidv4(),
    name: req.body.name,
    age: req.body.age,
    hobbies: req.body.hobbies,
  };

  persons.push(person);
  res.status(200).json(person);
});

//Put endpoint
app.put("/person/:personId", (req, res) => {
  const personId = req.params.personId;
  const personIndex = persons.findIndex((p) => p.id === personId);

  if (personIndex === -1) {
    res.status(404).send("Person not found");
    return;
  }

  const { error, _ } = schema.validate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const updatedPerson = {
    ...persons[personIndex],
    name: req.body.name,
    age: req.body.age,
    hobbies: req.body.hobbies,
  };

  persons[personIndex] = updatedPerson;
  res.json(updatedPerson);
});

app.delete("/person/:personId", (req, res) => {
  const personId = req.params.personId;
  const personIndex = persons.findIndex((p) => p.id === personId);

  if (personIndex === -1) {
    res.status(404).send("Person not found");
    return;
  }

  const deletedPerson = persons[personIndex];
  persons.splice(personIndex, 1);
  res.json(deletedPerson);
});

//A route destined to fail to test error handling
app.get("/error", (req, res) => {
  res.send(error());
});

// Error handling for unmatched routes
app.use((req, res) => {
  res.status(404).json("No such route");
});

//Handle server errors
app.use((err, req, res, next) => {
  // console.log(err);
  res.status(500).json("Internal server error");
});

if (require.main === module) {
  console.log("Server up and running on port 3000...");
  app.listen(3000);
}
module.exports = app;
