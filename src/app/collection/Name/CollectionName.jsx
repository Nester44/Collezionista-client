import { TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const CollectionName = ({ name, isEditing, onChange, userFeatures }) => {

  if (isEditing) {
    return (
      <TextField
        label='Name'
        fullWidth
        onChange={onChange}
        value={name}
      />
    )
  }

  return (
    <Typography
      {...userFeatures}
      component='span'
      
      variant='h4'
    >

      {name}
    </Typography>
  )
}

export default CollectionName