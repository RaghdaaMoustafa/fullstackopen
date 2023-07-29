const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(morgan('tiny'))

let phones = [
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
const generateid = () => {
  const maxId = Math.max(...phones.map((person) => person.id))
  return maxId + 1
}

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
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  phones = phones.filter((person) => person.id !== id)

  response.status(204).end()
})
app.post('/api/persons', (request, response) => {
  const body = request.body
  const person = {
    id: Math.floor(Math.random() * 200),
    name: body.name,
    number: body.number,
  }
  const checkRepeated = phones.find((person) => person.name === body.name)
  if (person.name && person.number && !checkRepeated) {
    phones = phones.concat(person)
    return response.json(person)
  } else {
    response.status(400).json({ error: 'name must be unique' })
  }
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
