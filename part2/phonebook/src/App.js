import { useEffect, useState } from 'react'
import axios from 'axios'
import personService from './Services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const Notification = ({ message, nameClass }) => {
  if (message === null) {
    return null
  }
  console.log(nameClass)

  return <div className={nameClass}>{message}</div>
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [nameClass, setNameClass] = useState(null)

  useEffect(() => {
    personService.getAll().then((intialPersons) => {
      setPersons(intialPersons)
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
      if (
        window.confirm(
          `${newName} is already added to phonebook,replace the old number with a new one?`
        )
      ) {
        personService
          .update(checkRepeated.id, phoneObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== checkRepeated.id ? person : returnedPerson
              )
            )
            setNewName('')
            setNewNumber('')
            setNameClass('success')
            setSuccessMessage(`${returnedPerson.name} contact is updated`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch((error) => {
            setNameClass('fail')
            setSuccessMessage(
              `Information of ${phoneObject.name} has already been removed from server `
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
      }
      return
    }
    personService
      .create(phoneObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNameClass('success')
        setSuccessMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch((error) => {
        setNameClass('fail')
        setSuccessMessage(error.response.data.error)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
  }
  const whenDelete = (id, person) => {
    if (window.confirm(`Delete ${person} ? `)) {
      personService.deleteRequest(id).then(() => {
        setPersons(
          persons.filter((element) => {
            return id !== element.id
          })
        )
      })
    }
  }
  const handleInputName = (event) => {
    setNewName(event.target.value)
  }
  const handleInputNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const personsToShow = persons.filter((element) => {
    return element.name.includes(filtered)
  })
  const handleFilter = (event) => {
    setFiltered(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} nameClass={nameClass} />
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
        {personsToShow.map((person) => (
          <Persons
            key={person.id}
            person={person}
            deletePerson={() => whenDelete(person.id, person.name)}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
