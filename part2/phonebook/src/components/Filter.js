const Filter = ({ value, handleFilter }) => {
  return (
    <div>
      filter shown with
      <input value={value} onChange={handleFilter} />
    </div>
  )
}

export default Filter
