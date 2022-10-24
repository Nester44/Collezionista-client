import { Checkbox } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'

const CheckboxField = ({ valueName, getFieldProps, setFieldValue, touched, errors }) => {
  useEffect(() => {
    setFieldValue(valueName, false)
  }, [setFieldValue, valueName])
  
  return (
    <Checkbox
      {...getFieldProps(valueName)}
      name={valueName}
      id={valueName}
    />
  )
}

export default CheckboxField