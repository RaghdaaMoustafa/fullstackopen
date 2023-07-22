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
export default Course
