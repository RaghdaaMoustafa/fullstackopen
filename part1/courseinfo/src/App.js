const Header = (props) => {
  return <h1>{props.name}</h1>
}

const Part = (props) => {
  return (
    <>
      <p>
        The part name is {props.name} and number of excersices is{' '}
        {props.excercise}
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      {props.partsArray.map((item, i) => (
        <Part key={i} name={item.name} excercise={item.exc} />
      ))}
    </>
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
  const exercises3 = 104

  const partsArray = [
    { name: part1, exc: exercises1 },
    { name: part2, exc: exercises2 },
    { name: part3, exc: exercises3 },
    { name: 'raghad', exc: 8 },
  ]

  return (
    <div>
      <Header name={course} />
      <Content partsArray={partsArray} />
      <Total number={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App
