import React from 'react'

const PersonForm = (props) => {
  const addNameNumber = props.addNameNumber
  const newName = props.newName
  const handleNameChange = props.handleNameChange
  const newNumber= props.newNumber
  const handleNumberChange = props.handleNumberChange

  return (
    <div>
      <h2>Add a new name and a number</h2>
      <form onSubmit={addNameNumber}>
        <table><tbody>
        <tr><td width='50'>name: </td><td width='150'><input value={newName} 
          onChange={handleNameChange}/></td>
        </tr>
        <tr><td width='50'>number: </td><td width='150'><input value={newNumber}
          onChange={handleNumberChange}/></td>
        </tr>
        </tbody></table> 
        <button type="submit">add</button>     
      </form>
    </div>
  )
}

export default PersonForm