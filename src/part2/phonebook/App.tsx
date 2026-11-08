import { useState } from 'react'
import type { FormEvent } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ id: 1, name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const addPerson = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!newName.trim()) return

    if (persons.some(person => person.name === newName.trim())) {
      window.alert(`${newName.trim()} is already added to phonebook`)
      return
    }

    const person = { id: persons.length + 1, name: newName.trim() }
    setPersons(persons.concat(person))
    setNewName('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={addPerson}>
        <div>
          <label htmlFor="person-name">name: </label>
          <input
            id="person-name"
            value={newName}
            onChange={event => setNewName(event.target.value)}
            required
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.id}>{person.name}</p>)}
    </div>
  )
}

export default App
