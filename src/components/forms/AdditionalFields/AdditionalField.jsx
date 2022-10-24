import { TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import UniversalField from './UniversalField'

const AdditionalField = ({ id, getFieldProps, setFieldValue, touched, errors, type, fullWidth }) => {
  const labelName = `additionalFields[${id}].label`
  const valueName = `additionalFields[${id}].value`
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }} >
      <Box
        component={TextField}
        {...getFieldProps(labelName)}
        id={labelName}
        name={labelName}
        fullWidth
        margin='normal'
        label='Label'
        error={Boolean(touched[labelName] && errors[labelName])}
        helperText={touched[labelName] && errors[labelName]}
      />
      :

      <Box component={UniversalField} fullWidth={fullWidth} valueName={valueName} type={type} errors={errors} touched={touched} setFieldValue={setFieldValue} getFieldProps={getFieldProps} /> 
</Box>
  )
}

export default AdditionalField