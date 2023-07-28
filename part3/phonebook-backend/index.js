const express = require('express')
const app = express()
const phones = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]
const time = new Date()

app.get('/api/persons', (request, response) => {
  response.json(phones)
})
app.get('/info', (request, response) => {
  response.send(
    `<div><p>Phonebook has info ${
      phones.length
    } people</p> <p>${new Date()}</p></div>`
  )
})
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = phones.find((person) => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.statusMessage = 'No such id'
    response.status(404).end()
  }
})
const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
