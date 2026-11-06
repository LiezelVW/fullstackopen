import { useState } from 'react'

// Exercise 1.10: reuse these components with different props.
type ButtonProps = {
  handleClick: () => void
  text: string
}

const Button = ({ handleClick, text }: ButtonProps) => (
  <button onClick={handleClick}>{text}</button>
)

type StatisticLineProps = {
  text: string
  value: number | string
}

const StatisticLine = ({ text, value }: StatisticLineProps) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

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
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={`${positive} %`} />
        </tbody>
      </table>
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
      <Button handleClick={() => setGood(good + 1)} text="good" />{' '}
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />{' '}
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
