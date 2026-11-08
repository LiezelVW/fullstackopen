import { useEffect, useState } from 'react'
import axios from 'axios'

type Country = {
  cca3: string
  name: { common: string }
  capital?: string[]
  area: number
  languages?: Record<string, string>
  flags: { png: string; svg?: string; alt?: string }
}

const CountryDetails = ({ country }: { country: Country }) => (
  <section>
    <h2>{country.name.common}</h2>
    <p>Capital: {country.capital?.join(', ') || 'Not available'}</p>
    <p>Area: {country.area.toLocaleString()} km²</p>
    <h3>Languages</h3>
    <ul>
      {Object.entries(country.languages ?? {}).map(([code, language]) => (
        <li key={code}>{language}</li>
      ))}
    </ul>
    <img src={country.flags.svg || country.flags.png}
      alt={country.flags.alt || `Flag of ${country.name.common}`}
      style={{ width: 200, maxWidth: '100%', height: 'auto' }} />
  </section>
)

const App = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    axios.get<Country[]>('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => { if (active) setCountries(response.data) })
      .catch(() => { if (active) setError('Could not load countries. Please refresh to try again.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  const matches = countries.filter(country =>
    country.name.common.toLowerCase().includes(query.trim().toLowerCase())
  )

  return (
    <div>
      <h1>Countries</h1>
      <label htmlFor="country-search">Find countries: </label>
      <input id="country-search" value={query} onChange={event => setQuery(event.target.value)} />
      {loading ? <p role="status">Loading countries…</p> : error ? <p role="alert">{error}</p> : (
        matches.length > 10 ? <p>Too many matches, specify another filter.</p> :
        matches.length === 0 ? <p>No countries found.</p> :
        matches.length === 1 ? <CountryDetails country={matches[0]} /> : (
          <ul>{matches.map(country => <li key={country.cca3}>{country.name.common}</li>)}</ul>
        )
      )}
    </div>
  )
}

export default App
