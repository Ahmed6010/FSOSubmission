import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = () => {
    return props.message
  }
  const displayValue = notification() !== null ? 'block' : 'none'
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: displayValue,
    marginBottom: 10
  }
  
  return (
    <div style={style}>
      {notification()}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification