import { TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const AdditionalField = ({ children, id, getFieldProps, setFieldValue, touched, errors }) => {
  const labelName = id + 'Label'
  const valueName = id + 'Value'

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }} >
      <TextField
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

      {React.cloneElement(children, { valueName, getFieldProps, setFieldValue, touched, errors })}
</Box>
  )
}

export default AdditionalField