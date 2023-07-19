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
      {props.parts.map((item, i) => {
        return <Part key={i} name={item.name} excercise={item.exercises} />
      })}
    </>
  )
}

const Total = (props) => {
  const summation = props.parts.reduce((sum, element) => {
    return (sum += element.exercises)
  }, 0)
  return <p>The total number of excersices is {summation} </p>
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10,
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
    },
    {
      name: 'State of a component',
      exercises: 14,
    },
  ]

  return (
    <div>
      <Header name={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
