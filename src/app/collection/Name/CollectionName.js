import { TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const CollectionName = ({ name, editProps, isEditing, onChange, userFeatures }) => {

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
    <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
      <Typography
        {...userFeatures}
        component='span'
        variant='h4'
      >

        {name}
      </Typography>
    </Box>
  )
}

export default CollectionName