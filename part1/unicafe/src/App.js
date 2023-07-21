import { useState } from 'react'

const MyTable = (props) => {
  return (
    <table>
      <tbody>
        {Object.keys(props).map((element) => (
          <tr>
            <td>{element}</td>
            <td>{props[element]}</td>
            <td>Flor</td>
            <td>Ella</td>
            <td>Juan</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const StatisticLine = ({ category, text }) => {
  return (
    <div>
      {text} {category}
    </div>
  )
}
const Statistics = (props) => {
  // some(cb fn) , every(cb fn) -> boolean
  if (!(props.good || props.bad || props.neutral)) {
    return <div>No feedback given</div>
  }

  console.log(Object.keys(props))
  return (
    <>
      <table>
        {Object.keys(props).map((item, i) => (
          <tbody key={i}>
            <tr>
              <td>{item}</td>
              <td>{props[item]}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // const total = good + neutral + bad
  const average = (a, b, c) => {
    return (a + b + c) / 3
  }
  const positive = (good, neutral, total) => {
    return `${(((good + neutral) / total) * 100).toFixed(2)} %`
  }
  const total = (items) => {
    return Object.values(items).reduce((sum, item) => {
      return (sum += item)
    }, 0)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total({ good, neutral, bad })}
        average={average(good, neutral, bad)}
        positive={positive(good, neutral, total({ good, neutral, bad }))}
      />
    </div>
  )
}

export default App
