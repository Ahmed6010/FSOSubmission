import { useSelector, useDispatch } from 'react-redux'
import { updateVoting } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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
    dispatch(updateVoting(anecdote))
    dispatch(setNotification(`you voted "${anecdote.content}"`, 5))
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