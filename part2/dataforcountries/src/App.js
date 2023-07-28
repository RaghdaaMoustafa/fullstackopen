<<<<<<< HEAD
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
=======
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
>>>>>>> 150391e (-part2e -2.18 create react app)
