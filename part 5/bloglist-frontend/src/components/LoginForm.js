import { useState } from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'


const LoginForm = ({ login, errorMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    login(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <h2>Log in to application</h2>
      <Notification message={ errorMessage } color='red'/>
      <form onSubmit={ handleLogin }>
        <div>
          username
          <input
            type="text"
            value={ username }
            id='username'
            name="Username"
            onChange={ ({  target  }) => setUsername(target.value) }
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={ password }
            name="Password"
            id='password'
            onChange={ ({  target  }) => setPassword(target.value) }
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm