import { Box, Typography } from '@mui/material'
import React from 'react'

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '70vh',
      }}
    >
      <Typography variant='h4' >
        No items found
      </Typography>
    </Box>
  )
}

export default NotFound