import React, { useState } from 'react'
import * as yup from 'yup'
import { useFormik, Form, FormikProvider } from 'formik'
import { Alert, Box, Icon, IconButton, InputAdornment, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { FormattedMessage } from 'react-intl'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, register } from '../../slices/auth-slice'
import routes from '../../shared/constants/routes'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';





const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (values, { setStatus }) => {
    try {
      await dispatch(register(values))
      navigate(routes.HOME)
    } catch (error) {
      debugger
      setStatus(error.id)
    }
  }

  const LoginSchema = yup.object().shape({
    name: yup
      .string()
      .required('Name is required'),
    email: yup
      .string()
      .email('Email is incorrect')
      .required('Email is required'),

    password: yup
      .string()
      .required('Password is required')
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit
  })

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, status } =
    formik;

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit} noValidate >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <TextField
            id='name' name='name' autoComplete='off' type="text" label="Name"
            {...getFieldProps('name')}
            error={Boolean((touched.name && errors.name) || Boolean(status))}
            helperText={touched.name && errors.name}
          />
          <TextField
            id='email' name='email' autoComplete='email' type="text" label="Email"
            {...getFieldProps('email')}
            error={Boolean((touched.email && errors.email) || Boolean(status))}
            helperText={touched.email && errors.email}
          />

          <TextField
            id='password' name='password' label="Password"
            {...getFieldProps('password')}
            error={Boolean((touched.password && errors.password) || Boolean(status))}
            helperText={touched.password && errors.password}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    color='primary'
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton
            variant='contained'
            type='submit'
            loading={isSubmitting}
          >
            {isSubmitting ?
              <FormattedMessage id="app.registration.button.loading" /> :
              <FormattedMessage id="app.registration.button" />
            }
          </LoadingButton>

          <Box>
            {!!status && <Alert severity='error'><FormattedMessage id={status} /></Alert>}
          </Box>
        </Box>
      </Form>
    </FormikProvider>
  )
}

export default LoginForm