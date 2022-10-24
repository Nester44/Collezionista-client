import { Autocomplete, TextField } from '@mui/material'
import React from 'react'

const ItemAutoComplete = ({ tags, setFieldValue, autocompleteTags}) => {

  const onChange = (e, value) => {
    setFieldValue('tags', value)
  }
  const props = autocompleteTags ? { value: autocompleteTags } : {}

  return (
    <Autocomplete
      multiple
      freeSolo
      id="tags"
      name="tags"
      { ...props}
      options={tags}
      onChange={(e, value) => onChange(e, value)}
      fullWidth
      renderInput={(params) => 
      <TextField fullWidth variant='filled' margin='normal' {...params} label="Tags" />
      }
      
    />
  )
}

export default ItemAutoComplete