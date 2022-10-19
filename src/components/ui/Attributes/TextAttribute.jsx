import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const TextAttribute = ({ label, value }) => {
  return (
    <Box key={label + 'addfield'}
      sx={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Typography mr={1} variant='body' component='span' color='text.secondary' >{label}:</Typography>
      <Typography>{value}</Typography>
    </Box>
  )
}

export default TextAttribute