const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let persons = [];


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/person/:id?', (req, res) => {
    const personId = req.params.id;
    if (personId) {
        const person = persons.find(p => p.id === personId);
        if (person) {
            return res.status(200).json(person);
        }
        return res.status(404).json({ message: 'Person not found' });
    }
    res.status(200).json(persons);
});


app.post('/person', (req, res) => {
    const { name, age, hobbies } = req.body;

    if (!name || typeof age !== 'number' || !Array.isArray(hobbies)) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    const newPerson = {
        id: uuidv4(),
        name,
        age,
        hobbies,
    };
    persons.push(newPerson);
    res.status(201).json(newPerson);
});

app.put('/person/:id', (req, res) => {
    const personId = req.params.id;
    const { name, age, hobbies } = req.body;

    const personIndex = persons.findIndex(p => p.id === personId);
    if (personIndex === -1) {
        return res.status(404).json({ message: 'Person not found' });
    }

    if (!name || typeof age !== 'number' || !Array.isArray(hobbies)) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    persons[personIndex] = { id: personId, name, age, hobbies };
    res.status(200).json(persons[personIndex]);
});


app.delete('/person/:id', (req, res) => {
    const personId = req.params.id;
    const personIndex = persons.findIndex(p => p.id === personId);
    if (personIndex === -1) {
        return res.status(404).json({ message: 'Person not found' });
    }

    persons.splice(personIndex, 1);
    res.status(204).send();
});


app.use((req, res) => {
    res.status(404).json({ message: 'Resource not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
