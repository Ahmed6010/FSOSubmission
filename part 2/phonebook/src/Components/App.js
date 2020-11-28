import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({func}) => {
  return (
    <>
      <p>filter shown with </p>
      <input onChange={func}/>
    </>
  )
}

const PersonForm  = ({submitFunc, name, num, func1, func2}) => {
  return (
    <form onSubmit={submitFunc}>
        <div>
          name: <input value={name} onChange={func1}/>
        </div>
        <div>
          number: <input  value={num} onChange={func2}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
  </form>
  ) 
}

const Persons = ({persons,oldName}) =>{
  return (
  persons.map(person => {
    if(person.name.startsWith(oldName) || person.name.toLowerCase().startsWith(oldName)) 
      return <SinglePerson person={person}/>
    return null
  })
  )
}

const SinglePerson = ({person}) =>{
  return (
    <p key={person.id}>{person.name} {person.number}</p>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ oldName, setOldName ] = useState('')

  const addName = (event)=>{
    event.preventDefault()
    const nameObject = {
        name : newName,
        number : newNum,
        id : persons.length + 1
    }

    const nameExist = persons.filter(person => person.name === newName)
    
    if(nameExist.length !== 0)
        alert(`${newName} is already added to phonebook`)
    else{
      setPersons(persons.concat(nameObject))    /// axios.post nameObject
      setNewName('')
      setNewNum('')
    } 
  }

  const handleNameInput = event => setNewName(event.target.value)
  const handleNumInput = event => setNewNum(event.target.value)
  const handleSearchInput = event => setOldName(event.target.value)

  useEffect( () => {
    axios
      .get('http://localhost:3001/persons')
      .then( response => {
        setPersons(response.data);
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter func={handleSearchInput} />
      
      <h2>add a new</h2>

      <PersonForm submitFunc={addName} name={newName} num={newNum} func1={handleNameInput} func2={handleNumInput}/>

      <h2>Numbers</h2>

      <Persons persons={persons} oldName={oldName}/>  
    </div>
  )
}

export default App