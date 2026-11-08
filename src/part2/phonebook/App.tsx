import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import axios from 'axios'

type Person = { id: string; name: string; number: string }

const Filter = ({ value, onChange }: {
  value: string
  onChange: (value: string) => void
}) => (
  <div>
    <label htmlFor="name-filter">filter shown with: </label>
    <input id="name-filter" value={value} onChange={event => onChange(event.target.value)} />
  </div>
)

const PersonForm = ({ name, number, onNameChange, onNumberChange, onSubmit }: {
  name: string
  number: string
  onNameChange: (value: string) => void
  onNumberChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}) => (
  <form onSubmit={onSubmit}>
    <div>
      <label htmlFor="person-name">name: </label>
      <input id="person-name" value={name} onChange={event => onNameChange(event.target.value)} required />
    </div>
    <div>
      <label htmlFor="person-number">number: </label>
      <input id="person-number" type="tel" value={number} onChange={event => onNumberChange(event.target.value)} required />
    </div>
    <button type="submit">add</button>
  </form>
)

const Persons = ({ persons }: { persons: Person[] }) => (
  <div>
    {persons.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState<Person[]>([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let active = true
    axios.get<Person[]>('http://localhost:3001/persons')
      .then(response => {
        if (active) setPersons(response.data)
      })
      .catch(() => {
        if (active) setLoadError('Could not load contacts. Check that npm run server is running.')
      })
    return () => { active = false }
  }, [])

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

    const person = { id: crypto.randomUUID(), name: newName.trim(), number: newNumber.trim() }
    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      {loadError && <p role="alert">{loadError}</p>}
      <Filter value={filter} onChange={setFilter} />
      <h2>Add a new person</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        onNameChange={setNewName}
        onNumberChange={setNewNumber}
        onSubmit={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={visiblePersons} />
    </div>
  )
}

export default App
