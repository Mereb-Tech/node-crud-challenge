const express = require("express");
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

app.get("/persons", (req, res) => {
  res.json(persons);
});

app.get("/persons/:personId", (req, res) => {
  const personId = req.params.personId;
  res.json(persons[personId - 1]);
});

if (require.main === module) {
  console.log("Server up and running on port 3000...");
  app.listen(3000);
}
module.exports = app;
