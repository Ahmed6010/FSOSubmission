import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.message)
  const displayValue = notification !== null ? 'block' : 'none'
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: displayValue
  }
  
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification