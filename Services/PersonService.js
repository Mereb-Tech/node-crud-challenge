const fs = require("fs");
const { promisify } = require("util");
const AppError = require("../Utils/appError");
const uuid = require("uuid").v4;

// This DB reads presons.json on initilization and write on create,detete and update operation.

class PersonServices {
  constructor(path, model, app) {
    this.path = path;
    this.model = model;
    this.persons = [];
    this.app = app;
  }
  static getInstance(path, model, app) {
    if (PersonServices.instance) {
      return PersonServices.instance;
    }

    PersonServices.instance = new PersonServices(path, model, app);

    const personString = PersonServices.instance._readFileSync();

    PersonServices.instance.persons = personString
      ? JSON.parse(personString)
      : [];

    console.log("database connected successfully");
    return PersonServices.instance;
  }
  _readFile() {
    return promisify(fs.readFile)(this.path, "utf-8");
  }
  _readFileSync() {
    return fs.readFileSync(this.path, "utf-8");
  }

  _writeFileSync(data) {
    return fs.writeFileSync(this.path, JSON.stringify(data));
  }

  _writeFile(data) {
    return promisify(fs.writeFile)(this.path, JSON.stringify(data));
  }

  async createPerson(person) {
    const { error } = this.model.validate(person);
    
    if (error) {
      throw new AppError(error.message, 400);
    }

    // for test purpose
    if (this.persons.some((p) => p.id === "1")) {
      person.id = uuid();
    } else {
      person.id = "1";
    }

    this.persons.push(person);

    const err = await this._writeFile(this.persons);

    if (err) {
      throw new Error("Error writing file");
    }
    // for test purpose
    this.app.set("db", this.persons);

    return person;
  }

  async updatePerson(id, person) {
    if (!this.persons.some((p) => p.id === id)) {
      return;
    }

    const { error } = this.model.validate(person);

    if (error) {
      throw new AppError(error.message, 400);
    }
    person.id = id;

    const index = this.persons.findIndex((p) => p.id === person.id);

    this.persons[index] = person;
    const err = await this._writeFile(this.persons);

    if (err) {
      throw new Error("Error writing file");
    }
   
    // for test purpose
    this.app.set("db", this.persons);

    return person;
  }

  async deletePerson(id) {
    console.log("id", id, this.persons);
    if (!this.persons.some((p) => p.id === id)) {
      return;
    }

    this.persons = this.persons.filter((p) => p.id !== id);

    const err = await this._writeFile(this.persons);

    if (err) {
      throw new Error("Error writing file");
    }
    // for test purpose
    this.app.set("db", this.persons);
    return {};
  }

  getPerson(id) {
    return this.persons.find((p) => p.id === id);
  }

  getAllPersons() {
    return this.persons;
  }

  deleteAllPersons() {
    this.persons = [];
    this._writeFileSync(this.persons);
  }
}

module.exports = PersonServices;
