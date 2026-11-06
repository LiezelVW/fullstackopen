import { useState } from 'react'

type StatisticsProps = {
  good: number
  neutral: number
  bad: number
}

// Exercise 1.8: receive the counters as props and display the statistics.
const Statistics = ({ good, neutral, bad }: StatisticsProps) => {
  const total = good + neutral + bad
  // Exercise 1.9: show a message until the first feedback is recorded.
  if (total === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }

  const average = (good - bad) / total
  const positive = (good / total) * 100

  return (
    <div>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </div>
  )
}

// App owns the state and passes its current values to Statistics.
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>{' '}
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>{' '}
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
