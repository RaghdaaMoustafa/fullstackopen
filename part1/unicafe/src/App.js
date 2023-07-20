import { useState } from 'react'

const Display = ({ category, text }) => (
  <div>
    {text} {category}
  </div>
)
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Display category={good} text="good " />
      <Display category={neutral} text="neutral " />
      <Display category={bad} text="bad " />
    </div>
  )
}

export default App
