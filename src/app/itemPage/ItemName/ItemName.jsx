import { TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const ItemName = ({ name, isEdit, setName }) => {
  return (
    <Box mb={4}>
      
      {
        isEdit ?
        <TextField onChange={(e) => setName(e.currentTarget.value)} value={name} />
        :
        <Typography variant='h2'>
          {name}
        </Typography>
      }

    </Box>
  )
}

export default ItemName