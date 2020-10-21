import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Buttons = ({onClick, text}) => <button onClick={onClick}>{text}</button>;

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [selectedVote, setSelectedVote] = useState(Array(6).fill(0))

  const handleAnecdote = () => setSelected(Math.floor((Math.random() * 6)));
  const handleVotes = () => {
    const copy = [...selectedVote]
    copy[selected] += 1;
    return setSelectedVote(copy);
  };

  let max = selectedVote.indexOf(Math.max(...selectedVote));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <p>has {selectedVote[selected]} votes</p>
      <Buttons onClick={handleVotes} text='vote'/>
      <Buttons onClick={handleAnecdote} text='next anecdote'/>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[max]}
      <p>has {selectedVote[max]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
