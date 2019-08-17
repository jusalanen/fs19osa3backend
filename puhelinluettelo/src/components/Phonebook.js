import React from 'react'
import FilteredPersons from './FilteredPersons'

const Phonebook = ( props ) => {
  const persons = props.persons
  const filter = props.filter
  const delPerson = props.handleDelete
  return <div>
    <h2>Numbers</h2>
    <FilteredPersons persons={persons} filter={filter} delPerson={delPerson} />
  </div>   
}

export default Phonebook