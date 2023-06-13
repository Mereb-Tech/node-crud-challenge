const express = require("express");
const Joi = require("joi");
const app = express();

let persons = [
  {
    id: "1",
    name: "Sam",
    age: "26",
    hobbies: [],
  },
  {
    id: "2",
    name: "Nat",
    age: "22",
    hobbies: [],
  },
  {
    id: "3",
    name: "Dan",
    age: "30",
    hobbies: [],
  },
]; //This is your in memory database

app.set("db", persons);
//TODO: Implement crud of person

app.get("/person", (req, res) => {
  res.status(200).json(persons);
});

app.get("/person/:personId", (req, res) => {
  const personId = req.params.personId;

  const person = persons.find((p) => p.id === personId);

  if (!person) {
    res.status(404).send("Person not found");
    return;
  }
  res.status(200).send(person);
});

app.post("/person", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    hobbies: Joi.array().items(Joi.string()).required(),
  });

  const { error, value } = schema.validate(req.body);

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
  res.status(201).json(person);
});

if (require.main === module) {
  console.log("Server up and running on port 3000...");
  app.listen(3000);
}
module.exports = app;
