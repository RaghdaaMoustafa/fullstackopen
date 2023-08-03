import { useState } from 'react'

const Country = ({ c }) => {
  const [showDetails, setShowDetails] = useState(false)
  return (
    <>
      {showDetails ? (
        <>
          <h1>{c.name.common}</h1>
          <p>
            capital {c.capital} <br />
            {c.area}
          </p>
          <h2>languages:</h2>
          <ul>
            {Object.values(c.languages).map((item,i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <img src={c.flags.png} alt={c.flag.alt} />
        </>
      ) : (
        <>{c.name.common}</>
      )}
      <button
        onClick={() => {
          setShowDetails(!showDetails)
        }}
      >
        {showDetails ? 'no details' : 'details'}
      </button>
    </>
  )
}

const Display = ({ countriesToShow, filter }) => {
  if (filter === '') {
    return null
  }
  const length = countriesToShow.length
  return length > 10 ? (
    <p>Too many matches,specify another filter</p>
  ) : length === 1 ? (
    <Country c={countriesToShow[0]} />
  ) : (
    countriesToShow.map((element, i) => {
      return (
        <>
          <Country key={i} c={element} />
          <br />
        </>
      )
    })
  )
}

export default Display
