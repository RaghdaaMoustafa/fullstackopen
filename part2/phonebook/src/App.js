import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState('')
  const addName = (event) => {
    event.preventDefault()
    const phoneObject = {
      name: newName,
      number: newNumber,
    }
    const checkRepeated = persons.find((element) => element.name === newName)
    console.log(persons)
    console.log(checkRepeated)

    if (checkRepeated) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(phoneObject))
    setNewName('')
    setNewNumber('')
    console.log(persons)
  }
  const handleInputName = (event) => {
    setNewName(event.target.value)
  }
  const handleInputNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const personsToShow = persons.filter((element) =>
    element.name.includes(filtered)
  )
  const handleFilter = (event) => {
    setFiltered(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filtered} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        value1={newName}
        handleInputName={handleInputName}
        value2={newNumber}
        handleInputNumber={handleInputNumber}
      />
      <h2>Numbers</h2>
      <ul>
        <Persons personsToShow={personsToShow} />
      </ul>
    </div>
  )
}

export default App
