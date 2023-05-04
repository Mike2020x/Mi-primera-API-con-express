const express = require("express");
const morgan = require("morgan");

const app = express();
const port = 3001;
//midlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("build"));

let persons = [
  {
    id: "1",
    name: "Ana",
    number: "555566644",
  },
  {
    id: "2",
    name: "Raul",
    number: "555566644",
  },
  {
    id: "3",
    name: "Camilo",
    number: "555566644",
  },
  {
    id: "4",
    name: "Juan",
    number: "555566644",
  },
  {
    id: "5",
    name: "Michael",
    number: "555566644",
  },
];

//get info
app.get("/info", (req, res) =>
  res.send(
    `Phonebook has info for ${persons.length} people <br> <br> ${new Date()}`
  )
);
//get persons
app.get("/api/persons", (req, res) => {
  res.json(persons);
});
//get person
app.get("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  const person = persons.find((person) => person.id === id);
  if (!person) {
    res.status(404).json({ message: "Person not found" });
  }
  res.json(person);
});
//delete person
app.delete("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  const person = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

//add person
app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number is missing",
    });
  }

  const existingPerson = persons.find((person) => person.name === body.name);

  if (existingPerson) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const newPerson = {
    id: Math.floor(Math.random() * 100000),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(newPerson);

  res.json(newPerson);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
