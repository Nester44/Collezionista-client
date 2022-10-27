import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../../../../shared/constants/routes'

const Comment = ({ name, body, id }) => {
  return (
    <Box
      component={Paper}
      elevation={5}
      p={2}
    >
      <Typography component={Link} to={routes.USER + id} variant='h5'>{ name }</Typography>
      <Typography variant='body1'>{ body }</Typography>
    </Box>
  )
}

export default Comment