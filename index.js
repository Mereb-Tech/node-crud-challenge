const express = require("express")
const bodyParser = require("body-parser")
const uuid = require("uuid")
const cors = require('cors')
const Joi = require('joi')
const app = express()

app.use(cors())
app.use(bodyParser.json({ extended: false }));

let persons = [{
    id: "1",
    name: "Sam",
    age: "26",
    hobbies: []
}] //This is your in memory database DO NOT CHANGE THE INTIAL STATE

app.set("db", persons)
//TODO: Implement crud of person

app.get("/person", (req, res) => {
    res.json(persons)
})

app.get("/person/:id", (req, res) => {
    let filtered = persons.filter(p => p.id == req.params.id)
    if (filtered.length) {
        res.json(filtered[0])
    } else {
        res.sendStatus(404)
    }
})

app.post("/person", (req, res) => {

    const schema = Joi.object().keys({
        name: Joi.string().required(),
        age: Joi.number().min(1).max(140).required(),
        hobbies: Joi.array().required()
    })

    const { error } = schema.validate(req.body)
    // res.send(validationResult)
    if (error) {
        res.status(400).json(error);
    } else {
        let person = {
            id: uuid.v4(),
            name: req.body.name,
            age: req.body.age,
            hobbies: req.body.hobbies || []
        }
        persons.push(person)
        res.sendStatus(200)
    }
})

app.put("/person/:id", (req, res) => {
    let idx = persons.findIndex(p => p.id == req.params.id)
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        age: Joi.number().min(1).max(140).required(),
        hobbies: Joi.array().required()
    })

    const { error } = schema.validate(req.body)
    
    if (idx == -1) {
        res.sendStatus(404)

        // res.send(validationResult)
    } else if (error) {
        res.status(400).json(error);
    }
    else {
        let old = persons[idx]
        let person = {
            id: old.id,
            name: req.body.name,
            age: req.body.age,
            hobbies: req.body.hobbies || []
        }
        persons[idx] = person;
        res.sendStatus(200);
    }
})

app.delete("/person/:id", (req, res) => {
    let idx = persons.findIndex(p => p.id == req.params.id)
    if (idx == -1) {
        res.sendStatus(404)
    } else {
        persons.splice(idx, 1)
        res.sendStatus(200)
    }
})

if (require.main === module) {
    app.listen(3000)
}
module.exports = app;