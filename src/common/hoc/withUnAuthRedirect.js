import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isAuthSelector, isCheckedSelector } from '../../slices/auth-slice'
import routes from '../../shared/constants/routes'

const withUnAuthRedirect = (Component) => (props) => {
  const isAuth = useSelector(isAuthSelector)
  const isChecked = useSelector(isCheckedSelector)

  if (!isAuth && isChecked) return <Navigate replace to={routes.LOGIN} />

  return <Component {...props} />
}

export default withUnAuthRedirect