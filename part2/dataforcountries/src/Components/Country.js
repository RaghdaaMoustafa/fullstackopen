const Country = ({ countriesToShow, filter }) => {
  if (filter === '') {
    return null
  } else if (countriesToShow.length > 10) {
    return <p>Too many matches,specify another filter</p>
  } else if (countriesToShow.length === 1) {
    return countriesToShow.map((element) => {
      return (
        <>
          <h1>{element.name.common}</h1>
          <p>
            capital {element.capital} <br />
            {element.area}
          </p>
          <h2>languages:</h2>
          <ul>
            {Object.values(element.languages).map((item) => (
              <li>{item}</li>
            ))}
          </ul>
          <img src={element.flags.png} alt={element.flag.alt} />
        </>
      )
    })
  } else {
    return countriesToShow.map((element) => {
      return <li> element.name.common</li>
    })
  }
}
export default Country
