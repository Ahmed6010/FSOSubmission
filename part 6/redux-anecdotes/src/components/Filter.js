import { connect } from 'react-redux'
import { addText } from '../reducers/filterReducer'


const Filter = (props) => {
  const handleChange = (event) => {
    props.addText(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const ConnectedFilter = connect(null, { addText })(Filter)

export default ConnectedFilter