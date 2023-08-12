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
    .catch((error) => next(error))
})
app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then((deleted) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})
app.post('/api/persons', (request, response) => {
  const payload = request.body
  const person = new Person({
    name: payload.name,
    number: payload.number,
  })
  console.log('payload :', payload)
  console.log('person :', person)
  person.save().then((savedPhone) => response.json(savedPhone))
})
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
