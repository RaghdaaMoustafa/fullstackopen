import { useState } from 'react'

const Display = ({ category, text }) => (
  <div>
    {text} {category}
  </div>
)
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)
// const Total = ({ props }) => {
//   var total = props.values.reduce((sum, element) => {
//     return (sum += element)
//   }, 0)
//   return <Display handleClick={total} text="all" />
// }
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = (a, b, c) => {
    return (a + b + c) / 3
  }
  const positive = (good, neutral, total) => {
    return `${(good + neutral) / total} %`
  }

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
      <Display category={total} text="all " />
      <Display category={average(good, neutral, bad)} text="average " />
      <Display category={positive(good, neutral, total)} text="positive " />

      {/* Total item1={good} item2={neutral} item3={bad}  */}
    </div>
  )
}

export default App
