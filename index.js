const dotenv = require("dotenv");
const PersonServices = require("./Services/PersonService");
const Person = require("./Models/person");

dotenv.config();
const DBPath = process.env.DATABASE_PATH;

const app = require("./app");

// This DB is save data to Persons.json file
const PersonsDB = PersonServices.getInstance(DBPath, Person, app);

// TO simulate in memory database for the test
PersonsDB.deleteAllPersons();

// Create one Person with id 1 for test
PersonsDB.createPerson({
  name: "natty",
  age: 23,
  hobbies: ["football", "coding", "film"],
});

app.set("db", PersonsDB.getAllPersons());

const port = process.env.PORT || 3000;
/*const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});*/

module.exports = app;
