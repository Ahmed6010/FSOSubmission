import { useSelector, useDispatch } from 'react-redux'
import { voting } from '../reducers/anecdoteReducer'
import { changeMessage, removeMessage } from '../reducers/notificationReducer'

const AnecdoteList  = () => {
  const anecdotes = useSelector(state => {
    const sortedAnecdotes = [...state.anecdotes]
    sortedAnecdotes.sort((a, b) => b.votes - a.votes )

    if ( state.filter !== '' ) {
      return sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
    }
    return sortedAnecdotes
  })
  
  const dispatch = useDispatch()

  const handleVoting = (anecdote) => {
    dispatch(voting(anecdote.id))
    dispatch(changeMessage(`you voted "${anecdote.content}"`))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVoting(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList