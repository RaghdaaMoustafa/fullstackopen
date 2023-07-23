import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0100023456' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const addName = (event) => {
    event.preventDefault()
    const phoneObject = {
      name: newName,
      number: newNumber,
    }
    const checkRepeated = persons.map((element) => element.name === newName)
    console.log(persons)
    console.log(checkRepeated)
    console.log(checkRepeated.includes(true))

    if (checkRepeated.includes(true)) {
      alert(`${newName} is already added to phonebook`)
    }
    setPersons(persons.concat(phoneObject))
    setNewName(' ')
    setNewNumber(' ')
    console.log(persons)
  }
  const handleInputName = (event) => {
    setNewName(event.target.value)
  }
  const handleInputNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map((element, id) => (
          <li key={element.name}>
            {element.name} {element.number}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
