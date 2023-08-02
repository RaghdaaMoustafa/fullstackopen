import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import Country from './Components/Country'
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
  console.log(countriesToShow)
  const handleFilter = (event) => {
    setFiltered(event.target.value)
  }

  return (
    <div>
      <Filter value={filtered} handleFilter={handleFilter} />

      <Country countriesToShow={countriesToShow} filter={filtered} />
    </div>
  )
}
export default App
