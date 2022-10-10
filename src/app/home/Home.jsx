import React from 'react'
import withUnAuthRedirect from '../../common/hoc/withUnAuthRedirect'
import { useNavigate } from 'react-router-dom'
import routes from '../../shared/constants/routes'
import { useDispatch } from 'react-redux'
import { logout } from '../../slices/auth-slice'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler = async() => {
    await dispatch(logout())
    navigate(routes.LOGIN)
  }

  return (
    <div>
      <h2>Home</h2>
      <button onClick={logoutHandler} > Log out</button>
    </div>
  )
}

export default withUnAuthRedirect(Home)