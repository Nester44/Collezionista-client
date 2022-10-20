import { TextField } from '@mui/material'
import React from 'react'

const MultilineField = ({ valueName, getFieldProps, touched, errors }) => {
  return (
    <TextField
      {...getFieldProps(valueName)}
      error={Boolean(touched[valueName] && errors[valueName])}
      helperText={touched[valueName] && errors[valueName]}
      name={valueName}
      id={valueName}
      fullWidth
      margin='normal'
      label='Value'
      multiline
      minRows={3}
    /> 
  )
}

export default MultilineField