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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header name={course}/>
      <Content 
      name1={part1.name} excercise1={part1.exercises}
      name2={part2.name} excercise2={part2.exercises}
      name3={part3.name} excercise3={part3.exercises}
      />
      <Total number={part1.exercises+part2.exercises+part3.exercises}/>

    </div>
  )
}

export default App
