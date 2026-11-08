import { useState } from 'react'
import type { FormEvent } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ id: 1, name: 'Arto Hellas', number: '040-123456' }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('')
  const visiblePersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const addPerson = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!newName.trim() || !newNumber.trim()) return

    if (persons.some(person => person.name === newName.trim())) {
      window.alert(`${newName.trim()} is already added to phonebook`)
      return
    }

    const person = { id: persons.length + 1, name: newName.trim(), number: newNumber.trim() }
    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <label htmlFor="name-filter">filter shown with: </label>
        <input
          id="name-filter"
          value={filter}
          onChange={event => setFilter(event.target.value)}
        />
      </div>
      <h2>Add a new person</h2>
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
        <div>
          <label htmlFor="person-number">number: </label>
          <input
            id="person-number"
            type="tel"
            value={newNumber}
            onChange={event => setNewNumber(event.target.value)}
            required
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      {visiblePersons.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App
