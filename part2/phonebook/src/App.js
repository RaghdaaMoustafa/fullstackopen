import { useState } from 'react'

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
      <div>
        filter shown with
        <input value={filtered} onChange={handleFilter} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleInputName} value={newName} />
        </div>
        <br></br>
        <div>
          number:
          <input value={newNumber} onChange={handleInputNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((element, id) => (
          <li key={element.name}>
            {element.name} {element.number}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
