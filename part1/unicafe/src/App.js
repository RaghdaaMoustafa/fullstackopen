import { useState } from 'react'

const Display = ({ category, text }) => {
  return (
    <div>
      {text} {category}
    </div>
  )
}
const Statistics = (props) => {
  if (props.good === 0 && props.bad === 0 && props.neutral === 0) {
    return <div>No feedback given</div>
  }
  return (
    // const statistics=props.items.map((element)=>{<StatEntry category={element} text=})
    <>
      <Display category={props.good} text="good " />
      <Display category={props.neutral} text="neutral " />
      <Display category={props.bad} text="bad " />
      <Display category={props.total} text="all " />
      <Display category={props.average} text="average " />
      <Display category={props.positive} text="positive " />
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
    return `${(good + neutral) / total} %`
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
        total={<Total items={{ good, neutral, bad }} />}
        average={average(good, neutral, bad)}
        positive={positive(good, neutral, good + neutral + bad)}
      />
    </div>
  )
}

export default App

const Total = ({ items }) => {
  return Object.values(items).reduce((sum, item) => {
    return (sum += item)
  }, 0)
  // console.log(total)
}
