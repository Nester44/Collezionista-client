import { Box, Typography } from '@mui/material'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import AdditionalField from './AdditionalField'

const AdditionalFields = ({ fields, getFieldProps, setFieldValue, touched, errors }) => {

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <Typography variant="body1">
        <FormattedMessage id='app.collection.additionalAttributes' />
      </Typography>

      {
        fields.map((field, i) => 
          <AdditionalField
            key={`#${field.type}${i}`}
            errors={errors}
            touched={touched}
            setFieldValue={setFieldValue} 
            getFieldProps={getFieldProps}
            id={i}
            type={field.type}
          />)
      }

    </Box>
  )
}

export default AdditionalFields