import React from 'react'

const FilteredPersons = (props) => {
  const persons = [].concat(props.persons)
  const filter = props.filter
  const delPerson = props.delPerson
  const filtered = persons.filter( person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return <div><table><tbody>
    {filtered.map( person => <tr key={person.name}>
      <td width='160'>{person.name}</td><td width='120'>{person.number}</td>
      <td width='50'> <button onClick={ () => {
        if(window.confirm( 'Do you want to delete ' + person.name + ' ?' )) {
          delPerson(person.id)}}}
          >delete</button></td></tr>)}
  </tbody></table></div>
}

export default FilteredPersons