import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import routes from '../../../shared/constants/routes'
import { register } from '../../../slices/auth-slice'

const Login = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const regisrationHandler = async() => {
    await dispatch(register({email, password, name}))
    navigate(routes.HOME)
  }

  return (
    <div className="container">
      <h1>Register</h1>
       <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="name" />
       <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
        <input type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
         <button onClick={regisrationHandler}>Register</button>
         <p>Don't have an account? <Link to={routes.LOGIN}>Log in</Link></p>
       </div>
  )
}

export default Login