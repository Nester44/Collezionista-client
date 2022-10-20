import { Checkbox } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'

const CheckboxTextField = ({ valueName, getFieldProps, setFieldValue, touched, errors }) => {
  useEffect(() => {
    setFieldValue(valueName, false)
  }, [setFieldValue, valueName])
  
  return (
    <Checkbox
      error={Boolean(touched[valueName] && errors[valueName])}
      helperText={touched[valueName] && errors[valueName]}
      {...getFieldProps(valueName)}
      name={valueName}
      id={valueName}
    />
  )
}

export default CheckboxTextField