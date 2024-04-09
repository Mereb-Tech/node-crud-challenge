const { v4: uuid4 } = require("uuid");

class InMemoryDatabase {
  constructor() {
    this.data = [];
  }

  // Method to store person data in the database
  store(data) {
    const id = uuid4(); // Generate id
    const person = { id, ...data }; // Prepare person data
    this.data.unshift(person); // Persist person data to the IMDB
    return person; // Return the newly created person data
  }

  // Method to get all persons data
  findAll() {
    return this.data;
  }

  // Method to get person data by id
  findById(id) {
    const person = this.data.find((person) => {
      return person.id === id;
    });
    return person;
  }

  // Method to update person data
  update(id, data) {
    const person = this.data.find((person) => {
      return person.id === id;
    });

    // If person doesnot exist, return false
    if (!person) return undefined;

    // Update person data
    person.name = data.name ? data.name : person.name;
    person.age = data.age ? data.age : person.age;
    person.hobbies = data.hobbies ? data.hobbies : person.hobbies;

    return person; // Return the updated person data
  }

  // Method to delete person
  deleteById(id) {
    const index = this.data.findIndex((person) => person.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      return true;
    }
    return false;
  }

  // Method to delete all persons
  deleteAll() {
    this.data.length = 0;
  }
}

const db = new InMemoryDatabase();

// Export DB
module.exports = db;
