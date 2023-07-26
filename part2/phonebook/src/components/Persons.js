const Persons = ({ person, deletePerson }) => {
  return (
    <li key={person.id}>
      {person.name} {person.number}
      <button onClick={deletePerson}>delete</button>
    </li>
  )
}

export default Persons
