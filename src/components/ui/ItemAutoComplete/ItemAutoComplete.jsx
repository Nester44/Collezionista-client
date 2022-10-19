import { Autocomplete, Chip, TextField } from '@mui/material'
import React from 'react'

const ItemAutoComplete = ({ tags, touched, getFieldProps, status, errors, setFieldValue}) => {

  const onChange = (e, value) => {
    setFieldValue('tags', value)
  }

  return (
    <Autocomplete
      multiple
      freeSolo
      id="tags"
      name="tags"
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