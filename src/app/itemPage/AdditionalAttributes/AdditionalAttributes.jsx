import { Box } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import AdditionalField from '../../../components/forms/AdditionalFields/AdditionalField'
import UniversalAttribute from '../../../components/ui/UniversalAttribute/UniversalAttribute'

const AdditionalAttributes = ({ additionalAttributes, isEdit, errors, touched, getFieldProps, setFieldValue }) => {
  const attributes = additionalAttributes.map((f, i) =>
    <UniversalAttribute type={f.type} label={f.label} value={f.value} key={f.label + i} />)

  const fields = additionalAttributes.map((f, i) => 
    <AdditionalField
      id={i}
      type={f.type}
      errors={errors}
      touched={touched}
      getFieldProps={getFieldProps}
      setFieldValue={setFieldValue}
      key={f.label + i}
      fullWidth
    />
  )

  return (
    <Box mb={4} display='flex' justifyContent='center'  >
      {
        isEdit ?
        <Stack width='100%' spacing={2} >
          {fields}
        </Stack>
        :
        <Stack  >
          {attributes}
        </Stack>
      }

    </Box>
  )
}

export default AdditionalAttributes