const app = require("../index");
const axios = require("axios");

const assert = require("assert").strict;

let server;

describe("Test Person CRUD API", function () {
  before(() => {
    server = app.listen(3000);
  });

  after(() => {
    server.close();
  });
  it("Test Get", async function () {
    let persons = app.get("db");
    let res = await axios.get("http://localhost:3000/person", {
      headers: {
        Origin: "http://localhost:3000",
      },
    });
    assert.equal(res.status, 200);
    assert.deepEqual(persons, res.data.data.persons);
  });

  it("Test Get By ID", async function () {
    let persons = app.get("db");
    const personId = persons[0] ? persons[0].id : undefined;
    let res;
    try {
      res = await axios.get(`http://localhost:3000/person/${personId}`, {
        headers: {
          Origin: "http://localhost:3000",
        },
      });
      assert.equal(res.status, 200);
      assert.deepEqual(persons[0], res.data);
    } catch (error) {
      assert.deepEqual(error.response.status, 404);
    }
  });

  it("Test Post", async function () {
    let newUser = {
      name: "keber",
      age: 24,
      hobbies: ["dubstep"],
    };

    let res = await axios.post("http://localhost:3000/person", newUser, {
      headers: {
        Origin: "http://localhost:3000",
      },
    });

    assert.equal(res.status, 200);
    let persons = app.get("db");
    let insertedUser = Object.assign({}, persons[0]);

    delete insertedUser.id;
    assert.deepEqual(insertedUser, newUser);
  });

  it("Test Post Validation All empty", async function () {
    let err;
    try {
      let res = await axios.post(
        "http://localhost:3000/person",
        {},
        {
          headers: {
            Origin: "http://localhost:3000",
          },
        }
      );
    } catch (e) {
      err = e;
    }
    console.log(err.response.data);
    assert.equal(err?.response?.status, 400);
  });

  it("Test Post Validation name empty", async function () {
    let err;
    try {
      let res = await axios.post(
        "http://localhost:3000/person",
        {
          age: 26,
          hobbies: [],
        },
        {
          headers: {
            Origin: "http://localhost:3000",
          },
        }
      );
    } catch (e) {
      err = e;
    }
    console.log(err.response.data);
    assert.equal(err?.response?.status, 400);
  });

  it("Test Post Validation age empty", async function () {
    let err;
    try {
      let res = await axios.post(
        "http://localhost:3000/person",
        {
          name: "sam",
          hobbies: [],
        },
        {
          headers: {
            Origin: "http://localhost:3000",
          },
        }
      );
    } catch (e) {
      err = e;
    }
    console.log(err.response.data);
    assert.equal(err?.response?.status, 400);
  });

  it("Test Post Validation age number", async function () {
    let err;
    try {
      let res = await axios.post(
        "http://localhost:3000/person",
        {
          name: "sam",
          age: "bad",
          hobbies: [],
        },
        {
          headers: {
            Origin: "http://localhost:3000",
          },
        }
      );
    } catch (e) {
      err = e;
    }
    console.log(err?.response?.data);
    assert.equal(err?.response?.status, 400);
  });

  it("Test Post Validation hobbies empty", async function () {
    let err;
    try {
      let res = await axios.post(
        "http://localhost:3000/person",
        {
          name: "sam",
          age: 21,
        },
        {
          headers: {
            Origin: "http://localhost:3000",
          },
        }
      );
    } catch (e) {
      err = e;
    }
    assert.equal(err?.response?.status, 400);
  });

  it("Test Post Validation hobbies array", async function () {
    let err;
    try {
      let res = await axios.post(
        "http://localhost:3000/person",
        {
          name: "sam",
          age: 21,
          hobbies: "fighting",
        },
        {
          headers: {
            Origin: "http://localhost:3000",
          },
        }
      );
    } catch (e) {
      err = e;
    }
    assert.equal(err?.response?.status, 400);
  });

  it("Test Put", async function () {
    const newUser = {
      name: "Sam",
      age: 26,
      hobbies: ["dubstep", "jazz"],
    };
    let persons = app.get("db");
    const personId = persons[0].id; // Id of the person to be updated (the first person in the array)

    let res = await axios.put(
      `http://localhost:3000/person/${personId}`,
      newUser,
      {
        headers: {
          Origin: "http://localhost:3000",
        },
      }
    );

    persons[0] = res.data.data.person;
    newUser.id = personId;

    assert.deepEqual(persons[0], newUser);
  });

  it("Test delete", async function () {
    let persons = app.get("db");
    const personId = persons[0].id; // Id of the person to be deleted (the first person in the array)

    let res = await axios.delete(`http://localhost:3000/person/${personId}`, {
      headers: {
        Origin: "http://localhost:3000",
      },
    });

    persons = app.get("db");

    assert.deepEqual(
      persons.filter((p) => p.id == "1"),
      []
    );
  });

  it("Test non existing user", async function () {
    let err;
    try {
      let res = await axios.get("http://localhost:3000/person/1", {
        headers: {
          Origin: "http://localhost:3000",
        },
      });
    } catch (e) {
      err = e;
    }
    assert.equal(err.response.status, 404);
  });

  it("Test non existing endpoint", async function () {
    let err;
    try {
      let res = await axios.get(
        "http://localhost:3000/test/non-exiting/endpoint",
        {
          headers: {
            Origin: "http://localhost:3000",
          },
        }
      );
    } catch (e) {
      err = e;
    }
    assert.equal(err.response.status, 404);
  });
});
