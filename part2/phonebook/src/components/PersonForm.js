const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
      <div>
        name: <input onChange={props.handleInputName} value={props.value1} />
      </div>
      <br></br>
      <div>
        number:
        <input value={props.value2} onChange={props.handleInputNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
export default PersonForm
