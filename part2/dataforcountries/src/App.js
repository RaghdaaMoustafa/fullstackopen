
import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import Display from './Components/Country'
import countriesService from './Services/countries'
const App = () => {
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState('')
  
  useEffect(() => {
    countriesService.getAll().then((response) => {
      setCountries(response)
    })
  }, [])

  const countriesToShow = countries.filter((element) =>
    element.name.common.toLowerCase().includes(filtered.toLocaleLowerCase())
  )
  
  const handleFilter = (event) => {
    const newValue = event.target.value
    setFiltered(newValue)
  }

  return (
    <div>
      <Filter value={filtered} handleFilter={handleFilter} />

      <Display
        countriesToShow={countriesToShow}
        filter={filtered}
      />
    </div>
  )
}
export default App

