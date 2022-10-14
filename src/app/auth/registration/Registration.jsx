import { useTheme } from '@emotion/react'
import { Container, Divider, Typography } from '@mui/material'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import {Link} from '@mui/material'
import { Link as RouterLink} from 'react-router-dom'
import routes from '../../../shared/constants/routes'
import RegistrationForm from '../../../common/forms/RegistrationForm'

const Login = () => {
  const theme = useTheme()

  return (
    <Container maxWidth="sm"
     sx={{ height: '80vh', display: 'flex', justifyContent:'center',
      flexDirection:'column', gap: '1rem'}}
    >
        <Typography variant='h2'><FormattedMessage id='app.registration.title'/></Typography>
        
        <RegistrationForm />

        <Divider />

        <Typography variant='subtitle1'>
          <FormattedMessage id='app.registration.haveAccount' />

          {' '}

          <Link component={RouterLink} to={routes.LOGIN} >
            <FormattedMessage id='app.registration.loginLink' />
          </Link>
          
        </Typography>

        <Link component={RouterLink} to={routes.HOME} >
          <Typography variant="link">
            <FormattedMessage id='app.registration.linkToHome' sx={{color: theme.palette.primary.main}} />
          </Typography>
        </Link>
    </Container>
  )
}

export default Login