import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import moment from 'moment'

const DateAttribute = ({ label, value }) => {
  const date = moment(value).format('ll')
  return (
    <Box key={label + 'addfield'}
    sx={{
      display: 'flex',
      alignItems: 'center'
    }}
  >
    <Typography mr={1} variant='body' component='span' color='text.secondary' >{label}:</Typography>
    <Typography>{date}</Typography>
  </Box>
  )
}

export default DateAttribute