const { v4: uuidv4 } = require("uuid");

exports.createPerson = (persons, name, age, hobbies) => {
  if (!name || typeof name !== "string") {
    throw new Error("Invalid name");
  }
  if (!age || typeof age !== "number") {
    throw new Error("Invalid age");
  }
  if (!hobbies || !Array.isArray(hobbies)) {
    throw new Error("Invalid hobbies");
  }

  const newPerson = { id: uuidv4(), name, age, hobbies };
  persons.push(newPerson);
  return newPerson;
};

exports.getAllPersons = (persons) => persons;

exports.getPersonById = (persons, id) => persons.find((p) => p.id === id);

exports.updatePersonById = (persons, id, updatedPerson) => {
  const person = exports.getPersonById(persons, id);
  if (!person) {
    throw new Error("Person with such Id is not found");
  }
  Object.assign(person, updatedPerson);
  return person;
};

exports.deletePersonById = (persons, id) => {
  const index = persons.findIndex((p) => p.id === id);
  if (index !== -1) {
    persons.splice(index, 1);
  }
};
