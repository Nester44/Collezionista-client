import { TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const ItemName = ({ isEdit, getFieldProps, name, errors, touched }) => {
  return (
    <Box mb={2}>
      
      {
        isEdit ?
        <TextField
          fullWidth
          {...getFieldProps('name')}
          error={Boolean(touched.name && errors.name)}
          helperText={touched.name && errors.name}
        />
        :
        <Typography variant='h2'>
          {name}
        </Typography>
      }

    </Box>
  )
}

export default ItemName