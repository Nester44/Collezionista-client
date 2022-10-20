import { Box, Typography } from '@mui/material'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import AdditionalField from './AdditionalField'
import CheckboxField from './CheckboxField'
import DateField from './DateField'
import IntegerField from './IntegerField'
import MultilineField from './MultilineField'
import ShortTextField from './ShortTextField'


const fields = {
  'checkbox': CheckboxField,
  'integer': IntegerField,
  'string': ShortTextField,
  'date': DateField,
  'multiline': MultilineField,
}

const AdditionalFields = ({ type, getFieldProps, setFieldValue, touched, errors }) => {
  const Field = fields[type] || ShortTextField
  return (
    <Box>
      <Typography variant="body1">
        <FormattedMessage id='app.collection.additionalAttributes' />
        {type}
      </Typography>

      <AdditionalField
        errors={errors}
        touched={touched}
        setFieldValue={setFieldValue} 
        getFieldProps={getFieldProps}
        id='first'
        children={<Field />}
      />

      <AdditionalField
        errors={errors}
        touched={touched}
        setFieldValue={setFieldValue} 
        getFieldProps={getFieldProps}
        id='second'
        children={<Field />}
      />

      <AdditionalField
        errors={errors}
        touched={touched}
        setFieldValue={setFieldValue} 
        getFieldProps={getFieldProps}
        id='third'
        children={<Field />}
      />


      

    </Box>
  )
}

export default AdditionalFields