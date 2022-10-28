import { Button } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import routes from '../../../shared/constants/routes'

const LoginButton = () => {
  return (
    <Button
      component={RouterLink}
      to={routes.LOGIN}
    >
      Login
    </Button>
  )
}

export default LoginButton