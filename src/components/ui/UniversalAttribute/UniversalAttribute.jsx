import React from 'react'
import BooleanAttribute from '../Attributes/BooleanAttribute'
import DateAttribute from '../Attributes/DateAttribute'
import TextAttribute from '../Attributes/TextAttribute'

const attributeComponents = {
  'checkbox': BooleanAttribute,
  'string': TextAttribute,
  'date': DateAttribute,
  'multiLine': TextAttribute,
  'integer': TextAttribute,
}


const UniversalAttribute = ({ type, value, label }) => {
  const Attribute = attributeComponents[type]
  return (
    <Attribute value={value} label={label} />
  )
}

export default UniversalAttribute