import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Buttons = ({onClick, text}) => <button onClick={onClick}>{text}</button>;
const Statistic = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>; 
const Statistics = ({good, neutral, bad}) => {
  if(good === 0 && neutral === 0 && bad ===0) return <p>No feedback given</p>
  return (
    <table>
      <tbody>
        <Statistic text='good' value={good}/>
        <Statistic text='neutral' value={neutral}/>
        <Statistic text='bad' value={bad}/>
        <Statistic text='all' value={good + neutral + bad}/>
        <Statistic text='average' value={(good -  bad) / (good + neutral + bad)}/>
        <Statistic text='positive' value={good * 100 / (good + neutral + bad)+' %'} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Buttons onClick={handleGood} text='good'/>
      <Buttons onClick={handleNeutral} text='neutral'/>
      <Buttons onClick={handleBad} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
