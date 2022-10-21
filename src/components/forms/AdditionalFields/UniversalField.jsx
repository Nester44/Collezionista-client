import React from 'react'
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
  'multiLine': MultilineField,
}

const UniversalField = ({ valueName, type, errors, touched, setFieldValue, getFieldProps }) => {
  const Field = fields[type] || ShortTextField
  return (
    <Field
      valueName={valueName}
      errors={errors}
      touched={touched}
      setFieldValue={setFieldValue} 
      getFieldProps={getFieldProps}
    />
  )
}

export default UniversalField