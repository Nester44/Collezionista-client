import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const BooleanAttribute = ({ label, value }) => {
  return (
    <Box key={label + 'addfield'}
      sx={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Typography mr={1} variant='body' component='span' color='text.secondary' >{label}:</Typography>
      {
        value ?
          <DoneIcon color='primary' /> :
          <CloseIcon color='error' />
      }
    </Box>
  )
}

export default BooleanAttribute