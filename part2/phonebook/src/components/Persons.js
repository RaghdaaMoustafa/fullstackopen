const Persons = ({ personsToShow }) => {
  return personsToShow.map((element, id) => (
    <li key={element.name}>
      {element.name} {element.number}
    </li>
  ))
}

export default Persons
