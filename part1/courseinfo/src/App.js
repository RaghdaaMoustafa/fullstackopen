const Header = (props) => {
  return <h1>{props.name}</h1>
}

const Content = (props) => {
  return (
    <p>
      The part name is {props.name} and number of excersices is
      {props.excercise}
    </p>
  )
}

const Total = (props) => {
  return <p>The total number of excersices is {props.number}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course} />
      <Content name={part1} excercise={exercises1} />
      <Content name={part2} excercise={exercises2} />
      <Content name={part3} excercise={exercises3} />
      <Total number={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App
