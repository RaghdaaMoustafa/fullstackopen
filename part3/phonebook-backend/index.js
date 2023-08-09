const express = require('express')
require('dotenv').config()
const Person = require('./models/phone')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :body'))

const time = new Date()
const generateid = () => {
  const maxId = Math.max(...phones.map((person) => person.id))
  return maxId + 1
}

app.get('/api/persons', (request, response) => {
  Person.find({}).then((person) => {
    response.json(person)
  })
})
app.get('/info', (request, response) => {
  Person.find({}).then((phones) => {
    response.json(
      `<div><p>Phonebook has info ${
        phones.length
      } people</p> <p>${new Date()}</p></div>`
    )
  })
})
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then((phone) => {
      response.json(phone)
    })
    .catch((error) => {
      response.statusMessage = 'No such id'
      response.status(404).end()
    })
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
