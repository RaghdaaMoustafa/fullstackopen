const Header = (props) => {
  return <h1>{props.name}</h1>
}

const Part = (props) => {
  return (
    <>
      <p>
        The part name is {props.name} and number of excersices is
        {props.excercise}
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part name={props.name1} excercise={props.excercise1} />
      <Part name={props.name2} excercise={props.excercise2} />
      <Part name={props.name3} excercise={props.excercise3} />
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
  const exercises3 = 14

  return (
    <div>
      <Header name={course} />
      <Content
        name1={part1}
        excercise1={exercises1}
        name2={part2}
        excercise2={exercises2}
        name3={part3}
        excercise3={exercises3}
      />
      <Total number={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App
