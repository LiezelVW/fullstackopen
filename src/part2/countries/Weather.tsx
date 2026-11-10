import { useEffect, useState } from 'react'
import axios from 'axios'

type CurrentWeather = {
  temperature_2m: number
  wind_speed_10m: number
  weather_code: number
  is_day: number
}

// Open-Meteo uses WMO weather codes. Keep a text label alongside each icon.
const describeWeather = (code: number, isDay: number) => {
  if (code === 0) return { icon: isDay ? '☀️' : '🌙', label: 'Clear sky' }
  if ([1, 2].includes(code)) return { icon: '🌤️', label: 'Partly cloudy' }
  if (code === 3) return { icon: '☁️', label: 'Overcast' }
  if ([45, 48].includes(code)) return { icon: '🌫️', label: 'Fog' }
  if ([51, 53, 55, 56, 57].includes(code)) return { icon: '🌦️', label: 'Drizzle' }
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { icon: '🌧️', label: 'Rain' }
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { icon: '🌨️', label: 'Snow' }
  if ([95, 96, 99].includes(code)) return { icon: '⛈️', label: 'Thunderstorm' }
  return { icon: '🌡️', label: 'Current conditions' }
}

const Weather = ({ capital, coordinates }: {
  capital?: string
  coordinates?: number[]
}) => {
  const [weather, setWeather] = useState<CurrentWeather | null>(null)
  const [error, setError] = useState('')
  const latitude = coordinates?.[0]
  const longitude = coordinates?.[1]
  const hasLocation = Boolean(capital) && Number.isFinite(latitude) && Number.isFinite(longitude)

  useEffect(() => {
    if (!hasLocation) return
    const controller = new AbortController()
    axios.get<{ current: CurrentWeather }>('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude,
        longitude,
        current: 'temperature_2m,wind_speed_10m,weather_code,is_day',
        temperature_unit: 'celsius',
        wind_speed_unit: 'ms',
      },
      signal: controller.signal,
      timeout: 15000,
    }).then(({ data }) => {
      if (!controller.signal.aborted) {
        if (!data.current || !Number.isFinite(data.current.temperature_2m) ||
            !Number.isFinite(data.current.wind_speed_10m)) {
          throw new Error('Weather data unavailable')
        }
        setWeather(data.current)
      }
    }).catch(() => {
      if (!controller.signal.aborted) setError('Could not load weather. Please try this country again.')
    })
    // Cancel old requests when a different country is shown or the view is closed.
    return () => controller.abort()
  }, [hasLocation, latitude, longitude])

  if (!hasLocation) return <p>Weather unavailable: no capital coordinates provided.</p>
  const conditions = weather ? describeWeather(weather.weather_code, weather.is_day) : null

  return (
    <section aria-label={`Weather in ${capital}`}>
      <h3>Weather in {capital}</h3>
      {error ? <p role="alert">{error}</p> : weather && conditions ? (
        <>
          <p>Temperature: {weather.temperature_2m} °C</p>
          <p><span aria-hidden="true" style={{ fontSize: '2rem' }}>{conditions.icon}</span>{' '}{conditions.label}</p>
          <p>Wind: {weather.wind_speed_10m} m/s</p>
        </>
      ) : <p role="status">Loading weather…</p>}
      <p><small>Weather data by <a href="https://open-meteo.com/">Open-Meteo</a></small></p>
    </section>
  )
}

export default Weather
