import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const navigate = useNavigate()

  const onChangeUserName = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 })
    navigate('/', { replace: true })
  }

  const onSubmitFailure = errorMsg => {
    setShowErrorMsg(true)
    setErrorMsg(errorMsg)
  }

  const submitFormSuccess = async event => {
    event.preventDefault()
    const userDetails = { username, password }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="mobile-login-container">
      <img
        src="https://res.cloudinary.com/tastykitchen/image/upload/v1634639792/Rectangle_1456login2_gkbq6l.png"
        alt="website login"
        className="login-website-landing"
      />
      <p className="mobile-login-heading">Login</p>
      <form className="form-container" onSubmit={submitFormSuccess}>
        <div className="login-website-logo-heading-container">
          <img
            src="https://res.cloudinary.com/tastykitchen/image/upload/v1633365815/Frame_274logo_kbotq3.png"
            alt="website logo"
            className="login-website-logo"
          />
          <h1 className="login-website-heading">Tasty Kitchens</h1>
          <h1 className="login-website-login-heading">Login</h1>
        </div>
        <div className="input-label-container">
          <label htmlFor="username" className="label">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            className="input"
            onChange={onChangeUserName}
          />
        </div>
        <div className="password-label-container">
          <label htmlFor="password" className="label">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        {showErrorMsg && <p className="error-message">{errorMsg}</p>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
