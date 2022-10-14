import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from '../../shared/constants/routes'
import { isAuthSelector, isCheckedSelector } from '../../app/auth/auth-slice'

const withUnAuthRedirect = (Component) => (props) => {
  const isAuth = useSelector(isAuthSelector)
  const isChecked = useSelector(isCheckedSelector)

  if (!isAuth && isChecked) return <Navigate replace to={routes.LOGIN} />

  return <Component {...props} />
}

export default withUnAuthRedirect