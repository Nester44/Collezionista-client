import { Container, Divider, Link, Typography, useTheme } from '@mui/material';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import LoginForm from '../../../common/forms/LoginForm';
import routes from '../../../shared/constants/routes';
import { Link as RouterLink } from 'react-router-dom';


const Login = () => {
  const theme = useTheme()

  return (
    <Container maxWidth="sm"
     sx={{ height: '80vh', display: 'flex', justifyContent:'center',
      flexDirection:'column', gap: '1rem'}}
    >
        <Typography variant='h2'><FormattedMessage id='app.login.title'/></Typography>
        
        <LoginForm />

        <Divider />

        <Typography variant='subtitle1'>
          <FormattedMessage id='app.login.noAccount' />

          {' '}

          <Link component={RouterLink} to={routes.REGISTRATION} >
            <FormattedMessage id='app.login.createAccount' />
          </Link>
          
        </Typography>

        <Link component={RouterLink} to={routes.HOME} >
          <Typography variant="link">
            <FormattedMessage id='app.login.linkToHome' sx={{color: theme.palette.primary.main}} />
          </Typography>
        </Link>
    </Container>
  )
}

export default Login