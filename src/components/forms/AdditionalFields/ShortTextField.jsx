import { TextField } from '@mui/material'
import React from 'react'

const ShortTextField = ({ valueName, getFieldProps, touched, errors }) => {
  return (
    <TextField
      fullWidth
      margin='normal'
      error={Boolean(touched[valueName] && errors[valueName])}
      helperText={touched[valueName] && errors[valueName]}
      label='Value'
      {...getFieldProps(valueName)}
      name={valueName}
      id={valueName}
    />
  )
}

export default ShortTextField