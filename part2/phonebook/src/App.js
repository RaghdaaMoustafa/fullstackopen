import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')
  const addName = (event) => {
    event.preventDefault()
    const phoneObject = {
      name: newName,
    }
    setPersons(persons.concat(phoneObject))
    setNewName(' ')
  }
  const handleInput = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((element) => (
          <li key={element.name}>{element.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
