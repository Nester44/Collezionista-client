import { TextField } from '@mui/material'
import React from 'react'

const IntegerField = ({ valueName, getFieldProps, touched, errors }) => {
  return (
    <TextField
      id={valueName}
      name={valueName}
      {...getFieldProps(valueName)}
      error={Boolean(touched[valueName] && errors[valueName])}
      helperText={touched[valueName] && errors[valueName]}
      type='number'
      label='Value'
    />
  )
}

export default IntegerField