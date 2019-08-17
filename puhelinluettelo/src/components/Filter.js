import React from 'react'

const Filter = (props) => {
  const filter = props.filter
  const handleFilterChange = props.handleFilterChange
  return (
  <div>filter with: <input value={filter} 
    onChange={handleFilterChange}/>
  </div>
  )
}

export default Filter