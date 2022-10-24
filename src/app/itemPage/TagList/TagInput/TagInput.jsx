import { Autocomplete, TextField } from '@mui/material'
import React from 'react'

const  TagInput = ({ tagsOptions, setCurrentTags, currentTags }) => {
  const onChange = (e, value) => {
    const formattedTags = value.map(t => ({ name: t }))
    setCurrentTags(formattedTags)
  }

  const currentTagNames = currentTags?.map(t => t.name)

  return (
    <Autocomplete 
      multiple
      freeSolo
      value={currentTagNames}
      options={tagsOptions}
      onChange={onChange}
      fullWidth
      renderInput={(params) => 
        <TextField fullWidth variant='filled' margin='normal' {...params} label="Tags" />
        }
    />
  )
}

export default TagInput