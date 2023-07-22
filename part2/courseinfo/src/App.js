const Course = ({ courses }) => {
  const Header = (props) => {
    return <h2>{props.name}</h2>
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
  return courses.map((element, i) => (
    <div key={i}>
      <Header name={element.name} />
      <Content parts={element.parts} />
      <b>
        <Total parts={element.parts} />
      </b>
    </div>
  ))
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ]

  return (
    <div>
      <h1>Webe development curriculum</h1>
      <Course courses={courses} />
    </div>
  )
}

export default App
