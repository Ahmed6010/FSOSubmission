const Notification = ({ message, color }) => {
  if (message === null) {
    return null
  }

  const Style = {
    color: color,
    fontStyle: 'italic',
    fontSize: 18,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5
  }

  return (
    <div style={Style}>
      {message}
    </div>
  )
}

export default Notification