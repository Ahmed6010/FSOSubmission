import React, { useState, useEffect } from 'react'
import dataService from '../Modules/dataService'

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

const Notification = ({ message, color }) => {
  if (message === null) {
    return null
  }

  const Style = {
    color: color,
    fontStyle: 'italic',
    fontSize: 20,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10
  }

  return (
    <div style={Style}>
      {message}
    </div>
  )
}



const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ oldName, setOldName ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)


  const addName = (event)=>{
    event.preventDefault()
    const newPerson = {
        name : newName,
        number : newNum
    }

    const nameExist = persons.find(person => person.name === newName)     
    
    // Checking if the name is exist
    if(nameExist) {
        const existId = nameExist.id;
        if (window.confirm(`${nameExist.name} is already added to phonebook, replace the old number with a new one ?`)){
          dataService
            .update(existId,{...newPerson, id:existId})
            .then(returnedPerson => {
              setSuccessMessage(`Updated ${returnedPerson.name}`)
              setPersons(persons.map(person =>  person.id !== existId ? person : returnedPerson ))
              setNewName('')
              setNewNum('') 
              setTimeout(() => {
                setSuccessMessage(null)
              }, 5000);
            })
            .catch(error => {
              setErrorMessage(`Information of ${nameExist.name} has already been removed from server`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000);
              setPersons(persons.filter(n => n.id !== nameExist.id))
            })
        }
      }
    // adding new person  
    else{    
      dataService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(newPerson))
          setSuccessMessage(`Added ${returnedPerson.name}`)  
          setNewName('')
          setNewNum('')
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000);
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
        })
    } 
  }

  const handleNameInput = event => setNewName(event.target.value)
  const handleNumInput = event => setNewNum(event.target.value)
  const handleSearchInput = event => setOldName(event.target.value)
  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) { 
      dataService
        .delet(person.id)
        .then(() => {setPersons(persons.filter(n => n.id !== person.id))})
    }
  }
  
  useEffect( () => {
    dataService
      .getAll().then( data => {setPersons(data)})
  }, [])



  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={successMessage} color='green'/>
      <Notification message={errorMessage} color='red'/>

      <Filter func={handleSearchInput} />
      
      <h2>add a new</h2>

      <PersonForm submitFunc={addName} name={newName} num={newNum} func1={handleNameInput} func2={handleNumInput}/>

      <h2>Numbers</h2>

      <ul>
        {persons.map(person => {
          if(person.name.startsWith(oldName) || person.name.toLowerCase().startsWith(oldName)) {
            return <li>
              <span key={person.id}>{person.name} {person.number}   </span>
              <button onClick={() => handleDelete(person)}>delete</button>
            </li>}
          return null                                    
        })}
      </ul>
    </div>
  )
}

export default App