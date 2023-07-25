import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState('')
  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data)
    })
  }, [])
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
