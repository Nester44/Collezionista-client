import { Container, Divider, Grid, TextField, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl';
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import Link from '../../../common/hoc/link/Link';
import routes from '../../../shared/constants/routes';
import { login } from '../../../slices/auth-slice';
import { LoadingButton } from '@mui/lab'

const Login = () => {
  const [password, setPassword] = useState('123')
  const [email, setEmail] = useState('nesterov.mail4@gmail.com')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState()

  

  const theme = useTheme()

  const loginHandler = async() => {
    setIsLoading(true)
    await dispatch(login({password, email}))
    setIsLoading(false)
    navigate(routes.HOME)
  }

  return (
    <Container maxWidth="sm"
     sx={{ height: '80vh', display: 'flex', justifyContent:'center',
      flexDirection:'column', gap: '1rem'}}
    >
        <Typography variant='h2'><FormattedMessage id='app.login.title'/></Typography>
        <TextField
         autoComplete='email' type="text" value={email} onChange={e => setEmail(e.target.value)} label="Email" 
        />
        <TextField
          type="text" value={password} onChange={e => setPassword(e.target.value)} label="Password"
        />
        <LoadingButton loading={isLoading} onClick={loginHandler}>Login</LoadingButton>
        <Divider />

        <Typography variant='subtitle1'>
          <FormattedMessage id='app.login.noAccount' />
           <Link to={routes.REGISTRATION} >
            <FormattedMessage id='app.login.createAccount' />
          </Link>
        </Typography>
        <Link to={routes.HOME} >
          <Typography variant="link">
            <FormattedMessage id='app.login.linkToHome' sx={{color: theme.palette.primary.main}} />
          </Typography>
        </Link>
    </Container>
  )
}

export default Login