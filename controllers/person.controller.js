const Person = require("../models/person.model.js");

// to create a new person
exports.createPerson = (req, res) => {
  try {
    const { name, age, hobbies } = req.body;
    const persons = req.app.get("db");
    const newPerson = Person.createPerson(persons, name, age, hobbies);
    res.status(200).json({
      message: "Person created successfully",
      data: newPerson,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// to get all persons or a person by id
exports.getPersons = (req, res) => {
  const { id } = req.params;
  const persons = req.app.get("db");

  if (id) {
    const person = Person.getPersonById(persons, id);
    if (person) {
      res.status(200).json(person);
    } else {
      res.status(404).json({ message: "Person with such Id is not found" });
    }
  } else {
    res.status(200).json(persons);
  }
};

// to update an existing person by id
exports.updatePerson = (req, res) => {
  const { id } = req.params;
  const { name, age, hobbies } = req.body;
  const persons = req.app.get("db");

  try {
    const updatedPerson = Person.updatePersonById(persons, id, {
      name,
      age,
      hobbies,
    });
    res.status(200).json({
      message: "Person updated successfully",
      data: updatedPerson,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// to delete a person by id

exports.deletePerson = (req, res) => {
  const { id } = req.params;
  const persons = req.app.get("db");
  try {
    const person = Person.getPersonById(persons, id);
    if (!person) {
      return res
        .status(404)
        .json({ message: "Person with such Id is not found" });
    }
    Person.deletePersonById(persons, id);
    res.status(200).json({ message: "Person deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting the person" });
  }
};
