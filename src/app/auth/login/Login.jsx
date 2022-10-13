import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import routes from '../../../shared/constants/routes';
import { login } from '../../../slices/auth-slice';

const Login = () => {
  const [password, setPassword] = useState('123')
  const [email, setEmail] = useState('nesterov.mail4@gmail.com')
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const loginHandler = async() => {
    await dispatch(login({password, email}))
    navigate(routes.HOME)
  }

  return (
    <div className="container">
        <h1>Login</h1>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
        <input type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
        <button onClick={loginHandler}>Login</button>
        <p>Don't have an account? <Link to={routes.REGISTRATION}>Registration</Link></p>
        <Link to={routes.HOME}>Home</Link>
      </div >
  )
}

export default Login